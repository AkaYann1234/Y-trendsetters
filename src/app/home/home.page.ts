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
          picture: ['assets/icon/imgs/Iphone17.jpg']
        },
        {
          id: '2',
          name: 'PC',
          description: 'macbook pro13',
          price: 1398,
          details: 'Le MacBook Pro 13 pouces est un choix parfaite pour les étudiants et les professionnels qui recherchent un ordinateur portable performant et compact. Son design élégant et ses performances exceptionnelles en font un excellent choix pour une utilisation professionnelle ou domestique. Les utilisateurs apprécient également sa grande autonomie et ses améliorations par rapport aux modèles précédents, comme le TOUCH Bar et les haut-parleurs de meilleure qualité. ',
          category: 'Electronics',
          state: 'New',
          createdAt: new Date(),
          availability: { isAvailable: true, type: 'In Stock' },
          city: 'Toulouse',
          averageStar: 4.2,
          numberOfReviews: 8,
          picture: ['assets/icon/imgs/MacBookPro13.jpg']
        },
        {
          id: '3',
          name: 'souris',
          description: 'Souris Gamer',
          price: 13,
          details: 'Une bonne souris gamer, c’est bien plus qu’un simple périphérique : c’est l’extension naturelle de votre main dans l’univers du jeu. Avec un capteur ultra-précis, un temps de réponse fulgurant et une ergonomie pensée pour les longues sessions, elle transforme chaque clic en une action décisive.Que vous soyez adepte des FPS nerveux, des MMO stratégiques ou des MOBA intenses, la bonne souris peut faire toute la différence : plus de confort, plus de réactivité, et surtout… plus de victoires. ?',
          category: 'Electronics',
          state: 'New',
          createdAt: new Date(),
          availability: { isAvailable: true, type: 'In Stock' },
          city: 'Paris',
          averageStar: 4.5,
          numberOfReviews: 10,
          picture: ['assets/icon/imgs/SourisGamer.jpg']
        },
        {
          id: '4',
          name: 'wifi',
          description: 'routeur wifi',
          price: 81,
          details: 'Imaginez avoir votre propre bulle de connexion, partout où vous allez Ce routeur Wi-Fi portable, compact et élégant, transforme chaque lieu en hotspot privé ultra-rapide. Plus besoin de chercher un réseau public instable : vous profitez d’une connexion sécurisée, que ce soit dans un café, en voyage ou même en pleine nature.Avec sa batterie longue durée, son signal puissant et la possibilité de connecter plusieurs appareils en même temps, il devient votre meilleur allié pour travailler, streamer ou rester en contact avec vos proches, sans interruption. ???',
          category: 'Electronics',
          state: 'New',
          createdAt: new Date(),
          availability: { isAvailable: true, type: 'In Stock' },
          city: 'Marseille',
          averageStar: 3.5,
          numberOfReviews: 3,
          picture: ['assets/icon/imgs/routeurWIFI.jpg']
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
}
