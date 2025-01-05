import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { ItemHelper } from '../../component/model/item';
import { CreationHelper } from '../../component/model/creation';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(public firestore: Firestore) { }

  async getAllArmes(){
    const items = (await getDocs(query(collection(this.firestore,'armes')))).docs.map((items) => items.data());
  }

  async getArmesByHero(hero:string){
    const itemsLinked =  (await getDocs(query(collection(this.firestore,'heros_armes'),where('hero_nom','==',hero)))).docs.map((items) => items.data());
    return  (await getDocs(query(collection(this.firestore,'armes'),where('code','in',itemsLinked.map(x=>x['arme_code']))))).docs.map((items) => items.data());
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
