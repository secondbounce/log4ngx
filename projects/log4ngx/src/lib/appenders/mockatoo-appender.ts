import { Injectable, InjectionToken } from '@angular/core';

import { Appender } from './appender';
import { LoggingEvent } from '../logging-event';

export const MOCKATOO_APPENDER_TOKEN: InjectionToken<Appender> = new InjectionToken<Appender>('MockatooAppender');

/**
 * Another mock appender class for testing the base Appender class.
 */
@Injectable()
export class MockatooAppender extends Appender {
  public static lastOutput: string = '';

  protected appendEvent(loggingEvent: LoggingEvent): void {
    const message: string = this.renderLoggingEvent(loggingEvent);
    MockatooAppender.lastOutput = message;
  }

  /** This override just changes the method's access modifier so it can be called by the tests. */
  public override renderLoggingEvent(loggingEvent: LoggingEvent): string {
    return super.renderLoggingEvent(loggingEvent);
  }
}
