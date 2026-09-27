import { Component, OnInit } from '@angular/core';
import { NavController, IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ParametresPage implements OnInit {
  darkMode: boolean = false;
  notifications: boolean = true;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {}

  ngOnInit() {
    // Récupérer les préférences sauvegardées
    this.darkMode = localStorage.getItem('dark_mode') === 'true';
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark', this.darkMode);
    localStorage.setItem('dark_mode', this.darkMode.toString());
  }

  allerAPropos() {
    this.navCtrl.navigateForward('/a-propos');
  }

  Securite() {
    this.navCtrl.navigateForward('/securite');
  }
}