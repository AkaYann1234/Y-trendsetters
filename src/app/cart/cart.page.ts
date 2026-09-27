import { Component,OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../services/database.service';
import { Subscription } from 'rxjs';

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
  soldeActuel: any = 0;
  private soldeSub!: Subscription;

  constructor(private navCtrl: NavController, private dbService: DatabaseService, private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  goHome() {
    this.navCtrl.navigateBack('/home');
  }

 async ngOnInit() {
  // On demande à la base de données les articles stockés
  this.cartItems = await this.dbService.getCartItems();
  this.totalSomme = this.dbService.getTotalPrice();

  // Abonnement dynamique au solde en temps réel
    this.soldeSub = this.dbService.solde$.subscribe(solde => {
      this.soldeActuel = solde;
    });
}
ngOnDestroy() {
    // automatisation de l'abonnement pour éviter les fuites 
    if (this.soldeSub) {
      this.soldeSub.unsubscribe();
    }
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
    if (this.soldeActuel < this.totalSomme) {
    // 2. Affichage du message de confirmation avec le prix débité
   const toastErreur = await this.toastCtrl.create({
        message: `Solde insuffisant ! Votre solde actuel est de ${this.soldeActuel.toFixed(2)} €, mais le total est de ${this.totalSomme} €.`,
        duration: 3500,
        color: 'danger',
        position: 'middle'
      });
      await toastErreur.present();
    return; // Bloque la commande
    }

    // 2. Déduction dynamique du solde
    const succes = this.dbService.deductSolde(this.totalSomme);

    if (succes) {
      const toastSucces = await this.toastCtrl.create({
        message: `Commande validée ! Un montant de ${this.totalSomme} € a été débité.`,
        duration: 3000,
        color: 'success',
        position: 'middle'
      });
      await toastSucces.present();

      this.dbService.clearCart();

      this.navCtrl.navigateForward('/porte-feuille');
    }

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