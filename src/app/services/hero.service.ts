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

  async addBonPoint(nom:string){
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { bon_point: increment(1) }, { merge: true });
  }

  async addMauvaisPoint(nom:string){
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { mauvais_point: increment(1)  }, { merge: true });
  }

  async addMort(nom:string){
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { morts: increment(1)  }, { merge: true });
  }

  async addNiveau(nom:string){
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { niveau: increment(1)  }, { merge: true });
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
    
    let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", heros[0]['code_joueur'])))).docs.map((entries) => entries.data());

    let trophes = [];
    let heroCritiques: Critique[] = [];

    for (const hero of allHeros) {
      heroCritiques = (await getDocs(query(collection(this.firestore, 'heros_critiques'), 
              where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data() as Critique);
    }

    if([19,20].some(e => heroCritiques.map(x=>x.intensite).includes(e))){
      trophes.push('Mort instantané');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Mort instantané',
        joueur:heros[0]['code_joueur']
      });
    }
    if(heroCritiques.filter(x=>x.intensite == 19 || x.intensite == 20).length >= 10){
      trophes.push('Highlander');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Highlander',
        joueur:heros[0]['code_joueur']
      });
    }
    if(heroCritiques.filter(x=>x.intensite == 19 || x.intensite == 20).length >= 100){
      trophes.push('One punch man');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'One punch man',
        joueur:heros[0]['code_joueur']
      });
    }
    if([19,20].some(e => heroCritiques.filter(x=>x.tour == 1).map(x=>x.intensite).includes(e))){
      trophes.push('Pas de temps à perdre');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Pas de temps à perdre',
        joueur:heros[0]['code_joueur']
      });
    }

    return trophes

    //#endregion
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
     
     let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
     where('code_joueur',"==", heros[0]['code_joueur'])))).docs.map((entries) => entries.data());
 
     let trophes = [];
     let heroParades: Critique[] = [];
 
     for (const hero of allHeros) {
      heroParades = (await getDocs(query(collection(this.firestore, 'heros_parades'), 
          where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data() as Critique);
      }
 
     if(heroParades.length > 0){
       trophes.push('The Hail Mary');
       await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
         trophe : 'The Hail Mary',
         joueur:heros[0]['code_joueur']
       });
     }
     if([19,20].some(e => heroParades.map(x=>x.intensite).includes(e))){
       trophes.push('La chatasse ultime');
       await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
         trophe : 'La chatasse ultime',
         joueur:heros[0]['code_joueur']
       });
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
    
    let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", heros[0]['code_joueur'])))).docs.map((entries) => entries.data());

    let trophes = [];
    let heroEchecs: number[] = [];

    for (const hero of allHeros) {
      heroEchecs = (await getDocs(query(collection(this.firestore, 'heros_echecs'), 
      where('hero_nom', '==', hero['nom'])))).docs.map((entries) => entries.data()['intensite']);
    }

    if(heroEchecs.includes(19)){
      trophes.push('Pourquoi moi ?!');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Pourquoi moi ?!',
        joueur:heros[0]['code_joueur']
      });
    }
    if([10,11,12].some(e => heroEchecs.includes(e))){
      trophes.push('Expelliarmus');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Expelliarmus',
        joueur:heros[0]['code_joueur']
      });
    }
    if([8,9].some(e => heroEchecs.includes(e))){
      trophes.push('Mon fidèle bras droit');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Mon fidèle bras droit',
        joueur:heros[0]['code_joueur']
      });
    }
    if([6,7].some(e => heroEchecs.includes(e))){
      trophes.push('Mon fidèle bras gauche');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Mon fidèle bras gauche',
        joueur:heros[0]['code_joueur']
      });
    }
    if(heroEchecs.includes(11)){
      trophes.push('Façon elle était moche cette armure');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'açon elle était moche cette armure',
        joueur:heros[0]['code_joueur']
      });
    }
    if([16,17,18].some(e => heroEchecs.includes(e))){
      trophes.push('Sacrieur');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Sacrieur',
        joueur:heros[0]['code_joueur']
      });
    }
    if([3,5].some(e => heroEchecs.includes(e))){
      trophes.push('Petite sieste reposante');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Petite sieste reposante',
        joueur:heros[0]['code_joueur']
      });
    }
    if(heroEchecs.length > 0){
      trophes.push("C'est un échec");
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : "C'est un échec",
        joueur:heros[0]['code_joueur']
      });
    }

    return trophes

    //#endregion
  }

  async addEntropique(nom:string, intensite:number,tour:number){
    await setDoc(doc(this.firestore, "heros_entropiques", crypto.randomUUID()), {
      hero_nom:nom,
      intensite:intensite,
      date:new Date(),
      tour:tour
    });
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
    
    let allHeros = (await getDocs(query(collection(this.firestore,'heros'),
    where('code_joueur',"==", heros[0]['code_joueur'])))).docs.map((entries) => entries.data());

    let trophes = [];
    if(degats >= 10){
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Sacré torgnole',
        joueur:heros[0]['code_joueur']
      });
      trophes.push('Sacré torgnole');
    }
    
    if(degats >= 20){
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Patate de forain',
        joueur:heros[0]['code_joueur']
      });
      trophes.push('Patate de forain');
    }
    
    if(degats >= 30){
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Coup de pied au cul du Daron',
        joueur:heros[0]['code_joueur']
      });
      trophes.push('Coup de pied au cul du Daron');
    }

    let totalDegat=0;
    for (const hero of allHeros) {
      let allDegats = (await getDocs(query(collection(this.firestore,'heros_degats'),where('hero_nom','==',hero['nom'])))).docs.map((entries) => entries.data());
      allDegats.forEach(element => {
        totalDegat += element['intensite'];
      });
    }
    
    if(totalDegat > 1000){
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Premiers pas... dans leur tronche',
        joueur:heros[0]['code_joueur']
      });
      trophes.push('Premiers pas... dans leur tronche');
    }
    if(totalDegat > 3000){
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'I hate you 3 thousands',
        joueur:heros[0]['code_joueur']
      });
      trophes.push('I hate you 3 thousands');
    }
    if(totalDegat > 9000){
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Over 9000 !',
        joueur:heros[0]['code_joueur']
      });
      trophes.push('Over 9000 !');
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

    trophes.push('Try Again');
    await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
      trophe : 'Try Again',
      joueur:heros[0]['code_joueur']
    });

    if(heros[0]['destin'] == 0 ){
      trophes.push('Un destin tout tracé');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'Un destin tout tracé',
        joueur:heros[0]['code_joueur']
      });
    }

    if(herosDestinUtilise > 8){
      trophes.push('El Gato');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'El Gato',
        joueur:heros[0]['code_joueur']
      });
    }
    if(herosDestinUtilise > 99){
      trophes.push('I can do this all day');
      await setDoc(doc(this.firestore,'joueurs_trophes', crypto.randomUUID()),{
        trophe : 'I can do this all day',
        joueur:heros[0]['code_joueur']
      });
      
    }

    return trophes

    //#endregion
  }

  async updateStats(nom:string,kms:number,or:number){
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
  }

  
  async add(joueur:string, nom:string, origine:string, metier:string, or : number, destin : number, niveau : number){
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
  }

  async addMobCombattu(nom:string,mob:string, nombre :number){
    const hero = doc(this.firestore, 'heros_mobs', nom);
    await setDoc(hero, { [mob]: increment(nombre)  }, { merge: true });
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

}
