import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { Ingredient, ItemHelper } from '../../../../services/items';

export interface Recette {
  nom: string;
  id: string;
  ingredients: Array<string>;
}

@Component({
  selector: 'app-equipement-ingredient',
  standalone: true,
  imports: [CommonModule, TableModule, TabViewModule],
  templateUrl: './ingredient.component.html',
  styleUrls: [
    './ingredient.component.css',
    '../../../../assets/css/tabview.css',
  ],
})
export class IngredientComponent {
  ingredients: Array<Ingredient>;
  recettes: Array<Recette>;
  activeIndex = 0;

  constructor() {
    this.ingredients = ItemHelper.getAllIngredients().sort((a, b) =>
      a.libelle.localeCompare(b.libelle),
    );
    this.recettes = this.buildRecettes(this.ingredients);
  }

  public goToRecette(nom: string): void {
    this.activeIndex = 1;

    const id = this.slugify(nom);
    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  public slugify(value: string): string {
    return (
      'recette-' +
      value
        .normalize('NFD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-+)|(-+$)/g, '')
    );
  }

  private buildRecettes(ingredients: Array<Ingredient>): Array<Recette> {
    const map = new Map<string, Set<string>>();

    for (const ingredient of ingredients) {
      for (const usage of ingredient.utilite) {
        if (!map.has(usage)) {
          map.set(usage, new Set<string>());
        }
        map.get(usage)!.add(ingredient.libelle);
      }
    }

    return Array.from(map.entries())
      .map(([nom, ingredientNames]) => ({
        nom,
        id: this.slugify(nom),
        ingredients: Array.from(ingredientNames).sort((a, b) =>
          a.localeCompare(b),
        ),
      }))
      .sort((a, b) => a.nom.localeCompare(b.nom));
  }
}
