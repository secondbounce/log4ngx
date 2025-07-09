import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CONSOLE_APPENDER_TOKEN, ConsoleAppender, LOCALSTORAGE_APPENDER_TOKEN, LocalStorageAppender, LOG_SERVICE_CONFIG_TOKEN } from 'log4ngx';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: CONSOLE_APPENDER_TOKEN, useClass: ConsoleAppender },
    { provide: LOCALSTORAGE_APPENDER_TOKEN, useClass: LocalStorageAppender },
    { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: environment.logging }
  ]
};
