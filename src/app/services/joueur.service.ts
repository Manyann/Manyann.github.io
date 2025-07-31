import { Injectable } from '@angular/core';
import { collection, DocumentData, Firestore, getDocs, query } from '@angular/fire/firestore';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  constructor(
    public firestore: Firestore,
    public storage: StorageService
  ) { }

  async getAll(){
    if(!this.storage.get(StorageKeys.JOUEURS)){
      const heros = (await getDocs(query(collection(this.firestore,'joueurs')))).docs.map((entries) => entries.data());
      this.storage.set<DocumentData[]>(StorageKeys.JOUEURS,heros);
    }
        
    return this.storage.get<DocumentData[]>(StorageKeys.JOUEURS) ?? [];
  }


}
