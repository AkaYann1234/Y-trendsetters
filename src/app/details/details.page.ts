import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule]
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
  goBack() : void{
     this.navCtrl.pop();
  }

}
