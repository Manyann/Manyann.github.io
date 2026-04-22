import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {
  BonusAdPipe,
  BonusArmurePipe,
  BonusForcePipe,
  BonusInfoPipe,
} from '../bonus.pipe';
import { OriginePipe, OriginePrixPipe } from '../origine.pipe';
import { PromotionPipe } from '../promotion.pipe';
import { Armure, ArmureVente, Item, ItemHelper } from '../../../model/item';
import { Ville, VilleHelper } from '../../../model/villes';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-armure',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    PromotionPipe,
    OriginePipe,
    OriginePrixPipe,
    BonusAdPipe,
    BonusForcePipe,
    BonusArmurePipe,
    BonusInfoPipe,
  ],
  templateUrl: './armure.component.html',
  styleUrls: [
    '../../../../assets/css/badge.css',
    '../../../../assets/css/card.css',
    './armure.component.css',
  ],
})
export class ArmureComponent {
  @Input() selectedVilleType: string = 'capitale';
  @Input() selectedRegion: string = 'commun';
  @Input() activeCategorieCodes: Array<string> = [];

  villes: Array<Ville>;
  items: Array<ArmureVente> = [];
  allItems: Array<ArmureVente> = [];

  constructor() {
    this.villes = VilleHelper.getAll().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.allItems = ShopService.mapToVente(
      ItemHelper.getAllArmure(),
      () => new ArmureVente(),
      (vente, item) => {
        vente.armure = item;
      },
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedVilleType']) {
      this.refreshItems();
    }

    if (changes['selectedRegion']) {
      this.refreshZone();
    }

    if (changes['activeCategorieCodes']) {
      this.refreshItems();
    }
  }

  private refreshItems() {
    this.items = ShopService.refreshItems(
      this.allItems,
      this.villes,
      this.selectedVilleType,
      this.activeCategorieCodes,
      (vente) => vente.armure,
    );
  }

  private refreshZone(): void {
    this.allItems = ShopService.mapToVente(
      ItemHelper.getAllArmure(this.selectedRegion),
      () => new ArmureVente(),
      (vente, item) => {
        vente.armure = item;
      },
    );

    this.refreshItems();
  }

  public getStatStatut(stat: string) {
    return `stat-badge ${ShopService.getStatStatut(stat)}`;
  }
}
