import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, NavParams, AlertController } from '@ionic/angular';
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
  selectedColor: string = '';

  constructor(public navCtrl: NavController, private route : ActivatedRoute, private alertController: AlertController) {}

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
  async choisirCouleur() {
    const alert = await this.alertController.create({
      header: 'Choisir une couleur',
      inputs: [
        { name: 'radio1', type: 'radio', label: 'Noir', value: 'Noir', checked: true },
        { name: 'radio2', type: 'radio', label: 'Blanc', value: 'Blanc' },
        { name: 'radio3', type: 'radio', label: 'Bleu', value: 'Bleu'  },
        { name: 'radio4', type: 'radio', label: 'Rouge', value: 'Rouge' },
        { name: 'radio5', type: 'radio', label: 'Vert', value: 'Vert' }
      ],
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Ok',
          handler: (data) => {
            this.selectedColor = data;
            console.log('Couleur sélectionnée:', this.selectedColor);
          }
        }
      ]
    });

    await alert.present();
  }
  async commander() {
  console.log('Commande passée pour le produit:', this.productDetails.name, 'Couleur:', this.selectedColor);

  // 1. Création de l'alerte de succès
  const alert = await this.alertController.create({
    header: 'Succès !',
    message: `Votre commande pour le produit "${this.productDetails.name}" (Couleur: ${this.selectedColor || 'Par défaut'}) a été effectuée avec succès.`,
    buttons: [
      {
        text: 'OK',
        handler: () => {
          // 2. Navigation vers la page de commande après avoir cliqué sur OK
          this.navCtrl.navigateForward('/commande', {
            state: {
              commandeData: {
                product: this.productDetails,
                color: this.selectedColor
              }
            }
          });
        }
      }
    ]
  });

  // 3. Affichage de l'alerte
  await alert.present();
}
}
