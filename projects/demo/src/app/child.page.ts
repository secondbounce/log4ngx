import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logger, LogService } from 'log4ngx';

@Component({
  selector: 'app-child',
  templateUrl: './child.page.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    RouterLink
  ]
})
export class ChildPage implements OnInit, AfterViewInit {
  private readonly _log: Logger;

  constructor(logService: LogService) {
    this._log = logService.getLogger(this);
  }

  public ngOnInit(): void {
    this._log.info('OnInit lifecycle event triggered in the child page');
  }

  public ngAfterViewInit(): void {
    this._log.warn('AfterViewInit lifecycle event triggered in the child page(not really a warning but just shows the different levels :-))');
  }
}
