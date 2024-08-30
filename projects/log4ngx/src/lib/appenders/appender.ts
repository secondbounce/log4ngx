import { AppenderConfig } from './appender-config';
import { LoggingEvent } from '../logging-event';

/**
 * Placeholder constants for use in the {@link AppenderConfig.logFormat} and/or
 * {@link AppenderConfig.errorFormat} properties.
 */
export /*not const*/ enum AppenderPlaceholders {
  /** The {@link Level.displayName} property. */
  Level = '{level}',
  /** The {@link Logger.name} property. */
  Logger = '{logger}',
  /** The log message. */
  Message = '{message}',
  /** The log timestamp as a number. */
  Timestamp = '{timestamp}',
  /** The log timestamp converted to the default date format, e.g. 'Mon Aug 07 2017'. */
  Date = '{date}',
  /** The log timestamp converted to ISO format, e.g. '2017-08-07T14:53:34.329Z'. */
  IsoDate = '{date-iso}',
  /** The log timestamp converted to locale-specific date format, e.g. '07/08/2017'. */
  ShortDate = '{date-short}',
  /** The log timestamp converted to locale-specific date/time format, e.g. '07/08/2017, 15:53:34'. */
  Datetime = '{datetime}',
  /** The log timestamp converted to locale-specific time format, e.g. '15:53:34'. */
  Time = '{time}',
  /** The log timestamp converted to UTC format, e.g. 'Mon, 07 Aug 2017 14:53:34 GMT'. */
  UtcDate = '{date-utc}',
  /** The logged error (if any), formatted according to {@link AppenderConfig.errorFormat}. */
  Error = '{error}',
  /**
   * The logged Error's `name` property.
   *
   * Note that this placeholder is only valid within {@link AppenderConfig.errorFormat}.
  */
  ErrorName = '{error-name}',
  /**
   * The logged Error's `message` property.
   *
   * Note that this placeholder is only valid within {@link AppenderConfig.errorFormat}.
  */
  ErrorMessage = '{error-message}',
  /**
   * The logged Error's `stack` property.
   *
   * Note that this placeholder is only valid within {@link AppenderConfig.errorFormat}.
  */
  ErrorStack = '{error-stack}',
  /** Carriage return/line feed characters, i.e. '\r\n'. */
  Crlf = '{crlf}',
  /** Linefeed character, i.e. '\n'. */
  Lf = '{lf}'
}

export abstract class Appender {
  private _name: string = '';
  private _logFormat: string = '';
  private _errorFormat: string = '';

  protected abstract appendEvent(loggingEvent: LoggingEvent): void;

  public initialize(config: AppenderConfig): void {
    this._name = config.name;
    this._logFormat = config.logFormat;
    this._errorFormat = config.errorFormat || (AppenderPlaceholders.Crlf
                                             + AppenderPlaceholders.ErrorName + ': ' + AppenderPlaceholders.ErrorMessage + AppenderPlaceholders.Crlf
                                             + AppenderPlaceholders.ErrorStack);
  }

  public get name(): string {
    return this._name;
  }

  public get logFormat(): string {
    return this._logFormat;
  }

  public get errorFormat(): string {
    return this._errorFormat;
  }

  public append(loggingEvent: LoggingEvent): void {
    this.appendEvent(loggingEvent);
  }

  protected renderLoggingEvent(loggingEvent: LoggingEvent): string {
    let logMessage: string = this._logFormat;
    logMessage = logMessage.split(AppenderPlaceholders.Level).join(loggingEvent.level.displayName);
    logMessage = logMessage.split(AppenderPlaceholders.Logger).join(loggingEvent.loggerName);
    logMessage = logMessage.split(AppenderPlaceholders.Message).join(this.getSafeMessage(loggingEvent.message));
    logMessage = logMessage.split(AppenderPlaceholders.Timestamp).join(loggingEvent.timestamp.toString());

    const date: Date = new Date(loggingEvent.timestamp);
    logMessage = logMessage.split(AppenderPlaceholders.Date).join(date.toDateString());             // Mon Aug 07 2017
    logMessage = logMessage.split(AppenderPlaceholders.IsoDate).join(date.toISOString());           // 2017-08-07T14:53:34.329Z
    logMessage = logMessage.split(AppenderPlaceholders.ShortDate).join(date.toLocaleDateString());  // 07/08/2017
    logMessage = logMessage.split(AppenderPlaceholders.Datetime).join(date.toLocaleString());       // 07/08/2017, 15:53:34
    logMessage = logMessage.split(AppenderPlaceholders.Time).join(date.toLocaleTimeString());       // 15:53:34
    logMessage = logMessage.split(AppenderPlaceholders.UtcDate).join(date.toUTCString());           // Mon, 07 Aug 2017 14:53:34 GMT

    let errorMessage: string = '';
    if (loggingEvent.error instanceof Error) {
      errorMessage = this.renderError(loggingEvent.error);
    }

    logMessage = logMessage.split(AppenderPlaceholders.Error).join(errorMessage);

    logMessage = logMessage.split(AppenderPlaceholders.Crlf).join('\r\n');
    logMessage = logMessage.split(AppenderPlaceholders.Lf).join('\n');

    return logMessage;
  }

  protected renderError(error: Error): string {
    let logMessage: string = this._errorFormat;

    logMessage = logMessage.split(AppenderPlaceholders.ErrorName).join(error.name);
    logMessage = logMessage.split(AppenderPlaceholders.ErrorMessage).join(this.getSafeMessage(error.message));
    logMessage = logMessage.split(AppenderPlaceholders.ErrorStack).join(error.stack);

    logMessage = logMessage.split(AppenderPlaceholders.Crlf).join('\r\n');
    logMessage = logMessage.split(AppenderPlaceholders.Lf).join('\n');

    return logMessage;
  }

  private getSafeMessage(message: string): string {
    if (message === null) {
      message = '<null>';
    } else if (message === undefined) {
      message = '<undefined>';
    }

    return message;
  }
}
