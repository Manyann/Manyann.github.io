import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Ville, VilleHelper } from '../../model/villes';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CodeLibelle } from '../../model/code-libelle';
import { ArmeComponent } from './arme/arme.component';
import { TabViewModule } from 'primeng/tabview';
import { ArmureComponent } from './armure/armure.component';
import { PotionComponent } from './potion/potion.component';
import { GemmeComponent } from './gemme/gemme.component';
import { Categorie, ItemHelper } from '../../model/item';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { AccessoireComponent } from './accessoire/accessoire.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TabViewModule,
    ArmeComponent,
    ArmureComponent,
    PotionComponent,
    GemmeComponent,
    InputSwitchModule,
    PanelModule,
    AccessoireComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  title = 'shop';
  villes: Array<Ville>;
  villesType: Array<CodeLibelle>;
  zones: Array<CodeLibelle>;
  selectedVilleType: string;
  selectedZone: string;
  categories: Array<Categorie> = [];
  categorieSelectable: Array<Categorie> = [];
  categoriesArmures: Array<Categorie> = [];
  activeCategorieCodes: Array<string> = [];
  categoryStates: Record<string, boolean> = {};
  activeIndex: number = 0;

  constructor() {
    this.villes = VilleHelper.getAll().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.zones = VilleHelper.getAllZones();
    this.villesType = this.villes.map((x) => ({
      code: x.type,
      libelle: x.libelle,
    }));
    this.selectedVilleType = '';
    this.selectedZone = '';
    this.categories = ItemHelper.getAllCategories();
    this.categoriesArmures = ItemHelper.getAllCategoriesArmure();
    this.buildCategories(this.categories);
  }

  private buildCategories(categories: Categorie[]): void {
    const nextStates: Record<string, boolean> = {};

    for (const category of categories) {
      nextStates[category.code] = this.categoryStates[category.code] ?? true;
    }

    this.categoryStates = nextStates;
    this.categorieSelectable = categories;
  }

  onCategoryToggle(): void {
    let categoriesToFilter: Categorie[] = [];
    if (this.activeIndex === 0) {
      categoriesToFilter = this.categories;
    } else if (this.activeIndex === 1) {
      categoriesToFilter = this.categoriesArmures;
    }

    this.activeCategorieCodes = categoriesToFilter
      .filter((category) => this.categoryStates[category.code])
      .map((category) => category.code);
  }

  onChangedVille(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedVilleType = value;
  }

  onChangedRegion(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedZone = value;
  }

  onTabChange(event: any) {
    this.activeIndex = event.index;
    if (event.index === 0) {
      this.buildCategories(this.categories);
    } else if (event.index === 1) {
      this.buildCategories(this.categoriesArmures);
    } else {
      this.buildCategories([]);
    }
  }
}
