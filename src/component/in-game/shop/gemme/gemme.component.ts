import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Ville, VilleHelper } from '../../../model/villes';
import { Gemme, ItemHelper } from '../../../../services/items';

@Component({
  selector: 'app-shop-gemme',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule],
  templateUrl: './gemme.component.html',
  styleUrls: [
    '../../../../assets/css/badge.css',
    '../../../../assets/css/card.css',
    './gemme.component.css',
  ],
})
export class GemmeComponent {
  @Input() selectedVilleType: string = 'capitale';

  villes: Array<Ville>;
  items: Array<Gemme>;

  constructor() {
    this.villes = VilleHelper.getAll().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.items = ItemHelper.getAllGemmes();
  }
}
