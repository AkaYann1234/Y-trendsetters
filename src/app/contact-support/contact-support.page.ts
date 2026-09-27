import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, IonicModule } from '@ionic/angular';
import { IonHeader, IonButton, IonTextarea } from "@ionic/angular/standalone";

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.page.html',
  styleUrls: ['./contact-support.page.scss'],
  imports: [IonicModule],
})
export class ContactSupportPage {

  // Variables pour lier au formulaire (optionnel si tu utilises ngModel)
  sujet: string = '';
  message: string = '';

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async envoyerMessage() {
    // 1. Création du chargement (Loading)
    const loading = await this.loadingCtrl.create({
      message: 'Envoi en cours...',
      spinner: 'crescent',
      duration: 2000 // On simule un envoi de 2 secondes
    });

    await loading.present();

    // 2. Une fois le chargement terminé
    loading.onDidDismiss().then(async () => {
      
      // 3. Affichage du message de succès
      const toast = await this.toastCtrl.create({
        message: 'Votre message a bien été envoyé au support. Vous recevrez une réponse par email sous 24h.',
        duration: 3500,
        color: 'success',
        position: 'bottom',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await toast.present();

      // 4. Retour automatique à la page d'Assistance
      this.navCtrl.navigateBack('/assistance');
    });
  }
}