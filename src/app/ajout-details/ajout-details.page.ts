import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { Product } from '../models/interface-models';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-ajout-details',
  templateUrl: './ajout-details.page.html',
  styleUrls: ['./ajout-details.page.scss'],
  standalone: true, // Très important
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AjoutDetailsPage implements OnInit {
  nomArticle: string = '';
  prixArticle: number = 0;
  noteArticle: number = 0;
  photos: string[] = [];
  articleId: string = '';
  descriptionArticle: string = '';
  detailsArticle: string = '';
  article!: Product;
  constructor(
    private dbService: DatabaseService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.articleToEdit) {
      const a = state.articleToEdit;
      this.articleId = a.id;
      this.nomArticle = a.name;
      this.descriptionArticle = a.description;
      this.detailsArticle = a.details;
      this.prixArticle = a.price;
      this.noteArticle = a.averageStar || 0;
      this.photos = a.picture ? [...a.picture] : [];
    }
  }

  async chargerPhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });
    if (image.webPath) {
      this.photos.push(image.webPath);
    }
  }

  async enregistrerModifs() {
    const articleMisAJour: Product = {
      id: this.articleId,
      name: this.nomArticle,
      price: this.prixArticle,
      picture: this.photos,
      description: this.descriptionArticle,
      category: 'Divers',
      state: 'Occasion',
      availability: { isAvailable: true, type: 'In Stock' },
      createdAt: new Date(),
      city: 'Ma Ville',
      averageStar: this.noteArticle,
      numberOfReviews: 0,
      details: this.detailsArticle,
    };
    
    console.log("Article mis à jour :", articleMisAJour);

    await this.dbService.updateProduct(articleMisAJour);
    
    const toast = await this.toastCtrl.create({
      message: 'Modifications enregistrées !',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
    this.navCtrl.navigateBack('/home');
  }
}