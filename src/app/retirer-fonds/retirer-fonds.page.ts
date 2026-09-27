import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StripeService } from '../services/stripe';

@Component({
  selector: 'app-retirer-fonds',
  templateUrl: './retirer-fonds.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RetirerFondsPage implements OnInit {
  montantARetirer: number = 0;
  soldeActuel: number = 0;
  cardNum: string = '';
  cardExp: string = '';
  cardCvv: string = '';
  cardHolderName: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private stripeService: StripeService
  ) { }

  ngOnInit() {
    const savedBalance = localStorage.getItem('user_balance');
    this.soldeActuel = savedBalance ? parseFloat(savedBalance) : 0;
  }

  // Calcul des frais : 1% du montant + 0.30€
  get frais(): number {
    if (this.montantARetirer <= 0) return 0;
    return (this.montantARetirer * 0.01) + 0.50;
  }

  get totalADeduire(): number {
    return this.montantARetirer + this.frais;
  }

  formatExpiry(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      this.cardExp = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
      this.cardExp = value;
    }
  }

  async validerRetrait() {
    if (this.montantARetirer <= 0 || !this.cardNum || !this.cardExp || !this.cardCvv) {
      this.presentToast('Montant ou informations de paiement invalides', 'warning');
      return;
    }

    if (this.totalADeduire > this.soldeActuel && this.cardNum && this.cardExp && this.cardCvv) {
      this.presentToast('Solde insuffisant (frais inclus)', 'danger');
      return;
    }
    if (this.cardNum.length < 16 || !this.cardCvv || !this.cardHolderName) {
      this.presentToast('Veuillez remplir toutes les informations bancaires.', 'danger');
      return;
    }

    // Mise à jour du solde
    const nouveauSolde = parseFloat((this.soldeActuel - this.totalADeduire).toFixed(2));
    localStorage.setItem('user_balance', nouveauSolde.toString());

    this.presentToast(`Retrait réussi. Frais appliqués : ${this.frais.toFixed(2)}€`, 'success');
    this.navCtrl.navigateBack('/porte-feuille');
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
  formatCardNumber() {
    let v = this.cardNum.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      this.cardNum = parts.join(' ');
    }
  }
}