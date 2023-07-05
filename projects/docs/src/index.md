---
layout: layout.njk
title: Getting Started
---

## Installing

``` sh
npm install log4ngx --save
```

#### Load the module for your app:

``` typescript
import { ConsoleAppender, CONSOLE_APPENDER_TOKEN, LOG_SERVICE_CONFIG_TOKEN, Log4ngxModule } from 'log4ngx';


@NgModule({
  ...
  imports: [
    ...
    Log4ngxModule
  ],
  providers: [
    { provide: CONSOLE_APPENDER_TOKEN, useClass: ConsoleAppender },
    { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: environment.logging }
  ]
})
```
