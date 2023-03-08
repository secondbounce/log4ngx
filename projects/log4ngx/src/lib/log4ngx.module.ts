import { NgModule } from '@angular/core';

import { ConsoleService } from './console.service';
import { LogService } from './log.service';

@NgModule({
  providers: [
    ConsoleService,
    LogService
  ]
})
export class Log4ngxModule {}
