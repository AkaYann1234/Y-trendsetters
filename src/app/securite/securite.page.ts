import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-securite',
  templateUrl: './securite.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SecuritePage implements OnInit {
  
  verrouillageBiometrique: boolean = false;
  doubleAuthentification: boolean = false;
  derniereConnexion: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Charger les préférences de sécurité sauvegardées
    this.verrouillageBiometrique = localStorage.getItem('bio_auth') === 'true';

    // 2. Lancer le calcul de la date de connexion au démarrage
    this.genererDateConnexion();
  }
  genererDateConnexion() {
    // Options pour formater la date en français (ex: 22 Mars 2àà5 à 14:30)
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };

    // ON RÉCUPÈRE LA DATE SAUVEGARDÉE LORS DU LOGIN
    const savedDate = localStorage.getItem('date_last_login');
    
    // Si savedDate existe, on l'utilise, sinon on prend la date actuelle par défaut
    const dateToFormat = savedDate ? new Date(savedDate) : new Date();
    
    // On formate et on stocke dans la variable de classe
    this.derniereConnexion = dateToFormat.toLocaleDateString('fr-FR', options).replace(':', 'h');
  }

  // Changer le mot de passe
  async changerMotDePasse() {
    const alert = await this.alertCtrl.create({
      header: 'Changer le mot de passe',
      inputs: [
        { name: 'oldPass', type: 'password', placeholder: 'Ancien mot de passe' },
        { name: 'newPass', type: 'password', placeholder: 'Nouveau mot de passe' },
        { name: 'confirmPass', type: 'password', placeholder: 'Confirmer le mot de passe' }
      ],
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        {
          text: 'Mettre à jour',
          handler: (data) => {
            if (data.newPass === data.confirmPass && data.newPass.length >= 6) {
              this.presentToast('Mot de passe mis à jour avec succès', 'success');
            } else {
              this.presentToast('Les mots de passe ne correspondent pas ou sont trop courts', 'danger');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  toggleBiometrie() {
    localStorage.setItem('bio_auth', this.verrouillageBiometrique.toString());
    const status = this.verrouillageBiometrique ? 'activé' : 'désactivé';
    this.presentToast(`Verrouillage biométrique ${status}`, 'primary');
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}