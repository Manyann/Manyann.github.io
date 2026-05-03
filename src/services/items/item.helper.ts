import { Accessoire, Arme, Armure, Categorie, Gemme, ItemRarity, LootItem, Potion } from './models/item.model';
import { getAccessoiresData } from './data/accessoires.data';
import { getArmesData } from './data/armes.data';
import { getArmuresData } from './data/armures.data';
import { getGemmesData } from './data/gemmes.data';
import { getPotionsData } from './data/potions.data';
import { ACCESSOIRE_CATEGORIES, ARME_CATEGORIES, ARMURE_CATEGORIES, POTION_CATEGORIES } from './constants/item-categories.constants';
import { DEFAULT_ACCESSOIRE, DEFAULT_ARME, DEFAULT_ARMURE, DEFAULT_GEMME, DEFAULT_POTION } from './constants/item-defaults.constants';
import { ITEM_ORIGINES } from './constants/item-origines.constants';
import { getQualiteFromBaseChance, groupItemsForLoot } from './utils/item-loot.util';

export class ItemHelper {
  private static getOrigine(zone: string, armeType: string): string {
    const dico = ITEM_ORIGINES[armeType];
    if (!dico) return 'commun';

    const origineList = Object.values(dico);
    const zoneProba = 25;
    const autreProba = 1.5;

    let totalPourOrigines = 0;
    const probaExacte: { [origine: string]: number } = {};

    for (const origine of origineList) {
      probaExacte[origine] = origine === zone ? zoneProba : autreProba;
      totalPourOrigines += probaExacte[origine];
    }

    probaExacte['commun'] = Math.max(0, 100 - totalPourOrigines);

    const tirage = Math.random() * 100;
    let cumulative = 0;

    for (const [origine, prob] of Object.entries(probaExacte)) {
      cumulative += prob;
      if (tirage <= cumulative) return origine;
    }

    return 'commun';
  }

  static getAllCategories(): Categorie[] {
    return ARME_CATEGORIES;
  }

  static getAllCategoriesArmure(): Categorie[] {
    return ARMURE_CATEGORIES;
  }

  static getAllCategoriesAccessoire(): Categorie[] {
    return ACCESSOIRE_CATEGORIES;
  }

  static getAllCategoriesPotion(): Categorie[] {
    return POTION_CATEGORIES;
  }

  static getDefaultArme(): Arme {
    return { ...DEFAULT_ARME };
  }

  static getDefaultArmure(): Armure {
    return { ...DEFAULT_ARMURE };
  }

  static getDefaultPotion(): Potion {
    return { ...DEFAULT_POTION };
  }

  static getDefaultGemme(): Gemme {
    return { ...DEFAULT_GEMME };
  }

  static getDefaultAccessoire(): Accessoire {
    return { ...DEFAULT_ACCESSOIRE };
  }

  static getAll(zone: string = 'commun'): Arme[] {
    return getArmesData(this.getOrigine.bind(this), zone);
  }

  static getAllForLoot(): Record<ItemRarity, LootItem[]> {
    return groupItemsForLoot(this.getAll());
  }

  static getQualiteFromBaseChance(chance: number): ItemRarity {
    return getQualiteFromBaseChance(chance);
  }

  static getAllArmure(zone: string = 'commun'): Armure[] {
    return getArmuresData(this.getOrigine.bind(this), zone);
  }

  static getAllArmureForLoot(): Record<ItemRarity, LootItem[]> {
    return groupItemsForLoot(this.getAllArmure());
  }

  static getAllPotion(): Potion[] {
    return getPotionsData();
  }

  static getAllPotionForLoot(): Record<ItemRarity, LootItem[]> {
    return groupItemsForLoot(this.getAllPotion());
  }

  static getAllGemmes(): Gemme[] {
    return getGemmesData();
  }

  static getAllGemmeForLoot(): Record<ItemRarity, LootItem[]> {
    return groupItemsForLoot(this.getAllGemmes());
  }

  // Nom conservé pour compatibilité avec l'existant.
  static getAllAccesoire(): Accessoire[] {
    return getAccessoiresData();
  }
}
