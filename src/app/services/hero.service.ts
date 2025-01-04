import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  constructor(public firestore: Firestore) { }

  async getAll(){
    const heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    return heros;
  }

  async getByName(name: string){
    const heros = (await getDocs(query(collection(this.firestore,'heros'),where('nom','==',name)))).docs.map((entries) => entries.data());
    return heros;
  }
}
