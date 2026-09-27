import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeposerFondsPageRoutingModule } from './deposer-fonds-routing.module';

import { DeposerFondsPage } from './deposer-fonds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeposerFondsPageRoutingModule
  ]
})
export class DeposerFondsPageModule {}
