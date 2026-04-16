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
import { Arme, Categorie, Item, ItemHelper } from '../../../model/item';
import { ItemsService } from '../../../../app/services/items.service';
import { CodeLibelle } from '../../../model/code-libelle';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';

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
  styleUrl: './arme.component.css',
})
export class ArmeComponent {
  @Input() selectedVilleType: string = 'capitale';
  @Input() selectedRegion: string = 'commun';

  villes: Array<Ville>;
  items: Array<Arme> = [];
  allItems: Array<Arme> = [];
  categories: Array<Categorie> = [];
  categoryStates: Record<string, boolean> = {};

  constructor() {
    this.villes = VilleHelper.getAll().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.categories = ItemHelper.getAllCategories();
    this.refreshItems();
  }

  ngOnChanges(): void {
    this.refreshItems();
  }

  public getStatStatut(stat: string): string {
    if (stat.startsWith('-')) {
      return 'stat-down';
    }
    if (stat.indexOf('-') !== -1) {
      let statNumber = parseInt(stat.charAt(2));
      if (statNumber > 3) {
        return 'stat-down';
      }
      if ((statNumber = 3)) {
        return 'stat-middle';
      }
    }
    return 'stat-up';
  }

  private refreshItems(): void {
    const ville = this.villes.find(
      (x) =>
        x.region === this.selectedRegion && x.type === this.selectedVilleType,
    );

    this.allItems = ItemHelper.getAll(this.selectedRegion).filter((item) =>
      this.estPresent(item, ville),
    );

    this.buildCategories();
    this.applyCategoryFilter();
  }

  private buildCategories(): void {
    const nextStates: Record<string, boolean> = {};

    for (const category of this.categories) {
      nextStates[category.code] = this.categoryStates[category.code] ?? true;
    }

    this.categoryStates = nextStates;
  }

  onCategoryToggle(): void {
    this.applyCategoryFilter();
  }

  private applyCategoryFilter(): void {
    const activeCodes = this.categories
      .filter((category) => this.categoryStates[category.code])
      .map((category) => category.code);

    if (activeCodes.length === 0) {
      this.items = [];
      return;
    }

    this.items = this.allItems.filter((item) =>
      activeCodes.includes(item.categorie.code),
    );
  }

  public estPresent(item: Item, ville: Ville | undefined): boolean {
    if (!ville) {
      return true;
    }

    let random = Math.floor(Math.random() * 101);
    let handicap = item.basePourcentage - ville.handicap;

    if (handicap < 2) {
      handicap = 2;
    }

    return random < handicap;
  }
}
