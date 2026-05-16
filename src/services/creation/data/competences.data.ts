import { CodeLibelle } from '../../../component/model/code-libelle';

export interface CompetenceRecap {
  nom: string;
  branche: string;
  categorie: string;
  cout?: string;
  lancement?: string;
  cible?: string;
  test?: string;
  effet: string;
  condition?: string;
  niveau?: number | string;
}

export interface MecaRecap {
  nom: string;
  branche: string;
  hp: number;
  pr: number;
  attaque: number;
  parade: number;
  effet: string;
  icon: string;
}

export function createBasiqueCompetences(): Array<CodeLibelle> {
  return [
    {
      code: 'AM',
      libelle: 'Ambidextrie',
    },
    {
      code: 'AG',
      libelle: 'Agoraphobie',
    },
    {
      code: 'ADR',
      libelle: 'Appel des renforts',
    },
    {
      code: 'ADT',
      libelle: 'Appel du tonneau',
    },
    {
      code: 'ADV',
      libelle: 'Appel du ventre',
    },
    {
      code: 'ADB',
      libelle: 'Armes de bourrin',
    },
    {
      code: 'AEC',
      libelle: 'Arnaques et carambouilles',
    },
    {
      code: 'ALM',
      libelle: 'Attire les monstres',
    },
    {
      code: 'BP',
      libelle: 'Bourre pif',
    },
    {
      code: 'BDD',
      libelle: 'Bricolo du dimanche',
    },
    {
      code: 'CDG',
      libelle: 'Chef de groupe',
    },
    {
      code: 'CDN',
      libelle: 'Chercher des noises',
    },
    {
      code: 'CH',
      libelle: 'Chevaucher',
    },
    {
      code: 'CHO',
      libelle: 'Chouraver',
    },
    {
      code: 'CLA',
      libelle: 'Comprendre les animaux',
    },
    {
      code: 'CU',
      libelle: 'Cuistot',
    },
    {
      code: 'DS',
      libelle: 'Déplacement silencieux',
    },
    {
      code: 'DE',
      libelle: 'Désamorcer',
    },
    {
      code: 'DET',
      libelle: 'Détecter',
    },
    {
      code: 'ER',
      libelle: 'Erudition',
    },
    {
      code: 'ES',
      libelle: 'Escalader',
    },
    {
      code: 'FA',
      libelle: 'Fariboles',
    },
    {
      code: 'FDP',
      libelle: 'Fouiller dans les poubelles',
    },
    {
      code: 'IDS',
      libelle: 'Instinct de survie',
    },
    {
      code: 'IDT',
      libelle: 'Instinct du trésor',
    },
    {
      code: 'IN',
      libelle: 'Intimider',
    },
    {
      code: 'JED',
      libelle: 'Jonglage et danse',
    },
    {
      code: 'LDM',
      libelle: 'Langage des monstres',
    },
    {
      code: 'ME',
      libelle: 'Méfiance',
    },
    {
      code: 'MEP',
      libelle: 'Mendier et pleurnicher',
    },
    {
      code: 'NA',
      libelle: 'Nager',
    },
    {
      code: 'NT',
      libelle: 'Naïveté touchante',
    },
    {
      code: 'PE',
      libelle: 'Pénible',
    },
    {
      code: 'PI',
      libelle: 'Pister',
    },
    {
      code: 'PS',
      libelle: 'Premier soins',
    },
    {
      code: 'RA',
      libelle: 'Radin',
    },
    {
      code: 'RE',
      libelle: 'Récupération',
    },
    {
      code: 'RAR',
      libelle: 'Ressemble à rien',
    },
    {
      code: 'RB',
      libelle: 'Rûnes bizarres',
    },
    {
      code: 'SDP',
      libelle: 'Sentir des pieds',
    },
    {
      code: 'SE',
      libelle: 'Serrurier',
    },
    {
      code: 'TV',
      libelle: 'Tête vide',
    },
    {
      code: 'TC',
      libelle: 'Tirer correctement',
    },
    {
      code: 'TDP',
      libelle: 'Tomber dans les pièges',
    },
    {
      code: 'TDM',
      libelle: 'Truc de mauviette',
    },
    {
      code: 'ADB*',
      libelle: '6 : Armes de bourrins',
    },
    {
      code: 'AM*',
      libelle: '6 : Ambidextrie',
    },
    {
      code: 'DS*',
      libelle: '6 : Déplacement silencieux',
    },
    {
      code: 'JED',
      libelle: '6 : Jonglage et danse',
    },
    {
      code: 'PS*',
      libelle: '6 : Premier soins',
    },
    {
      code: 'TC*',
      libelle: '6 : Tirer correctement',
    },
    {
      code: 'TDM*',
      libelle: '6 : Truc de mauviette',
    },
  ];
}

