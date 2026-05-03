import { Arme, Armure, Potion, Gemme, Accessoire } from '../models/item.model';

export const DEFAULT_ARME: Arme = {
      libelle: '',
      basePourcentage: 0,
      region: 'commun',
      origine: '',
      categorie: {
        code: '',
        libelle: '',
      },
      prix: 0,
      degats: '',
      courage: '',
      intelligence: '',
      charisme: '',
      adresse: '',
      force: '',
      chance: '',
      attaque: '',
      parade: '',
      rupture: '',
      informations: '',
    };

export const DEFAULT_ARMURE: Armure = {
      libelle: '',
      basePourcentage: 0,
      region: 'commun',
      origine: '',
      categorie: {
        code: '',
        libelle: '',
      },
      prix: 0,
      armure: '',
      courage: '',
      intelligence: '',
      charisme: '',
      adresse: '',
      force: '',
      chance: '',
      attaque: '',
      parade: '',
      rupture: '',
      informations: '',
    };

export const DEFAULT_POTION: Potion = {
      libelle: 'Petite potion de vie',
      basePourcentage: 95,
      region: 'commun',
      origine: '',
      categorie: {
        code: 'soins',
        libelle: 'Soins',
      },
      prix: 50,
      duree: '1',
      vie: '',
      mana: '',
      courage: '',
      intelligence: '',
      charisme: '',
      adresse: '',
      force: '',
      chance: '',
      attaque: '',
      parade: '',
      rupture: '',
      informations: '',
    };

export const DEFAULT_GEMME: Gemme = {
      libelle: 'Gemme',
      basePourcentage: 95,
      prix: 50,
      informations: '',
    };

export const DEFAULT_ACCESSOIRE: Accessoire = {
      libelle: '',
      prix: 0,
      basePourcentage: 0,
      categorie: { code: '', libelle: '' },
      courage: '',
      intelligence: '',
      charisme: '',
      adresse: '',
      force: '',
      chance: '',
      attaque: '',
      parade: '',
      rupture: '',
      informations: '',
      armure: '',
      vie: '',
      mana: '',
      region: 'commun',
      origine: '',
    };

