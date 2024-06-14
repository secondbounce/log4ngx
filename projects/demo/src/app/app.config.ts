import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CONSOLE_APPENDER_TOKEN, ConsoleAppender, Log4ngxModule, LOG_SERVICE_CONFIG_TOKEN } from 'log4ngx';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(Log4ngxModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: CONSOLE_APPENDER_TOKEN, useClass: ConsoleAppender },
    { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: environment.logging }
  ]
};