export function competencesWalkyrie(): Array<CompetenceRecap> {
  return [
    {
      nom: 'Soin des blessures légères',
      branche: 'Walkyrie',
      categorie: 'soutien',
      cout: 'X EV',
      lancement: 'Immédiat',
      cible: 'Allié uniquement',
      effet: 'Rend X/2 + 2 EV.',
      condition: 'X entre 4 et 10',
      test: 'Magie Psy',
    },
    {
      nom: 'Pomme lumineuse',
      branche: 'Walkyrie',
      categorie: 'utilitaire',
      cout: '1 EV / heure',
      lancement: 'Immédiat',
      test: 'Magie Psy +4',
      effet:
        'Crée un halo de lumière depuis ses mains, jusqu’à ce que les mains soient refermées.',
    },
    {
      nom: 'Rayon de lumière',
      branche: 'Walkyrie',
      categorie: 'attaque',
      cout: 'X EV',
      lancement: 'Immédiat',
      test: 'Magie Phy +2',
      effet: 'Inflige 1D10 + X/2 dégâts.',
      cible: 'Ennemi',
    },
    {
      nom: 'Laser purificateur',
      branche: 'Compagnie du crépuscule',
      categorie: 'attaque',
      cout: 'X EV',
      lancement: 'Immédiat',
      test: 'Magie Phy + 2',
      cible: 'Ennemis',
      effet: 'Inflige 2D + X/2 dégâts magiques aux ennemis en ligne.',
    },
    {
      nom: 'Courroux du ciel',
      branche: 'Compagnie du crépuscule',
      categorie: 'attaque',
      cout: 'X EV',
      test: 'Magie Psy + 2',
      lancement: 'Immédiat',
      cible: 'Ennemi',
      effet: 'Inflige X dégâts magiques.',
    },
    {
      nom: 'Arme céleste',
      branche: 'Légion céleste',
      categorie: 'amélioration',
      cout: 'X EV',
      test: 'Magie Phy',
      cible: 'Allié',
      lancement: 'Immédiat',
      effet:
        'Les dégâts de l’arme de la cible deviennent magiques pendant X/5 attaques.',
    },
    {
      nom: 'Protection divine',
      branche: 'Légion céleste',
      categorie: 'soutien',
      cout: 'Magie X EV',
      effet: 'Tous les alliés gagnent X/7 PR.',
      cible: 'Alliés',
      lancement: 'Immédiat',
      test: 'Magie Phy',
    },
    {
      nom: 'Soin des blessures majeures',
      branche: 'Gardienne de l’aube',
      categorie: 'soutien',
      cout: 'X EV',
      lancement: 'Immédiat',
      cible: 'Allié',
      effet: 'Rend X/2 + 6 EV.',
      condition: 'X entre 4 et 50',
      test: 'Magie Psy',
    },
    {
      nom: 'Bouclier de paix',
      branche: 'Gardienne de l’aube',
      categorie: 'protection',
      cout: 'X EV',
      lancement: 'Immédiat',
      test: 'Magie Psy',
      cible: 'Allié',
      effet: 'Crée un bouclier qui absorbe tous les dégâts pendant X/5 tours.',
    },
    {
      nom: 'Jugement divin',
      branche: 'Archange',
      categorie: 'attaque',
      cout: 'X EV',
      lancement: 'Immédiat',
      cible: 'Ennemis',
      effet: 'X dégats magique.',
      test: 'Magie Psy',
    },
    {
      nom: 'Grâce du ciel',
      branche: 'Archange',
      categorie: 'soutien',
      cout: 'Tombe à 15EV',
      lancement: 'Immédiat',
      test: 'Magie Psy',
      cible: 'Allié',
      effet: 'Réssucite un allié. Perd 15EV initial et une cara.',
    },
  ];
}

