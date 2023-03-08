import { LogServiceConfig } from 'log4ngx';

export interface Environment {
  production: boolean;
  logging: LogServiceConfig;
}
