import { Injectable } from '@angular/core';

export enum StorageKeys {
  HEROS = 'heros',
  HERO_ORIGINES = 'hero_origines',
  HERO_METIERS = 'hero_metiers',
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
  STATS_JOUEUR_CRIT = 'statistiques_joueur_crit',
  STATS_JOUEUR_COMBAT = 'statistiques_joueur_combat',
  STATS_JOUEUR_TRIVIA = 'statistiques_joueur_trivia',
  STATS_ARMES = 'statistiques_armes',
  STATS_ARMURES = 'statistiques_armures',
  STATS_CRITS= 'statistiques_critiques',
  STATS_ECHECS= 'statistiques_echecs',
  STATS_ENTROPIQUES= 'statistiques_entropique',
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

  private groupExpirations : Record<string, Date>= {};

  set<T>(key: StorageKeys, value: T, expirationMinutes : number = 120): void {
    localStorage.setItem(key, JSON.stringify(value));
    const now = new Date();
    this.groupExpirations['key'] = new Date(now.getTime() + expirationMinutes * 60 * 1000);
  }

  setFromString<T>(key: string, value: T, expirationMinutes : number = 120): void {
    localStorage.setItem(key, JSON.stringify(value));
    const now = new Date();
    this.groupExpirations['key'] = new Date(now.getTime() + expirationMinutes * 60 * 1000);
  }

  get<T>(key: StorageKeys): T | null {
    const value = localStorage.getItem(key);
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
    console.log(key,this.groupExpirations['key'] );
    return localStorage.getItem(key) !== null 
    && this.groupExpirations['key'] !== undefined
    && this.groupExpirations['key'] !== null
    && this.groupExpirations['key'] > new Date();
  }

  
  hasFromString(key: string): boolean {
    return localStorage.getItem(key) !== null 
    && this.groupExpirations['key'] !== undefined
    && this.groupExpirations['key'] !== null
    && this.groupExpirations['key'] > new Date();
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
