import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
                        // eslint-disable-next-line unicorn/prefer-top-level-await, no-console -- it's a pretty fatal error
                        .catch(error => console.error(error));
