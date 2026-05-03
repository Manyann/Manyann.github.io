import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PromotionPipe } from '../promotion.pipe';
import { Ville, VilleHelper } from '../../../model/villes';
import { ShopService } from '../shop.service';
import { ItemHelper, PotionVente } from '../../../../services/items';

@Component({
  selector: 'app-shop-potion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    PromotionPipe,
  ],
  templateUrl: './potion.component.html',
  styleUrls: [
    '../../../../assets/css/badge.css',
    '../../../../assets/css/card.css',
    './potion.component.css',
  ],
})
export class PotionComponent {
  @Input() selectedVilleType: string = 'capitale';
  @Input() activeCategorieCodes: Array<string> = [];

  villes: Array<Ville>;
  items: Array<PotionVente> = [];
  allItems: Array<PotionVente> = [];
  availableItems: Array<PotionVente> = [];

  constructor() {
    this.villes = VilleHelper.getAll().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.allItems = ShopService.mapToVente(
      ItemHelper.getAllPotion(),
      () => new PotionVente(),
      (vente, item) => {
        vente.potion = item;
      },
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedVilleType']) {
      this.refreshPresence();
      return;
    }

    if (changes['activeCategorieCodes']) {
      this.applyCategoryFilter();
    }
  }

  private refreshPresence(): void {
    this.availableItems = ShopService.refreshPresence(
      this.allItems,
      this.villes,
      this.selectedVilleType,
      (vente) => vente.potion,
    );

    this.applyCategoryFilter();
  }

  private applyCategoryFilter(): void {
    this.items = ShopService.applyCategoryFilter(
      this.availableItems,
      this.activeCategorieCodes,
      (vente) => vente.potion,
    );
  }
}
