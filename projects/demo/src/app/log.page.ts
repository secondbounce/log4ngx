import { DatePipe, KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOCALSTORAGE_APPENDER_TOKEN, LocalStorageAppender, Logger, LogService } from 'log4ngx';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrl: './log.page.scss',
  imports: [
    DatePipe,
    KeyValuePipe,
    RouterLink
  ]
})
export class LogPage implements OnInit {
  public logEntries: Map<Date, string[]> = new Map<Date, string[]>();
  private readonly _log: Logger;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-class-instance-assignment -- Confused since it's a constant
  private readonly _localStorageAppender: LocalStorageAppender = inject<LocalStorageAppender>(LOCALSTORAGE_APPENDER_TOKEN);

  constructor() {
    const logService: LogService = inject(LogService);

    this._log = logService.getLogger(this);
  }

  public ngOnInit(): void {
    const storage: Storage = window['localStorage'];
    const logKeys: string[] = this.getLogKeys(storage);
    const prefix: string = this._localStorageAppender.keyPrefix;

    this.logEntries = new Map<Date, string[]>();

    for (const key of logKeys) {
      const logEntries: string | null = storage.getItem(key);

      if (logEntries !== null) {
        const timestamp: number = Number.parseInt(key.slice(prefix.length));
        const date: Date = new Date(timestamp);
        const entries: string[] = logEntries.split(this._localStorageAppender.logEntryDelimiter);

        this.logEntries.set(date, entries);
      }
    }
  }

  private getLogKeys(localStorage: Storage): string[] {
    const keyPrefix: string = this._localStorageAppender.keyPrefix;
    const logKeys: string[] = [];

    for (let i: number = localStorage.length - 1; i >= 0; i--) {
      const key: string | null = localStorage.key(i);
      if (key?.startsWith(keyPrefix)) {
        logKeys.push(key);
      }
    }

    return logKeys;
  }
}
