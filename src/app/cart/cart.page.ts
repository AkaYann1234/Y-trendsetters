import { Component,OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
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

  constructor(private navCtrl: NavController, private dbService: DatabaseService) {}

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
  proceedToCheckout() {
    this.navCtrl.navigateForward('/commande', {
      state: { commandeData: this.cartItems }
    });
    this.dbService.clearCart();
  }
}