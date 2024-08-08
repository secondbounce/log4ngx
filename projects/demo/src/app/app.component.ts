import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Logger, LogService } from 'log4ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    RouterOutlet
  ]
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
