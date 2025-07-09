import { InjectionToken } from '@angular/core';

import { Appender } from './appender';

/** Interface defining the basic configuration for all {@link Appender} classes. */
export interface AppenderConfig {
  /** The name of the appender configuration.  This value is referenced in {@link LoggerConfig.appenderNames}. */
  name: string;
  /** The [InjectionToken](https://angular.dev/api/core/InjectionToken) provided for the required {@link Appender}. */
  providerToken: InjectionToken<Appender>;
  /**
   * The string format for each log entry.
   *
   * The format string may include both string literals and {@link AppenderPlaceholders} which will
   * be replaced with the corresponding value.
   */
  logFormat: string;
  /**
   * The string format for [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)s
   * included with a log entry.
   *
   * The format string may include both string literals and {@link AppenderPlaceholders} which will
   * be replaced with the corresponding value.
   */
  errorFormat?: string;
}
