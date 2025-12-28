import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'cart', // Route pour le PANIER
    loadComponent: () => import('./cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'commande', // Route pour la COMMANDE
    loadComponent: () => import('./commande/commande.page').then((m) => m.CommandePage),
  },
  {
    path: 'sell-article', // Route pour VENDRE/CAMERA
    loadComponent: () => import('./sell-article/sell-article.page').then((m) => m.SellArticlePage),
  },  
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'sell-article',
    loadChildren: () => import('./sell-article/sell-article.module').then( m => m.SellArticlePageModule)
  },
  {
    path: 'commande',
    loadChildren: () => import('./commande/commande.module').then( m => m.CommandePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
