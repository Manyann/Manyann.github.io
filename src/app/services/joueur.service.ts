import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  constructor(public firestore: Firestore) { }

  async getAll(){
    const joueurs = (await getDocs(query(collection(this.firestore,'joueurs')))).docs.map((entries) => entries.data());
    return joueurs;
  }


}
