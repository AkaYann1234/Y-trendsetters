import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetirerFondsPageRoutingModule } from './retirer-fonds-routing.module';

import { RetirerFondsPage } from './retirer-fonds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetirerFondsPageRoutingModule
  ]
})
export class RetirerFondsPageModule {}
