import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { CodeValeur } from '../../component/model/code-libelle';

type CacheStore<T> = {
  [key: string]: T;
};


@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  private cache: CacheStore<any> = {};
  constructor(public firestore: Firestore) { }



  async getOrigines(joueur:string){

     if (this.cache['origine_'+joueur]) {
      return (this.cache['origine_'+joueur] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }

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

    this.cache['origine_'+joueur] = statistiques;

      return (this.cache['origine_'+joueur] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getMetier(joueur:string){
     if (this.cache['metier'+joueur]) {
      return (this.cache['metier'+joueur] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }

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
    this.cache['metier'+joueur] = statistiques;
      return (this.cache['metier'+joueur] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);;
  }

  async getArmes(){
     if (this.cache['armes']) {
      return (this.cache['armes'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }
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

    this.cache['armes'] = statistiques;

      return (this.cache['armes'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getArmures(){
     if (this.cache['armures']) {
      return (this.cache['armures'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }
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

    this.cache['armures'] = statistiques;
    
      return (this.cache['armures'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getCrits(){
     if (this.cache['critique']) {
      return (this.cache['critique'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }
    let critiques = (await getDocs(query(collection(this.firestore,'heros_critiques')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    critiques.forEach((critique) =>{
      if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
        statistiques.push({code:critique['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
    });

    this.cache['critique'] = statistiques;

      return (this.cache['critique'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getEchecCrits(){
     if (this.cache['echec']) {
      return (this.cache['echec'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }
    let echecs = (await getDocs(query(collection(this.firestore,'heros_echecs')))).docs.map((entries) => entries.data());
    let statistiques : CodeValeur[] = [];

    echecs.forEach((critique) =>{
      if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
        statistiques.push({code:critique['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
    });

    this.cache['echec'] = statistiques;

      return (this.cache['echec'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getDegatsTotaux(){
     if (this.cache['degats']) {
      return (this.cache['degats'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }
    let degats = (await getDocs(query(collection(this.firestore,'heros_degats')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    degats.forEach((degat) =>{
      if(statistiques.find(x=>x.code == degat['hero_nom']) === undefined){
        statistiques.push({code:degat['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == degat['hero_nom'])!.valeur +=degat['intensite'];
    });

    this.cache['degats'] = statistiques;

      return (this.cache['degats'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getDegatsMax(){
     if (this.cache['degats_max']) {
      return (this.cache['degats_max'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }
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

    this.cache['degats_max'] = statistiques;

      return (this.cache['degats_max'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  // async getOrs(){
  //   let transactions = (await getDocs(query(collection(this.firestore,'heros_transactions')))).docs.map((entries) => entries.data());
    
  //   let statistiques : CodeValeur[] = [];

  //   transactions.forEach((transaction) =>{
  //     if(statistiques.find(x=>x.code == transaction['hero_nom']) === undefined){
  //       statistiques.push({code:transaction['hero_nom'],valeur:0});
  //     }
  //     if(transaction['or'] < 0){
  //       statistiques.find(x=>x.code == transaction['hero_nom'])!.valeur +=transaction['or'];
  //     }
  //   });

  //   return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  // }

  // async getKms(){
  //   let heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    
  //   let statistiques : CodeValeur[] = [];

  //   heros.forEach((hero) =>{
  //     if(statistiques.find(x=>x.code == hero['nom']) === undefined){
  //       statistiques.push({code:hero['nom'],valeur:0});
  //     }
  //     statistiques.find(x=>x.code == hero['nom'])!.valeur +=hero['km'];
      
  //   });
  //   return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  // }
  
  async getEnnemis(){
     if (this.cache['ennemi']) {
      return (this.cache['ennemi'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
    }
    let mobs = (await getDocs(query(collection(this.firestore,'mobs')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    mobs.forEach((mob) => {
      statistiques.push({code:mob['libelle'],valeur:mob['apparition']})
    });
    this.cache['ennemi'] = statistiques;

      return (this.cache['ennemi'] as CodeValeur[])
      .sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getJoueurStatistique(joueur:string){
     if (this.cache['statistique_'+joueur]) {
      return this.cache['statistique_'+joueur] as JoueurStatistique;
    }
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
    this.cache['statistique_'+joueur] = statistiques;
    return this.cache['statistique_'+joueur] as JoueurStatistique;
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
      //  let mobs = (await getDocs(query(collection(this.firestore,'heros_mobs'),hero['nom']))).docs.map((entries) => entries.data());
      const docRef = doc(this.firestore, 'heros_mobs', hero['nom']);
      const docSnap = await getDoc(docRef);

      const mobs = docSnap.exists() ? docSnap.data() : null;
      
      total += mobs ? Object.values(mobs).reduce((sum, val) => sum + val, 0) : 0;
    }

    return ""+total;
  }

  async getJoueurTrophes(joueur:string){

     if (this.cache['owned'+joueur]) {
      return this.cache['owned'+joueur] as Trophe[];
    }
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

    this.cache['owned'+joueur] = trophesFiltered;
    return this.cache['owned'+joueur] as Trophe[];
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
