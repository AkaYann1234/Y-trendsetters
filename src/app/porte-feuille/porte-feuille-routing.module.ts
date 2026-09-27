import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PorteFeuillePage } from './porte-feuille.page';

const routes: Routes = [
  {
    path: '',
    component: PorteFeuillePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PorteFeuillePageRoutingModule {}
