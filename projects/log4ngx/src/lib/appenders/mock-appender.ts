import { Injectable, InjectionToken } from '@angular/core';

import { Appender } from './appender';
import { LoggingEvent } from '../logging-event';

export const MOCK_APPENDER_TOKEN: InjectionToken<Appender> = new InjectionToken<Appender>('MockAppender');

/**
 * Mock appender class for testing the base Appender class.
 */
@Injectable()
export class MockAppender extends Appender {
  public static lastOutput: string = '';

  protected appendEvent(loggingEvent: LoggingEvent): void {
    const message: string = this.renderLoggingEvent(loggingEvent);
    MockAppender.lastOutput = message;
  }

  /**
   * This override just changes the method's access modifier so it can be called by the tests.
   *
   * @param loggingEvent The event information to be logged.
   * @returns The event information formatted as a string according to the `Appender.logFormat`.
   */
  public override renderLoggingEvent(loggingEvent: LoggingEvent): string {
    return super.renderLoggingEvent(loggingEvent);
  }
}
