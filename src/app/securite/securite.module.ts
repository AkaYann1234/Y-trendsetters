import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecuritePageRoutingModule } from './securite-routing.module';

import { SecuritePage } from './securite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecuritePageRoutingModule
  ]
})
export class SecuritePageModule {}
