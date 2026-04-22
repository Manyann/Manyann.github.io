import { CodeLibelle } from './code-libelle';

export class Ville {
  'libelle': string;
  'type': string;
  'handicap': number;
}

export class VilleHelper {
  static getAll(): Array<Ville> {
    return [
      {
        libelle: 'Capitale',
        type: 'capitale',
        handicap: 0,
      },
      {
        libelle: 'Grande ville',
        type: 'ville-grande',
        handicap: 8,
      },
      {
        libelle: 'Campement, fort',
        type: 'campement',
        handicap: 8,
      },
      {
        libelle: 'Moyenne ville',
        type: 'ville-moyenne',
        handicap: 15,
      },
      {
        libelle: 'Petite ville',
        type: 'ville-petite',
        handicap: 22,
      },
      {
        libelle: 'Bourgades, villages, hameaux',
        type: 'bourgade',
        handicap: 27,
      },
    ];
  }

  static getAllZones(): Array<CodeLibelle> {
    return [
      {
        code: 'commun',
        libelle: 'Royaume Humain',
      },
      {
        code: 'nain',
        libelle: 'Montagne naine',
      },
      {
        code: 'elfe',
        libelle: 'Foret elfique',
      },
      {
        code: 'pirate',
        libelle: 'Iles pirate',
      },
      {
        code: 'homme-sable',
        libelle: 'Désert',
      },
      {
        code: 'samurai',
        libelle: 'Ile samurai',
      },
      {
        code: 'orque',
        libelle: 'Plaines orque',
      },
      {
        code: 'nord',
        libelle: 'Grand Nord',
      },
      {
        code: 'volcan',
        libelle: 'Ile volcanique',
      },
    ];
  }
}
