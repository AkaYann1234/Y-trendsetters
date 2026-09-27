import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private readonly stripePromise: Promise<Stripe | null>;

  constructor() {
    // REMPLACE 'pk_test_...' par ta vraie clé publique Stripe (disponible sur ton dashboard Stripe)
    this.stripePromise = loadStripe('pk_test_votre_cle_publique_ici');
  }

  async getStripe() {
    return await this.stripePromise;
  }

  // Cette fonction servira à envoyer les infos de la carte à Stripe
  // pour obtenir un "Token" sécurisé (que tu enverras ensuite à ton serveur)
  async createToken(cardData: any) {
    const stripe = await this.getStripe();
    if (!stripe) throw new Error('Stripe non chargé');

   const result = await (stripe as any ).createToken('card', {
        number: cardData.number,
        exp_month: parseInt(cardData.expMonth),
        exp_year: parseInt(cardData.expYear),
        cvc: cardData.cvc,
    });

    if (result.error) {
      throw result.error;
    }

    return result.token;
 }
}