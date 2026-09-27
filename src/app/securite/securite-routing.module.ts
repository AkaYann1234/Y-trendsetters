import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecuritePage } from './securite.page';

const routes: Routes = [
  {
    path: '',
    component: SecuritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecuritePageRoutingModule {}
