import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellArticlePageRoutingModule } from './sell-article-routing.module';

import { SellArticlePage } from './sell-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellArticlePageRoutingModule,
    SellArticlePage
  ],
  declarations: []
})
export class SellArticlePageModule {}
