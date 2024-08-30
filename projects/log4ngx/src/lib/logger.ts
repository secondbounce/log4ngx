import { Level } from './level';
import { LogService } from './log.service';
import { LoggingEvent } from './logging-event';

const JSON_INDENT_IN_SPACES: number = 2;

/**
 * The `Logger` class provides access to the methods for logging messages at the required {@link Level}.
 *
 * Typically, each component or service will instantiate its own `Logger` instance, which will include
 * the logger's {@link Logger.name} in the logged message.
 *
 * @property name - A name, usually that of the 'parent' component, that will be logged with each message.
 */
export class Logger {
  /** Instantiates a new `Logger`.
   *
   * `Logger` instances should **NOT** be instantiated directly using this constructor as the instance
   * will not be registered and cached within the {@link LogService}.  (This will mean that every instance
   * of the parent class will end up with its own duplicate copy, rather than sharing a single instance.)
   * Instead, use the {@link LogService.getLogger}, i.e.
   * ```
   *    this._log = logService.getLogger('MyComponent');
   * ```
   * @internal
   */
  constructor(public readonly name: string,
              private readonly _logService: LogService) {
    /* Ideally, this constructor would be marked 'internal', if there was such an access modifier
      in Typescript.
    */
  }

  /**
   * Logs the message if `condition` is `false`.
   *
   * The log entry is recorded as {@link Level.error}.
   *
   * @param condition - A boolean value or statement that determines if the message is logged or not.
   * @param message - The text message to be logged.
   */
  public assert(condition: boolean | undefined, message: string): void;
  /**
   * Logs the message if `condition` is `false`.
   *
   * The log entry is recorded as {@link Level.error}.
   *
   * @param condition - A boolean value or statement that determines if the message is logged or not.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public assert(condition: boolean | undefined, error: Error): void;
  /**
   * Logs the message if `condition` is `false`.
   *
   * The log entry is recorded as {@link Level.error}.
   *
   * @param condition - A boolean value or statement that determines if the message is logged or not.
   * @param message - The text message to be logged.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public assert(condition: boolean | undefined, message: string, error: Error): void;
  /**
   * Logs the message if `condition` is `false`.
   *
   * The log entry is recorded as {@link Level.error}.
   *
   * @param condition - A boolean value or statement that determines if the message is logged or not.
   * @param data - An `object` to be logged.
   */
  public assert(condition: boolean | undefined, message: string, data: object): void;
  public assert(condition: boolean | undefined, messageOrError: string | Error, errorOrData?: Error | object): void {
    if (condition !== true) {
      this.dispatchLoggingEvent(Level.error, messageOrError, errorOrData);
    }
  }

