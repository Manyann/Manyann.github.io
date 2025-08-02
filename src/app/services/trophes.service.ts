import { inject, Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs, query, setDoc } from 'firebase/firestore';
import { StorageKeys, StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class TrophesService {

  constructor(
    private storage : StorageService
) {
  }
  async getTrophesMetier() : Promise<Record<string,string>>{
    return {
      'pretre': 'BRUT',
      'voleur': "De l'autre coté de la mer",
      'artiste': 'Picasso',
      'bourgeois': '92%',
      'artisant': "C'est moi qui l'ait fait",
      'ranger': 'Buzz la foudre',
      'ingenieur': "Il a encore oublié d'enlever l'armure",
      'demonologue': 'Tes HP ... nos HP',
      'guerrier': "Ma seule stat c'est force",
      'mage': 'Poudlard',
      'walkyrie': 'Comme un air de supériorité',
      'chasseur-de-monstres': 'Monster Hunter',
      'chasseur-de-tresor': 'Uncharted',
      'chasseur-de-primes': 'Marshal',
      'gladiateur': 'Maximus Decimus',
      'prestidigitateur': 'David Copperfield',
      'moine': 'Dice throne #1',
      'paladin': 'Dîme 2',
      'empoisonneur': 'Une pomme bien rouge',
      'rodeur': 'Grand pas',
      'forgeron': 'Promis je casse pas ton armure',
      'forgeur-de-runes': 'Forgeur de rêves',
      'herboriste': 'Le père du mousse',
      'artificier': 'Enzo Santorini',
      'ingenieur-automate': 'Le reveil des machines',
      'inquisiteur': 'Au bûcher',
      'soldat': 'Formation tortue',
      'berzerk': 'Tryndamère',
      'pirate': 'Sea of thieves',
      'noble': '95%',
      'seigneur': '99%',
      'templier': 'Richard coeur de lion',
      'ninja': 'Naruto sans les pouvoirs',
      'assassin': 'Ezio Auditore da Firenze',
      'corsaire': 'Piraterie réglementée',
      'conservateur': 'La nuit au musée',
      'maitre-d-armes': "Edwin til' Ilan",
      'archange': 'Envoyé des dieux',
      'celebrite': 'The YOU show',
    };
  }
  
  async getTrophesMetierBase() : Promise<Record<string,string>>{
    return {
      'pretre': 'BRUT',
      'voleur': "De l'autre coté de la mer",
      'artiste': 'Picasso',
      'bourgeois': '92%',
      'artisant': "C'est moi qui l'ait fait",
      'ranger': 'Buzz la foudre',
      'ingenieur': "Il a encore oublié d'enlever l'armure",
      'demonologue': 'Tes HP ... nos HP',
      'guerrier': "Ma seule stat c'est force",
      'mage': 'Poudlard',
      'walkyrie': 'Comme un air de supériorité'
    };
  }
  
  async getTrophesOrigines() : Promise<Record<string,string>>{
    return {
    'demi-elfe': 'Mangeur de salade marque repère',
    'elfe-sylvain': 'Mangeur de salade bio',
    'haut-elfe': 'Mangeur de salade aux truffes',
    'humain': 'Simple, basique',
    'barbare': 'Conan',
    'elfe-noir': 'Dark Sasuke',
    'orque': "Orque ...",
    'demi-orque': "1 javelot c'est bien ... 3 c'est mieux",
    'ogre': '9 Intelligence, 13 Force .. Hum',
    'centaure': '4 pattes et un gros p****',
    'homme-des-sables': 'Atréide',
    'hobbit': 'Un Sam en devenir',
    'samurai': 'Budo',
    'walkyrie': 'Comme un air de supériorité'
    };
  }

  async getTrophesOriginesMetier(): Promise<Record<string,Record<string, string>>>{
    return {
      'humain': {
        '': "C'est sur qu'on a pas de swap ?"
      },
      'orque': {
        'mage': "Combattre les stéréotypes"
      },
      'homme-des-sables': {
        'voleur': "Renforcer les stéréotypes"
      },
      'elfe-noir': {
        'demologue': "Le vrai Dark Sasuke"
      },
      'walkyrie': {
        'compagnie-du-crepuscule': "Représentant divin",
        'gardienne-de-l-aube': "Représentant divin",
        'legion-celeste': "Représentant divin"
      }
    };
  }

  async getOriginesJouees() : Promise<Record<string,number>>{
    return {
    'barbare': 0,
    'centaure': 0,
    'demi-elfe': 0,
    'demi-orque': 0,
    'elfe-sylvain': 0,
    'elfe-noir': 0,
    'haut-elfe': 0,
    'hobbit': 0,
    'homme-des-sables':0,
    'humain': 0,
    'nain': 0,
    'orque': 0,
    'ogre': 0,
    'samurai': 0,
    'walkyrie': 0
    };
  }

  async getMetiersJouees() : Promise<Record<string,number>>{
    return {
    'archange': 0,
    'archeologue': 0,
    'artificier': 0,
    'artisant': 0,
    'artiste': 0,
    'assassin': 0,
    'barbare': 0,
    'berzerk': 0,
    'bourgeois': 0,
    'celebrite': 0,
    'chasseur-de-monstres': 0,
    'chasseur-de-primes': 0,
    'chasseur-de-tresor': 0,
    'commercant': 0,
    'compagnie-du-crepuscule': 0,
    'conservateur': 0,
    'corsaire': 0,
    'demonologue': 0,
    'empoisoneur': 0,
    'forgeron': 0,
    'forgeur-de-runes': 0,
    'gardienne-de-l-aube': 0,
    'gladiateur': 0,
    'guerrier': 0,
    'herboriste': 0,
    'ingenieur': 0,
    'ingenieur-automate': 0,
    'inquisiteur': 0,
    'legion-celeste': 0,
    'mage': 0,
    'maitre-d-armes': 0,
    'moine': 0,
    'ninja': 0,
    'noble': 0,
    'paladin': 0,
    'pirate': 0,
    'prestidigitateur': 0,
    'pretre': 0,
    'ranger': 0,
    'rodeur': 0,
    'seigneur': 0,
    'soldat': 0,
    'templier': 0,
    'voleur': 0,
    'walkyrie': 0,
    };
  }

  async getTrophesComplexeClasse(
    originesJouees:Record<string,number>,
    metierJoues:Record<string,number>,
    allOrigines : DocumentData[],
    allMetiers : DocumentData[],
  ): Promise<string[]>{
    let trophes = [];

    if(originesJouees['orque'] > 0 && originesJouees['demi-orque']  > 0
      && originesJouees['ogre'] > 0){
      trophes.push('Peau verte');
    }
    if(originesJouees['elfe-sylvain'] > 0 && originesJouees['demi-elfe'] > 0
       && originesJouees['elfe-noir'] > 0 && originesJouees['haut-elfe'] > 0){
      trophes.push('Batavia, Iceberg, Roquette, Mache');
    }
    if(originesJouees['nain']  > 0 && originesJouees['hobbit'] > 0){
      trophes.push('Voir les choses en Grand');
    }
    if(metierJoues['voleur'] > 0 && metierJoues['artisant'] > 0
       && metierJoues['artiste'] > 0 && metierJoues['ingenieur'] > 0){
      trophes.push('Manuel');
    }
    if(metierJoues['mage'] > 0 && metierJoues['prestidigitateur'] > 0){
      trophes.push('La Magie sous toutes ses formes');
    }
    if(metierJoues['voleur'] > 0 && originesJouees['hobbit'] > 0){
      trophes.push('La chute dans les escaliers');
    }
    if(metierJoues['mage'] > 0 && metierJoues['pretre'] > 0
       && metierJoues['demonologue'] > 0){
      trophes.push("Un homme d'énergie");
    }
    if(metierJoues['forgeron'] > 0 && metierJoues['forgeur-de-runes'] > 0){
      trophes.push("C'est un forgeant qu'on devient forgeron");
    }
    if(originesJouees['centaure'] > 0 && originesJouees['hommes-des-sables'] > 0
       && originesJouees['samurai'] > 0 && originesJouees['walkyrie'] > 0){
      trophes.push('Contrées lointaines');
    }
    if(metierJoues['chasseur-de-primes'] > 0 && metierJoues['chasseur-de-monstres'] > 0
       && metierJoues['chasseur-de-tresor'] > 0){
      trophes.push("Apex Predator");
    }
    if(metierJoues['templier'] > 0 && metierJoues['demonologue'] > 0
       && metierJoues['inquisiteur'] > 0 && metierJoues['compagnie-du-crepuscule'] > 0){
      trophes.push('Purificateur');
    }

    if(allOrigines.length == Object.values(originesJouees).filter(value => value > 0).length){
      trophes.push('Joueur du monde');
    }
    if(Object.keys(await this.getTrophesMetierBase()).length == Object.values(metierJoues).filter(value => value > 0).length){
      trophes.push('Polyvalent');
    }
    if(Object.values(originesJouees).filter(value => value >= 10).length > 0){
      trophes.push('Le fidèle');
    }
    if(Object.values(metierJoues).filter(value => value >= 10).length > 0){
      trophes.push("L'Alpha et l'Oméga");
    }
    if(allOrigines.length == Object.values(originesJouees).filter(value => value > 0).length &&
    allMetiers.length == Object.values(metierJoues).filter(value => value > 0).length){
      trophes.push('1001 vies');
    }
    
    
    return [];
  }

}
