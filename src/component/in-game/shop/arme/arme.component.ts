import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {
  BonusAdPipe,
  BonusDegatPipe,
  BonusForcePipe,
  BonusInfoPipe,
  BonusAttaquePipe,
} from '../bonus.pipe';
import { OriginePipe, OriginePrixPipe } from '../origine.pipe';
import { PromotionPipe } from '../promotion.pipe';
import { Ville, VilleHelper } from '../../../model/villes';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { ShopService } from '../shop.service';
import { ArmeVente, ItemHelper } from '../../../../services/items';

@Component({
  selector: 'app-shop-arme',
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
    BonusDegatPipe,
    BonusAttaquePipe,
    BonusInfoPipe,
    InputSwitchModule,
    PanelModule,
  ],
  templateUrl: './arme.component.html',
  styleUrls: [
    '../../../../assets/css/badge.css',
    '../../../../assets/css/card.css',
    './arme.component.css',
  ],
})
export class ArmeComponent {
  @Input() selectedVilleType: string = 'capitale';
  @Input() selectedRegion: string = 'commun';
  @Input() activeCategorieCodes: Array<string> = [];

  villes: Array<Ville>;
  items: Array<ArmeVente> = [];
  allItems: Array<ArmeVente> = [];
  availableItems: Array<ArmeVente> = [];

  constructor() {
    this.villes = VilleHelper.getAll().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.allItems = ShopService.mapToVente(
      ItemHelper.getAll(),
      () => new ArmeVente(),
      (vente, item) => {
        vente.arme = item;
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
      (vente) => vente.arme,
    );

    this.applyCategoryFilter();
  }

  private applyCategoryFilter(): void {
    this.items = ShopService.applyCategoryFilter(
      this.availableItems,
      this.activeCategorieCodes,
      (vente) => vente.arme,
    );
  }

  private refreshZone(): void {
    this.allItems = ShopService.mapToVente(
      ItemHelper.getAll(this.selectedRegion),
      () => new ArmeVente(),
      (vente, item) => {
        vente.arme = item;
      },
    );

    this.refreshPresence();
  }

  public getStatStatut(stat: string) {
    return `stat-badge ${ShopService.getStatStatut(stat)}`;
  }
}
