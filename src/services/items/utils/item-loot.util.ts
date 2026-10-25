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

// Un objet d'origine non commune gagne un tiers, jusqu'à excellence.
const RARITY_UPGRADE_WITH_ORIGINE: Partial<Record<ItemRarity, ItemRarity>> = {
  perave: 'qualite',
  qualite: 'artisant',
  artisant: 'excellence',
};

export const getQualiteWithOrigine = (
  rarity: ItemRarity,
  origine?: string,
): ItemRarity => {
  if (!origine || origine === 'commun') {
    return rarity;
  }
  return RARITY_UPGRADE_WITH_ORIGINE[rarity] ?? rarity;
};

export const groupItemsForLoot = <
  T extends { libelle: string; basePourcentage: number; origine?: string },
>(
  items: T[],
  withOrigines: boolean = false,
): Record<ItemRarity, LootItem[]> =>
  items.reduce(
    (acc, item) => {
      const origine = withOrigines ? item.origine : undefined;
      const rarity = getQualiteWithOrigine(
        getQualiteFromBaseChance(item.basePourcentage),
        origine,
      );
      acc[rarity].push({
        name: item.libelle,
        rarity,
        origine,
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
