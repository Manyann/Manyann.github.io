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
    const itemsLinked =  (await getDocs(query(collection(this.firestore,'heros_armes'),where('hero_nom','==',hero)))).docs.map((items) => items.data());
    let armes =  (await getDocs(query(collection(this.firestore,'armes'),where('code','in',itemsLinked.map(x=>x['arme_code']))))).docs.map((items) => items.data());
  
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
    console.log(heroArmes);
    return heroArmes;
  }

  async getArmuresByHero(hero:string){
    const itemsLinked =  (await getDocs(query(collection(this.firestore,'heros_armures'),where('hero_nom','==',hero)))).docs.map((items) => items.data());
    let armes =  (await getDocs(query(collection(this.firestore,'armures'),where('code','in',itemsLinked.map(x=>x['armure_code']))))).docs.map((items) => items.data());
  
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
    console.log(heroArmures);
    return heroArmures; }

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
