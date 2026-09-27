import { Component, NgModule} from '@angular/core';
import { NavController, ToastController, IonicModule, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
})
export class LoginPage { 
  email: string = '';
  mdp: string = '';
  isPasswordVisible: boolean = false;

  constructor(
    private dbService: DatabaseService,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async toast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });

    await toast.present();
  }

  async onLogin() {
    // 1. Validation de l'Email
  if (!this.validateEmail(this.email)) {
    this.toast('Veuillez entrer une adresse email valide.', 'warning');
    return;
  }

  // 2. Validation de la longueur du mot de passe
  if (this.mdp.length < 6) {
    this.toast('Le mot de passe doit contenir au moins 6 caractères.', 'warning');
    return;
  }
  // 3. Affichage du Spinner de chargement
    const loading = await this.loadingCtrl.create({
      message: 'Vérification...',
      spinner: 'circles'
    });
    await loading.present();

    try {
    // Tentative de connexion
    const success = await this.dbService.login(this.email, this.mdp);

    await loading.dismiss();

    if (success) {
      localStorage.setItem('session_utilisateur', 'true');
      localStorage.setItem('date_last_login', new Date().toISOString());
      // Redirection vers l'accueil si succès
      this.navCtrl.navigateRoot('/home');
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Email ou mot de passe incorrect.',
        duration: 2,
        color: 'danger',
        position: 'bottom'
      });
      
      await toast.present();
    }
    } catch (error) {
      this.toast('Une erreur est survenue. Veuillez réessayer plus tard.', 'danger');
    }
  }

  togglePassword() {
  this.isPasswordVisible = !this.isPasswordVisible;
  }
}