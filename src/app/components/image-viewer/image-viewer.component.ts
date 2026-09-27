import { Component, Input } from '@angular/core';
import { ModalController, IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ImageViewerComponent {
  @Input() imageSrc: string = '';

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  fermer() {
    this.modalCtrl.dismiss();
  }

  async partagerImage() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Regarde ce produit !',
          text: 'J\'ai trouvé cet article sur Y-TrendSetters',
          url: this.imageSrc // Partage le lien de l'image
        });
      } catch (error) {
        console.log('Erreur de partage', error);
      }
    } else {
      // Cas où le navigateur ne supporte pas le partage natif (ex: vieux PC)
      const toast = await this.toastCtrl.create({
        message: 'Le partage n\'est pas supporté sur ce navigateur.',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
    }
  }
}