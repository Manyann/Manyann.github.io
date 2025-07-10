import { ItemHelper, ItemRarity, LootItem } from '../../model/item';


// Service pour la gestion du loot
export class LootService {
  
  private readonly items: Record<ItemRarity, LootItem[]> = ItemHelper.getAllForLoot();

  private readonly rarityWeights: Record<ItemRarity, number> = {
    perave: 70,
    qualite: 20,
    artisant: 7,
    mythique: 2.5,
    legendaire: 0.5
  };

  getRandomItem(): LootItem {
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (const [rarity, weight] of Object.entries(this.rarityWeights)) {
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

  generateRouletteItems(count: number = 50): LootItem[] {
    return Array.from({ length: count }, () => this.getRandomItem());
  }

  getRarityClass(rarity: ItemRarity): string {
    return `rarity-${rarity}`;
  }

  isRareItem(rarity: ItemRarity): boolean {
    return ['mythique', 'legendaire'].includes(rarity);
  }
}