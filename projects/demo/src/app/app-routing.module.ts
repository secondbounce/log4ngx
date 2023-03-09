import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChildPage } from './child.page';
import { HomePage } from './home.page';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'child', component: ChildPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
