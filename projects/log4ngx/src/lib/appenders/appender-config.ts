import { InjectionToken } from '@angular/core';

import { Appender } from './appender';

export interface AppenderConfig {
  name: string;
  providerToken: InjectionToken<Appender>;
  logFormat: string;
  errorFormat?: string;
}
