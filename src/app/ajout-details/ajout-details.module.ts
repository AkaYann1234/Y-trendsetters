import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutDetailsPageRoutingModule } from './ajout-details-routing.module';

import { AjoutDetailsPage } from './ajout-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutDetailsPageRoutingModule,
  ]
  
})
export class AjoutDetailsPageModule {}