export function competencesDemonologue(): Array<CompetenceRecap> {
  return [
    {
      nom: 'Transfert maudit',
      branche: 'Démonologue',
      categorie: 'attaque',
      cout: '2 EV',
      effet: 'Inflige 1D6+1 dégâts.',
      niveau: 1,
    },
    {
      nom: 'Échange macabre',
      branche: 'Démonologue',
      categorie: 'soutien',
      cout: '2 EV',
      cible: 'Allié',
      effet: 'Rend 1D4+1 EV à un allié.',
      niveau: 1,
    },
    {
      nom: 'Voir les esprits',
      branche: 'Démonologue',
      categorie: 'utilitaire',
      cout: '2 EV',
      effet: 'Permet de voir les esprits aux alentours.',
      niveau: 1,
    },
    {
      nom: 'Exorcisme',
      branche: 'Démonologue',
      categorie: 'utilitaire',
      cout: '4 EV',
      test: 'Magie Psy',
      effet: 'Permet de mettre fin à une possession.',
      niveau: 2,
    },
    {
      nom: 'Antivenum',
      branche: 'Démonologue',
      categorie: 'soin',
      cout: '4 EV',
      test: 'Magie Psy',
      effet: 'Retire les effets d’un poison.',
      niveau: 2,
    },
    {
      nom: 'Contrôle démoniaque',
      branche: 'Démonologue',
      categorie: 'contrôle',
      cout: '10 EV',
      test: 'Magie Phy -2',
      effet: 'Permet de contrôler un petit esprit, démon ou équivalent.',
      niveau: 3,
    },
    {
      nom: 'Démystification',
      branche: 'Démonologue',
      categorie: 'affaiblissement',
      cout: '10 EV',
      test: 'Magie Phy',
      effet: 'Tous les esprits, démons ou équivalents subissent Armure -2.',
      niveau: 3,
    },
    {
      nom: 'Crucifix',
      branche: 'Démonologue',
      categorie: 'attaque',
      cout: '10 EV',
      test: 'Magie Psy',
      effet: 'Inflige 3D + 2 dégâts à un esprit, démon ou équivalent.',
      niveau: 3,
    },
    {
      nom: 'Clarentification',
      branche: 'Démonologue',
      categorie: 'amélioration',
      cout: '5 EV de l’EV initial',
      lancement: 'Hors combat',
      test: 'Magie Psy +3',
      effet:
        'Maudit une arme. Elle gagne +5 dégâts bruts, mais inflige 1D4 dégâts à son porteur.',
      niveau: 4,
    },
    {
      nom: 'Va de retro satanas',
      branche: 'Démonologue',
      categorie: 'sacrifice',
      test: 'Magie Psy',
      effet:
        'Un allié perd 50% de sa vie et un ennemi perd 50% de sa vie. En cas d’échec, l’allié perd seulement 10% de sa vie.',
      niveau: 5,
    },
    {
      nom: 'Contrôle démoniaque supérieur',
      branche: 'Démonologue',
      categorie: 'contrôle',
      cout: '20 EV',
      effet: 'Permet de contrôler un grand esprit, démon ou équivalent.',
      niveau: 6,
    },
    {
      nom: 'Archange Gabriel',
      branche: 'Démonologue',
      categorie: 'soutien',
      cible: 'Allié, autre allié ou soi-même',
      effet:
        'Un allié perd 1D6 EV initiale. Un autre allié ou soi-même récupère 6D + 6 EV.',
      niveau: 8,
    },
  ];
}

