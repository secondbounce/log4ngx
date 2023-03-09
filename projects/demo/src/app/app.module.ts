import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CONSOLE_APPENDER_TOKEN, ConsoleAppender, Log4ngxModule, LOG_SERVICE_CONFIG_TOKEN } from 'log4ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildPage } from './child.page';
import { HomePage } from './home.page';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ChildPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Log4ngxModule
  ],
  providers: [
    { provide: CONSOLE_APPENDER_TOKEN, useClass: ConsoleAppender },
    { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: environment.logging }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
