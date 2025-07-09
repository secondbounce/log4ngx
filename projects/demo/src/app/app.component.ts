import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Logger, LogService } from 'log4ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent implements OnInit {
  public title: string = 'Log4ngx Demo';
  private readonly _log: Logger;

  constructor() {
    const logService: LogService = inject(LogService);

    this._log = logService.getLogger(this);
  }

  public ngOnInit(): void {
    this._log.info('OnInit lifecycle event triggered');
  }
}
