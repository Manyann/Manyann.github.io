import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PromotionPipe } from '../promotion.pipe';
import { Ville, VilleHelper } from '../../../model/villes';
import { ShopService } from '../shop.service';
import { AccessoireVente, ItemHelper } from '../../../../services/items';

@Component({
  selector: 'app-shop-accessoire',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    PromotionPipe,
  ],
  templateUrl: './accessoire.component.html',
  styleUrls: [
    '../../../../assets/css/badge.css',
    '../../../../assets/css/card.css',
    './accessoire.component.css',
  ],
})
export class AccessoireComponent {
  @Input() selectedVilleType: string = 'capitale';
  @Input() activeCategorieCodes: Array<string> = [];

  villes: Array<Ville>;
  items: Array<AccessoireVente> = [];
  allItems: Array<AccessoireVente> = [];

  constructor() {
    this.villes = VilleHelper.getAll().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.allItems = ShopService.mapToVente(
      ItemHelper.getAllAccesoire(),
      () => new AccessoireVente(),
      (vente, item) => {
        vente.accessoire = item;
      },
    );
  }

  ngOnChanges(): void {
    this.refreshItems();
  }

  private refreshItems() {
    this.items = ShopService.refreshItems(
      this.allItems,
      this.villes,
      this.selectedVilleType,
      this.activeCategorieCodes,
      (vente) => vente.accessoire,
    );
  }
}
