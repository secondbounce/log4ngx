import { Inject, Injectable, Injector } from '@angular/core';

import { LOG_SERVICE_CONFIG_TOKEN, LogServiceConfig } from './log-service-config';
import { LogService } from './log.service';
import { LoggingEvent } from './logging-event';

@Injectable()
export class MockLogService extends LogService {
  public lastLoggingEvent: LoggingEvent | undefined;

  constructor(injector: Injector,
              @Inject(LOG_SERVICE_CONFIG_TOKEN) config: LogServiceConfig) {
    super(injector, config);
  }

  public override dispatch(loggingEvent: LoggingEvent): void {
    this.lastLoggingEvent = loggingEvent;
    super.dispatch(loggingEvent);
  }
}
