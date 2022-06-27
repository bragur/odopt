import { env, inProd } from '@dopt/env';

import { defineConfig, Options } from 'tsup';

import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const react = ({ entry, ...rest }: Options) => {
  //@ts-ignore
  return defineConfig(() => ({
    entry: entry,
    outDir: 'dist',
    format: ['esm', 'cjs'],
    inject: ['./.react-jsx-inject.ts'],
    tsconfig: './tsconfig.json',
    target: env({ dev: 'ESNext', prod: 'ES2020' }),
    sourcemap: inProd(),
    minify: inProd(),
    esbuildPlugins: [
      vanillaExtractPlugin({
        identifiers: env({ dev: 'debug', prod: 'short' }),
      }),
    ],
    clean: inProd(),
    onSuccess: `
        echo "\u001b[34;1mCLI\u001b[0m 🐢 Building d.ts and d.ts.map";
        tsc --emitDeclarationOnly --declaration;
        echo "\u001b[34;1mCLI\u001b[0m 🐢 Build success (albeit slowly)";
        ls ./dist/ | grep 'd\.ts' | xargs -I{} echo "\u001b[34;1mDTS\u001b[0m \u001b[37;1mdist/{}\u001b[0m";
      `,
    ...rest,
  }));
};
export { react };
