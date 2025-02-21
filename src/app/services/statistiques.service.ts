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
debugger;
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
      });
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

   
    let heroArmes: DocumentData[] = [];


    for (const hero of heros) {
     heroArmes = (await getDocs(query(collection(this.firestore, 'heros_armes'), 
                  where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data());
                
    }

    const nameMap = new Map<string, number>();
    let hasBriseMonde = false;
    let heroPlaque: { [hero: string] : number; } = {};
    let heroDueliste: { [hero: string] : number; } = {};
    for (const item of heroArmes) {
      let armeCode:string = item['arme_code'];
      if(armeCode == 'le-brise-monde'){
        hasBriseMonde = true;
      }else if(armeCode == 'lame-de-dueliste'){
        heroDueliste[item['hero_nom']]++;
      }else if(armeCode.indexOf('plaque-travaille')!= -1 && item['equipe'] == true){
        heroPlaque[item['hero_nom']]++;
      }
      if (new Set(["baton-d-elementaliste", "grimoire-universel"]).has(armeCode)) {
        nameMap.set(item['hero_nom'], (nameMap.get(item['hero_nom']) || 0) + 1);
      }
    }

    let isElementaire =  nameMap.size > 0;

    let hasAllOrigine = heros.map(x=>x['origine'])?.filter((n, i) => heros.indexOf(n) === i).length ==15;
    let hasAllMetierBase = heros.map(x=>x['origine'])?.filter((n, i) => heros.indexOf(n) === i).length ==11;

    return [
      // #region Categorie 3
      {
        categorie:3,
        titre:"One does not simply walk 100km",
        description:"Parcourir 100km avec un seul personnage",
        possede:heros.find(x=>x['km'] >= 100) !== undefined,
      },

// #endregion Categorie 3
// #region Categorie 2
      {
        categorie:2,
        titre:"En voie d'extinction",
        description:"Combattre 100* le même type d'ennemi",
        possede:false,
      },
      {
        categorie:2,
        titre:"Elémentaire mon cher",
        description:"Possédé un Grimoire universel et un Baton d'élémentaliste sur le même personnage",
        possede: isElementaire
      },
      {
        categorie:2,
        titre:"Picsou",
        description:"Accumuler 3000 PO sans les dépenser",
        possede:heros.find(x=>x['or'] >= 3000) !== undefined,
      },

// #endregion Categorie 2
// #region Categorie 1
      {
        categorie:1,
        titre:"Smaug",
        description:"Accumuler 5000 PO sans les dépenser",
        possede:heros.find(x=>x['or'] >= 5000) !== undefined,
      },
      //=============>
      {
        categorie:1,
        titre:"99%",
        description:"Avoir incarné un Seigneur",
        possede:heros.find(x=>x['metier'] == 'seigneur') !== undefined,
},
{
        categorie:1,
        titre:"Richard coeur de lion",
        description:"Avoir incarné un Templier",
        possede:heros.find(x=>x['metier'] == 'templier') !== undefined,
},
{
        categorie:1,
        titre:"Naruto sans les pouvoirs",
        description:"Avoir incarné un Ninja",
        possede:heros.find(x=>x['metier'] == 'ninja') !== undefined,
},
{
        categorie:1,
        titre:"Ezio Auditore da Firenze",
        description:"Avoir incarné un Assassin",
        possede:heros.find(x=>x['metier'] == 'assassin') !== undefined,
},
{
        categorie:1,
        titre:"Piraterie réglementée",
        description:"Avoir incarné un Corsaire",
        possede:heros.find(x=>x['metier'] == 'corsaire') !== undefined,
},
{
        categorie:1,
        titre:"La nuit au musée",
        description:"Avoir incarné un Conservateur",
        possede:heros.find(x=>x['metier'] == 'conservateur') !== undefined,
},
{
        categorie:1,
        titre:"Edwin til' Ilan",
        description:"Avoir incarné un Maître d'armes",
        possede:heros.find(x=>x['metier'] == 'maitre-d-armes') !== undefined,
},
{
  categorie:1,
  titre:"Le vrai Dark Sasuke",
  description:"Avoir incarné un Elfe Noir Démonologue",
  possede:heros.find(x=> x['origine'] == 'elfe-noir' && x['metier'] == 'demologue') !== undefined,

},
{
  categorie:1,
  titre:"Charles Darwin",
  description:"Avoir combattu 100 ennemis différents",
  possede:false
},
{
  categorie:1,
  titre:"Galactus",
  description:"Posséder le Brise-Monde",
  possede:hasBriseMonde
},
{
  categorie:1,
  titre:"Indestructible",
  description:"Avoir un set complet de plaque travaillée",
  possede:Object.values(heroPlaque).includes(5)
},
{
  categorie:0,
  titre:"Go 1v1",
  description:"Avoir 2 lames de duéliste équipé",
  possede:Object.values(heroDueliste).includes(2)
},
// #endregion Categorie 1
// #region Categorie 0
{
  categorie:0,
  titre:"Pokedex complet",
  description:"Avoir combattu tous les types d'ennemis",
  possede:false
},
      {
        categorie:0,
        titre:"Envoyé des dieux",
        description:"Avoir atteint le rang d'Archange",
        possede:heros.find(x=>x['metier'] == 'archange') !== undefined,
      },
      {
        categorie:0,
        titre:"The YOU show",
        description:"Avoir atteint le rand de Célébrité",
        possede: heros.find(x=>x['metier'] == 'celebrite') !== undefined,
      },
      // #endregion Categorie 0
// #region Categorie 5
      {
        categorie:5,
        titre:"Peau verte",
        description:"Avoir incarné un Orque, un Demi-Orque et un Orgre",    
        possede:heros.find(x=> x['origine'] == 'orque') !== undefined
        && heros.find(x=> x['origine'] == 'demi-orque') !== undefined
        && heros.find(x=> x['origine'] == 'ogre') !== undefined,    
    },  
    {
      categorie:5,
      titre:"Batavia, Iceberg, Roquette, Mache",
      description:"Avoir incarné un Demi-Elfe, un Elfe Sylvain, un Haut-Elfe et un Elfe-Noir",    
      possede:heros.find(x=> x['origine'] == 'elfe-sylvain') !== undefined
      && heros.find(x=> x['origine'] == 'demi-elfe') !== undefined
      && heros.find(x=> x['origine'] == 'elfe-noir') !== undefined
      && heros.find(x=> x['origine'] == 'haut-elfe') !== undefined,    
  },  
  {
    categorie:5,
    titre:"Voir les choses en Grand",
    description:"Avoir incarné un Hobbit et un Nain",    
    possede:heros.find(x=> x['origine'] == 'hobbit') !== undefined
    && heros.find(x=> x['origine'] == 'nain') !== undefined, 
},  
{
  categorie:5,
  titre:"Manuel",
  description:"Avoir incarné un Artisant, un Artiste, un Ingénieur et un Voleur",    
  possede:heros.find(x=> x['origine'] == 'voleur') !== undefined
  && heros.find(x=> x['origine'] == 'artisant') !== undefined
  && heros.find(x=> x['origine'] == 'artiste') !== undefined
  && heros.find(x=> x['origine'] == 'ingenieur') !== undefined, 
},  
{
  categorie:5,
  titre:"La Magie sous toutes ses formes",
  description:"Avoir incarné un Mage et un Prestidigitateur",    
  possede:heros.find(x=> x['metier'] == 'mage') !== undefined
  && heros.find(x=> x['metier'] == 'prestidigitateur') !== undefined, 
},  
      {
        categorie:5,
        titre:"La chute dans les escaliers",
        description:"Avoir incarné un hobbit voleur niveau 3",    
        possede:heros.find(x=> x['origine'] == 'hobbit' && x['metier'] == 'voleur' && x['niveau'] == 3) !== undefined,    
    },  
      {
        categorie:5,
        titre:"Joueur du monde",
        description:"Avoir incarné toutes les origines possibles",    
        possede:false    
    },    
    {   
        categorie:5,
        titre:"Polyvalent", 
        description:"Avoir incarné tous les metiers de base possibles",
        possede:false
    },
    {
        categorie:5,
        titre:"Le fidèle",
        description:"Avoir incarné la même origine 10 fois",
        possede:false
    },
    {
        categorie:5,
        titre:"Le spécialiste",
        description:"Avoir incarné le même métier 10 fois",
        possede:false
    },
    {
      categorie:5,
      titre:"Un homme d'énergie",
      description:"Avoir incarné un Mage, un Pretre et un Démonologue",    
      possede:heros.find(x=> x['metier'] == 'mage') !== undefined
      && heros.find(x=> x['metier'] == 'pretre') !== undefined
      && heros.find(x=> x['metier'] == 'demonologue') !== undefined, 
    },  
    {
      categorie:5,
      titre:"C'est un forgeant qu'on devient forgeron",
      description:"Avoir incarné un Forgeron et un Forgeur de rûnes",    
      possede:heros.find(x=> x['metier'] == 'forgeron') !== undefined
      && heros.find(x=> x['metier'] == 'forgeur-de-runes') !== undefined, 
    },  
    //#endregion Categorie 5
    //#region Categorie 8
    
    {
      categorie:8,
      titre:"Contrées lointaines",
      description:"Avoir incarné un Centaure, un Homme des sables, un Samurai et une Walkyrie", 
      possede:heros.find(x=> x['origine'] == 'centaure') !== undefined
      && heros.find(x=> x['origine'] == 'hommes-des-sables') !== undefined
      && heros.find(x=> x['origine'] == 'samurai') !== undefined
      && heros.find(x=> x['origine'] == 'walkyrie') !== undefined,
  },
  {
    categorie:8,
    titre:"Apex Predator",
    description:"Avoir incarné un Chasseur de primes, de monstres et de trésors", 
    possede:heros.find(x=> x['metier'] == 'chasseur-de-primes') !== undefined
    && heros.find(x=> x['metier'] == 'chasseur-de-monstres') !== undefined
    && heros.find(x=> x['metier'] == 'chasseur-de-tresor') !== undefined,
},
    {
        categorie:8,
        titre:"1001 vies",
        description:"Avoir incarné toutes les origines et tous les metiers de base possibles",
        possede:false
    },
    {
      categorie:8,
      titre:"Apex Predator",
      description:"Avoir incarné un Chasseur de primes, de monstres et de trésors", 
      possede:heros.find(x=> x['metier'] == 'chasseur-de-primes') !== undefined
      && heros.find(x=> x['metier'] == 'chasseur-de-monstres') !== undefined
      && heros.find(x=> x['metier'] == 'chasseur-de-tresor') !== undefined,
  },
  {
    categorie:10,
    titre:"Purificateur",
    description:"Avoir incarné un Templier, un Démonologue, un Inquisiteur et une Walkyrie du crépuscule", 
    possede:heros.find(x=> x['metier'] == 'templier') !== undefined
    && heros.find(x=> x['metier'] == 'demonologue') !== undefined
    && heros.find(x=> x['metier'] == 'inquisiteur') !== undefined
    && heros.find(x=> x['metier'] == 'compagnie-du-crepuscule') !== undefined,
},
    {
        categorie:11,
        titre:"L'Alpha et l'Oméga",
        description:"Avoir incarné toutes les origines et tous les metiers possibles",
        possede:false
    },
    {
        categorie:11,
        titre:"La fin",
        description:"Avoir tous les trophés",
        possede:false
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
  "categorie":number;
  "titre":string;
  "description":string;
  "possede":boolean;
}


export class Critique{
  "hero_nom":string;
  "intensite":number;
  "tour":number;
}
