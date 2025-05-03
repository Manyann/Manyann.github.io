import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, increment, query, setDoc, where } from '@angular/fire/firestore';
import { Critique } from './statistiques.service';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  constructor(public firestore: Firestore) { }

  async getAll(){
    const heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    return heros;
  }

  async getAllFromSession(){
    const heros = (await getDocs(query(collection(this.firestore,'heros'),where('actif','==',true)))).docs.map((entries) => entries.data());
    return heros;
  }

  async getByName(name: string){
    const heros = (await getDocs(query(collection(this.firestore,'heros'),where('nom','==',name)))).docs.map((entries) => entries.data());
    return heros;
  }

  async getAllOrigine(){
    const herosTypes = (await getDocs(query(collection(this.firestore,'origines')))).docs.map((entries) => entries.data());
    return herosTypes;
  }

  async getAllMetier(){
    const herosTypes = (await getDocs(query(collection(this.firestore,'metiers')))).docs.map((entries) => entries.data());
    return herosTypes;
  }

  async updateSession(nom:string, isActif:boolean){
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { actif: isActif }, { merge: true });
  }

  async addBonPoint(nom:string) : Promise<string[]>{
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { bon_point: increment(1) }, { merge: true });

    //#region trophes
    
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('nom',"==", nom)))).docs.map((entries) => entries.data());
    let joueur = heros[0]['code_joueur'];
    
   let trophes = [];
   let trophesOwned = await this.getJoueurTrophes(joueur);

    if(heros[0]['bon_point'] == 5){
      trophes.push(await this.setTrophe(joueur,'Gentilhomme',trophesOwned));
    }
    if(heros[0]['bon_point'] == 10){
      trophes.push(await this.setTrophe(joueur,'Un saint parmi les saints',trophesOwned));
    }
    if(heros[0]['bon_point'] == 15){
      trophes.push(await this.setTrophe(joueur,'Gros lèche botte là',trophesOwned));
    }

    return trophes

    //#endregion
  }

  async addMauvaisPoint(nom:string) : Promise<string[]>{
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { mauvais_point: increment(1)  }, { merge: true });

    //#region trophes
    
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('nom',"==", nom)))).docs.map((entries) => entries.data());
    let joueur = heros[0]['code_joueur'];
    
   let trophes = [];
   let trophesOwned = await this.getJoueurTrophes(joueur);

    if(heros[0]['mauvais_point'] == 5){
      trophes.push(await this.setTrophe(joueur,'Filer du mauvais coton',trophesOwned));
    }
    if(heros[0]['mauvais_point'] == 10){
      trophes.push(await this.setTrophe(joueur,"L'incarnation du mal",trophesOwned));
    }
    if(heros[0]['mauvais_point'] == 15){
      trophes.push(await this.setTrophe(joueur,'Là tu cherches',trophesOwned));
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
    
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('nom',"==", nom)))).docs.map((entries) => entries.data());
    let joueur = heros[0]['code_joueur'];
    
   let trophes = [];
   let trophesOwned = await this.getJoueurTrophes(joueur);

    if(heros[0]['niveau'] == 10){
      trophes.push(await this.setTrophe(joueur,"C'est donc possible ...",trophesOwned));
    }

    return trophes

    //#endregion
  }

  async addCritique(nom:string, intensite:number,tour:number):Promise<string[]>{
    await setDoc(doc(this.firestore, "heros_critiques", crypto.randomUUID()), {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    });

    //#region trophes
    
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('nom',"==", nom)))).docs.map((entries) => entries.data());
    let joueur = heros[0]['code_joueur'];
    
    let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());

    let trophes = [];
    let trophesOwned = await this.getJoueurTrophes(joueur);
    let heroCritiques: Critique[] = [];

    for (const hero of allHeros) {
      heroCritiques = (await getDocs(query(collection(this.firestore, 'heros_critiques'), 
              where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data() as Critique);
    }

    if([19,20].some(e => heroCritiques.map(x=>x.intensite).includes(e))){
      trophes.push(await this.setTrophe(joueur,'Mort instantané',trophesOwned));
    }
    if(heroCritiques.filter(x=>x.intensite == 19 || x.intensite == 20).length >= 10){
      trophes.push(await this.setTrophe(joueur,'Highlander',trophesOwned));
    }
    if(heroCritiques.filter(x=>x.intensite == 19 || x.intensite == 20).length >= 100){
      trophes.push(await this.setTrophe(joueur,'One punch man',trophesOwned));
    }
    if([19,20].some(e => heroCritiques.filter(x=>x.tour == 1).map(x=>x.intensite).includes(e))){
      trophes.push(await this.setTrophe(joueur,'Pas de temps à perdre',trophesOwned));
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

          let heros = (await getDocs(query(collection(this.firestore,'heros'),
          where('nom',"==", hero)))).docs.map((entries) => entries.data());
          
          let joueur = heros[0]['code_joueur'];
          let trophesOwned = await this.getJoueurTrophes(joueur);
          
          if(tousSimilaires){
            trophes.push(await this.setTrophe(joueur,"Sur un pied d'égalité",trophesOwned));
          }
          if(hyperCarry == hero){
            trophes.push(await this.setTrophe(joueur,'Hyper carry',trophesOwned));
          }
          if(herosAvecDegats.includes(hero) && herosAvecDegats.length === 1){
            trophes.push(await this.setTrophe(joueur,'Solo carry',trophesOwned));
          }
          if(herosAvecZeroDegats.includes(hero)){
            trophes.push(await this.setTrophe(joueur,'Spectateur',trophesOwned));
          }
        }
    }

    return trophes;
  }

  async addParade(nom:string, intensite:number,tour:number) : Promise<string[]>{
    await setDoc(doc(this.firestore, "heros_parades", crypto.randomUUID()), {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    });

     //#region trophes
    
     let heros = (await getDocs(query(collection(this.firestore,'heros'),
     where('nom',"==", nom)))).docs.map((entries) => entries.data());
     let joueur = heros[0]['code_joueur'];
     
     let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
     where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());
 
     let trophes = [];
     let trophesOwned = await this.getJoueurTrophes(joueur);
     let heroParades: Critique[] = [];
 
     for (const hero of allHeros) {
      heroParades = (await getDocs(query(collection(this.firestore, 'heros_parades'), 
          where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data() as Critique);
      }
 
     if(heroParades.length > 0){
       trophes.push(await this.setTrophe(joueur,'The Hail Mary',trophesOwned));
     }
     if([19,20].some(e => heroParades.map(x=>x.intensite).includes(e))){
       trophes.push(await this.setTrophe(joueur,'La chatasse ultime',trophesOwned));
     }
 
     return trophes
 
     //#endregion
  }

  async addEchecCritique(nom:string, intensite:number,tour:number) : Promise<string[]>{
    await setDoc(doc(this.firestore, "heros_echecs", crypto.randomUUID()), {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    });

    //#region trophes
    
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('nom',"==", nom)))).docs.map((entries) => entries.data());
    
    let joueur = heros[0]['code_joueur'];

    let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());

    let trophes = [];
    let trophesOwned = await this.getJoueurTrophes(joueur);
    let heroEchecs: number[] = [];

    for (const hero of allHeros) {
      heroEchecs = (await getDocs(query(collection(this.firestore, 'heros_echecs'), 
      where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data()['intensite']);
    }

    if(heroEchecs.includes(19)){
      trophes.push(await this.setTrophe(joueur,'Pourquoi moi ?!',trophesOwned));
    }
    if([10,11,12].some(e => heroEchecs.includes(e))){
      trophes.push(await this.setTrophe(joueur,'Expelliarmus',trophesOwned));
    }
    if([8,9].some(e => heroEchecs.includes(e))){
      trophes.push(await this.setTrophe(joueur,'Mon fidèle bras droit',trophesOwned));
    }
    if([6,7].some(e => heroEchecs.includes(e))){
      trophes.push(await this.setTrophe(joueur,'Mon fidèle bras gauche',trophesOwned));
    }
    if(heroEchecs.includes(11)){
      trophes.push(await this.setTrophe(joueur,'Façon elle était moche cette armure',trophesOwned));
    }
    if([16,17,18].some(e => heroEchecs.includes(e))){
      trophes.push(await this.setTrophe(joueur,'Sacrieur',trophesOwned));
    }
    if([3,5].some(e => heroEchecs.includes(e))){
      trophes.push(await this.setTrophe(joueur,'Petite sieste reposante',trophesOwned));
    }
    if(heroEchecs.length > 0){
      trophes.push(await this.setTrophe(joueur,"C'est un échec",trophesOwned));
    }

    return trophes

    //#endregion
  }

  async addEntropique(nom:string, intensite:number,tour:number) : Promise<string[]>{
    await setDoc(doc(this.firestore, "heros_entropiques", crypto.randomUUID()), {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    });

     //#region trophes
    
     let heros = (await getDocs(query(collection(this.firestore,'heros'),
     where('nom',"==", nom)))).docs.map((entries) => entries.data());

     let joueur = heros[0]['code_joueur'];
     
     let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
     where('code_joueur',"==",joueur )))).docs.map((entries) => entries.data());
 
     let trophes = [];
     let trophesOwned = await this.getJoueurTrophes(joueur);
     let heroEntropique: Critique[] = [];
 
     for (const hero of allHeros) {
      heroEntropique = (await getDocs(query(collection(this.firestore, 'heros_entropiques'), 
          where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data() as Critique);
      }
 
     if(heroEntropique.length > 100){
       trophes.push(await this.setTrophe(joueur,'Agent du chaos',trophesOwned));
     }
 
     return trophes
 
     //#endregion
  }

  async addEntropiqueMJ(intensite:number,tour:number){
    await setDoc(doc(this.firestore, "heros_entropiques", crypto.randomUUID()), {
      hero_nom:'MJ',
      intensite:intensite,
      date:new Date(),
      tour:tour
    });
  }

  async addCritiqueMJ(intensite:number){
    await setDoc(doc(this.firestore, "heros_critiques", crypto.randomUUID()), {
      hero_nom:"MJ",
      intensite:intensite,
      date:new Date()
    });
  }

  async addParadeMJ(intensite:number){
    await setDoc(doc(this.firestore, "heros_parades", crypto.randomUUID()), {
      hero_nom:"MJ",
      intensite:intensite,
      date:new Date()
    });
  }

  async addEchecCritiqueMJ(intensite:number){
    await setDoc(doc(this.firestore, "heros_echecs", crypto.randomUUID()), {
      hero_nom:'MJ',
      intensite:intensite,
      date:new Date()
    });
  }

  async updateDegatsDealt(nom:string,degats:number,tour:number):Promise<string[]>{
    await setDoc(doc(this.firestore, "heros_degats", crypto.randomUUID()), {
      hero_nom:nom,
      intensite:degats,
      date:new Date(),
      tour:tour
    });

    //#region trophes
    
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('nom',"==", nom)))).docs.map((entries) => entries.data());

    let joueur =  heros[0]['code_joueur'];

    let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==",joueur)))).docs.map((entries) => entries.data());

    let trophes = [];
    let trophesOwned = await this.getJoueurTrophes(joueur);
    if(degats >= 10){
      trophes.push(await this.setTrophe(joueur,'Sacré torgnole',trophesOwned));
    }
    
    if(degats >= 20){
      trophes.push(await this.setTrophe(joueur,'Patate de forain',trophesOwned));
    }
    
    if(degats >= 30){
      trophes.push(await this.setTrophe(joueur,'Coup de pied au cul du Daron',trophesOwned));
    }

    let totalDegat=0;
    for (const hero of allHeros) {
      let allDegats = (await getDocs(query(collection(this.firestore,'heros_degats'),where('hero_nom','==',hero['nom'])))).docs.map((entries) => entries.data());
      allDegats.forEach(element => {
        totalDegat += element['intensite'];
      });
    }
    
    if(totalDegat > 1000){
      trophes.push(await this.setTrophe(joueur,'Premiers pas... dans leur tronche',trophesOwned));
    }
    if(totalDegat > 3000){
      trophes.push(await this.setTrophe(joueur,'I hate you 3 thousands',trophesOwned));
    }
    if(totalDegat > 9000){
      trophes.push(await this.setTrophe(joueur,'Over 9000 !',trophesOwned));
    }
    if(totalDegat > 25000){
      trophes.push(await this.setTrophe(joueur,'La fierté de Thanos',trophesOwned));
    }
    
    //#endregion trophes

    return trophes;
  }

  async removeDestin(nom:string):Promise<string[]>{
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { destin: increment(-1)  }, { merge: true });

    
    //#region trophes
    
    let heros = (await getDocs(query(collection(this.firestore,'heros'),
    where('nom',"==", nom)))).docs.map((entries) => entries.data());
    
    let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", heros[0]['code_joueur'])))).docs.map((entries) => entries.data());

    let trophes = [];
    let herosDestinUtilise = 0;

    for (const hero of allHeros) {
      herosDestinUtilise += hero['destin_utilise'];
    }

    let joueur = heros[0]['code_joueur'];
    let trophesOwned = await this.getJoueurTrophes(joueur);
    trophes.push(await this.setTrophe(joueur,'Try Again',trophesOwned));

    if(heros[0]['destin'] == 0 ){
      trophes.push(await this.setTrophe(joueur,'Un destin tout tracé',trophesOwned));
    }

    if(herosDestinUtilise > 8){
      trophes.push(await this.setTrophe(joueur,'El Gato',trophesOwned));
    }
    if(herosDestinUtilise > 99){
      trophes.push(await this.setTrophe(joueur,'I can do this all day',trophesOwned));
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
    let trophesOwned =  await this.getJoueurTrophes(currentHero[0]['code_joueur']);
    if(currentHero['or'] >= 5000){
      trophes.push(await this.setTrophe(joueur,'Smaug',trophesOwned));
    }
    else if(currentHero['or'] >= 3000){
      trophes.push(await this.setTrophe(joueur,'Picsou',trophesOwned));
    }
    if(currentHero['km'] >= 1000){
      trophes.push(await this.setTrophe(joueur,'One does not simply walk 1000km',trophesOwned)); 
    }
    return trophes;
  }
  
  async add(joueur:string, nom:string, origine:string, 
    metier:string, or : number, 
    destin : number, niveau : number) : Promise<string[]>{
    await setDoc(doc(this.firestore, "heros", nom.toLowerCase()), {
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
    });

     //#region trophes
     
     let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
     where('code_joueur',"==",joueur)))).docs.map((entries) => entries.data());

     let originesJouees = await this.getOriginesJouees();
     let metiersJoues = await this.getMetiersJouees();
     for(let hero of allHeros){
      originesJouees[hero['origine']] ++;
      metiersJoues[hero['metier']] ++;
     }
 
     let trophes = [];
     let trophesOwned =  await this.getJoueurTrophes(joueur);
        
    let trophesOrigine = await this.getTrophesOrigines();
    if(trophesOrigine[origine]){
      trophes.push(await this.setTrophe(joueur,trophesOrigine[origine],trophesOwned));
    }

    let trophesMetier = await this.getTrophesMetier();
    if(trophesMetier[metier]){
      trophes.push(await this.setTrophe(joueur,trophesMetier[metier],trophesOwned));
    }

    let trophesOrigineMetier = await this.getTrophesOriginesMetier();
    if(trophesOrigineMetier[origine] && trophesOrigineMetier[origine][metier]){
      trophes.push(await this.setTrophe(joueur,trophesOrigineMetier[origine][metier],trophesOwned));
    }

    let trophesComplexe = await this.getTrophesComplexeClasse(originesJouees,metiersJoues);
    for(let trophe of trophesComplexe){
      trophes.push(await this.setTrophe(joueur,trophe,trophesOwned));
    }

     return trophes;
 
     //#endregion
  }

  async addMobCombattu(nom:string,mob:string, nombre :number) : Promise<string[]>{
    const hero = doc(this.firestore, 'heros_mobs', nom);
    await setDoc(hero, { [mob]: increment(nombre)  }, { merge: true });

        //#region trophes
    
        let heros = (await getDocs(query(collection(this.firestore,'heros'),
        where('nom',"==", nom)))).docs.map((entries) => entries.data());
        
        let extinction = false;
        let heroMobs = (await getDocs(query(collection(this.firestore,'heros_mobs'),heros[0]['nom']))).docs.map((entries) => entries.data());


        let mobToUpdate = await doc(this.firestore, "mobs", mob)
        await setDoc(mobToUpdate, { apparition:increment(1)  }, { merge: true });

        let trophes = [];

        for (const key in heroMobs[0]) {
          if (heroMobs[0][key] >= 50) {  // Vérifie que la clé est propre à l'objet (et non héritée)
            extinction = true;
          }
        }
        let trophesOwned =  await this.getJoueurTrophes(heros[0]['code_joueur']);
        if(extinction){
          trophes.push(await this.setTrophe(heros[0]['code_joueur'],"En voie d'extinction",trophesOwned));
        }
        if(Object.keys(heroMobs).length >= 50){
          trophes.push(await this.setTrophe(heros[0]['code_joueur'],"Charles Darwin",trophesOwned));
        }

        //#endregion

        return trophes;
  }

  async bulkUpdate(){
    const heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    
    heros.forEach(async (hero) => {
      await setDoc(doc(this.firestore, "heros", hero['nom']), {
        actif:hero['actif'],
        bon_point:hero['bon_point'],
        code_joueur: hero['code_joueur'],
        destin:hero['destin'],
        km:hero['km'],
        mana:hero['mana'],
        mauvais_point:hero['mauvais_point'],
        metier:hero['metier'],
        morts:hero['morts'],
        niveau:hero['niveau'],
        nom: hero['nom'],
        or:hero['or'],
        origine:hero['origine'],
        vie:hero['vie'],
        vivant:hero['vivant'],
      });
    })
    
  }

  async setTrophe(joueur:string,titre:string,trophes:string[]):Promise<string>{
    if(trophes.includes(titre)){
      return "";
    }
    await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
      titre : titre,
      code_joueur:joueur
    });
    return titre;
  }

  async getJoueurTrophes(joueur:string):Promise<string[]>{

    //tous les trophés du joueurs
    let trophesJoueur = (await getDocs(query(collection(this.firestore,'joueurs_trophes'),
    where('code_joueur',"==", joueur)))).docs.map((entries) => entries.data());

    return trophesJoueur.map(x=>x['titre']);
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
    metierJoues:Record<string,number>): Promise<string[]>{
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

    if((await this.getAllOrigine()).length == Object.values(originesJouees).filter(value => value > 0).length){
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
    if((await this.getAllOrigine()).length == Object.values(originesJouees).filter(value => value > 0).length &&
    (await this.getAllMetier()).length == Object.values(metierJoues).filter(value => value > 0).length){
      trophes.push('1001 vies');
    }
    
    
    return [];
  }

}
