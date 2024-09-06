/* eslint-disable no-console -- duh! */
import { Injectable, InjectionToken } from '@angular/core';

import { Appender } from './appender';
import { ConsoleAppenderConfig } from './console-appender-config';
import { Level } from '../level';
import { LoggingEvent } from '../logging-event';

/** The [InjectionToken](https://angular.dev/api/core/InjectionToken) to be used when referencing the {@link ConsoleAppender} for DI. */
export const CONSOLE_APPENDER_TOKEN: InjectionToken<Appender> = new InjectionToken<Appender>('ConsoleAppender');

@Injectable()
export class ConsoleAppender extends Appender {
  public override initialize(config: ConsoleAppenderConfig): void {
    super.initialize(config);
  }

  protected appendEvent(loggingEvent: LoggingEvent): void {
    const message: string = this.renderLoggingEvent(loggingEvent);
    const loggingLevel: number = loggingEvent.level.value;

    switch (true) {
      case loggingLevel >= Level.error.value:
        console.error(message);
        break;

      case loggingLevel >= Level.warn.value:
        console.warn(message);
        break;

      case loggingLevel >= Level.info.value:
        console.info(message);
        break;

      case loggingLevel >= Level.debug.value:
        console.debug(message);
        break;

      default:
        /* Shouldn't happen, but just in case... */
        console.trace(message);
        break;
    }
  }
}
