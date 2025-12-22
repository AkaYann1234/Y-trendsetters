import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { Product } from '../models/interface-models';




@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  Articles: Product[] = [];
  constructor(public navCtrl: NavController,private readonly router: Router,
    public AlertCtrl: AlertController,public actionCtrl: ActionSheetController,
    private readonly dbService: DatabaseService) {
  }

  async ngOnInit() {
    this.Articles = await this.dbService.getProducts();
    if (this.Articles.length == 0) {
      // Add sample data
      const sampleProducts: Product[] = [
        
        {
          id: '1',
          name: 'Téléphone',
          description: 'Iphone 17',
          price: 411,
          details: 'téléphone très résistant à la pointe de la technologie vous permettant dêtre connecté à internet tout en étant à la mode  grâce à son design innovant',
          category: 'Electronics',
          state: 'New',
          createdAt: new Date(),
          availability: { isAvailable: true, type: 'In Stock' },
          city: 'Lyon',
          averageStar: 4,
          numberOfReviews: 5,
          picture: [
            'assets/icon/imgs/PORTABLE/Iphone17.jpg',
            'assets/icon/imgs/PORTABLE/portable.jpg',
            'assets/icon/imgs/PORTABLE/portable1.jpg',
            'assets/icon/imgs/PORTABLE/portable2.jpg'
          ]
        },
        {
          id: '2',
          name: 'PC',
          description: 'macbook pro13',
          price: 1398,
          details: 'Idéal pour les étudiants et les professionnels, il séduit par son design élégant, son excellente autonomie et ses améliorations notables comme la Touch Bar et des haut-parleurs de meilleure qualité, aussi bien pour un usage professionnel que personnel.',
          category: 'Electronics',
          state: 'New',
          createdAt: new Date(),
          availability: { isAvailable: true, type: 'In Stock' },
          city: 'Toulouse',
          averageStar: 4.2,
          numberOfReviews: 8,
          picture: [
            'assets/icon/imgs/ORDINATEUR/MacBookPro13.jpg',
            'assets/icon/imgs/ORDINATEUR/PC.jpg',
            'assets/icon/imgs/ORDINATEUR/PC1.jpg',
            'assets/icon/imgs/ORDINATEUR/PC2.jpg'
          ]
        },
        {
          id: '3',
          name: 'souris',
          description: 'Souris Gamer',
          price: 13,
          details: 'Grâce à sa précision, sa rapidité et son ergonomie, elle améliore le confort et la réactivité, quel que soit votre style de jeu, pour des performances optimales et plus de victoires.',
          category: 'Electronics',
          state: 'New',
          createdAt: new Date(),
          availability: { isAvailable: true, type: 'In Stock' },
          city: 'Paris',
          averageStar: 4.5,
          numberOfReviews: 10,
          picture: [
            'assets/icon/imgs/SOURIS/SourisGamer.jpg',
            'assets/icon/imgs/SOURIS/souris.jpg',
            'assets/icon/imgs/SOURIS/souris1.jpg',
            'assets/icon/imgs/SOURIS/souris2.jpg'
          ]
        },
        {
          id: '4',
          name: 'wifi',
          description: 'routeur wifi',
          price: 81,
          details: 'Compact et élégant, il offre une connexion rapide et sécurisée où que vous soyez. Grâce à sa batterie longue durée, son signal puissant et la connexion simultanée de plusieurs appareils, il est idéal pour travailler, voyager, streamer et rester connecté sans interruption. Facile à configurer et à utiliser.',
          category: 'Electronics',
          state: 'New',
          createdAt: new Date(),
          availability: { isAvailable: true, type: 'In Stock' },
          city: 'Marseille',
          averageStar: 3.5,
          numberOfReviews: 3,
          picture: [
            'assets/icon/imgs/WIFI/routeurWIFI.jpg',
            'assets/icon/imgs/WIFI/wifi.jpg',
            'assets/icon/imgs/WIFI/wifi1.jpg',
            'assets/icon/imgs/WIFI/wifi2.jpg'
          ]
        }
        
      ];
      for (const prod of sampleProducts) {
        await this.dbService.addProduct(prod);
      }
      this.Articles = await this.dbService.getProducts();
      console.log('Articles chargés au début:', this.Articles);
      if (this.Articles.length === 0) {
    for (const prod of sampleProducts) {
      await this.dbService.addProduct(prod);
    }
    this.Articles = await this.dbService.getProducts();
    console.log('Articles après ajout des exemples:', this.Articles);
  }
    }
  }

  showDetails(article: Product) {
    this.router.navigate(['/details'], { state: { articleData: article } });
  }
  vendreArticle() : void{
    this.router.navigate(['/sell-article']);
  }
}
