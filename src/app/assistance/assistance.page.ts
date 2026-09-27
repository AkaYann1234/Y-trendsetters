import { Component } from '@angular/core';
import { NavController, ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AssistancePage {

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}


  contacterSupport() {
    this.navCtrl.navigateForward('/contact-support');
  }

  ouvrirAideCompte() {
    this.navCtrl.navigateForward('/aide-compte');
  }

  ouvrirAidePaiement() {
    this.navCtrl.navigateForward('/aide-paiement');
  }

  ouvrirAideCommandes() {
    this.navCtrl.navigateForward('/aide-commandes');
  }

  ouvrirAideSecurite() {
    this.navCtrl.navigateForward('/aide-securite');
  }
}