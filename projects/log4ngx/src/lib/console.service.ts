/* eslint-disable no-console -- duh! */
/* eslint-disable @typescript-eslint/no-explicit-any -- `any` is specified by the console methods so just keeping it consistent */
import { Injectable } from '@angular/core';

/**
 * Simple wrapper class around standard `console` class provided to support mocking for tests.
 */
@Injectable()
export class ConsoleService {
  /* We're only exposing those functions that are actually being used by the ConsoleAppender */

  // public assert(value: any, message?: string, ...optionalParams: any[]): void {
  //   console.assert(value, message, optionalParams);
  // }

  public debug(message?: string, ...optionalParams: any[]): void {
    if (optionalParams.length === 0) {
      console.debug(message);
    } else {
      console.debug(message, optionalParams);
    }
  }

  public error(message?: any, ...optionalParams: any[]): void {
    console.error(message, optionalParams);
    if (optionalParams.length === 0) {
      console.error(message);
    } else {
      console.error(message, optionalParams);
    }
  }

  public info(message?: any, ...optionalParams: any[]): void {
    if (optionalParams.length === 0) {
      console.info(message);
    } else {
      console.info(message, optionalParams);
    }
  }

  public log(message?: any, ...optionalParams: any[]): void {
    if (optionalParams.length === 0) {
      console.log(message);
    } else {
      console.log(message, optionalParams);
    }
  }

  // public time(label: string): void {
  //   console.time(label);
  // }

  // public timeEnd(label: string): void {
  //   console.timeEnd(label);
  // }

  public trace(message?: any, ...optionalParams: any[]): void {
    if (optionalParams.length === 0) {
      console.trace(message);
    } else {
      console.trace(message, optionalParams);
    }
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    if (optionalParams.length === 0) {
      console.warn(message);
    } else {
      console.warn(message, optionalParams);
    }
  }
}
