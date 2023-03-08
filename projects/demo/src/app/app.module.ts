import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConsoleAppender, CONSOLE_APPENDER_TOKEN, ConsoleService, LogService, LOG_SERVICE_CONFIG_TOKEN } from 'log4ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ConsoleService,
    LogService,
    { provide: CONSOLE_APPENDER_TOKEN, useClass: ConsoleAppender },
    { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: environment.logging }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
