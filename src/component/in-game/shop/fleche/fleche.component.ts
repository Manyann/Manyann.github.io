import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Ville, VilleHelper } from '../../../model/villes';
import { Fleche, Gemme, ItemHelper } from '../../../../services/items';

@Component({
  selector: 'app-shop-fleche',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './fleche.component.html',
  styleUrls: [
    '../../../../assets/css/badge.css',
    '../../../../assets/css/card.css',
    './fleche.component.css',
  ],
})
export class FlecheComponent {
  @Input() selectedVilleType: string = 'capitale';

  villes: Array<Ville>;
  items: Array<Fleche>;

  constructor() {
    this.villes = VilleHelper.getAll().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.items = ItemHelper.getAllFleches();
  }
}
