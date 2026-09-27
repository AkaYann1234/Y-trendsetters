import { Component, OnInit } from '@angular/core';
import { NavController, IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.page.html',
  styleUrls: ['./messagerie.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MessageriePage implements OnInit {
  
  notifications: any[] = [];
  estConnecte: boolean = false;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.verifierConnexion();
    this.chargerActivites();
    this.checkStatus();
  }

  ionViewWillEnter() {
    this.verifierConnexion();
    this.chargerActivites();
    this.checkStatus();
  }

  checkStatus() {
    // Vérifie si l'utilisateur est connecté
    const session = localStorage.getItem('session_utilisateur');
    this.estConnecte = session !== null;
    
    if (this.estConnecte) {
      this.chargerActivites();
    }
  }

  verifierConnexion() {
   // On vérifie si un utilisateur est stocké dans le localStorage
    const user = localStorage.getItem('user_logged_in'); 
  
  }
  marquerCommeLu(notif: any) {
    notif.lu = true;
    // On récupère la liste des SMS déjà lus
  let lus = JSON.parse(localStorage.getItem('messages_lus') || '[]');
  
  // On ajoute l'SMS s'il n'y est pas déjà
  if (!lus.includes(notif.id)) {
    lus.push(notif.id);
    localStorage.setItem('messages_lus', JSON.stringify(lus));
    }
  }

  supprimerNotif(index: number) {
    this.notifications.splice(index, 1);
  }

  goHome() {
    this.navCtrl.navigateRoot('/home');
  }

  chargerActivites() {
  // Liste des notifications et messages
  const messages = [
    {
      id: 1,
      type: 'achat', // dépôt, retrait, vente, message
      titre: 'Achat confirmé',
      description: 'Vous avez acheté "iPhone 13" pour 500€.',
      date: '10:45',
      lu: false,
      icon: 'basket-outline',
      color: 'success'
    },
    {
      id: 2,
      type: 'depot',
      titre: 'Dépôt réussi',
      description: 'Votre compte a été crédité de 100€ via Stripe.',
      date: 'Hier',
      lu: true,
      icon: 'card-outline',
      color: 'primary'
    }
  ];

  // On récupère les IDs lus dans le localStorage
    const lus = JSON.parse(localStorage.getItem('messages_lus') || '[]');

    // On définit l'état "lu" en fonction de la mémoire
    this.notifications = messages.map(n => ({
      ...n,
      lu: lus.includes(n.id)
    }));

}

  async verifierAccesMessagerie(event: any) {
    // Vérification de la connexion
    const isLogged = localStorage.getItem('user_logged_in') === 'true';

    if (!isLogged) {
      // On empêche la navigation vers l'onglet
      event.preventDefault();
      event.stopImmediatePropagation();

      // On affiche le message d'interdiction que vous avez demandé
      const toast = await this.toastCtrl.create({
        message: 'Veuillez vous connecter pour avoir accès à cette partie',
        duration: 3000,
        color: 'warning',
        position: 'bottom',
        buttons: [{
          text: 'OK',
          role: 'cancel'
        }]
      });
      await toast.present();
    } else {
      // Si connecté, on autorise l'accès à la messagerie
      this.navCtrl.navigateForward('/messagerie');
    }
  }

  allerVersConnexion() {
    this.navCtrl.navigateForward('/login');
  }
}
