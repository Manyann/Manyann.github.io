import { Injectable } from '@angular/core';

export enum StorageKeys {
  HEROS = 'heros',
  HERO_ORIGINES = 'hero_origines',
  HERO_CRITIQUES = 'hero_critiques',
  HERO_PARADES= 'hero_parades',
  HERO_ECHECS= 'hero_echecs',
  HERO_ENTROPIQUES= 'hero_entropiques',
  HERO_DEGATS= 'hero_degats',
  HERO_MOBS= 'hero_mobs',
  HERO_ARMES= 'hero_armes',
  HERO_ARMURES= 'hero_armures',
  ARMES = 'armes',
  ARMURES = 'armures',
  POTIONS = 'potions',
  MOBS = 'mobs',
  JOUEURS = 'joueurs',
  JOUEURS_ORIGINES = 'joueurs_origines',
  JOUEURS_METIERS = 'joueurs_metiers',
  STATS = 'statistiques',
  STATS_ARMES = 'statistiques_armes',
  STATS_ARMURES = 'statistiques_armures',
  STATS_CRITS= 'statistiques_critiques',
  STATS_ECHECS= 'statistiques_echecs',
  STATS_DEGATS= 'statistiques_degats',
  STATS_DEGATS_MAX= 'statistiques_degats_max',
  STATS_MOBS= 'statistiques_mobs',
  TROPHES = 'trophes',
  ORIGINES = 'origines',
  METIERS = 'metiers'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  set<T>(key: StorageKeys, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  setFromString<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: StorageKeys): T | null {
    const value = localStorage.getItem(key);
    debugger;
    return value ? JSON.parse(value) as T : null;
  }

  getFromString<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  }

  remove(key: StorageKeys): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  has(key: StorageKeys): boolean {
    return localStorage.getItem(key) !== null;
  }

    

  async updatePropertyInStorage<K,T>(
    key : StorageKeys, 
    finderProperty : keyof K, 
    findervalue : string, 
    setterProperty: keyof K,
    value : T)
  {
    let list = this.get<K[]>(key) ?? [];
    const heroIndex = list.findIndex(h => (h as K)[finderProperty] === findervalue);

     list[heroIndex] = {
      ...list[heroIndex],
      [setterProperty]: value
     };

     this.set<K[]>(key,list);
  }

  async addElementInStorageGroup<K>(key: StorageKeys, item : K){
    let list = this.get<K[]>(key) ?? [];
    list.push(item);
    this.set<K[]>(key,list);
  }
}