export function competencesForgeurDeRunes(): Array<CompetenceRecap> {
  return [
    {
      nom: 'Rune de feu',
      branche: 'Forgeur de runes',
      categorie: 'enchantement',
      cout: '2 EA initiale',
      test: undefined,
      effet:
        'Appose une rune de feu sur une arme. L’arme gagne +1D dégâts de feu brut.',
      niveau: 4,
    },
    {
      nom: 'Rune de solidité',
      branche: 'Forgeur de runes',
      categorie: 'enchantement',
      cout: '2 EA initiale',
      effet: 'Une pièce d’armure gagne Armure +1.',
      niveau: 4,
    },
    {
      nom: 'Rune de protection',
      branche: 'Forgeur de runes',
      categorie: 'protection',
      cout: '4 EA',
      test: 'Magie Phy +2',
      lancement: 'Durée combat',
      effet: 'Confère Protection +2.',
      niveau: 4,
    },
    {
      nom: 'Rune de protection magique',
      branche: 'Forgeur de runes',
      categorie: 'protection',
      cout: '4 EA',
      test: 'Magie Psy +2',
      lancement: 'Durée combat',
      effet: 'Confère Protection +2 contre les sorts.',
      niveau: 4,
    },
    {
      nom: 'Rune d’essence',
      branche: 'Forgeur de runes',
      categorie: 'enchantement',
      cout: '2 EA initiale',
      test: 'Magie Phy',
      effet: 'Donne une protection contre un élément à une arme ou une armure.',
      niveau: 5,
    },
    {
      nom: 'Rune de combat',
      branche: 'Forgeur de runes',
      categorie: 'soutien',
      cout: '3 EA',
      cible: 'Tous les alliés',
      test: 'Magie Phy +2',
      lancement: '4 assauts',
      effet: 'Tous les alliés gagnent Dégâts +2.',
      niveau: 5,
    },
    {
      nom: 'Rune d’absorption',
      branche: 'Forgeur de runes',
      categorie: 'conversion',
      test: 'Magie Psy +2',
      effet: 'Transforme autant d’EV initiale que voulu en EA initiale.',
      niveau: 5,
    },
    {
      nom: 'Rune de renforcement',
      branche: 'Forgeur de runes',
      categorie: 'enchantement',
      cout: '4 EA',
      test: 'Magie Psy +2',
      lancement: 'Durée combat',
      effet: 'Rend une arme indestructible.',
      niveau: 6,
    },
    {
      nom: 'Rune des os',
      branche: 'Forgeur de runes',
      categorie: 'enchantement',
      cout: '3 EA initiale',
      test: 'Magie Phy',
      effet: 'Confère PR naturel +1.',
      niveau: 6,
    },
    {
      nom: 'Rune d’invulnérabilité',
      branche: 'Forgeur de runes',
      categorie: 'protection',
      cout: '8 EA',
      test: 'Magie Phy',
      lancement: '6 assauts',
      effet: 'Confère PR +8.',
      niveau: 7,
    },
    {
      nom: 'Rune de mort',
      branche: 'Forgeur de runes',
      categorie: 'critique',
      cout: '4 EA initiale',
      test: 'Magie Psy',
      effet: "Confère +1 à l'intensité des critiques.",
      niveau: 8,
    },
    {
      nom: 'Rune de vie',
      branche: 'Forgeur de runes',
      categorie: 'critique',
      cout: '7 EA initiale',
      test: 'Magie Psy',
      effet: 'Critique de 1 à 2.',
      niveau: 8,
    },
  ];
}

