import { Component,OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CartPage {
  // Pour l'instant, on peut simuler ou récupérer des données
  cartItems: any[] = []; 
  totalSomme: any = 0;

  constructor(private navCtrl: NavController, private dbService: DatabaseService, private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  goHome() {
    this.navCtrl.navigateBack('/home');
  }

 async ngOnInit() {
  // On demande à la base de données les articles stockés
  this.cartItems = await this.dbService.getCartItems();
  this.totalSomme = this.dbService.getTotalPrice();
}
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
  async proceedToCheckout() {
    // 1. Message de confirmation initial
    const alert = await this.alertCtrl.create({
      header: 'Confirmer la commande',
      message: `Voulez-vous vraiment passer la commande pour un total de ${this.totalSomme} € ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Oui, commander',
          handler: () => {
            this.finaliserLaCommande();
          }
        }
      ]
    });

    await alert.present();
  }

  async finaliserLaCommande() {
    // 2. Affichage du message de confirmation avec le prix débité
    const toast = await this.toastCtrl.create({
      message: `Commande validée ! Un montant de ${this.totalSomme} € sera débité de votre portefeuille.`,
      duration: 3000,
      color: 'success',
      position: 'middle'
    });
    await toast.present();

    // 3. Vider le panier dans la base de données
    this.dbService.clearCart();

    // 4. Redirection vers le porte-feuille
    // On passe le montant débité dans le state pour l'afficher là-bas si besoin
    this.navCtrl.navigateForward('/porte-feuille', {
      state: { montantDebite: this.totalSomme }
    });
  }
  // Méthode pour supprimer un article du panier
  async removeFromCart(item: any) {
    // 1. Supprimer l'article via le service (assure-toi que dbService a cette méthode)
    await this.dbService.removeFromCart(item.id); 

    // 2. Rafraîchir la liste affichée
    this.cartItems = await this.dbService.getCartItems();

    // 3. Mettre à jour le total
    this.totalSomme = this.dbService.getTotalPrice();

    // 4. Notification
    const toast = await this.toastCtrl.create({
      message: `${item.name} retiré du panier`,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }
}