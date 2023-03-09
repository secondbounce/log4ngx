import { Component, OnInit } from '@angular/core';
import { Logger, LogService } from 'log4ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public title: string = 'Log4ngx Demo';
  private readonly _log: Logger;

  constructor(logService: LogService) {
    this._log = logService.getLogger(this);
  }

  public ngOnInit(): void {
    this._log.info('OnInit lifecycle event triggered');
  }
}