export function competencesIngenieur(): Array<MecaRecap> {
  return [
    {
      nom: 'Doc',
      branche: 'Méca',
      hp: 15,
      pr: 0,
      attaque: 0,
      parade: 3,
      effet: 'Rend 1D6 EV à 1 allié.',
      icon: 'pi-heart',
    },
    {
      nom: 'Tanker',
      branche: 'Méca',
      hp: 35,
      pr: 3,
      attaque: 0,
      parade: 7,
      effet: 'Taunt 1 ennemi pendant 2 tours.',
      icon: 'pi-shield',
    },
    {
      nom: 'Combat',
      branche: 'Méca',
      hp: 22,
      pr: 1,
      attaque: 7,
      parade: 10,
      icon: 'pi-bolt',
      effet: 'Attaque 1 ennemi, tranchant 1D+6.',
    },
    {
      nom: 'Support',
      branche: 'Méca',
      hp: 12,
      pr: 1,
      attaque: 0,
      parade: 0,
      icon: 'pi-flag',
      effet:
        'Donne AT ou PRD +1 à 1 allié jusqu’à destruction ou changement d’allié.',
    },

    {
      nom: 'Doc',
      branche: 'Supplément 1',
      hp: 20,
      pr: 1,
      attaque: 0,
      parade: 5,
      effet: 'Rend 1D6+3 EV à 1 allié.',
      icon: 'pi-heart',
    },
    {
      nom: 'Tanker',
      branche: 'Supplément 1',
      hp: 45,
      pr: 4,
      attaque: 0,
      parade: 7,
      icon: 'pi-shield',
      effet:
        'Taunt 1 ennemi pendant 2 tours. +1 PR à l’allié le plus proche tant que le méca est en vie.',
    },
    {
      nom: 'Combat',
      branche: 'Supplément 1',
      hp: 28,
      pr: 2,
      attaque: 9,
      parade: 11,
      icon: 'pi-bolt',
      effet: 'Attaque 1 ennemi, tranchant 2D+3.',
    },
    {
      nom: 'Support',
      branche: 'Supplément 1',
      hp: 16,
      pr: 2,
      attaque: 0,
      parade: 2,
      icon: 'pi-flag',
      effet:
        'Donne AT ou PRD +2 à 1 allié jusqu’à destruction ou changement d’allié.',
    },

    {
      nom: 'Doc',
      branche: 'Supplément 2',
      hp: 25,
      pr: 2,
      attaque: 0,
      parade: 7,
      effet: 'Rend 10 EV et 3 EA à 1 allié.',
      icon: 'pi-heart',
    },
    {
      nom: 'Tanker',
      branche: 'Supplément 2',
      hp: 55,
      pr: 6,
      attaque: 0,
      parade: 7,
      icon: 'pi-shield',
      effet:
        'Taunt 1 ennemi pendant 2 tours. +1 PR aux 2 alliés les plus proches tant que le méca est en vie.',
    },
    {
      nom: 'Combat',
      branche: 'Supplément 2',
      hp: 34,
      pr: 3,
      attaque: 12,
      parade: 12,
      icon: 'pi-bolt',
      effet: 'Attaque l’ennemi ciblé, tranchant 1D+7, Ambidextrie.',
    },
    {
      nom: 'Support',
      branche: 'Supplément 2',
      hp: 18,
      pr: 3,
      attaque: 0,
      parade: 4,
      icon: 'pi-flag',
      effet:
        'Donne AT ou PRD +2 et FO +1 à 1 allié jusqu’à destruction ou changement d’allié.',
    },
  ];
}

