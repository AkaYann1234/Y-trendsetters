import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-porte-feuille',
  templateUrl: './porte-feuille.page.html',
  styleUrls: ['./porte-feuille.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PorteFeuillePage implements OnInit, OnDestroy{
  isLoggedIn: boolean = false;
  solde: number = 0;
  private soldeSub!: Subscription;
  userEmail: string = '';
  historiqueAchats: any[] = [];

  constructor(private navCtrl: NavController,private dbService: DatabaseService) { }

  ngOnInit() {
    // Écoute dynamique de toute modification du solde
    this.soldeSub = this.dbService.solde$.subscribe(solde => {
      this.solde = solde;
    });
  }

  ngOnDestroy() {
    if (this.soldeSub) {
      this.soldeSub.unsubscribe();
    }
  }

  // Exemple de fonction pour recharger le portefeuille
  rechargerSolde(montant: number) {
    const nouveauSolde = this.solde + montant;
    this.dbService.updateSolde(nouveauSolde);
  }

  ionViewWillEnter() {
    this.checkLoginStatus();
    this.chargerDonnees();
  }
  // Vérifie la session et charge le solde ainsi que l'email
  chargerDonnees() {
    // 1. Charger le solde (user_balance doit être le même nom dans deposer/retirer)
    const savedBalance = localStorage.getItem('user_balance');
    this.solde = savedBalance ? parseFloat(parseFloat(savedBalance).toFixed(2)) : 0;

    // 2. Charger l'email
    const savedEmail = localStorage.getItem('user_email_paiement');
    if (savedEmail) {
      this.userEmail = savedEmail;
    }

    // 3. Simuler l'historique (Optionnel)
    this.historiqueAchats = [
      { id: 1, nom: 'Dernier achat', date: 'Aujourd\'hui', prix: 0, statut: 'Terminé' }
    ];
  }
  // On vérifie si une session existe
  checkLoginStatus() {
    const session = localStorage.getItem('session_utilisateur');
    this.isLoggedIn = session !== null;
  }

  // Redirection vers la page de connexion
  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
  enregistrerEmail() {
    if (this.userEmail.includes('@')) {
      localStorage.setItem('user_email_paiement', this.userEmail);
      alert('Email enregistré pour vos futurs paiements !');
    }
  }

  allerAuPanier() {
    this.navCtrl.navigateForward('/cart');
  }
  DeposerLesFonds() {
    this.navCtrl.navigateForward('/deposer-fonds');
  }
  RetirerLesFonds() {
    this.navCtrl.navigateForward('/retirer-fonds');
  }
}