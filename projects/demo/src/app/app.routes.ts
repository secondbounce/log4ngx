import { Routes } from '@angular/router';

import { ChildPage } from './child.page';
import { HomePage } from './home.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'child', component: ChildPage }
];
