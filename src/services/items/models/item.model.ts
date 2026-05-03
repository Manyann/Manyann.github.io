export class Item {
  'libelle': string;
  'region': string;
  'origine': string;
  'prix': number;
  'basePourcentage': number;
  'categorie': Categorie;
  'courage': string;
  'intelligence': string;
  'charisme': string;
  'adresse': string;
  'force': string;
  'chance': string;
  'attaque': string;
  'parade': string;
  'rupture': string;
  'informations': string = '';
}

export class ArmeVente {
  'arme': Arme;
  'promotion': number;
  'prixReel': number;
}
export class Arme extends Item {
  'degats': string;
}
export class ArmureVente {
  'armure': Armure;
  'promotion': number;
  'prixReel': number;
}
export class Armure extends Item {
  'armure': string;
}
export class PotionVente {
  'potion': Potion;
  'promotion': number;
  'prixReel': number;
}
export class Potion extends Item {
  'duree': string;
  'vie': string;
  'mana': string;
}

export class Gemme {
  'libelle': string;
  'prix': number;
  'basePourcentage': number;
  'informations': string = '';
}

export class Accessoire extends Item {
  'armure': string;
  'vie': string;
  'mana': string;
}

export class AccessoireVente {
  'accessoire': Accessoire;
  'promotion': number;
  'prixReel': number;
}

export class Categorie {
  'code': string;
  'libelle': string;
}

export class HeroArmes {
  'hero_nom': string;
  'armes': Array<ItemShort>;
}

export class HeroArmures {
  'hero_nom': string;
  'armures': Array<ItemShort>;
}

export class ItemShort {
  'code': string;
  'libelle': string;
  'equipe': boolean;
}

export type ItemRarity =
  | 'perave'
  | 'qualite'
  | 'artisant'
  | 'excellence'
  | 'legendaire'
  | 'mythique';

// Interfaces
export interface LootItem {
  id?: number;
  name: string;
  rarity: ItemRarity;
}
