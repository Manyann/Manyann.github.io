import { ItemRarity, LootItem } from '../models/item.model';

export const getQualiteFromBaseChance = (chance: number): ItemRarity => {
  if (chance <= 42) {
    return 'legendaire';
  }
  if (chance <= 55) {
    return 'excellence';
  }
  if (chance <= 70) {
    return 'artisant';
  }
  if (chance <= 90) {
    return 'qualite';
  }
  return 'perave';
};

export const groupItemsForLoot = <T extends { libelle: string; basePourcentage: number }>(
  items: T[],
): Record<ItemRarity, LootItem[]> =>
  items.reduce(
    (acc, item) => {
      const rarity = getQualiteFromBaseChance(item.basePourcentage);
      acc[rarity].push({
        name: item.libelle,
        rarity,
      });
      return acc;
    },
    {
      perave: [],
      qualite: [],
      artisant: [],
      excellence: [],
      legendaire: [],
      mythique: [],
    } as Record<ItemRarity, LootItem[]>,
  );
