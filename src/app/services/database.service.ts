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

  constructor() {
    this.initializeDatabase();
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

      const createTable = `
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY, name TEXT, description TEXT, price REAL, 
          details TEXT, category TEXT, state TEXT, createdAt TEXT, 
          availability TEXT, city TEXT, averageStar REAL, numberOfReviews INTEGER
        );
      `;
      await this.db.execute(createTable);
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
  }
}