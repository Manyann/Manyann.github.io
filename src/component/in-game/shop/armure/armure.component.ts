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
import { Ville, VilleHelper } from '../../../model/villes';
import { ShopService } from '../shop.service';
import { ArmureVente, ItemHelper } from '../../../../services/items';

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
  availableItems: Array<ArmureVente> = [];

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
    if (changes['selectedRegion']) {
      this.refreshZone();
      return;
    }

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
      (vente) => vente.armure,
    );

    this.applyCategoryFilter();
  }

  private applyCategoryFilter(): void {
    this.items = ShopService.applyCategoryFilter(
      this.availableItems,
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

    this.refreshPresence();
  }

  public getStatStatut(stat: string) {
    return `stat-badge ${ShopService.getStatStatut(stat)}`;
  }
}
