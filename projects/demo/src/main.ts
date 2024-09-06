import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
    // eslint-disable-next-line unicorn/prefer-top-level-await, no-console -- it's a pretty fatal error
    .catch(error => console.error('LOG4NGX demo:', error));
