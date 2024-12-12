import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logger, LogService } from 'log4ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    RouterLink
  ]
})
export class HomePage implements OnInit {
  private readonly _log: Logger;

  constructor(logService: LogService) {
    /* Let's use a custom name for this logger */
    this._log = logService.getLogger('<This is the HomePage>');
    this._log.debug('This is a debug message logged in the constructor');
  }

  public ngOnInit(): void {
    this._log.info('OnInit lifecycle event triggered');
    this._log.warn('This is an example of a message logged at `warn` level');
    this._log.error('Similarly, this is just an example of a message logged at `error` level');
    this._log.fatal('And finally, an example of a messsage logged at `fatal` level');
  }
}
