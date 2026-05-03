import { Gemme } from '../models/item.model';

export const getGemmesData = (): Gemme[] => {
  return [
      {
        libelle: 'Fer brut',
        prix: 2,
        basePourcentage: 100,
        informations: 'Métal basique pour la forge',
      },
      {
        libelle: 'Cuivre',
        prix: 5,
        basePourcentage: 98,
        informations: 'Utilisé pour alliages et petits objets',
      },
      {
        libelle: 'Étain',
        prix: 8,
        basePourcentage: 97,
        informations: 'Entre souvent dans la composition du bronze',
      },
      {
        libelle: 'Bronze',
        prix: 12,
        basePourcentage: 95,
        informations: 'Alliage résistant, prisé des soldats',
      },
      {
        libelle: 'Acier simple',
        prix: 20,
        basePourcentage: 92,
        informations: 'Base de la majorité des armes',
      },
      {
        libelle: 'Argent brut',
        prix: 30,
        basePourcentage: 91,
        informations: 'Souvent travaillé en bijoux et vaisselle',
      },
      {
        libelle: 'Or brut',
        prix: 50,
        basePourcentage: 85,
        informations: 'Métal précieux, sert en forge et orfèvrerie',
      },
      {
        libelle: 'Quartz taillé',
        prix: 70,
        basePourcentage: 78,
        informations: 'Pierre décorative courante',
      },
      {
        libelle: 'Améthyste',
        prix: 100,
        basePourcentage: 71,
        informations: 'Gemmes violettes recherchées',
      },
      {
        libelle: 'Émeraude',
        prix: 150,
        basePourcentage: 67,
        informations: 'Pierre verte très appréciée des nobles',
      },
      {
        libelle: 'Saphir',
        prix: 200,
        basePourcentage: 64,
        informations: 'Gemmes bleues rares',
      },
      {
        libelle: 'Rubis',
        prix: 300,
        basePourcentage: 62,
        informations: 'Très prisé dans les bijoux royaux',
      },
      {
        libelle: 'Perle blanche',
        prix: 400,
        basePourcentage: 60,
        informations: 'Symbole de pureté, tirée des coquillages',
      },
      {
        libelle: 'Opale',
        prix: 500,
        basePourcentage: 58,
        informations: 'Pierre précieuse aux reflets changeants',
      },
      {
        libelle: 'Topaze dorée',
        prix: 600,
        basePourcentage: 56,
        informations: 'Pierre jaune étincelante',
      },
      {
        libelle: 'Diamant brut',
        prix: 700,
        basePourcentage: 54,
        informations: 'Très recherché, difficile à tailler',
      },
      {
        libelle: 'Platine',
        prix: 800,
        basePourcentage: 50,
        informations: 'Métal blanc dense et précieux',
      },
      {
        libelle: 'Diamant taillé',
        prix: 900,
        basePourcentage: 48,
        informations: 'Symbole ultime de richesse',
      },
      {
        libelle: 'Or pur raffiné',
        prix: 950,
        basePourcentage: 46,
        informations: 'Or travaillé à la perfection',
      },
      {
        libelle: 'Mithril',
        prix: 1000,
        basePourcentage: 44,
        informations: 'Métal quasi indestructible, très rare',
      },
      {
        libelle: 'Gemme Légendaire',
        prix: 0,
        basePourcentage: 40,
        informations: 'Effet au choix du MJ',
      },
    ];
};
