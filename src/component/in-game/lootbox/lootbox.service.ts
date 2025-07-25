import { ItemHelper, ItemRarity, LootItem } from '../../model/item';


// Service pour la gestion du loot
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
  mythique: 0.05
};

private readonly rarityWeightsMid: Record<ItemRarity, number> = {
  perave: 46,
  qualite: 30,
  artisant: 15,
  excellence: 6,
  legendaire: 2.5,
  mythique: 0.5
};

private readonly rarityWeightsHigh: Record<ItemRarity, number> = {
  perave: 10,
  qualite: 20,
  artisant: 25,
  excellence: 20,
  legendaire: 15,
  mythique: 10
};


  getRandomItem(chance:number): LootItem {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (const [rarity, weight] of Object.entries(this.interpolateWeights(chance))) {
      cumulative += weight;
      if (random <= cumulative) {
        const rarityItems = this.items[rarity as ItemRarity];
        const selectedItem = rarityItems[Math.floor(Math.random() * rarityItems.length)];
        return {
          ...selectedItem,
          id: Date.now() + Math.random()
        };
      }
    }
    return { ...this.items.perave[0], id: Date.now() };
  }

  generateRouletteItems(chance:number,count: number = 50, includeArmes : boolean, includeArmures : boolean, includePotions : boolean): LootItem[] { 
    
    const armes = includeArmes ? ItemHelper.getAllForLoot() : this.emptyLootTable();
    const armures = includeArmures ? ItemHelper.getAllArmureForLoot() : this.emptyLootTable();
    const potions = includePotions ? ItemHelper.getAllPotionForLoot() : this.emptyLootTable();

    this.items = this.mergeLootTables(armes, armures, potions);
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

  private mergeLootTables(...tables: Record<ItemRarity, LootItem[]>[]): Record<ItemRarity, LootItem[]> {
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