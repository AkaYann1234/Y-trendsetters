import { Component } from '@angular/core';
import { NavController, AlertController, AlertOptions,ActionSheetController, ActionSheetOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';




@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  Articles: any[] = [
  ];
  constructor(public navCtrl: NavController,private router: Router,
    public AlertCtrl: AlertController,public actionCtrl: ActionSheetController) {
    this.Articles = [];
  }
  
  
}
