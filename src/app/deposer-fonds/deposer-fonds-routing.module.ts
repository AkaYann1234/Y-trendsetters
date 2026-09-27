import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeposerFondsPage } from './deposer-fonds.page';

const routes: Routes = [
  {
    path: '',
    component: DeposerFondsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeposerFondsPageRoutingModule {}
