import { ItemHelper, ItemRarity, LootItem } from '../../../services/items';

export class LootService {
  private items: Record<ItemRarity, LootItem[]> = {
    artisant: [],
    excellence: [],
    legendaire: [],
    mythique: [],
    perave: [],
    qualite: [],
  };
  private readonly rarityWeightsLow: Record<ItemRarity, number> = {
    perave: 80,
    qualite: 15,
    artisant: 4,
    excellence: 0.7,
    legendaire: 0.25,
    mythique: 0.05,
  };

  private readonly rarityWeightsMid: Record<ItemRarity, number> = {
    perave: 46,
    qualite: 30,
    artisant: 15,
    excellence: 6,
    legendaire: 2.5,
    mythique: 0.5,
  };

  private readonly rarityWeightsHigh: Record<ItemRarity, number> = {
    perave: 10,
    qualite: 20,
    artisant: 25,
    excellence: 20,
    legendaire: 15,
    mythique: 10,
  };

  getRandomItem(chance: number): LootItem {
    const weights = this.interpolateWeights(chance);

    const availableRarities = (Object.keys(weights) as ItemRarity[]).filter(
      (rarity) => this.items[rarity] && this.items[rarity].length > 0,
    );

    if (availableRarities.length === 0) {
      return { name: 'Aucun objet', rarity: 'perave', id: Date.now() };
    }

    const totalWeight = availableRarities.reduce(
      (sum, rarity) => sum + weights[rarity],
      0,
    );

    let random = Math.random() * totalWeight;
    let cumulative = 0;

    for (const rarity of availableRarities) {
      cumulative += weights[rarity];
      if (random <= cumulative) {
        const rarityItems = this.items[rarity];
        const selectedItem =
          rarityItems[Math.floor(Math.random() * rarityItems.length)];

        return {
          ...selectedItem,
          id: Date.now() + Math.random(),
        };
      }
    }

    const fallbackRarity = availableRarities[0];
    const fallbackItem = this.items[fallbackRarity][0];

    return {
      ...fallbackItem,
      id: Date.now() + Math.random(),
    };
  }

  generateRouletteItems(
    chance: number,
    count: number = 50,
    includeArmes: boolean,
    includeArmures: boolean,
    includePotions: boolean,
    includeGemmes: boolean,
  ): LootItem[] {
    const armes = includeArmes
      ? ItemHelper.getAllForLoot()
      : this.emptyLootTable();
    const armures = includeArmures
      ? ItemHelper.getAllArmureForLoot()
      : this.emptyLootTable();
    const potions = includePotions
      ? ItemHelper.getAllPotionForLoot()
      : this.emptyLootTable();
    const gemmes = includeGemmes
      ? ItemHelper.getAllGemmeForLoot()
      : this.emptyLootTable();

    this.items = this.mergeLootTables(armes, armures, potions, gemmes);
    return Array.from({ length: count }, () => this.getRandomItem(chance));
  }

  getRarityClass(rarity: ItemRarity): string {
    return `rarity-${rarity}`;
  }

  isRareItem(rarity: ItemRarity): boolean {
    return ['mythique', 'legendaire'].includes(rarity);
  }

  interpolateWeights(chance: number): Record<ItemRarity, number> {
    const clamped = Math.max(0, Math.min(20, chance));
    let from: Record<ItemRarity, number>;
    let to: Record<ItemRarity, number>;
    let factor: number;

    if (clamped <= 10) {
      from = this.rarityWeightsLow;
      to = this.rarityWeightsMid;
      factor = clamped / 10;
    } else {
      from = this.rarityWeightsMid;
      to = this.rarityWeightsHigh;
      factor = (clamped - 10) / 10;
    }

    const result: Record<ItemRarity, number> = {} as any;
    for (const rarity in from) {
      const f = from[rarity as ItemRarity];
      const t = to[rarity as ItemRarity];
      result[rarity as ItemRarity] = f + (t - f) * factor;
    }
    return result;
  }

  // Méthode utilitaire pour créer un Record vide
  private emptyLootTable(): Record<ItemRarity, LootItem[]> {
    return {
      perave: [],
      qualite: [],
      excellence: [],
      artisant: [],
      legendaire: [],
      mythique: [],
    };
  }

  private mergeLootTables(
    ...tables: Record<ItemRarity, LootItem[]>[]
  ): Record<ItemRarity, LootItem[]> {
    const merged = this.emptyLootTable();

    for (const table of tables) {
      for (const rarity of Object.keys(merged) as ItemRarity[]) {
        merged[rarity] = merged[rarity].concat(table[rarity]);
      }
    }

    merged.mythique.push({ name: '???', rarity: 'mythique' });

    return merged;
  }
}
