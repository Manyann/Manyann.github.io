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
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { AccessoireComponent } from './accessoire/accessoire.component';
import { Categorie, ItemHelper } from '../../../services/items';

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
  styleUrls: ['../../../assets/css/tabview.css', './shop.component.css'],
})
export class ShopComponent {
  title = 'shop';
  villes: Array<Ville>;
  zones: Array<CodeLibelle>;
  selectedVilleType: string;
  selectedZone: string;
  categories: Array<Categorie> = [];
  categorieSelectable: Array<Categorie> = [];
  categoriesArmures: Array<Categorie> = [];
  categoriesAccessoires: Array<Categorie> = [];
  categoriesPotions: Array<Categorie> = [];
  activeCategorieCodes: Array<string> = [];
  categoryStates: Record<string, boolean> = {};
  activeIndex: number = 0;

  constructor() {
    this.villes = VilleHelper.getAll().sort((x) => x.handicap);
    this.zones = VilleHelper.getAllZones();
    this.selectedVilleType = '';
    this.selectedZone = '';
    this.categories = ItemHelper.getAllCategories();
    this.categoriesArmures = ItemHelper.getAllCategoriesArmure();
    this.categoriesPotions = ItemHelper.getAllCategoriesPotion();
    this.categoriesAccessoires = ItemHelper.getAllCategoriesAccessoire();
    this.buildCategories(this.categories);
  }

  private buildCategories(categories: Categorie[]): void {
    const nextStates: Record<string, boolean> = {};

    for (const category of categories) {
      nextStates[category.code] = this.categoryStates[category.code] ?? false;
    }

    this.categoryStates = nextStates;
    this.categorieSelectable = categories;
  }

  onCategoryToggle() {
    this.activeCategorieCodes = Object.keys(this.categoryStates).filter(
      (code) => this.categoryStates[code],
    );
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
    } else if (event.index === 2) {
      this.buildCategories(this.categoriesAccessoires);
    } else if (event.index === 3) {
      this.buildCategories(this.categoriesPotions);
    } else {
      this.buildCategories([]);
    }
  }
}
