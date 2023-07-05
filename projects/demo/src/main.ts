import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
                        // eslint-disable-next-line no-console -- it's a pretty fatal error
                        .catch(err => console.error(err));
