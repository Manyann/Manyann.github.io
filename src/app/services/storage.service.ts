import { Injectable } from '@angular/core';

export enum StorageKeys {
  HEROS = 'heros',
  HERO_ORIGINES = 'hero_origines',
  HERO_METIERS = 'hero_metiers',
  HERO_CRITIQUES = 'heros_critiques',
  HERO_PARADES= 'heros_parades',
  HERO_ECHECS= 'heros_echecs',
  HERO_ENTROPIQUES= 'heros_entropiques',
  HERO_DEGATS= 'heros_degats',
  HERO_MOBS= 'heros_mobs',
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
  TROPHES = 'joueurs_trophes',
  ORIGINES = 'origines',
  METIERS = 'metiers'
}

type StorageKey = StorageKeys | string;

interface StoredEnvelope<T> {
  v: 1;              // version de format
  expiresAt: number; // timestamp ms
  value: T;
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  /** Expiration par défaut (en minutes) */
  private readonly defaultExpirationMinutes = 120;

  /** Si true: get() migrera l'ancien format (valeur brute) vers enveloppe */
  private readonly enableMigration = true;

  set<T>(key: StorageKey, value: T, expirationMinutes: number = this.defaultExpirationMinutes): void {
    const expiresAt = Date.now() + expirationMinutes * 60_000;
    const payload: StoredEnvelope<T> = { v: 1, expiresAt, value };
    localStorage.setItem(String(key), JSON.stringify(payload));
  }

  /** Stocke une valeur "sans expiration" (si tu en as besoin) */
  setPermanent<T>(key: StorageKey, value: T): void {
    const payload: StoredEnvelope<T> = { v: 1, expiresAt: Number.POSITIVE_INFINITY, value };
    localStorage.setItem(String(key), JSON.stringify(payload));
  }

  get<T>(key: StorageKey): T | null {
    const raw = localStorage.getItem(String(key));
    if (!raw) return null;

    // 1) Tentative lecture au nouveau format
    const envelope = this.tryParseEnvelope<T>(raw);

    if (envelope) {
      if (this.isExpired(envelope.expiresAt)) {
        localStorage.removeItem(String(key));
        return null;
      }
      return envelope.value;
    }

    // 2) Fallback: ancien format (valeur brute JSON)
    try {
      const legacyValue = JSON.parse(raw) as T;

      if (this.enableMigration) {
        // migration silencieuse: on conserve l'expiration par défaut
        this.set(String(key), legacyValue, this.defaultExpirationMinutes);
      }
      return legacyValue;
    } catch {
      // données corrompues -> on nettoie
      localStorage.removeItem(String(key));
      return null;
    }
  }

  /** Vérifie si une clé existe ET n'est pas expirée */
  has(key: StorageKey): boolean {
    return this.get(key) !== null;
  }

  remove(key: StorageKey): void {
    localStorage.removeItem(String(key));
  }

  /** Nettoie uniquement les clés expirées (utile si tu veux le faire au démarrage) */
  purgeExpired(prefix?: string): void {
    const keys = Object.keys(localStorage);
    for (const k of keys) {
      if (prefix && !k.startsWith(prefix)) continue;

      const raw = localStorage.getItem(k);
      if (!raw) continue;

      const env = this.tryParseEnvelope<unknown>(raw);
      if (env && this.isExpired(env.expiresAt)) {
        localStorage.removeItem(k);
      }
    }
  }

  clear(): void {
    localStorage.clear();
  }

  /** Update sûr d'une propriété d'un élément dans un tableau stocké */
  updatePropertyInStorage<K extends Record<string, any>, V>(
    key: StorageKey,
    finderProperty: keyof K,
    finderValue: K[keyof K],
    setterProperty: keyof K,
    value: V
  ): boolean {
    const list = this.get<K[]>(key) ?? [];
    const idx = list.findIndex(item => item?.[finderProperty] === finderValue);
    if (idx === -1) return false;

    list[idx] = { ...list[idx], [setterProperty]: value } as K;
    this.set(key, list);
    return true;
  }

  /** Ajout simple dans un tableau stocké */
  addElementInStorageGroup<K>(key: StorageKey, item: K): void {
    const list = this.get<K[]>(key) ?? [];
    list.push(item);
    this.set(key, list);
  }

  /** Optionnel: upsert (update si trouvé sinon add) */
  upsertElementInStorageGroup<K extends Record<string, any>>(
    key: StorageKey,
    finderProperty: keyof K,
    finderValue: K[keyof K],
    item: K
  ): 'updated' | 'added' {
    const list = this.get<K[]>(key) ?? [];
    const idx = list.findIndex(x => x?.[finderProperty] === finderValue);

    if (idx === -1) {
      list.push(item);
      this.set(key, list);
      return 'added';
    }

    list[idx] = { ...list[idx], ...item };
    this.set(key, list);
    return 'updated';
  }

  // ----------------- internals -----------------

  private isExpired(expiresAt: number): boolean {
    return Number.isFinite(expiresAt) && expiresAt <= Date.now();
  }

  private tryParseEnvelope<T>(raw: string): StoredEnvelope<T> | null {
    try {
      const parsed = JSON.parse(raw) as Partial<StoredEnvelope<T>>;

      // petit check "structure"
      if (
        parsed &&
        (parsed as any).v === 1 &&
        typeof (parsed as any).expiresAt === 'number' &&
        'value' in (parsed as any)
      ) {
        return parsed as StoredEnvelope<T>;
      }
      return null;
    } catch {
      return null;
    }
  }
}
