import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  standalone: true,
  styleUrls: ['./commande.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class CommandePage implements OnInit {
  commande: any;

  constructor(private router: Router) { }

  ngOnInit() {
    const state = history.state;
    if (state && state.commandeData) {
      this.commande = state.commandeData;
    } else {
      console.error('Aucune donnée de commande reçue');
    }
  }
  goHome() {
    this.router.navigateByUrl('/home');
  }
}
