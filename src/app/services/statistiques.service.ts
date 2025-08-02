import { inject, Injectable } from '@angular/core';
import { collection, deleteDoc, doc, DocumentData, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { CodeValeur } from '../../component/model/code-libelle';
import { StorageKeys, StorageService } from './storage.service';
import { TrophesService } from './trophes.service';
import { HerosService } from './hero.service';
import { ItemsService } from './items.service';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
    constructor(
       private firestore : Firestore,
       private storage : StorageService,
       private itemsService : ItemsService,
       private herosService : HerosService
    ) {
    }

  async getAllOrines(){
    if(!this.storage.get(StorageKeys.ORIGINES)){
      const origines = (await getDocs(query(collection(this.firestore,'origines')))).docs.map((entries) => entries.data());
      this.storage.set<DocumentData[]>(StorageKeys.ORIGINES,origines);
    }
            
    return this.storage.get<DocumentData[]>(StorageKeys.ORIGINES) ?? [];
  }

  async getAllMetiers(){
    if(!this.storage.get(StorageKeys.METIERS)){
      const metiers = (await getDocs(query(collection(this.firestore,'metiers')))).docs.map((entries) => entries.data());
      this.storage.set<DocumentData[]>(StorageKeys.METIERS,metiers);
    }
            
    return this.storage.get<DocumentData[]>(StorageKeys.METIERS) ?? [];
  }

  async getAllArmes(){
    if(!this.storage.get(StorageKeys.HERO_ARMES)){
      const armes = (await getDocs(query(collection(this.firestore,'heros_armes')))).docs.map((entries) => entries.data());
      this.storage.set<DocumentData[]>(StorageKeys.HERO_ARMES,armes);
    }
            
    return this.storage.get<DocumentData[]>(StorageKeys.HERO_ARMES) ?? [];
  }
  
  async getAllArmures(){
    if(!this.storage.get(StorageKeys.HERO_ARMURES)){
      const armures = (await getDocs(query(collection(this.firestore,'heros_armures')))).docs.map((entries) => entries.data());
      this.storage.set<DocumentData[]>(StorageKeys.HERO_ARMURES,armures);
    }
            
    return this.storage.get<DocumentData[]>(StorageKeys.HERO_ARMURES) ?? [];
  }

  async getOrigines(joueur:string, slice : number | null = null){

    let key : string = StorageKeys.JOUEURS_ORIGINES+"_"+joueur;
    if(!this.storage.getFromString(key)){

    let heros = await this.herosService.getAll();
    let origines = await this.getAllOrines();

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

    this.storage.setFromString<CodeValeur[]>(key,statistiques);
   }

    let values : CodeValeur[] = this.storage.getFromString<CodeValeur[]>(key) ??[];

    if(slice !== null){
      values = values.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,slice);
    }

    return values.sort((n1,n2)=> n2.valeur - n1.valeur);
  }

  async getMetier(joueur:string, slice : number | null = null){    
    let key : string = StorageKeys.JOUEURS_METIERS+"_"+joueur;
    if(!this.storage.getFromString(key)){

    let heros = await this.herosService.getAll();
    let metiers = await this.getAllMetiers();

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
   }
    let values : CodeValeur[] = this.storage.getFromString<CodeValeur[]>(key) ??[];

    if(slice !== null){
      values = values.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,slice);
    }

    return values.sort((n1,n2)=> n2.valeur - n1.valeur);
  }

  async getArmes(){
    if(!this.storage.get(StorageKeys.STATS_ARMES)){
    let herosArmes = await this.getAllArmes();
    let armes = await this.itemsService.getAllArmes();

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    herosArmes.forEach((heroArme) =>{
      libelle = armes.find(x=>x['code'] == heroArme['arme_code'])!['libelle'] ?? heroArme['arme_code'];
      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });

    this.storage.set<CodeValeur[]>(StorageKeys.STATS_ARMES,statistiques);
    }

    return this.storage.get<CodeValeur[]>(StorageKeys.STATS_ARMES);
  }

  async getArmures(){
    if(!this.storage.get(StorageKeys.STATS_ARMURES)){
    let herosArmures = await this.getAllArmures();
    let armures = await this.itemsService.getAllArmures();

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    herosArmures.forEach((heroArme) =>{
      libelle = armures.find(x=>x['code'] == heroArme['armure_code'])!['libelle'] ?? heroArme['armure_code'];

      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });

    this.storage.set<CodeValeur[]>(StorageKeys.STATS_ARMURES,statistiques);
    }

    return this.storage.get<CodeValeur[]>(StorageKeys.STATS_ARMURES);
  }

  async getCrits(slice : number | null = null){
    if(!this.storage.get(StorageKeys.STATS_CRITS)){
    let critiques = (await getDocs(query(collection(this.firestore,'heros_critiques')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    critiques.forEach((critique) =>{
      if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
        statistiques.push({code:critique['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
    });

    this.storage.set<CodeValeur[]>(StorageKeys.STATS_CRITS,statistiques);
    }

    let values : CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_CRITS) ??[];

    if(slice !== null){
      values = values.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,slice);
    }

    return values.sort((n1,n2)=> n2.valeur - n1.valeur);
  }

  async getEchecCrits(slice : number | null = null){
    if(!this.storage.get(StorageKeys.STATS_ECHECS)){
      let echecs = (await getDocs(query(collection(this.firestore,'heros_echecs')))).docs.map((entries) => entries.data());
      let statistiques : CodeValeur[] = [];

      echecs.forEach((critique) =>{
        if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
          statistiques.push({code:critique['hero_nom'],valeur:0});
        }
        statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
      });

      this.storage.set<CodeValeur[]>(StorageKeys.STATS_ECHECS,statistiques);
    }
    if(!this.storage.get(StorageKeys.STATS_ENTROPIQUES)){
      let echecs = (await getDocs(query(collection(this.firestore,'heros_entropiques')))).docs.map((entries) => entries.data());
      let statistiques : CodeValeur[] = [];

      echecs.forEach((critique) =>{
        if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
          statistiques.push({code:critique['hero_nom'],valeur:0});
        }
        statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
      });

      this.storage.set<CodeValeur[]>(StorageKeys.STATS_ENTROPIQUES,statistiques);
    }

    let valuesEchecs : CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_ECHECS) ??[];
    let valuesEntropiques : CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_ENTROPIQUES) ??[];

      const resultMap = new Map<string, number>();
  
    // Combiner les deux listes
    [...valuesEchecs, ...valuesEntropiques].forEach(item => {
      resultMap.set(item.code, (resultMap.get(item.code) || 0) + item.valeur);
    });
    
    // Convertir en tableau et trier
    let result = Array.from(resultMap.entries()).map(([code, valeur]) => ({ code, valeur }));
    
    // Trier par valeur décroissante
    result.sort((a, b) => b.valeur - a.valeur);
    
    // Appliquer le slice si nécessaire
    if (slice !== null) {
      result = result.slice(0, slice);
    }
    
    return result;
  }

  async getDegatsTotaux(slice : number | null = null){
    if(!this.storage.get(StorageKeys.STATS_DEGATS)){
    let degats = (await getDocs(query(collection(this.firestore,'heros_degats')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    degats.forEach((degat) =>{
      if(statistiques.find(x=>x.code == degat['hero_nom']) === undefined){
        statistiques.push({code:degat['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == degat['hero_nom'])!.valeur +=degat['intensite'];
    });

    this.storage.set<CodeValeur[]>(StorageKeys.STATS_DEGATS,statistiques);
    }

    let values : CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_DEGATS) ??[];

    if(slice !== null){
      values = values.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,slice);
    }

    return values.sort((n1,n2)=> n2.valeur - n1.valeur);
  }

  async getDegatsMax(slice : number | null = null){
    if(!this.storage.get(StorageKeys.STATS_DEGATS_MAX)){
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

    this.storage.set<CodeValeur[]>(StorageKeys.STATS_DEGATS_MAX,statistiques);
    }

    let values : CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_DEGATS_MAX) ??[];

    if(slice !== null){
      values = values.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,slice);
    }

    return values.sort((n1,n2)=> n2.valeur - n1.valeur);
  }

  async getEnnemis(slice : number | null = null){
    if(!this.storage.get(StorageKeys.STATS_MOBS)){
    let mobs = (await getDocs(query(collection(this.firestore,'mobs')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    mobs.forEach((mob) => {
      statistiques.push({code:mob['libelle'],valeur:mob['apparition']})
    });

    this.storage.set<CodeValeur[]>(StorageKeys.STATS_MOBS,statistiques);
    }

    let values : CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_MOBS) ??[];

    if(slice !== null){
      values = values.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,slice);
    }

    return values.sort((n1,n2)=> n2.valeur - n1.valeur);
  }

async getRapportCritiquesEchecs(slice: number | null = null) {
  let valuesEchecs: CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_ECHECS) ?? [];
  let valuesCritiques: CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_CRITS) ?? [];
  let valuesEntropiques: CodeValeur[] = this.storage.get<CodeValeur[]>(StorageKeys.STATS_ENTROPIQUES) ?? [];

  const allEchecs = new Map<string, number>();
  
  // Combiner échecs et entropiques
  [...valuesEchecs, ...valuesEntropiques].forEach(item => {
    allEchecs.set(item.code, (allEchecs.get(item.code) || 0) + item.valeur);
  });
  
  // Convertir en tableau
  let totalEchecs = Array.from(allEchecs.entries()).map(([code, valeur]) => ({ code, valeur }));
  
  // Récupérer tous les codes uniques
  const tousLesCodes = [...new Set([
    ...totalEchecs.map(v => v.code),
    ...valuesCritiques.map(v => v.code)
  ])];
  
  // Créer des maps pour un accès rapide
  const mapEchecs = new Map(totalEchecs.map(v => [v.code, v.valeur]));
  const mapCritiques = new Map(valuesCritiques.map(v => [v.code, v.valeur]));
  
  // Filtrer et trier les codes par total
  const codesAvecTotaux = tousLesCodes
    .map(code => ({
      code,
      echecs: mapEchecs.get(code) || 0,
      critiques: mapCritiques.get(code) || 0,
      total: (mapEchecs.get(code) || 0) + (mapCritiques.get(code) || 0)
    }))
    .filter(item => item.total > 0 && item.code !== 'MJ' && item.code !== 'yyyyy')
    .sort((a, b) => b.total - a.total);
  debugger;
  // Appliquer le slice
  const codesFiltres = slice ? codesAvecTotaux.slice(0, slice) : codesAvecTotaux.slice(0,20);
  
  // SOLUTION : Utiliser deux datasets séparés au lieu d'un seul
  const labels: string[] = codesFiltres.map(item => item.code);
  
  return {
    title: "Échecs vs Critiques",
    labels: labels,
    datasets: [
      {
        label: 'Échecs',
        stack: "Stack 0",
        data: codesFiltres.map(item => -item.echecs), // Négatifs pour aller à gauche
        backgroundColor: '#FF6B6B',
        borderColor: '#FF5252',
        borderWidth: 1,
        barThickness: 18,
        maxBarThickness: 25
      },
      {
        label: 'Critiques',
        stack: "Stack 0",
        data: codesFiltres.map(item => item.critiques), // Positifs pour aller à droite
        backgroundColor: '#4ECDC4',
        borderColor: '#26A69A',
        borderWidth: 1,
        barThickness: 18,
        maxBarThickness: 25
      }
    ]
  };
}

  async getJoueurStatistique(joueur:string){

    let key : string = StorageKeys.STATS+"_"+joueur;
    if(!this.storage.getFromString(key)){
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

    this.storage.setFromString<JoueurStatistique>(key,statistiques);
    }

    return this.storage.getFromString<JoueurStatistique>(key);
  }

  async getOrigineJoueur(joueur:string){
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    let origines = await this.getAllOrines();
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
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    let metiers = await this.getAllMetiers();

    let libelle = "";
    let originesCount : { [key: string]: number } = {};

    for (const hero of heros) {
      libelle = metiers.find(x=>x['code'] == hero['metier'])!['libelle'] ?? hero['metier'];
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
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    
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
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    
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
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    
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
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);

    return ""+heros.length;
  }
  
  async getTotalCritiquesJoueur(joueur:string){
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    
    let total = 0;
    for (const hero of heros) {
      let heroCritiques = (await getDocs(query(collection(this.firestore, 'heros_critiques'), 
        where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data());
      total += heroCritiques.length;
    }

    return ""+total;
  }

  async getTotalEchecsJoueur(joueur:string){
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    
    let total = 0;

    for (const hero of heros) {
      let heroCritiques = (await getDocs(query(collection(this.firestore,'heros_echecs'),where('hero_nom','==',hero['nom'])))).docs.map((entries) => entries.data());
      total += heroCritiques.length;
    }

    return ""+total;
  }

  async getTotalDegatsJoueur(joueur:string){
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    
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
    let heros = await this.herosService.getAllHeroOfJoueur(joueur);
    
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
    let key : string = StorageKeys.TROPHES+"_"+joueur;
    if(!this.storage.getFromString(key)){
    //tous les trophés du joueurs
    let trophesJoueur = await this.getInnerJoueurTrophes(joueur);

    //tous les trophés
    const trophes =  (await getDocs(query(collection(this.firestore,'trophes')))).docs.map((entries) => entries.data() as Trophe);

    let trophesFiltered = [];
    for(let troph of trophes){
      if(trophesJoueur.includes(troph['titre'])){
        troph.possede =true;
      }else{
        troph.possede =false;
      }
      trophesFiltered.push(troph);
    }

    this.storage.setFromString<Trophe[]>(key,trophesFiltered);
    }

    return this.storage.getFromString<Trophe[]>(key) ?? undefined;
  };

  async deleteTest(){
    const q = query(collection(this.firestore, "cities"), where("state", "==", "CA"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(this.firestore, "cities", document.id));
    });
  }


  //#region Trophes

 async getInnerJoueurTrophes(joueur:string):Promise<string[]>{

    let trophes  : DocumentData[] = await this.getAllTrophes();

    return trophes
      ?.filter(x=>x['code_joueur'] == joueur)
      .map(x=>x['titre']);
  }

  async getAllTrophes():Promise<DocumentData[]>{

    if(!this.storage.get(StorageKeys.TROPHES)){
          const trophes = (await getDocs(query(collection(this.firestore,'heros_trophes')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.TROPHES,trophes);
    }
    
    return this.storage.get<DocumentData[]>(StorageKeys.TROPHES) ?? [];
  }

  //#endregion Trophes
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
