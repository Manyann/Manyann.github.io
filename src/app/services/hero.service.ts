import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';

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
    setDoc(hero, { actif: isActif }, { merge: true });
  }

  
  async add(joueur:string, nom:string, origine:string, metier:string, or : number, destin : number, niveau : number){
   
   console.log(joueur,nom,origine,metier,or,destin,niveau)
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
