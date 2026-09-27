import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PorteFeuillePageRoutingModule } from './porte-feuille-routing.module';

import { PorteFeuillePage } from './porte-feuille.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PorteFeuillePageRoutingModule
  ]
})
export class PorteFeuillePageModule {}
