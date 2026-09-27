import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { walletOutline, shieldCheckmarkOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.page.html',
  styleUrls: ['./a-propos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AProposPage implements OnInit {
  constructor() {
    addIcons({ walletOutline, shieldCheckmarkOutline, lockClosedOutline });
  }

  ngOnInit() {}
}