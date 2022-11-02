import { Intentions, Blocks, BlockIdentifier } from './types';
import { getBlockDefaultState } from './utils';

import { errorHandler } from './error-handler';
import { Logger } from '@dopt/logger';
import { Block } from './types';

export async function client({
  url,
  apiKey,
  options,
  log,
  urlPrefix,
  packageVersion,
  packageName,
}: {
  url: string;
  apiKey: string;
  log: Logger;
  options?: RequestInit;
  urlPrefix: string;
  packageVersion: string;
  packageName: string;
}) {
  const response = await fetch(`${urlPrefix}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      'x-api-key': apiKey,
      'x-pkg-version': packageVersion,
      'x-pkg-name': packageName,
    },
  });
  if (!response.ok) {
    errorHandler(response, log);
    return;
  }

  return await response.json();
}

export function blocksApi(
  apiKey: string,
  uid: string | undefined,
  log: Logger,
  config: {
    urlPrefix: string;
    packageVersion: string;
    packageName: string;
  }
) {
  return {
    async fetchBlockIdentifiersForFlowVersion(
      journeyIdentifier: string,
      version: number
    ): Promise<BlockIdentifier[]> {
      const blockIdentifiers = await client({
        url: `/blocks?journeyIdentifier=${journeyIdentifier}&version=${version}`,
        apiKey,
        log,
        ...config,
      });
      if (blockIdentifiers && blockIdentifiers.length === 0) {
        log.warn(
          `No blocks were found for FlowVersions<{"${journeyIdentifier}":${version}}>
 Please confirm that a flow with this identifier and version exists in your Dopt workspace.`
        );
      } else {
        log.info(
          `${blockIdentifiers.length} blocks identifiers fetched for FlowVersions<{"${journeyIdentifier}":${version}}>`
        );
      }
      return blockIdentifiers;
    },

    async fetchBlock(bid: string, version: number): Promise<Block> {
      if (!uid || version === undefined) {
        if (!uid) {
          log.info(
            `Call to \`useBlock('${bid}')\` is returing default values until the \`usedId\` prop is defined.`
          );
        }
        if (version === undefined) {
          log.warn(
            `Call to \`useBlock('${bid}')\` cannot be satisfied. Returning default values. 
+The Block<{ id : ${bid} }> does not appear to exist in any of the flows specified in the \`flowVersions\` prop.`
          );
        }
        return Promise.resolve(getBlockDefaultState(bid));
      } else {
        const blockRequest = client({
          url: `/block/${bid}?version=${version}&endUserIdentifier=${uid}`,
          apiKey,
          log,
          ...config,
        });
        const block = await blockRequest;
        if (block) {
          log.info(
            `Block<{"uuid":"${bid}","active":${block.active}}> for Flow<{"version":${version}}> fetched successfully.`
          );
          log.debug(`${'\n'}${JSON.stringify(block, null, 2)}`);
        } else {
          log.error(
            `An error occurred in fetching Block<{ id : ${bid} }>  for Flow<{ version : ${version} }>, setting block state to its defaults.`
          );
        }
        return block || Promise.resolve(getBlockDefaultState(bid));
      }
    },

    intent: createIntentApi(apiKey, uid, log, config),
  };
}

export const createIntentApi = (
  apiKey: string,
  uid: string | undefined,
  log: Logger,
  config: {
    urlPrefix: string;
    packageVersion: string;
    packageName: string;
  }
) => {
  const intentApi =
    (intention: keyof Intentions) =>
    async (bid: string, vid: number): Promise<Block> => {
      log.info(`Calling ${intention} on Block<{"uuid":"${bid}"}>`);
      log.debug(
        `/block/${bid}/${intention}?version=${vid}&endUserIdentifier=${uid}`
      );

      const response = await client({
        url: `/block/${bid}/${intention}?version=${vid}&endUserIdentifier=${uid}`,
        apiKey,
        options: {
          method: 'POST',
          body: '{}',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        log,
        ...config,
      });

      if (response && response.block) {
        const { block } = response;
        log.info(
          `Block<{"uuid":"${bid}"}> successfully "${
            intention === 'complete' ? intention + 'd' : intention + 'ed'
          }"`
        );
        log.debug(`${'\n'}${JSON.stringify(block, null, 2)}`);
        return Promise.resolve(block);
      }
      log.error(
        `Block<{"uuid":"${bid}"}> failed to trigger the intention "${intention}"`
      );
      return Promise.resolve(getBlockDefaultState(bid));
    };

  return {
    complete: intentApi('complete'),
    exit: intentApi('exit'),
    start: intentApi('start'),
    stop: intentApi('stop'),
  };
};