import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, NavParams, AlertController } from '@ionic/angular';
import { Product } from '../models/interface-models';
import { DatabaseService } from '../services/database.service';

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

  constructor(public navCtrl: NavController, private route : ActivatedRoute, private alertController: AlertController, private dbService: DatabaseService) {}

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
  async ajoutaupanier() {
  console.log('ajout du produit:', this.productDetails.name, 'Couleur:', this.selectedColor);

  // 1. Création de l'alerte de succès
  const alert = await this.alertController.create({
    header: 'Succès !',
    message: `Votre  produit "${this.productDetails.name}" (Couleur: ${this.selectedColor || 'Par défaut'}) a été ajouté avec succès. Le total à payer est de : ${this.dbService.getTotalPrice()} €.`,
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        handler: () => { console.log(' annulée'); }
      },
      {
        text: 'Oui, ajouter',
        handler: () => {
          // 2. Navigation vers la page de commande après avoir cliqué sur OK
          this.navCtrl.navigateForward('/ajout', {
            state: {
              ajoutData: {
                product: this.productDetails,
                color: this.selectedColor
              }
            }
          });
        }
      }
    ]
  });
  
  await this.dbService.addToCart(this.productDetails); // On l'enregistre dans la DB
  this.navCtrl.navigateForward('/cart'); // On va vers le panier
  // 3. Affichage de l'alerte
  await alert.present();
}

  async partager() {
    const alert = await this.alertController.create({
      header: 'Partager le produit',
      message: `Partager le produit "${this.productDetails.name}" avec vos amis !`,
      buttons: [
        {
        text: 'Non',
        role: 'cancel'
      },
      {
        text: 'Oui',
        handler: async () => {
          const shareAlert = await this.alertController.create({
            header: 'Partager le produit',
            message: `Le lien du produit "${this.productDetails.name}" a été copié pour le partage !`,
            buttons: ['OK']
          });
          await shareAlert.present();
        }
      }
      ]
    });
   
    await alert.present();
  }

}
