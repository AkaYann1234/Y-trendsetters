import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellArticlePage } from './sell-article.page';

const routes: Routes = [
  {
    path: '',
    component: SellArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellArticlePageRoutingModule {}
