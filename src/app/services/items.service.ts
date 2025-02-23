import { Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { HeroArmes, HeroArmures, ItemHelper } from '../../component/model/item';
import { CreationHelper } from '../../component/model/creation';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(public firestore: Firestore) { }

  async getAllArmes(){
    const items = (await getDocs(query(collection(this.firestore,'armes')))).docs.map((items) => items.data());
    return items;
  }
  
  async getAllArmures(){
    const items = (await getDocs(query(collection(this.firestore,'armures')))).docs.map((items) => items.data());
    return items;
  }

  async getArmesByHero(hero:string){
    const itemsLinked =  (await getDocs(query(collection(this.firestore,'heros_armes')
    ,where('hero_nom','==',hero)
    ,where('supprime','==',false)))).docs.map((items) => items.data());

    let armes =  (await getDocs(query(collection(this.firestore,'armes')
    ,where('code','in',itemsLinked.map(x=>x['arme_code']))))).docs.map((items) => items.data());
  
    let heroArmes : HeroArmes = {hero_nom:hero,armes:[]};
    let arme : DocumentData;

    itemsLinked.forEach(element => {
      arme  = armes.find(x=>x['code'] == element['arme_code']) ?? {};
      heroArmes.armes.push({
        code : element['arme_code'],
        libelle : arme['libelle'],
        equipe : element['equipe']
      })
    });
    return heroArmes;
  }

  async getArmuresByHero(hero:string){
    const itemsLinked =  (await getDocs(query(collection(this.firestore,'heros_armures')
    ,where('hero_nom','==',hero)
    ,where('supprime','==',false)))).docs.map((items) => items.data());
    console.log(itemsLinked);

    let armes =  (await getDocs(query(collection(this.firestore,'armures')
    ,where('code','in',itemsLinked.map(x=>x['armure_code']))))).docs.map((items) => items.data());
  
    let heroArmures : HeroArmures = {hero_nom:hero,armures:[]};
    let arme : DocumentData;

    itemsLinked.forEach(element => {
      arme  = armes.find(x=>x['code'] == element['armure_code']) ?? {};
      heroArmures.armures.push({
        code : element['armure_code'],
        libelle : arme['libelle'],
        equipe : element['equipe']
      })
    });
    return heroArmures; 
  }

  async equipe(heroCode:string, arme:string) : Promise<string[]>{
    let armesHero =  (await getDocs(query(
      collection(this.firestore,'heros_armes')
      ,where('hero_nom','==',heroCode)
      ,where('arme_code','==',arme)
      ,where('equipe','==',false)
      ,where('supprime',"==",false))));

      let firstDealedWith : boolean = false;

      //#region trophes
      let trophes = [];

      armesHero.forEach(async (document) => {
        const docId = document.id; // Get document ID
        const docData = document.data(); // Get document data
        docData['equipe'] = true;
    
        if(!firstDealedWith){
          firstDealedWith=true;
          await setDoc(doc(this.firestore,'heros_armes',docId), docData);
        }
      });

      let currentHero = (await getDocs(query(collection(this.firestore,'heros'),
      where('nom',"==", heroCode)))).docs.map((entries) => entries.data())[0];

      let equipes =  (await getDocs(query(
        collection(this.firestore,'heros_armes')
        ,where('hero_nom','==',heroCode)
        ,where('equipe','==',true)
        ,where('supprime',"==",false))))
        .docs.map((entries) => entries.data());

        const nameMap = new Map<string, number>();
        let hasBriseMonde = false;
        let heroPlaque: { [hero: string] : number; } = {};
        let heroDueliste: { [hero: string] : number; } = {};
        for (const item of equipes) {
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
      
        let trophesOwned =  await this.getJoueurTrophes(currentHero[0]['code_joueur']);
        if(nameMap.size > 0){
          trophes.push(await this.setTrophe(currentHero[0]['code_joueur'],"Elémentaire mon cher",trophesOwned));
        }
        if(hasBriseMonde){
          trophes.push(await this.setTrophe(currentHero[0]['code_joueur'],"Galactus", trophesOwned));
        }
        if(heroPlaque){
          trophes.push(await this.setTrophe(currentHero[0]['code_joueur'],"Indestructible",trophesOwned));
        }
        if(heroDueliste){
          trophes.push(await this.setTrophe(currentHero[0]['code_joueur'],"Go 1v1", trophesOwned));
        }

      //#endregion trophes

      return trophes;
  }

  async desequipe(heroCode:string, arme:string){
    let armesHero =  (await getDocs(query(
      collection(this.firestore,'heros_armes')
      ,where('hero_nom','==',heroCode)
      ,where('arme_code','==',arme)
      ,where('equipe','==',true)
      ,where('supprime',"==",false))));

      let firstDealedWith : boolean = false;

      armesHero.forEach(async (document) => {
        const docId = document.id; // Get document ID
        const docData = document.data(); // Get document data
        docData['equipe'] = false;
    
        if(!firstDealedWith){
          firstDealedWith=true;
          await setDoc(doc(this.firestore,'heros_armes',docId), docData);
        }
      });
  }

  async equipeArmure(heroCode:string, armure:string){
    let armesHero =  (await getDocs(query(
      collection(this.firestore,'heros_armures')
      ,where('hero_nom','==',heroCode)
      ,where('armure_code','==',armure)
      ,where('equipe','==',false)
      ,where('supprime',"==",false))));

      let firstDealedWith : boolean = false;

      armesHero.forEach(async (document) => {
        const docId = document.id; // Get document ID
        const docData = document.data(); // Get document data
        docData['equipe'] = true;
    
        if(!firstDealedWith){
          firstDealedWith=true;
          await setDoc(doc(this.firestore,'heros_armures',docId), docData);
        }
      });
  }

  async desequipeArmure(heroCode:string, armure:string){
    let armesHero =  (await getDocs(query(
      collection(this.firestore,'heros_armures')
      ,where('hero_nom','==',heroCode)
      ,where('armure_code','==',armure)
      ,where('equipe','==',true)
      ,where('supprime',"==",false))));

      let firstDealedWith : boolean = false;

      armesHero.forEach(async (document) => {
        const docId = document.id; // Get document ID
        const docData = document.data(); // Get document data
        docData['equipe'] = false;
    
        if(!firstDealedWith){
          firstDealedWith=true;
          await setDoc(doc(this.firestore,'heros_armures',docId), docData);
        }
      });
  }


  async addToHero(heroCode:string, arme:string, equipe:boolean){
    await setDoc(doc(this.firestore, "heros_armes", crypto.randomUUID()), {
      hero_nom: heroCode,
      arme_code:arme,
      equipe:equipe,
      supprime:false
    });
  }

  async addArmureToHero(heroCode:string, arme:string, equipe:boolean){
    await setDoc(doc(this.firestore, "heros_armures", crypto.randomUUID()), {
      hero_nom: heroCode,
      armure_code:arme,
      equipe:equipe,
      supprime:false
    });
  }

  async removeFromHero(heroCode:string, arme: string){
    let armesHero =  (await getDocs(query(
      collection(this.firestore,'heros_armes')
      ,where('hero_nom','==',heroCode)
      ,where('arme_code','==',arme)
      ,where('supprime','==',false))));

      let firstDealedWith : boolean = false;

      armesHero.forEach(async (document) => {
        const docId = document.id; // Get document ID
        const docData = document.data(); // Get document data
        docData['supprime'] = true;
    
        if(!firstDealedWith){
          firstDealedWith=true;
          await setDoc(doc(this.firestore,'heros_armes',docId), docData);
        }
      });
  }
  

  async removeArmureFromHero(heroCode:string, armure: string){
    let armesHero =  (await getDocs(query(
      collection(this.firestore,'heros_armures')
      ,where('hero_nom','==',heroCode)
      ,where('armure_code','==',armure)
      ,where('supprime','==',false))));

      let firstDealedWith : boolean = false;

      armesHero.forEach(async (document) => {
        const docId = document.id; // Get document ID
        const docData = document.data(); // Get document data
        docData['supprime'] = true;
    
        if(!firstDealedWith){
          firstDealedWith=true;
          await setDoc(doc(this.firestore,'heros_armures',docId), docData);
        }
      });
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

  async bulkInsert(){
    let origines =  CreationHelper.getAllMetier();

    origines.forEach(async element => {
      let transformed = element.nom.replaceAll(" ","-").replaceAll("'","-").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
      await setDoc(doc(this.firestore, "metiers",transformed ), {
        code: transformed,
        libelle: element.nom,
      });
    });
  }

}
