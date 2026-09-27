import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StripeService } from '../services/stripe';

@Component({
  selector: 'app-deposer-fonds',
  templateUrl: './deposer-fonds.page.html',
  styleUrls: ['./deposer-fonds.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DeposerFondsPage implements OnInit {
  montantADeposer: number = 0;
  montant: number = 0;
  cardNum: string = '';
  cardExp: string = '';
  cardCvv: string = '';
  

  constructor(
    private navCtrl: NavController, private toastCtrl: ToastController, private stripeService: StripeService
  ) { }

  ngOnInit() {}

  async validerDepot() {
    if (this.montant > 0 && this.cardNum && this.cardExp && this.cardCvv) {
      const loading = await this.toastCtrl.create({ message: 'Communication avec la banque...' });
      await loading.present();

      try {
        // 1. Demander à Stripe de valider la carte
        const stripe = await this.stripeService.getStripe();
        if (!stripe) throw new Error("Stripe non initialisé");

       const dates = this.cardExp.split('/'); // Sépare "12/26"
        const cardInfo = {
          number: this.cardNum.replace(/\s/g, ''), // Enlève les espaces
          expMonth: dates[0],
          expYear: '20' + dates[1], // "26" devient "2026"
          cvc: this.cardCvv
        };
        const token = await this.stripeService.createToken(cardInfo);
        console.log("Token reçu de Stripe:", token.id);
      // Simulation de traitement bancaire
      const current = parseFloat(localStorage.getItem('user_balance') || '0');
      const nouveauSolde = parseFloat((current + this.montant).toFixed(2));
      localStorage.setItem('user_balance', (current + this.montant).toString());
      
      await loading.dismiss();
      this.presentToast("Transfert réussi !", "success");
      this.navCtrl.navigateBack('/porte-feuille');
    } catch (error) {
        await loading.dismiss();
        this.presentToast("Erreur lors du paiement", "danger");
      }
    } else {
      this.presentToast("Veuillez remplir tous les champs", "WARNING🚨🚨");
    }
  }

 async presentToast(msg: string, color: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 2000, color: color });
    t.present();
  }
  formatExpiry(event: any) {
  let value = event.target.value;

  // Supprime tout ce qui n'est pas un chiffre
  value = value.replace(/\D/g, '');

  // Si on a plus de 2 chiffres, on insère le slash
  if (value.length > 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }

  // Limite à 5 caractères (MM/AA)
  this.cardExp = value.substring(0, 5);
 }
 ionViewWillEnter() {
    // On charge le solde au moment où on entre sur la page
    const savedBalance = localStorage.getItem('user_balance');
    this.montantADeposer = savedBalance ? parseFloat(savedBalance) : 0;
  }
  
}