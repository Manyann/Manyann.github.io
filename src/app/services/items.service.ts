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

  async equipe(heroCode:string, arme:string){
    let armesHero =  (await getDocs(query(
      collection(this.firestore,'heros_armes')
      ,where('hero_nom','==',heroCode)
      ,where('arme_code','==',arme)
      ,where('equipe','==',false)
      ,where('supprime',"==",false))));

      let firstDealedWith : boolean = false;

      armesHero.forEach(async (document) => {
        const docId = document.id; // Get document ID
        const docData = document.data(); // Get document data
        docData['equipe'] = true;
    
        if(!firstDealedWith){
          firstDealedWith=true;
          await setDoc(doc(this.firestore,'heros_armes',docId), docData);
        }
      });
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
