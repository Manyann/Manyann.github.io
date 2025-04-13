import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, DocumentData, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
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
    let mobs = (await getDocs(query(collection(this.firestore,'mobs')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    mobs.forEach((mob) => {
      statistiques.push({code:mob['libelle'],valeur:mob['apparition']})
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

    //tous les trophés du joueurs
    let trophesJoueur = (await getDocs(query(collection(this.firestore,'joueurs_trophes'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
    let codes = trophesJoueur.map(x=>x['titre']);

    //tous les trophés
    const trophes =  (await getDocs(query(collection(this.firestore,'trophes')))).docs.map((entries) => entries.data() as Trophe);

    let trophesFiltered = [];
    for(let troph of trophes){
      if(codes.includes(troph['titre'])){
        troph.possede =true;
      }else{
        troph.possede =false;
      }
      trophesFiltered.push(troph);
    }

    return trophesFiltered;
  }

  async deleteTest(){
    const q = query(collection(this.firestore, "cities"), where("state", "==", "CA"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(this.firestore, "cities", document.id));
    });
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
