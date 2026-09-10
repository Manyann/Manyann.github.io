import { Fleche } from '../models/item.model';

export const getFlechesData = (): Fleche[] => {
  // ici la liste des fleches et des carreaux disponible
  // les carreaux sont uniquement pour les arbalètes,
  // les fleches uniquement pour les arcs
  // a intégrer au shop dans accessoire ou dans armes
  // ainsi que au lootbox
  // MAJ dans le but de rendre plus attrayant les personnages distances
  return [
    {
      libelle: 'Fleche de base',
      degat: '-',
      prix: 1,
      basePourcentage: 95,
      informations: 'Lot de 5',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Flèche grappin',
      degat: '-',
      prix: 5,
      basePourcentage: 90,
      informations: 'Lot de 5. Permet d’accrocher une corde',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Fleche de guerre',
      degat: '2',
      prix: 5,
      basePourcentage: 80,
      informations: 'Lot de 5',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Fleche rapide',
      degat: '-',
      prix: 5,
      basePourcentage: 80,
      informations: 'Lot de 5. ESQ -2',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Fleche jumelle',
      degat: '-',
      prix: 5,
      basePourcentage: 70,
      informations: 'Lot de 5. AD-3. Vise 2 cibles',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Flèche glacée',
      degat: '-',
      prix: 10,
      basePourcentage: 70,
      informations: 'ESQ -2 permanent',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Flèche de chasse',
      degat: '2',
      prix: 10,
      basePourcentage: 60,
      informations: 'Lot de 5. +2 dégâts contre les animaux',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Flèche incapacitante',
      degat: '-',
      prix: 15,
      basePourcentage: 60,
      informations: 'AT -2',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Flèche barbelée',
      degat: '2',
      prix: 25,
      basePourcentage: 40,
      informations: 'Inflige hémoragie',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Fleche éthérée',
      degat: '-',
      prix: 50,
      basePourcentage: 25,
      informations: 'Dégat de l arme devienne magique',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Fleche bénite',
      degat: '-',
      prix: 200,
      basePourcentage: 15,
      informations: 'Critique sur 1-10',
      categorie: {
        code: 'fleche',
        libelle: 'Fleche',
      },
    },
    {
      libelle: 'Carreau de base',
      degat: '-',
      prix: 1,
      basePourcentage: 95,
      informations: 'Lot de 5',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau de guerre',
      degat: '3',
      prix: 10,
      basePourcentage: 90,
      informations: 'Lot de 5',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau rapide',
      degat: '-',
      prix: 10,
      basePourcentage: 75,
      informations: 'Lot de 5. ESQ -2',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau éléctrique',
      degat: '-',
      prix: 15,
      basePourcentage: 70,
      informations: 'Cible: 1/4 chance lache son arme',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau de chasse',
      degat: '2',
      prix: 15,
      basePourcentage: 70,
      informations: 'Lot de 5. +2 dégâts contre les animaux',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau incapacitant',
      degat: '-',
      prix: 25,
      basePourcentage: 60,
      informations: 'Cible rate un assaut',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau triple',
      degat: '-',
      prix: 30,
      basePourcentage: 40,
      informations: 'Lot de 5. AD-3. Vise 3 cibles',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau barbelé',
      degat: '2',
      prix: 35,
      basePourcentage: 40,
      informations: 'Inflige hémoragie',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau éthérée',
      degat: '-',
      prix: 75,
      basePourcentage: 25,
      informations: 'Dégat de l arme devienne magique',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
    {
      libelle: 'Carreau bénie',
      degat: '-',
      prix: 300,
      basePourcentage: 15,
      informations: 'Critique sur 1-10',
      categorie: {
        code: 'carreau',
        libelle: 'Carreau',
      },
    },
  ];
};
