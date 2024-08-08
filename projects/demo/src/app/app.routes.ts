import { Routes } from '@angular/router';

import { ChildPage } from './child.page';
import { HomePage } from './home.page';
import { LogPage } from './log.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'child', component: ChildPage },
  { path: 'log', component: LogPage }
];
