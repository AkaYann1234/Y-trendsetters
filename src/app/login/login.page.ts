import { Component, NgModule} from '@angular/core';
import { NavController, ToastController, IonicModule } from '@ionic/angular';
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

  constructor(
    private dbService: DatabaseService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  async onLogin() {
    const success = await this.dbService.login(this.email, this.mdp);

    if (success) {
      // Redirection vers l'accueil si succès
      this.navCtrl.navigateRoot('/home');
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Email ou mot de passe incorrect.',
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
    }
  }
}