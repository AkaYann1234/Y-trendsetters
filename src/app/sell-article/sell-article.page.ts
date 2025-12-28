import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { Product } from '../models/interface-models';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-sell-article',
  templateUrl: './sell-article.page.html',
  styleUrls: ['./sell-article.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SellArticlePage implements OnInit {
  nomArticle: string = '';
  prixArticle: number = 0;
  descriptionArticle: string = "";
  photoPrise: string | undefined;
  isEditing: boolean | undefined;
  articleId: any='';
  

  constructor(private dbService: DatabaseService,
    private navCtrl: NavController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    const state = history.state;
    if (state && state.imagePrise) {
      const a = state.articleToEdit;
      this.isEditing = true;
      this.articleId = a.id;
      this.nomArticle = a.name;
      this.prixArticle = a.price;
      this.photoPrise = (a.picture && a.picture.length > 0) ? a.picture[0] : undefined;
    }else if (state && state.imagePrise) {
      this.photoPrise = state.imagePrise;
    }
  }
  // Fonction pour choisir une photo dans la galerie
  async choisirPhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Ouvre la galerie
      });

      if (image) {
        this.photoPrise = image.webPath;
      }
    } catch (error) {
      console.error('Erreur lors du choix de la photo', error);
    }
  }
  async publierAnnonce() {
    
    if (!this.nomArticle || this.prixArticle <= 0) {
      const toast = await this.toastCtrl.create({
        message: 'Veuillez remplir tous les champs',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    // Création de l'objet produit
    const nouvelArticle: Product = {
      id: this.isEditing ? this.articleId : Date.now().toString(), // Génère un ID unique
      name: this.nomArticle,
      price: this.prixArticle,
      picture: this.photoPrise ? [this.photoPrise] : [],
      description: 'Article mis en vente par l\'utilisateur',
      category: 'Divers',
      state: 'Occasion',
      availability: { isAvailable: true, type: 'In Stock' },
      createdAt: new Date(),
      city: 'Ma Ville',
      averageStar: 0,
      numberOfReviews: 0,
      details: ''
    };
    // Action selon le mode (Ajout ou Modification)
    if (this.isEditing) {
      await this.dbService.updateProduct(nouvelArticle);
    } else {
      await this.dbService.addProduct(nouvelArticle);
    }

    // Sauvegarde dans la base de données
    await this.dbService.addProduct(nouvelArticle);

    // Affichage du message de succès
    const successToast = await this.toastCtrl.create({
      message: 'Annonce publiée avec succès !',
      duration: 2000,
      color: 'success'
    });
    await successToast.present();

    // Retour à l'accueil
    this.navCtrl.navigateBack('/home');
  }
  async chargerPhoto() {
   try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Force l'ouverture de la GALERIE
      });

      if (image) {
        this.photoPrise = image.webPath; // Met à jour l'affichage avec la nouvelle photo
      }
    } catch (error) {
      console.error('Erreur lors du choix de la photo', error);
    }
  }
}
