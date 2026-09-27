import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetirerFondsPage } from './retirer-fonds.page';

const routes: Routes = [
  {
    path: '',
    component: RetirerFondsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetirerFondsPageRoutingModule {}
