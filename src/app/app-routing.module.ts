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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
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
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
  path: 'login',
  loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'ajout-details',
    loadChildren: () => import('./ajout-details/ajout-details.module').then( m => m.AjoutDetailsPageModule)
  },
  {
    path: 'porte-feuille',
    loadChildren: () => import('./porte-feuille/porte-feuille.module').then( m => m.PorteFeuillePageModule)
  },
  {
    path: 'deposer-fonds',
    loadChildren: () => import('./deposer-fonds/deposer-fonds.module').then( m => m.DeposerFondsPageModule)
  },
  {
    path: 'retirer-fonds',
    loadChildren: () => import('./retirer-fonds/retirer-fonds.module').then( m => m.RetirerFondsPageModule)
  },
  {
    path: 'a-propos',
    loadChildren: () => import('./a-propos/a-propos.module').then( m => m.AProposPageModule)
  },
  {
    path: 'assistance',
    loadChildren: () => import('./assistance/assistance.module').then( m => m.AssistancePageModule)
  },
  {
    path: 'parametres',
    loadChildren: () => import('./parametres/parametres.module').then( m => m.ParametresPageModule)
  },
  {
    path: 'messagerie',
    loadChildren: () => import('./messagerie/messagerie.module').then( m => m.MessageriePageModule)
  },
  {
    path: 'securite',
    loadChildren: () => import('./securite/securite.module').then( m => m.SecuritePageModule)
  },
  {
    path: 'contact-support',
    loadChildren: () => import('./contact-support/contact-support.module').then( m => m.ContactSupportPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
