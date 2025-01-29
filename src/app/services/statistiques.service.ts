import { Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { EnnemiHelper, Mob } from '../../component/model/ennemi';
import { CodeValeur } from '../../component/model/code-libelle';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  constructor(public firestore: Firestore) { }



  async getOrigines(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    let origines = (await getDocs(query(collection(this.firestore,'origines')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    if(joueur !== ""){
      heros = heros.filter(x=>x['code_joueur'] == joueur);
    }

    heros.forEach((hero) =>{
      libelle = origines.find(x=>x['code'] == hero['origine'])!['libelle'] ?? hero['origine'];
      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getMetier(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    let metiers = (await getDocs(query(collection(this.firestore,'metiers')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    if(joueur !== ""){
      heros = heros.filter(x=>x['code_joueur'] == joueur);
    }

    heros.forEach((hero) =>{
      libelle = metiers.find(x=>x['code'] == hero['metier'])!['libelle'] ?? hero['metier'];
      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });
    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getArmes(){
    let herosArmes = (await getDocs(query(collection(this.firestore,'heros_armes')))).docs.map((entries) => entries.data());
    let armes = (await getDocs(query(collection(this.firestore,'armes')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    herosArmes.forEach((heroArme) =>{
      libelle = armes.find(x=>x['code'] == heroArme['arme_code'])!['libelle'] ?? heroArme['arme_code'];
      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getArmures(){
    let herosArmes = (await getDocs(query(collection(this.firestore,'heros_armures')))).docs.map((entries) => entries.data());
    let armures = (await getDocs(query(collection(this.firestore,'armures')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    herosArmes.forEach((heroArme) =>{
      libelle = armures.find(x=>x['code'] == heroArme['armure_code'])!['libelle'] ?? heroArme['armure_code'];

      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getCrits(){
    let critiques = (await getDocs(query(collection(this.firestore,'heros_critiques')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    critiques.forEach((critique) =>{
      if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
        statistiques.push({code:critique['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getEchecCrits(){
    let echecs = (await getDocs(query(collection(this.firestore,'heros_echecs')))).docs.map((entries) => entries.data());
    let statistiques : CodeValeur[] = [];

    echecs.forEach((critique) =>{
      if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
        statistiques.push({code:critique['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getDegatsTotaux(){
    let degats = (await getDocs(query(collection(this.firestore,'heros_degats')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    degats.forEach((degat) =>{
      if(statistiques.find(x=>x.code == degat['hero_nom']) === undefined){
        statistiques.push({code:degat['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == degat['hero_nom'])!.valeur +=degat['intensite'];
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getDegatsMax(){
    let degats = (await getDocs(query(collection(this.firestore,'heros_degats')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    degats.forEach((degat) =>{
      if(statistiques.find(x=>x.code == degat['hero_nom']) === undefined){
        statistiques.push({code:degat['hero_nom'],valeur:0});
      }
      if(statistiques.find(x=>x.code == degat['hero_nom'])!.valeur < degat['intensite']){
        statistiques.find(x=>x.code == degat['hero_nom'])!.valeur = degat['intensite'];
      }
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getOrs(){
    let transactions = (await getDocs(query(collection(this.firestore,'heros_transactions')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    transactions.forEach((transaction) =>{
      if(statistiques.find(x=>x.code == transaction['hero_nom']) === undefined){
        statistiques.push({code:transaction['hero_nom'],valeur:0});
      }
      if(transaction['or'] < 0){
        statistiques.find(x=>x.code == transaction['hero_nom'])!.valeur +=transaction['or'];
      }
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getKms(){
    let heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    heros.forEach((hero) =>{
      if(statistiques.find(x=>x.code == hero['nom']) === undefined){
        statistiques.push({code:hero['nom'],valeur:0});
      }
      statistiques.find(x=>x.code == hero['nom'])!.valeur +=hero['km'];
      
    });
    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }
  
  async getEnnemis(){
    let herosmobs = (await getDocs(query(collection(this.firestore,'heros_mobs')))).docs.map((entries) => entries.data());
    let mobs = (await getDocs(query(collection(this.firestore,'mobs')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    mobs.forEach((mob) => {
      statistiques.push({code:mob['libelle'],valeur:0})
      herosmobs.forEach((heromob) =>{
        if(heromob[mob['code']]!== undefined){
          statistiques.find(x=>x.code == mob['libelle'])!.valeur +=heromob[mob['code']];
        }
      });
    });
    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getJoueurStatistique(joueur:string){
    let statistiques : JoueurStatistique = {
      origine: await this.getOrigineJoueur(joueur),
      metier: await this.getMetierJoueur(joueur),
      heroCritiques: await this.getHeroCritiqueJoueur(joueur),
      heroEchecs : await this.getHeroEchecsJoueur(joueur),
      level: await this.getMaxLevelJoueur(joueur),
      nombrePersonnage : await this.getPersoCountJoueur(joueur),
      totalCritiques : await this.getTotalCritiquesJoueur(joueur),
      totalEchecs : await this.getTotalEchecsJoueur(joueur),
      totalDegats : await this.getTotalDegatsJoueur(joueur),
      totalEnnemis : await this.getTotalEnnemisJoueur(joueur),
    };

    return statistiques;
  }

  async getOrigineJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    let origines = (await getDocs(query(collection(this.firestore,'origines')))).docs.map((entries) => entries.data());

    let libelle = "";
    let originesCount : { [key: string]: number } = {};

    for (const hero of heros) {
      libelle = origines.find(x=>x['code'] == hero['origine'])!['libelle'] ?? hero['origine'];
      if(!(libelle in originesCount)){
        originesCount[libelle] = 0;
      }
      originesCount[libelle] = originesCount[libelle] +1;
    }

    let maxValue = -Infinity;
    let maxKey: string | null = null;
    for (const key in originesCount) {
      if (originesCount[key] > maxValue) {
        maxValue = originesCount[key];
        maxKey = key;
      }
    }

    return maxKey + " ( " + maxValue + " )" ;
  }

  async getMetierJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    let origines = (await getDocs(query(collection(this.firestore,'metiers')))).docs.map((entries) => entries.data());

    let libelle = "";
    let originesCount : { [key: string]: number } = {};

    for (const hero of heros) {
      libelle = origines.find(x=>x['code'] == hero['metier'])!['libelle'] ?? hero['metier'];
      if(originesCount[libelle] === undefined){
        originesCount[libelle] = 0;
      }
      originesCount[libelle] = originesCount[libelle] +1;
    }

    let maxValue = -Infinity;
    let maxKey: string | null = null;
    for (const key in originesCount) {
      if (originesCount[key] > maxValue) {
        maxValue = originesCount[key];
        maxKey = key;
      }
    }

    return maxKey + " ( " + maxValue + " )" ;
  }

  async getHeroCritiqueJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    
    let heroNom = "";
    let critiqueCount = 0;
    let currentHeroNom = "";
    let currentCritiqueCount = 0;

    for (const hero of heros) {
      currentHeroNom = hero['nom'];
      let heroCritiques = (await getDocs(query(collection(this.firestore,'heros_critiques'),where('hero_nom','==',hero['nom'])))).docs.map((entries) => entries.data());
      currentCritiqueCount = heroCritiques.length;
      if(currentCritiqueCount > critiqueCount){
        critiqueCount = currentCritiqueCount;
        heroNom = currentHeroNom;
      }
    }

    return heroNom + " ( " + critiqueCount + " )";
  }

  async getHeroEchecsJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    
    let heroNom = "";
    let critiqueCount = 0;
    let currentHeroNom = "";
    let currentCritiqueCount = 0;

    for (const hero of heros) {
      currentHeroNom = hero['nom'];
      let heroCritiques = (await getDocs(query(collection(this.firestore,'heros_echecs'),where('hero_nom','==',hero['nom'])))).docs.map((entries) => entries.data());
      currentCritiqueCount = heroCritiques.length;
      if(currentCritiqueCount > critiqueCount){
        critiqueCount = currentCritiqueCount;
        heroNom = currentHeroNom;
      }
    }

    return heroNom + " ( " + critiqueCount + " )";
  }

  async getMaxLevelJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    
    let heroNom = "";
    let maxLevel = 0;
    let currentHeroNom = "";
    let currentLevel = 0;

    heros.forEach(async (hero) =>{
      currentHeroNom = hero['nom'];
      currentLevel = hero['niveau'];
      if(currentLevel > maxLevel){
        maxLevel = currentLevel;
        heroNom = currentHeroNom;
      }
    });

    return maxLevel + " ( " + heroNom + " )";
  }

  async getPersoCountJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());

    return ""+heros.length;
  }
  
  async getTotalCritiquesJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    
    let total = 0;
    for (const hero of heros) {
      let heroCritiques = (await getDocs(query(collection(this.firestore, 'heros_critiques'), 
        where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data());
      total += heroCritiques.length;
    }

    return ""+total;
  }

  async getTotalEchecsJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    
    let total = 0;

    for (const hero of heros) {
      let heroCritiques = (await getDocs(query(collection(this.firestore,'heros_echecs'),where('hero_nom','==',hero['nom'])))).docs.map((entries) => entries.data());
      total += heroCritiques.length;
    }

    return ""+total;
  }

  async getTotalDegatsJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    
    let total = 0;

    for (const hero of heros) {
      let degats = (await getDocs(query(collection(this.firestore,'heros_degats'),where('hero_nom','==',hero['nom'])))).docs.map((entries) => entries.data());
      degats.forEach(element => {
        total += element['intensite'];
      });;
    }

    return ""+total;
  }

  async getTotalEnnemisJoueur(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    
    let total = 0;

    for (const hero of heros) {
      let mobs = (await getDocs(query(collection(this.firestore,'heros_mobs'),hero['nom']))).docs.map((entries) => entries.data());
      total += mobs.reduce((acc, obj) => {
        return acc + Object.values(obj).reduce((sum, num) => sum + num, 0);
    }, 0);
    }

    return ""+total;
  }

  async getJoueurTrophes(joueur:string){

    //tous les heros du joueurs
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());

    let heroCritiques: number[] = [];
    for (const hero of heros) {
      heroCritiques = (await getDocs(query(collection(this.firestore, 'heros_critiques'), 
        where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data()['intensite']);
    }

    let heroEchecs: number[] = [];
    for (const hero of heros) {
      heroEchecs = (await getDocs(query(collection(this.firestore, 'heros_echecs'), 
        where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data()['intensite']);
    }

    let heroArmes: DocumentData[] = [];
    for (const hero of heros) {
      heroArmes = (await getDocs(query(collection(this.firestore, 'heros_armes'), 
        where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data());
    }

    const nameMap = new Map<string, number>();
    for (const item of heroArmes) {
      let armeCode:string = item['arme_code'];
      if (new Set(["baton-d-elementaliste", "grimoire-universel"]).has(armeCode)) {
        nameMap.set(item['hero_nom'], (nameMap.get(item['hero_nom']) || 0) + 1);
      }
    }
    let isElementaire =  nameMap.size > 0;

    return [
      {
        caterorie:3,
        titre:"Pourquoi moi ?!",
        description:"Lancer un 20-19",
        possede:heroEchecs.includes(19),
      },
      {
        caterorie:3,
        titre:"Expelliarmus",
        description:"Lancer un 20 puis 10, 11 ou 12",
        possede:[10,11,12].some(e => heroEchecs.includes(e)),
      },
      {
        caterorie:3,
        titre:"Mon fidèle bras droit",
        description:"Lancer un 20 puis 8 ou 9",
        possede:[8,9].some(e => heroEchecs.includes(e)),
      },
      {
        caterorie:3,
        titre:"Mon fidèle bras gauche",
        description:"Lancer un 20 puis 6 ou 7",
        possede:[6,7].some(e => heroEchecs.includes(e)),
      },
      {
        caterorie:3,
        titre:"Pas de temps à perdre",
        description:"Lancer un 1-19 ou 1-20",
        possede:[19,20].some(e => heroCritiques.includes(e)),
      },
      {
        caterorie:3,
        titre:"Façon elle était moche cette armure",
        description:"Lancer un 20-11",
        possede:heroEchecs.includes(11),
      },
      {
        caterorie:3,
        titre:"Sacrieur",
        description:"Lancer un 20 puis 16, 17 ou 18",
        possede:[16,17,18].some(e => heroEchecs.includes(e)),
      },
      {
        caterorie:3,
        titre:"Petite sieste reposante",
        description:"Lancer un 20 puis 3 ou 5",
        possede:[3,5].some(e => heroEchecs.includes(e)),
      },
      {
        caterorie:3,
        titre:"One does not simply walk 100km",
        description:"Parcourir 100km avec un seul personnage",
        possede:heros.find(x=>x['km'] >= 100) !== undefined,
      },
      {
        caterorie:3,
        titre:"Un destin tout tracé",
        description:"Utiliser tous les points de destin d'un personnage",
        possede:heros.find(x=>x['destin'] == 0) !== undefined,
      },
      {
        caterorie:3,
        titre:"C'est un échec",
        description:"Faire un échec critique sur un lancé de combat",
        possede:heroEchecs.length > 0,
      },
      {
        caterorie:2,
        titre:"En voie d'extinction",
        description:"Combattre 100* le même type d'ennemi",
        possede:false,
      },
      {
        caterorie:2,
        titre:"Elémentaire mon cher",
        description:"Possédé un Grimoire universel et un Baton d'élémentaliste sur le même personnage",
        possede: isElementaire
      },
      {
        caterorie:2,
        titre:"Monster Hunter",
        description:"Avoir incarné un chasseur de monstres",
        possede:heros.find(x=>x['metier'] == 'chasseur-de-monstres') !== undefined,
      },
      {
        caterorie:2,
        titre:"Uncharted",
        description:"Avoir incarné un chasseur de trésors",
        possede:heros.find(x=>x['metier'] == 'chasseur-de-tresor') !== undefined,
      },
      {
        caterorie:2,
        titre:"Marshal",
        description:"Avoir incarné un chasseur de primes",
        possede:heros.find(x=>x['metier'] == 'chasseur-de-primes') !== undefined,
      },
      {
        caterorie:2,
        titre:"Budo",
        description:"Avoir incarné un Samurai",
        possede:heros.find(x=>x['origine'] == 'samurai') !== undefined,
      },
      {
        caterorie:2,
        titre:"Picsou",
        description:"Accumuler 5000 PO sans les dépenser",
        possede:heros.find(x=>x['origine'] == 'samurai') !== undefined,
      },
      {
        caterorie:2,
        titre:"Comme un air de supériorité",
        description:"Avoir incarné une Walkyrie",
        possede:heros.find(x=>x['origine'] == 'walkyrie') !== undefined,
      },
      {
        caterorie:2,
        titre:"Maximus Decimus",
        description:"Avoir atteint le rang de Gladiateur",
        possede:heros.find(x=>x['origine'] == 'gladiateur') !== undefined,
      },
      {
        caterorie:2,
        titre:"David Copperfield",
        description:"Avoir atteint le rang de prestidigitateur",
        possede:heros.find(x=>x['origine'] == 'prestidigitateur') !== undefined,
      },
      {
        caterorie:1,
        titre:"Smaug",
        description:"Accumuler 5000 PO sans les dépenser",
        possede:heros.find(x=>x['or'] >= 5000) !== undefined,
      },
      {
        caterorie:1,
        titre:"Représentant divin",
        description:"Avoir débloqué une évolution de Walkyrie",
        possede:heros.find(x=> ['compagnie-du-crepuscule','gardienne-de-l-aube','legion-celeste'].includes(x['metier'])) !== undefined,
      },
      {
        caterorie:0,
        description:"One shot un ennemi 100* avec un critique",
        possede:heroCritiques.filter(x=>x == 19 || x == 20).length >= 100,
        titre:"Highlander"
      },
      {
        caterorie:0,
        titre:"Envoyé des dieux",
        description:"Avoir atteint le rang d'Archange",
        possede:heros.find(x=>x['metier'] == 'archange') !== undefined,
      },
      {
        caterorie:0,
        titre:"The YOU show",
        description:"Avoir atteint le rand de Célébrité",
        possede: heros.find(x=>x['metier'] == 'celebrite') !== undefined,
      },
    ];
  }
}

export class JoueurStatistique{
  "origine":string;
  "metier":string;
  "nombrePersonnage":string;
  "totalCritiques":string;
  "totalEchecs":string;
  "totalDegats":string;
  "level":string;
  "heroCritiques":string;
  "heroEchecs":string;
  "totalEnnemis":string;
};

export class Trophe{
  "caterorie":number;
  "titre":string;
  "description":string;
  "possede":boolean;
}

