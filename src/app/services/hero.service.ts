import { inject, Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs, increment, query, setDoc, where } from '@angular/fire/firestore';
import { Critique } from './statistiques.service';
import { StorageKeys, StorageService } from './storage.service';
import { TrophesService } from './trophes.service';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  private firestore = inject(Firestore);
  private storage = inject(StorageService);
  private _trophesService?: TrophesService;

  constructor() {}

  private get trophesService() {
    if (!this._trophesService) {
      this._trophesService = inject(TrophesService);
    }
    return this._trophesService;
  }
  
  //#region All

  async getAll(){
    if(!this.storage.get(StorageKeys.HEROS)){
          const heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HEROS,heros);
    }
    
    return this.storage.get<DocumentData[]>(StorageKeys.HEROS) ?? [];
  }

  async getAllFromSession(){
    if(!this.storage.get<DocumentData[]>(StorageKeys.HEROS)){
        await this.getAll();
    }
    
    return this.storage
      .get<DocumentData[]>(StorageKeys.HEROS)
      ?.filter(x=>x['actif']) ?? [];
  }

  async getByName(name: string){
    
    return (await this.getAll())?.filter(x=>x['nom'] == name) ?? [];
  }

  async getAllOrigine(){
     if(!this.storage.get(StorageKeys.HERO_ORIGINES)){
          const herosTypes = (await getDocs(query(collection(this.firestore,'origines')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HERO_ORIGINES,herosTypes);
    }
    
    return  this.storage.get<DocumentData[]>(StorageKeys.HERO_ORIGINES)?? [];
  }

  async getAllMetier(){
     if(!this.storage.get(StorageKeys.HERO_ORIGINES)){
          const herosTypes = (await getDocs(query(collection(this.firestore,'metier')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HERO_ORIGINES,herosTypes);
    }
    
    return  this.storage.get<DocumentData[]>(StorageKeys.HERO_ORIGINES)?? [];
  }

  async getAllHerosCritique(){
    if(!this.storage.get(StorageKeys.HERO_CRITIQUES)){
          const heros = (await getDocs(query(collection(this.firestore,'heros_critiques')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HERO_CRITIQUES,heros);
    }
    
    return this.storage.get<DocumentData[]>(StorageKeys.HERO_CRITIQUES) ?? [];
  }

  async getAllHerosParade(){
    if(!this.storage.get(StorageKeys.HERO_PARADES)){
          const heros = (await getDocs(query(collection(this.firestore,'heros_parades')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HERO_PARADES,heros);
    }
    
    return this.storage.get<DocumentData[]>(StorageKeys.HERO_PARADES) ?? [];
  }

  async getAllHeroOfJoueur(joueur:string){
    return (await this.getAll())?.filter(x=>x['code_joueur'] == joueur);
  }

  async getAllHerosEchec(){
    if(!this.storage.get(StorageKeys.HERO_ECHECS)){
          const heros = (await getDocs(query(collection(this.firestore,'heros_echecs')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HERO_ECHECS,heros);
    }
    
    return this.storage.get<DocumentData[]>(StorageKeys.HERO_ECHECS) ?? [];
  }

  async getAllHerosEntropique(){
    if(!this.storage.get(StorageKeys.HERO_ENTROPIQUES)){
          const heros = (await getDocs(query(collection(this.firestore,'heros_entropiques')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HERO_ENTROPIQUES,heros);
    }
    
    return this.storage.get<DocumentData[]>(StorageKeys.HERO_ECHECS) ?? [];
  }

  async getAllHerosDegat(){
    if(!this.storage.get(StorageKeys.HERO_DEGATS)){
          const heros = (await getDocs(query(collection(this.firestore,'heros_degats')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HERO_DEGATS,heros);
    }
    
    return this.storage.get<DocumentData[]>(StorageKeys.HERO_ECHECS) ?? [];
  }
  
  async getAllHerosMob(){
    if(!this.storage.get(StorageKeys.HERO_MOBS)){
          const heros = (await getDocs(query(collection(this.firestore,'heros_mobs')))).docs.map((entries) => entries.data());
          this.storage.set<DocumentData[]>(StorageKeys.HERO_MOBS,heros);
    }
    
    return this.storage.get<DocumentData[]>(StorageKeys.HERO_ECHECS) ?? [];
  }

  async updateSession(nom:string, isActif:boolean){
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { actif: isActif }, { merge: true });

    await this.storage.updatePropertyInStorage<DocumentData,boolean>(StorageKeys.HEROS,'nom',nom,'actif',isActif);
  }
  
  async add(joueur:string, nom:string, origine:string, 
    metier:string, or : number, 
    destin : number, niveau : number) : Promise<string[]>{

    let document : DocumentData = {
      code_joueur: joueur,
      nom: nom.toLowerCase(),
      origine:origine,
      metier:metier,
      or:or,
      destin:destin,
      niveau:niveau,
      actif:false,
      vivant:true,
      km:0,
      bon_point:0,
      mauvais_point:0,
      mana:0,
      morts:0,
      vie:0,
      destin_utilise:0
    }

    await setDoc(doc(this.firestore, "heros", nom.toLowerCase()),document );
    await this.storage.addElementInStorageGroup(StorageKeys.HEROS, document);

     //#region trophes
     
    let allHeros = await this.getAllHeroOfJoueur(joueur);

     let originesJouees = await this.trophesService.getOriginesJouees();
     let metiersJoues = await this.trophesService.getMetiersJouees();
     for(let hero of allHeros){
      originesJouees[hero['origine']] ++;
      metiersJoues[hero['metier']] ++;
     }
 
     let trophes = [];
        
    let trophesOrigine = await this.trophesService.getTrophesOrigines();
    if(trophesOrigine[origine]){
      trophes.push(await this.trophesService.setTrophe(joueur,trophesOrigine[origine]));
    }

    let trophesMetier = await this.trophesService.getTrophesMetier();
    if(trophesMetier[metier]){
      trophes.push(await this.trophesService.setTrophe(joueur,trophesMetier[metier]));
    }

    let trophesOrigineMetier = await this.trophesService.getTrophesOriginesMetier();
    if(trophesOrigineMetier[origine] && trophesOrigineMetier[origine][metier]){
      trophes.push(await this.trophesService.setTrophe(joueur,trophesOrigineMetier[origine][metier]));
    }

    let trophesComplexe = await this.trophesService.getTrophesComplexeClasse(originesJouees,metiersJoues);
    for(let trophe of trophesComplexe){
      trophes.push(await this.trophesService.setTrophe(joueur,trophe));
    }

     return trophes;
 
     //#endregion
  }

  //#endregion All
  
  //#region Joueurs

  //#region Statistiques

  async addBonPoint(nom:string) : Promise<string[]>{
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { bon_point: increment(1) }, { merge: true });

    //#region trophes
    
    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];
    
   let trophes = [];

    if(heros[0]['bon_point'] >= 5){
      trophes.push(await this.trophesService.setTrophe(joueur,'Gentilhomme'));
    }
    if(heros[0]['bon_point'] >= 10){
      trophes.push(await this.trophesService.setTrophe(joueur,'Un saint parmi les saints'));
    }
    if(heros[0]['bon_point'] >= 15){
      trophes.push(await this.trophesService.setTrophe(joueur,'Gros lèche botte là'));
    }

    return trophes

    //#endregion
  }

  async addMauvaisPoint(nom:string) : Promise<string[]>{
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { mauvais_point: increment(1)  }, { merge: true });

    //#region trophes
    
    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];
    
   let trophes = [];

    if(heros[0]['mauvais_point'] == 5){
      trophes.push(await this.trophesService.setTrophe(joueur,'Filer du mauvais coton'));
    }
    if(heros[0]['mauvais_point'] == 10){
      trophes.push(await this.trophesService.setTrophe(joueur,"L'incarnation du mal"));
    }
    if(heros[0]['mauvais_point'] == 15){
      trophes.push(await this.trophesService.setTrophe(joueur,'Là tu cherches'));
    }

    return trophes

    //#endregion
  }

  async addMort(nom:string){
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { morts: increment(1)  }, { merge: true });
  }

  async addNiveau(nom:string) : Promise<string[]>{
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { niveau: increment(1)  }, { merge: true });

    //#region trophes
    
    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];
    
   let trophes = [];

    if(heros[0]['niveau'] == 10){
      trophes.push(await this.trophesService.setTrophe(joueur,"C'est donc possible ..."));
    }

    return trophes

    //#endregion
  }

  async addFinCombatStats(heroDegats : Record<string,number>):Promise<string[]>{
    const degats = Object.values(heroDegats);
    const moyenne = degats.reduce((a, b) => a + b, 0) / degats.length;

    const tousSimilaires = degats.every((val) => {
        const min = moyenne * 0.9;
        const max = moyenne * 1.1;
        return val >= min && val <= max;
      });

    const herosAvecZeroDegats = Object.entries(heroDegats)
      .filter(([_, val]) => val === 0)
      .map(([key, _]) => key);

    const herosAvecDegats = Object.entries(heroDegats)
      .filter(([_, val]) => val !== 0)
      .map(([key, _]) => key);

    let hyperCarry = "";
      for (const [key, value] of Object.entries(heroDegats)) {
        const otherTotal = Object.entries(heroDegats)
          .filter(([k]) => k !== key)
          .reduce((sum, [, v]) => sum + v, 0);
    
        if (value > 3 * otherTotal) {
          hyperCarry = key;
        }
      }
    
    
    let trophes = [];

    for(const hero of Object.keys(heroDegats)){
      if(tousSimilaires 
        || ( herosAvecDegats.includes(hero) && herosAvecDegats.length === 1)
        || herosAvecZeroDegats.includes(hero)){

          let heros = await this.getByName(hero);
          
          let joueur = heros[0]['code_joueur'];
          
          if(tousSimilaires){
            trophes.push(await this.trophesService.setTrophe(joueur,"Sur un pied d'égalité"));
          }
          if(hyperCarry == hero){
            trophes.push(await this.trophesService.setTrophe(joueur,'Hyper carry'));
          }
          if(herosAvecDegats.includes(hero) && herosAvecDegats.length === 1){
            trophes.push(await this.trophesService.setTrophe(joueur,'Solo carry'));
          }
          if(herosAvecZeroDegats.includes(hero)){
            trophes.push(await this.trophesService.setTrophe(joueur,'Spectateur'));
          }
        }
    }

    return trophes;
  }

  async updateDegatsDealt(nom:string,degats:number,tour:number):Promise<string[]>{

    let document : DocumentData = {
      hero_nom:nom,
      intensite:degats,
      date:new Date(),
      tour:tour
    };

    await setDoc(doc(this.firestore, "heros_degats", crypto.randomUUID()), document);

    await this.storage.addElementInStorageGroup(StorageKeys.HERO_DEGATS, document);

    //#region trophes
    
    let heros = await this.getByName(nom);

    let joueur =  heros[0]['code_joueur'];

    let allHeros = await this.getAllHeroOfJoueur(joueur);

    let trophes = [];
    if(degats >= 10){
      trophes.push(await this.trophesService.setTrophe(joueur,'Sacré torgnole'));
    }
    
    if(degats >= 20){
      trophes.push(await this.trophesService.setTrophe(joueur,'Patate de forain'));
    }
    
    if(degats >= 30){
      trophes.push(await this.trophesService.setTrophe(joueur,'Coup de pied au cul du Daron'));
    }

    let totalDegat=0;
    for (const hero of allHeros) {
      let allDegats = ( await this.getAllHerosDegat())?.filter(x=>x['hero_nom'] == hero['nom']);
      allDegats.forEach(element => {
        totalDegat += element['intensite'];
      });
    }
    
    if(totalDegat > 1000){
      trophes.push(await this.trophesService.setTrophe(joueur,'Premiers pas... dans leur tronche'));
    }
    if(totalDegat > 3000){
      trophes.push(await this.trophesService.setTrophe(joueur,'I hate you 3 thousands'));
    }
    if(totalDegat > 9000){
      trophes.push(await this.trophesService.setTrophe(joueur,'Over 9000 !'));
    }
    if(totalDegat > 25000){
      trophes.push(await this.trophesService.setTrophe(joueur,'La fierté de Thanos'));
    }
    
    //#endregion trophes

    return trophes;
  }

  async removeDestin(nom:string):Promise<string[]>{
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { destin: increment(-1), destin_utilise: increment(1)  }, { merge: true });

    //#region trophes
    
    let heros = await this.getByName(nom);

    let joueur =  heros[0]['code_joueur'];

    let allHeros = await this.getAllHeroOfJoueur(joueur);
    let trophes = [];
    let herosDestinUtilise = 0;

    for (const hero of allHeros) {
      herosDestinUtilise += hero['destin_utilise'];
    }

    trophes.push(await this.trophesService.setTrophe(joueur,'Try Again'));

    if(heros[0]['destin'] == 0 ){
      trophes.push(await this.trophesService.setTrophe(joueur,'Un destin tout tracé'));
    }

    if(herosDestinUtilise > 8){
      trophes.push(await this.trophesService.setTrophe(joueur,'El Gato'));
    }
    if(herosDestinUtilise > 99){
      trophes.push(await this.trophesService.setTrophe(joueur,'I can do this all day'));
    }

    return trophes;

    //#endregion
  }

  async updateStats(nom:string,kms:number,or:number) : Promise<string[]>{
    const hero = doc(this.firestore, 'heros', nom);
    if(kms !== 0 || or !== 0){
     await setDoc(hero, { km: increment(kms) , or : increment(or)  }, { merge: true });
    }
    if(or !== 0 ){
      await setDoc(doc(this.firestore, "heros_transactions", crypto.randomUUID()), {
        hero_nom:nom,
        or:or,
        date:new Date()
      });
    }

    let currentHero = (await getDocs(query(collection(this.firestore,'heros'),
    where('nom',"==", nom)))).docs.map((entries) => entries.data())[0];
    let joueur = currentHero['code_joueur'];

    let trophes = [];
    if(currentHero['or'] >= 5000){
      trophes.push(await this.trophesService.setTrophe(joueur,'Smaug'));
    }
    else if(currentHero['or'] >= 3000){
      trophes.push(await this.trophesService.setTrophe(joueur,'Picsou'));
    }
    if(currentHero['km'] >= 1000){
      trophes.push(await this.trophesService.setTrophe(joueur,'One does not simply walk 1000km')); 
    }
    return trophes;
  }

  async addMobCombattu(nom:string,mob:string, nombre :number) : Promise<string[]>{
    const hero = doc(this.firestore, 'heros_mobs', nom);
    await setDoc(hero, { [mob]: increment(nombre)  }, { merge: true });

        //#region trophes
    
    
    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];
    
    let allHeros = await this.getAllHeroOfJoueur(joueur);
        
    let extinction = false;
    let heroMobs = (await this.getAllHerosMob())
    ?.filter(x=>x['nom'] == nom);


    let mobToUpdate = await doc(this.firestore, "mobs", mob)
    await setDoc(mobToUpdate, { apparition:increment(1)  }, { merge: true });

    let storageMob = this.storage.get<DocumentData[]>(StorageKeys.MOBS)?.find(x=>x['code'] == mob);
    let apparition = storageMob !== undefined ? storageMob['apparition'] : 0;
    await this.storage.updatePropertyInStorage<DocumentData,number>(StorageKeys.MOBS,'code',mob,'apparition',apparition+1)

    let trophes = [];

    for (const key in heroMobs[0]) {
          if (heroMobs[0][key] >= 50) {  // Vérifie que la clé est propre à l'objet (et non héritée)
            extinction = true;
          }
        }
        if(extinction){
          trophes.push(await this.trophesService.setTrophe(joueur,"En voie d'extinction"));
        }
        if(Object.keys(heroMobs).length >= 50){
          trophes.push(await this.trophesService.setTrophe(joueur,"Charles Darwin"));
    }

        //#endregion

    return trophes;
  }

  //#endregion Statistiques

  //#region Critiques

  async addCritique(nom:string, intensite:number,tour:number):Promise<string[]>{
    
    let document :DocumentData = {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    }

    await setDoc(doc(this.firestore, "heros_critiques", crypto.randomUUID()), document);

    this.storage.addElementInStorageGroup(StorageKeys.HERO_CRITIQUES,document);

    //#region trophes
    
    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];
    
    let allHeros = await this.getAllHeroOfJoueur(joueur);

    let trophes = [];
    let heroCritiques: Critique[] = [];

    for (const hero of allHeros) {
      heroCritiques = (await this.getAllHerosCritique())
              ?.filter(x=>x['hero_nom'] == hero['nom'])
              .map(x => x as Critique);
    }

    if([19,20].some(e => heroCritiques.map(x=>x.intensite).includes(e))){
      trophes.push(await this.trophesService.setTrophe(joueur,'Mort instantané'));
    }
    if(heroCritiques.filter(x=>x.intensite == 19 || x.intensite == 20).length >= 10){
      trophes.push(await this.trophesService.setTrophe(joueur,'Highlander'));
    }
    if(heroCritiques.filter(x=>x.intensite == 19 || x.intensite == 20).length >= 100){
      trophes.push(await this.trophesService.setTrophe(joueur,'One punch man'));
    }
    if([19,20].some(e => heroCritiques.filter(x=>x.tour == 1).map(x=>x.intensite).includes(e))){
      trophes.push(await this.trophesService.setTrophe(joueur,'Pas de temps à perdre'));
    }

    return trophes

    //#endregion
  }
  
  async addParade(nom:string, intensite:number,tour:number) : Promise<string[]>{
    
    let document :DocumentData = {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    }

    await setDoc(doc(this.firestore, "heros_parades", crypto.randomUUID()),document);

    this.storage.addElementInStorageGroup(StorageKeys.HERO_PARADES,document);

     //#region trophes
    
    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];
    
    let allHeros = await this.getAllHeroOfJoueur(joueur);
 
     let trophes = [];
     let heroParades: Critique[] = [];
 
     for (const hero of allHeros) {
      heroParades = (await this.getAllHerosParade())
              ?.filter(x=>x['hero_nom'] == hero['nom'])
              .map(x => x as Critique);
      }
 
     if(heroParades.length > 0){
       trophes.push(await this.trophesService.setTrophe(joueur,'The Hail Mary'));
     }
     if([19,20].some(e => heroParades.map(x=>x.intensite).includes(e))){
       trophes.push(await this.trophesService.setTrophe(joueur,'La chatasse ultime'));
     }
 
     return trophes
 
     //#endregion
  }

  async addEchecCritique(nom:string, intensite:number,tour:number) : Promise<string[]>{
     
    let document :DocumentData = {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    }

    await setDoc(doc(this.firestore, "heros_echecs", crypto.randomUUID()),document);

    this.storage.addElementInStorageGroup(StorageKeys.HERO_ECHECS,document);

     //#region trophes
    
    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];
    
    let allHeros = await this.getAllHeroOfJoueur(joueur);

    let trophes = [];;
    let heroEchecs: number[] = [];

    for (const hero of allHeros) {
      heroEchecs = (await this.getAllHerosParade())
              ?.filter(x=>x['hero_nom'] == hero['nom'])
              .map(x => x['intensite']);
    }

    if(heroEchecs.includes(19)){
      trophes.push(await this.trophesService.setTrophe(joueur,'Pourquoi moi ?!'));
    }
    if([10,11,12].some(e => heroEchecs.includes(e))){
      trophes.push(await this.trophesService.setTrophe(joueur,'Expelliarmus'));
    }
    if([8,9].some(e => heroEchecs.includes(e))){
      trophes.push(await this.trophesService.setTrophe(joueur,'Mon fidèle bras droit'));
    }
    if([6,7].some(e => heroEchecs.includes(e))){
      trophes.push(await this.trophesService.setTrophe(joueur,'Mon fidèle bras gauche'));
    }
    if(heroEchecs.includes(11)){
      trophes.push(await this.trophesService.setTrophe(joueur,'Façon elle était moche cette armure'));
    }
    if([16,17,18].some(e => heroEchecs.includes(e))){
      trophes.push(await this.trophesService.setTrophe(joueur,'Sacrieur'));
    }
    if([3,5].some(e => heroEchecs.includes(e))){
      trophes.push(await this.trophesService.setTrophe(joueur,'Petite sieste reposante'));
    }
    if(heroEchecs.length > 0){
      trophes.push(await this.trophesService.setTrophe(joueur,"C'est un échec"));
    }

    return trophes

    //#endregion
  }

  async addEntropique(nom:string, intensite:number,tour:number) : Promise<string[]>{
      
    let document :DocumentData = {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    }

    await setDoc(doc(this.firestore, "heros_entropiques", crypto.randomUUID()),document);

    this.storage.addElementInStorageGroup(StorageKeys.HERO_ENTROPIQUES,document);

     //#region trophes
    
    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];
    
    let allHeros = await this.getAllHeroOfJoueur(joueur);
 
     let trophes = [];
     let heroEntropique: Critique[] = [];
 
     for (const hero of allHeros) {
      heroEntropique = (await this.getAllHerosParade())
              ?.filter(x=>x['hero_nom'] == hero['nom'])
              .map(x => x as Critique);
      }
 
     if(heroEntropique.length > 100){
       trophes.push(await this.trophesService.setTrophe(joueur,'Agent du chaos'));
     }
 
     return trophes
 
     //#endregion
  }

  //#endregion Critiques

  //#endregion Joueurs

  //#region MJ

  //#region Critiques

  async addCritiqueMJ(intensite:number){
    let document : DocumentData = {
      hero_nom:'MJ',
      intensite:intensite,
      date:new Date(),
    };

    await setDoc(doc(this.firestore, "heros_critiques", crypto.randomUUID()),document );
  
    await this.storage.addElementInStorageGroup(StorageKeys.HERO_CRITIQUES,document);
  }

  async addParadeMJ(intensite:number){
    let document : DocumentData = {
      hero_nom:'MJ',
      intensite:intensite,
      date:new Date(),
    };

    await setDoc(doc(this.firestore, "heros_parades", crypto.randomUUID()),document );
  
    await this.storage.addElementInStorageGroup(StorageKeys.HERO_PARADES,document);
  }

  async addEchecCritiqueMJ(intensite:number){
    let document : DocumentData = {
      hero_nom:'MJ',
      intensite:intensite,
      date:new Date(),
    };

    await setDoc(doc(this.firestore, "heros_echecs", crypto.randomUUID()),document );
  
    await this.storage.addElementInStorageGroup(StorageKeys.HERO_ECHECS,document);
  }

  async addEntropiqueMJ(intensite:number){
    let document : DocumentData = {
      hero_nom:'MJ',
      intensite:intensite,
      date:new Date(),
    };

    await setDoc(doc(this.firestore, "heros_entropiques", crypto.randomUUID()),document );
  
    await this.storage.addElementInStorageGroup(StorageKeys.HERO_ENTROPIQUES,document);
  }

  //#endregion Critiques

  //#endregion MJ

}
