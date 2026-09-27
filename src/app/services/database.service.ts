import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Product } from '../models/interface-models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private dbName = 'applicationmobile.db';
  
  // Détection de la plateforme (Mobile vs Web)
  private isNative: boolean = Capacitor.getPlatform() !== 'web';
  
  // Stockage temporaire pour le navigateur (mode test)
  private browserProducts: Product[] = [];

  private panier: Product[] = [];

  // Stockage simulé des utilisateurs pour le mode navigateur
  private browserUsers: any[] = [
    { email: 'akayannuriel123@gmail.com', mot_de_passe: 'N03k05b77@', nom: 'Admin' }
  ];

  constructor() {
    this.initializeDatabase();
    this.chargerDonnees();
  }
  private sauvegarder() {
    localStorage.setItem('ma_boutique_produits', JSON.stringify(this.browserProducts));
    localStorage.setItem('ma_boutique_panier', JSON.stringify(this.panier));
    localStorage.setItem('ma_boutique_users', JSON.stringify(this.browserUsers));
  }
  private chargerDonnees() {
    const savedProducts = localStorage.getItem('ma_boutique_produits');
    const savedPanier = localStorage.getItem('ma_boutique_panier');
    const savedUsers = localStorage.getItem('ma_boutique_users');
    if (savedProducts) {this.browserProducts = JSON.parse(savedProducts);}
    if (savedPanier) {this.panier = JSON.parse(savedPanier);}
    if (savedUsers) {this.browserUsers = JSON.parse(savedUsers);}
  }

  async initializeDatabase() {
    // Si on est sur navigateur, on simule l'initialisation
    if (!this.isNative) {
      console.log('Mode Navigateur détecté : Utilisation de la mémoire temporaire.');
      return;
    }

    try {
      this.db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
      await this.db.open();

      const createTableProduct = `
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY, name TEXT, description TEXT, price REAL, 
          details TEXT, category TEXT, state TEXT, createdAt TEXT, 
          availability TEXT, city TEXT, averageStar REAL, numberOfReviews INTEGER
        );
      `;
      const tableUsers = `
        CREATE TABLE IF NOT EXISTS utilisateurs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE,
          mot_de_passe TEXT
        );`
        ;
      await this.db.execute(createTableProduct);
      await this.db.execute(tableUsers);
      console.log('Base de données SQLite initialisée sur mobile');
    } catch (error) {
      console.error('Erreur SQLite :', error);
    }
  }

  async getProducts(): Promise<Product[]> {
    if (!this.isNative) {
      return this.browserProducts;
    }

    try {
      const result = await this.db.query('SELECT * FROM products');
      return result.values as Product[];
    } catch (error) {
      return [];
    }
  }
  // --- SUPPRIMER ---
async deleteProduct(productId: string): Promise<void> {
  // On garde tous les produits SAUF celui qui a cet ID
  this.browserProducts = this.browserProducts.filter(p => p.id !== productId);
  this.sauvegarder();
}

// --- MODIFIER ---
async updateProduct(updatedProduct: Product): Promise<void> {
  // On trouve l'index du produit à modifier
  const index = this.browserProducts.findIndex(p => p.id === updatedProduct.id);
  
  if (index !== -1) {
    this.browserProducts[index] = updatedProduct; // On remplace par les nouvelles données
    this.sauvegarder();
  }
}
async login(email: string, mdp: string): Promise<boolean> {
  // Récupérer la liste des utilisateurs (simulée ou réelle)
  const users = await this.getUsersFromDB();
  
  // Chercher l'utilisateur avec l'email et le mot de passe correspondants
  const user = users.find((u: any) => u.email === email && u.mot_de_passe === mdp);
  
  if (user) {
    // Sauvegarder l'utilisateur connecté dans la session
    localStorage.setItem('session_utilisateur', JSON.stringify(user));
    return true;
  }
  return false;
}
  async getUsersFromDB(): Promise<any[]> {
    if (!this.isNative) {
      return this.browserUsers;
    }
    try {
      const result = await this.db.query('SELECT * FROM utilisateurs');
      return result.values || [];
    } catch (error) {
      return [];
    }
  }

  async addProduct(product: Product): Promise<void> {
    if (!this.isNative) {
      // On vérifie si le produit existe déjà pour éviter les doublons au rafraîchissement
      const exists = this.browserProducts.find(p => p.id === product.id);
      if (!exists) {
        this.browserProducts.push(product);
      }
      return;
    }

    try {
      const insertQuery = `
        INSERT INTO products (id, name, description, price, details, category, state, createdAt, availability, city, averageStar, numberOfReviews)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      await this.db.run(insertQuery, [
        product.id, product.name, product.description, product.price, product.details,
        product.category, product.state, product.createdAt.toISOString(),
        JSON.stringify(product.availability), product.city, product.averageStar, product.numberOfReviews
      ]);
    } catch (error) {
      console.error('Erreur ajout produit SQLite :', error);
    }
    this.browserProducts.push(product);
    this.sauvegarder(); // On enregistre sur le disque
  }
  async addToCart(product: Product): Promise<void> {
  this.panier.push(product);
  this.sauvegarder();
  console.log('Produit ajouté au panier:', product);
  }
  async getCartItems(): Promise<Product[]> {
  return this.panier;
 }
  clearCart() {
  this.panier = [];
  this.sauvegarder();
  console.log('Panier à été vidé');
 }
  getTotalPrice(): number {
  return this.panier.reduce((total, product) => total + (product.price || 0), 0);
  }
  
  removeFromCart(productId: string) {
  this.panier = this.panier.filter(item => item.id !== productId);
  this.sauvegarder();
  console.log(`Produit avec ID ${productId} retiré du panier.`);
 }
}