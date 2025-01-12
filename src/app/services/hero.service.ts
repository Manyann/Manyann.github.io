import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, increment, query, setDoc, where } from '@angular/fire/firestore';

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

  async removeDestin(nom:string){
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { destin: increment(-1)  }, { merge: true });
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
      nom: nom,
      origine:origine,
      metier:metier,
      or:or,
      destin:destin,
      niveau:niveau,
      actif:false,
      vivant:true
    });
  }

}
