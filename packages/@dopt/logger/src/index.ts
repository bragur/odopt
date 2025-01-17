import * as log from 'loglevel';
import { nodeStyle, browserStyle } from './style';

export interface LogLevelsOrder {
  TRACE: 0;
  DEBUG: 1;
  INFO: 2;
  WARN: 3;
  ERROR: 4;
  SILENT: 5;
}

/**
 * The different log levels ranging from trace (most verbose) to silent (no logs).
 */
export type LogLevels =
  | 'trace'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'silent';

export type LoggerProps = {
  logLevel?: LogLevels;
  prefix?: string;
};

const IS_BROWSER =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * The Dopt Logger offers a convenient framework for logLevel configuration
 * and templated logging. Allowing you to enable logging in your packages based
 * on log levels and with defined styled template for your node terminal and
 * browser console. For more, see @dopt/logger's README.md: {@link https://github.com/dopt/odopt/tree/main/packages/@dopt/logger/README.md}.
 */
export class Logger {
  private static instance: Logger;
  // Default log level is 'silent'
  private logLevel = 'silent';
  // Default prefix is 'dopt'
  private prefix = 'Dopt';

  /**
   * The Logger class uses `getLogger` from loglevel to return a unique instance by prefix.
   */
  private baseLogger = log.getLogger(this.prefix);

  /**
   * The Logger's constructor gets called with the `new` operator,
   * and sets the static instance to newly created instance on construction.
   * If instance is already created it simply returns the reference.
   */
  constructor({ logLevel, prefix }: LoggerProps) {
    if (!Logger.instance) {
      this.logLevel = logLevel ? logLevel : 'silent';
      this.prefix = prefix ? prefix : this.prefix;
      this.baseLogger = log;
      this.baseLogger.setLevel(this.logLevel as log.LogLevelDesc);
      Logger.instance = this;
    }
    return Logger.instance;
  }

  /**
   * Finally, any Logger should define some business logic, which can be
   * executed on its instance.
   */
  public log(...msg: any[]) {
    IS_BROWSER
      ? this.baseLogger.log(`%c${this.prefix}`, browserStyle.prefix(), ...msg)
      : this.baseLogger.log(nodeStyle.prefix(this.prefix), ...msg);
  }

  public debug(...msg: any[]) {
    IS_BROWSER
      ? this.baseLogger.debug(
          `%c${this.prefix}%c %c[Debug]`,
          browserStyle.prefix(),
          browserStyle.default(),
          browserStyle.debugTitle(),
          ...msg
        )
      : this.baseLogger.debug(
          nodeStyle.prefix(this.prefix),
          nodeStyle.debugTitle('[Debug]'),
          ...msg
        );
  }

  public error(...msg: any[]) {
    IS_BROWSER
      ? this.baseLogger.error(
          `%c${this.prefix}%c %c[Error]%c${msg}`,
          browserStyle.prefix(),
          browserStyle.default(),
          browserStyle.errorTitle(),
          browserStyle.errorBody()
        )
      : this.baseLogger.error(
          nodeStyle.prefix(this.prefix),
          nodeStyle.errorTitle('[Error]'),
          nodeStyle.errorBody(...msg)
        );
  }

  public warn(...msg: any[]) {
    IS_BROWSER
      ? this.baseLogger.warn(
          `%c${this.prefix}%c %c[Warn]`,
          browserStyle.prefix(),
          browserStyle.default(),
          browserStyle.warnTitle(),
          ...msg
        )
      : this.baseLogger.warn(
          nodeStyle.prefix(this.prefix),
          nodeStyle.warnTitle('[Warn]'),
          ...msg
        );
  }

  public info(...msg: any[]) {
    IS_BROWSER
      ? this.baseLogger.info(
          `%c${this.prefix}%c %c[Info]`,
          browserStyle.prefix(),
          browserStyle.default(),
          browserStyle.infoTitle(),
          ...msg
        )
      : this.baseLogger.info(
          nodeStyle.prefix(this.prefix),
          nodeStyle.infoTitle('[Info]'),
          ...msg
        );
  }
}