export function competencesPretre(): Array<CompetenceRecap> {
  return [
    // ORDRE DE L'HARMONIE - SOLEIL
    {
      nom: 'Baiser de chaleur',
      branche: "Ordre de l'harmonie",
      categorie: 'soin',
      cout: '2 PA',
      cible: 'Allié',
      test: 'PS',
      effet: 'Rend 1D + niveau EV.',
      niveau: 'soleil',
    },
    {
      nom: 'Bronzage',
      branche: "Ordre de l'harmonie",
      categorie: 'soutient',
      cout: '4 PA',
      cible: 'Groupe',
      test: 'PS',
      effet: 'Confère +1 COU, +1 CHA et +1 FO.',
      niveau: 'soleil',
    },
    {
      nom: 'Brûlure',
      branche: "Ordre de l'harmonie",
      categorie: 'degat',
      cout: '2 PA',
      test: 'PH',
      effet: 'Inflige 1D + 4 + niveau dégâts.',
      niveau: 'soleil',
    },

    // LUMIÈRE
    {
      nom: 'Lumière apaisante',
      branche: "Ordre de l'harmonie",
      categorie: 'soin',
      cout: '5 PA',
      cible: 'Groupe',
      test: 'PS',
      effet: 'Rend 1D + 2 + niveau EV.',
      niveau: 'lumiere',
    },
    {
      nom: 'Disque de lumière',
      branche: "Ordre de l'harmonie",
      categorie: 'degat',
      cout: '6 PA',
      test: 'PH',
      niveau: 'lumiere',
      effet:
        'Inflige niveau × 3 dégâts à tous les personnages faisant face à la source de lumière.',
    },
    {
      nom: 'Être de lumière',
      branche: "Ordre de l'harmonie",
      categorie: 'soutient',
      cout: 'X PA',
      cible: 'Allié',
      test: 'PS',
      effet: 'Rend la cible insensible à la magie.',
      condition: 'DS : X - 1',
      niveau: 'lumiere',
    },

    // HARMONIE
    {
      nom: 'Équilibre parfait',
      branche: "Ordre de l'harmonie",
      categorie: 'autre',
      cout: '8 PA',
      test: 'PS',
      niveau: 'harmonie',
      effet:
        'La vie de tous les personnages vivants du combat est réinitialisée à 1D100.',
    },
    {
      nom: 'Alternative',
      branche: "Ordre de l'harmonie",
      categorie: 'degat',
      cout: '7 PA',
      test: 'PH',
      effet: 'Inflige 3D + 3 + niveau dégâts.',
      niveau: 'harmonie',
    },
    {
      nom: 'Zone de jugement',
      branche: "Ordre de l'harmonie",
      categorie: 'degat',
      cout: '9 + X PA',
      cible: 'X + 1',
      test: 'PS',
      effet: 'Inflige 3D + 3 + niveau dégâts.',
      niveau: 'harmonie',
    },

    // ORDRE DU NÉANT - LUNE
    {
      nom: 'Être nocturne',
      branche: 'Ordre du néant',
      categorie: 'amelioration',
      effet: 'La nuit, gagne niveau / 2 PR.',
      niveau: 'lune',
    },
    {
      nom: 'Croissant de lune',
      branche: 'Ordre du néant',
      categorie: 'degat',
      cout: '3 PA',
      test: 'PH',
      niveau: 'lune',
      effet:
        'Inflige 3 + niveau dégâts bruts. Les PV retirés sont transférés à un allié ou à soi-même.',
    },
    {
      nom: 'Pleine lune',
      branche: 'Ordre du néant',
      categorie: 'degat',
      cout: '2 PA',
      test: 'PH',
      effet: 'Inflige 1D + 4 + niveau dégâts.',
      niveau: 'lune',
    },

    // NUIT
    {
      nom: 'Maître de la nuit',
      branche: 'Ordre du néant',
      categorie: 'amelioration',
      effet: 'La nuit, gagne +15 EV et +2 AT/PRD.',
      niveau: 'nuit',
    },
    {
      nom: 'Noirceur',
      branche: 'Ordre du néant',
      categorie: 'autre',
      cout: 'X + 2 PA',
      test: 'PS',
      effet: 'La nuit s’installe sur la zone de combat.',
      condition: 'DS : X',
      niveau: 'nuit',
    },
    {
      nom: 'Attrape lumière',
      branche: 'Ordre du néant',
      categorie: 'degat',
      cout: '4 PA',
      cible: 'Ennemi',
      test: 'PS',
      niveau: 'nuit',
      effet:
        'Inflige 2D + 3 dégâts et applique -1 COU, -1 FO. Effet cumulable 3 fois.',
    },

    // NÉANT
    {
      nom: 'Frappe du néant',
      branche: 'Ordre du néant',
      categorie: 'degat',
      cout: 'X PA',
      cible: 'Ennemis',
      test: 'PS',
      niveau: 'néant',
      effet:
        'Inflige 3X dégâts. Les ennemis touchés ratent leur prochain assaut.',
    },
    {
      nom: 'Aspiration du néant',
      branche: 'Ordre du néant',
      categorie: 'affaiblissement',
      cout: '6 PA',
      test: 'PS',
      niveau: 'néant',
      effet:
        'La cible part dans le néant et revient avec +1 à toutes les caractéristiques.',
      condition: 'DS : 4',
    },
    {
      nom: 'Plan parallèle',
      branche: 'Ordre du néant',
      categorie: 'autre',
      cout: '5 PA',
      test: 'PS',
      effet: 'Deux cibles se retrouvent seules dans le néant.',
      condition: 'DS : 5',
      niveau: 'néant',
    },

    // ORDRE DU CYCLE ÉTERNEL - VIE
    {
      nom: 'Soin',
      branche: 'Ordre du cycle éternel',
      categorie: 'soin',
      cout: '2 PA',
      cible: 'Allié',
      test: 'PS',
      effet: 'Rend 5 PV + niveau.',
      niveau: 'vie',
    },
    {
      nom: 'Soin de groupe',
      branche: 'Ordre du cycle éternel',
      categorie: 'soin',
      cout: '3 PA',
      cible: 'Groupe',
      test: 'PS',
      effet: 'Rend 3 PV + niveau.',
      niveau: 'vie',
    },
    {
      nom: 'Scalpel',
      branche: 'Ordre du cycle éternel',
      categorie: 'degat',
      cout: '2 + (niveau - 1 × 2) PA',
      test: 'PS',
      effet: 'Inflige 1D par niveau.',
      niveau: 'vie',
    },

    // MORT
    {
      nom: 'Infection',
      branche: 'Ordre du cycle éternel',
      categorie: 'affaiblissement',
      cout: '1 PA',
      test: 'PS',
      effet: 'Applique une infection inesquivable.',
      niveau: 'mort',
    },
    {
      nom: 'Nécrose',
      branche: 'Ordre du cycle éternel',
      categorie: 'degat',
      cout: '2 PA',
      test: 'PS',
      niveau: 'mort',
      effet: 'Déclenche toutes les infections. 4 brut par infection',
    },
    {
      nom: 'Invoque un faucheur',
      branche: 'Ordre du cycle éternel',
      categorie: 'soutient',
      cout: '10 PA',
      test: 'PH',
      niveau: 'mort',
      effet:
        'Invoque un faucheur infligeant 1D + 5 dégâts. Si la cible est touchée 3 fois, elle meurt et l’XP est perdu. Le faucheur est inattaquable.',
    },

    // CYCLE
    {
      nom: 'Le mana devient de la vie',
      branche: 'Ordre du cycle éternel',
      categorie: 'soutient',
      cout: 'X PA',
      cible: 'Allié',
      test: 'PH',
      effet: 'Transforme X mana en 3X vie.',
      niveau: 'cycle',
    },
    {
      nom: "Invoque la balance de l'univers",
      branche: 'Ordre du cycle éternel',
      categorie: 'degat',
      cout: '7 PA',
      test: 'PS',
      niveau: 'cycle',
      effet:
        'Inflige ou rend 3D. Alterne entre rendre de la vie aux alliés et aux ennemis.',
    },
    {
      nom: "L'équilibre du cycle",
      branche: 'Ordre du cycle éternel',
      categorie: 'autre',
      cout: '4 PA initial',
      test: 'PS',
      effet: 'Ressuscite un allié et un ennemi aléatoire.',
      niveau: 'cycle',
    },

    // ORDRE DU DESTIN - CHANCE
    {
      nom: 'Jetons',
      branche: 'Ordre du destin',
      categorie: 'amelioration',
      cout: '2 PA',
      test: 'PS',
      effet: 'Gagne 3 jetons.',
      niveau: 'chance',
    },
    {
      nom: '2ème essai',
      branche: 'Ordre du destin',
      categorie: 'soutient',
      test: 'PS',
      niveau: 'chance',
      effet: 'Passif : peut utiliser un jeton pour faire relancer un dé 6.',
    },
    {
      nom: 'Fortuna',
      branche: 'Ordre du destin',
      categorie: 'degat',
      cout: '3 PA',
      cible: 'Alliés',
      test: 'PS',
      niveau: 'chance',
      effet: '2 jetons -2 dégâts et 2 jetons +2 dégâts, répartis au hasard.',
    },

    // KARMA
    {
      nom: 'Machine à jetons',
      branche: 'Ordre du destin',
      categorie: 'soutient',
      cout: '2 PA',
      cible: 'Ennemi',
      niveau: 'karma',
      test: 'PS',
      effet: 'Gagne 1D6+1 jetons.',
    },
    {
      nom: 'Retour de flamme',
      branche: 'Ordre du destin',
      categorie: 'soutient',
      cout: '5 PA',
      test: 'PH',
      niveau: 'karma',
      effet: 'Un allié renvoie la moitié des dégâts reçus.',
      condition: 'DS : 5',
    },
    {
      nom: 'Roulettes',
      branche: 'Ordre du destin',
      categorie: 'degat',
      cout: '6 PA',
      test: 'PH',
      niveau: 'karma',
      effet: 'Lance X jetons, chacun infligeant 5 dégâts imparables.',
    },

    // DESTIN
    {
      nom: 'Distributeur de jeton',
      branche: 'Ordre du destin',
      categorie: 'degat',
      cout: '8 PA',
      cible: 'Ennemis',
      test: 'PS',
      niveau: 'destin',
      effet: 'Lance X jetons, chacun infligeant 8 dégâts imparables.',
    },
    {
      nom: 'Ma destinée',
      branche: 'Ordre du destin',
      categorie: 'autre',
      test: 'PS',
      niveau: 'destin',
      effet:
        'Passif : à la fin de chaque combat, gagne un bon point ou un mauvais point.',
    },
    {
      nom: "Ce n'est pas mon heure",
      branche: 'Ordre du destin',
      categorie: 'autre',
      test: 'PS',
      niveau: 'destin',
      effet:
        'Passif : à la mort du joueur, sur 1, 2 ou 3 au D20, il reste à 1 HP.',
    },
  ];
}
