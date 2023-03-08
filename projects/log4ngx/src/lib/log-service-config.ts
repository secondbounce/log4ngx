import { InjectionToken } from '@angular/core';

import { AppenderConfig } from './appenders';
import { LoggerConfig } from './logger-config';

export const LOG_SERVICE_CONFIG_TOKEN: InjectionToken<LogServiceConfig> = new InjectionToken<LogServiceConfig>('LogServiceConfig');

export interface LogServiceConfig {
  loggers: LoggerConfig[];
  appenders: AppenderConfig[];
}