  /**
   * Logs the message as {@link Level.debug}.
   *
   * @param message - The text message to be logged.
   */
  public debug(message: string): void;
  /**
   * Logs the message as {@link Level.debug}.
   *
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public debug(error: Error): void;
  /**
   * Logs the message as {@link Level.debug}.
   *
   * @param message - The text message to be logged.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public debug(message: string, error: Error): void;
  /**
   * Logs the message as {@link Level.debug}.
   *
   * @param message - The text message to be logged.
   * @param data - An `object` to be logged.
   */
  public debug(message: string, data: object): void;
  public debug(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.debug, messageOrError, errorOrData);
  }

  /**
   * Logs the message as {@link Level.info}.
   *
   * @param message - The text message to be logged.
   */
  public info(message: string): void;
  /**
   * Logs the message as {@link Level.info}.
   *
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public info(error: Error): void;
  /**
   * Logs the message as {@link Level.info}.
   *
   * @param message - The text message to be logged.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public info(message: string, error: Error): void;
  /**
   * Logs the message as {@link Level.info}.
   *
   * @param message - The text message to be logged.
   * @param data - An `object` to be logged.
   */
  public info(message: string, data: object): void;
  public info(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.info, messageOrError, errorOrData);
  }

  /**
   * Logs the message as {@link Level.warn}.
   *
   * @param message - The text message to be logged.
   */
  public warn(message: string): void;
  /**
   * Logs the message as {@link Level.warn}.
   *
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public warn(error: Error): void;
  /**
   * Logs the message as {@link Level.warn}.
   *
   * @param message - The text message to be logged.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public warn(message: string, error: Error): void;
  /**
   * Logs the message as {@link Level.warn}.
   *
   * @param message - The text message to be logged.
   * @param data - An `object` to be logged.
   */
  public warn(message: string, data: object): void;
  public warn(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.warn, messageOrError, errorOrData);
  }

  /**
   * Logs the message as {@link Level.error}.
   *
   * @param message - The text message to be logged.
   */
  public error(message: string): void;
  /**
   * Logs the message as {@link Level.error}.
   *
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public error(error: Error): void;
  /**
   * Logs the message as {@link Level.error}.
   *
   * @param message - The text message to be logged.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public error(message: string, error: Error): void;
  /**
   * Logs the message as {@link Level.error}.
   *
   * @param message - The text message to be logged.
   * @param data - An `object` to be logged.
   */
  public error(message: string, data: object): void;
  public error(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.error, messageOrError, errorOrData);
  }

  /**
   * Logs the message as {@link Level.fatal}.
   *
   * @param message - The text message to be logged.
   */
  public fatal(message: string): void;
  /**
   * Logs the message as {@link Level.fatal}.
   *
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public fatal(error: Error): void;
  /**
   * Logs the message as {@link Level.fatal}.
   *
   * @param message - The text message to be logged.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   */
  public fatal(message: string, error: Error): void;
  /**
   * Logs the message as {@link Level.fatal}.
   *
   * @param message - The text message to be logged.
   * @param data - An `object` to be logged.
   */
  public fatal(message: string, data: object): void;
  public fatal(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.fatal, messageOrError, errorOrData);
  }

  /**
   * Logs the message as the specified level.
   *
   * @param levelName - The name of the level.
   * @param message - The text message to be logged.
   *
   * If no {@link Level} has been defined for the specified `levelName`, the message will be ignored.
   */
  public log(levelName: string, message: string): void;
  /**
   * Logs the message as the specified level.
   *
   * @param levelName - The name of the level.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   *
   * If no {@link Level} has been defined for the specified `levelName`, the message will be ignored.
   */
  public log(levelName: string, error: Error): void;
  /**
   * Logs the message as the specified level.
   *
   * @param levelName - The name of the level.
   * @param message - The text message to be logged.
   * @param error - An [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object to be logged.
   *
   * If no {@link Level} has been defined for the specified `levelName`, the message will be ignored.
   */
  public log(levelName: string, message: string, error: Error): void;
  /**
   * Logs the message as the specified level.
   *
   * @param levelName - The name of the level.
   * @param message - The text message to be logged.
   * @param data - An `object` to be logged.
   *
   * If no {@link Level} has been defined for the specified `levelName`, the message will be ignored.
   */
  public log(levelName: string, message: string, data: object): void;
  public log(levelName: string, messageOrError: string | Error, errorOrData?: Error | object): void {
    const level: Level | undefined = Level.getLevel(levelName);
    if (level) {
      this.dispatchLoggingEvent(level, messageOrError, errorOrData);
    }
  }

  private dispatchLoggingEvent(level: Level, messageOrError: string | Error, errorOrData?: Error | object): void {
    let message: string;
    let error: Error | undefined;

    if (messageOrError instanceof Error) {
      message = '';      /* Use empty string, otherwise 'null' or 'undefined' will be output */
      error = messageOrError;
    } else {
      message = messageOrError;

      if (errorOrData instanceof Error) {
        error = errorOrData;
      } else {
        if (errorOrData !== undefined) {
          message += '\n' + JSON.stringify(errorOrData, undefined, JSON_INDENT_IN_SPACES);
        }

        error = undefined;
      }
    }

    const loggingEvent: LoggingEvent = new LoggingEvent(level,
                                                        this.name,
                                                        message,
                                                        error
                                                       );
    this._logService.dispatch(loggingEvent);
  }
}
