import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, NavParams } from '@ionic/angular';
import { Product } from '../models/interface-models';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule , CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsPage implements OnInit {
  productDetails : any;

  constructor(public navCtrl: NavController, private route : ActivatedRoute) {}

  ngOnInit() {
    const state = history.state;

    if(state && state.articleData){
      this.productDetails = state.articleData;
      console.log('Données reçues:', this.productDetails);
    }else{
      console.error('ERREUR')
    }
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad DetailsPage');
  }
  // goBack() : void{
  //    this.navCtrl.pop();
  // }

}
