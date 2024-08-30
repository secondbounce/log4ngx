import { InjectionToken } from '@angular/core';

import { AppenderConfig } from './appenders';
import { LoggerConfig } from './logger-config';

/** The [InjectionToken](https://angular.dev/api/core/InjectionToken) to be used when referencing the {@link LogServiceConfig} for DI. */
export const LOG_SERVICE_CONFIG_TOKEN: InjectionToken<LogServiceConfig> = new InjectionToken<LogServiceConfig>('LogServiceConfig');

export interface LogServiceConfig {
  loggers: LoggerConfig[];
  appenders: AppenderConfig[];
}
