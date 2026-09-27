import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutDetailsPage } from './ajout-details.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutDetailsPageRoutingModule {}
