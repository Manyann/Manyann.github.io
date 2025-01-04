import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(public firestore: Firestore) { }

  async getAll(){
    const items = (await getDocs(query(collection(this.firestore,'armes')))).docs.map((items) => items.data());
  }

  async getByHero(hero:string){
    const itemsLinked =  (await getDocs(query(collection(this.firestore,'heros_armes'),where('hero_nom','==',hero)))).docs.map((items) => items.data());
    return  (await getDocs(query(collection(this.firestore,'armes'),where('code','in',itemsLinked.map(x=>x['arme_code']))))).docs.map((items) => items.data());
  }


}
