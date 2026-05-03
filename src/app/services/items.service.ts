import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { StorageKeys, StorageService } from './storage.service';
import { HeroArmes, HeroArmures } from '../../services/items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(
    private firestore: Firestore,
    private storage: StorageService,
  ) {}

  async getAllArmes() {
    return this.getCachedCollection(StorageKeys.ARMES);
  }
  async getAllArmures() {
    return this.getCachedCollection(StorageKeys.ARMURES);
  }

  async getArmesByHero(hero: string): Promise<HeroArmes> {
    const links = (
      await getDocs(
        query(
          collection(this.firestore, 'heros_armes'),
          where('hero_nom', '==', hero),
          where('supprime', '==', false),
        ),
      )
    ).docs.map((d) => d.data());

    if (links.length === 0) return { hero_nom: hero, armes: [] };

    // Charge toutes les armes via cache, puis map en mémoire
    const allArmes = await this.getAllArmes();
    const armesByCode = new Map(allArmes.map((a) => [a['code'], a]));

    const result: HeroArmes = { hero_nom: hero, armes: [] };
    for (const l of links) {
      const arme = armesByCode.get(l['arme_code']);
      result.armes.push({
        code: l['arme_code'],
        libelle: arme?.['libelle'] ?? '(inconnu)',
        equipe: !!l['equipe'],
      });
    }
    return result;
  }

  async getArmuresByHero(hero: string): Promise<HeroArmures> {
    const links = (
      await getDocs(
        query(
          collection(this.firestore, 'heros_armures'),
          where('hero_nom', '==', hero),
          where('supprime', '==', false),
        ),
      )
    ).docs.map((d) => d.data());

    if (links.length === 0) return { hero_nom: hero, armures: [] };

    // Charge toutes les armes via cache, puis map en mémoire
    const allArmes = await this.getAllArmes();
    const armesByCode = new Map(allArmes.map((a) => [a['code'], a]));

    const result: HeroArmures = { hero_nom: hero, armures: [] };
    for (const l of links) {
      const arme = armesByCode.get(l['armure_code']);
      result.armures.push({
        code: l['armure_code'],
        libelle: arme?.['libelle'] ?? '(inconnu)',
        equipe: !!l['equipe'],
      });
    }
    return result;
  }

  async equipe(heroCode: string, arme: string): Promise<string[]> {
    const snap = await getDocs(
      query(
        collection(this.firestore, 'heros_armes'),
        where('hero_nom', '==', heroCode),
        where('arme_code', '==', arme),
        where('equipe', '==', false),
        where('supprime', '==', false),
      ),
    );

    // update 1 doc (le premier) de manière sûre
    for (const d of snap.docs) {
      await setDoc(doc(this.firestore, 'heros_armes', d.id), {
        ...d.data(),
        equipe: true,
      });
      break;
    }

    // récupérer le joueur
    const heroSnap = await getDocs(
      query(collection(this.firestore, 'heros'), where('nom', '==', heroCode)),
    );
    const currentHero = heroSnap.docs[0]?.data();
    if (!currentHero) return [];

    const joueur = currentHero['code_joueur'];

    // toutes les armes équipées
    const equipes = (
      await getDocs(
        query(
          collection(this.firestore, 'heros_armes'),
          where('hero_nom', '==', heroCode),
          where('equipe', '==', true),
          where('supprime', '==', false),
        ),
      )
    ).docs.map((d) => d.data());

    const nameMap = new Map<string, number>();
    let hasBriseMonde = false;
    const heroPlaque: Record<string, number> = {};
    const heroDueliste: Record<string, number> = {};

    for (const item of equipes) {
      const heroNom = item['hero_nom'];
      const armeCode = item['arme_code'];

      if (armeCode === 'le-brise-monde') hasBriseMonde = true;
      if (armeCode === 'lame-de-dueliste')
        heroDueliste[heroNom] = (heroDueliste[heroNom] ?? 0) + 1;
      if (armeCode?.includes('plaque-travaille'))
        heroPlaque[heroNom] = (heroPlaque[heroNom] ?? 0) + 1;

      if (
        armeCode === 'baton-d-elementaliste' ||
        armeCode === 'grimoire-universel'
      ) {
        nameMap.set(heroNom, (nameMap.get(heroNom) ?? 0) + 1);
      }
    }

    const trophes: string[] = [];
    if (nameMap.size > 0)
      trophes.push(await this.setTrophe(joueur, 'Elémentaire mon cher'));
    if (hasBriseMonde) trophes.push(await this.setTrophe(joueur, 'Galactus'));
    if (Object.values(heroPlaque).some((v) => v > 0))
      trophes.push(await this.setTrophe(joueur, 'Indestructible'));
    if (Object.values(heroDueliste).some((v) => v > 0))
      trophes.push(await this.setTrophe(joueur, 'Go 1v1'));

    return trophes.filter((t) => t); // enlève les "" éventuels
  }

  async desequipe(heroCode: string, arme: string) {
    let armesHero = await getDocs(
      query(
        collection(this.firestore, 'heros_armes'),
        where('hero_nom', '==', heroCode),
        where('arme_code', '==', arme),
        where('equipe', '==', true),
        where('supprime', '==', false),
      ),
    );

    let firstDealedWith: boolean = false;

    armesHero.forEach(async (document) => {
      const docId = document.id; // Get document ID
      const docData = document.data(); // Get document data
      docData['equipe'] = false;

      if (!firstDealedWith) {
        firstDealedWith = true;
        await setDoc(doc(this.firestore, 'heros_armes', docId), docData);
      }
    });
  }

  async equipeArmure(heroCode: string, armure: string) {
    let armesHero = await getDocs(
      query(
        collection(this.firestore, 'heros_armures'),
        where('hero_nom', '==', heroCode),
        where('armure_code', '==', armure),
        where('equipe', '==', false),
        where('supprime', '==', false),
      ),
    );

    let firstDealedWith: boolean = false;

    armesHero.forEach(async (document) => {
      const docId = document.id; // Get document ID
      const docData = document.data(); // Get document data
      docData['equipe'] = true;

      if (!firstDealedWith) {
        firstDealedWith = true;
        await setDoc(doc(this.firestore, 'heros_armures', docId), docData);
      }
    });
  }

  async desequipeArmure(heroCode: string, armure: string) {
    let armesHero = await getDocs(
      query(
        collection(this.firestore, 'heros_armures'),
        where('hero_nom', '==', heroCode),
        where('armure_code', '==', armure),
        where('equipe', '==', true),
        where('supprime', '==', false),
      ),
    );

    let firstDealedWith: boolean = false;

    armesHero.forEach(async (document) => {
      const docId = document.id; // Get document ID
      const docData = document.data(); // Get document data
      docData['equipe'] = false;

      if (!firstDealedWith) {
        firstDealedWith = true;
        await setDoc(doc(this.firestore, 'heros_armures', docId), docData);
      }
    });
  }

  async addToHero(heroCode: string, arme: string, equipe: boolean) {
    await setDoc(doc(this.firestore, 'heros_armes', crypto.randomUUID()), {
      hero_nom: heroCode,
      arme_code: arme,
      equipe: equipe,
      supprime: false,
    });
  }

  async addArmureToHero(heroCode: string, arme: string, equipe: boolean) {
    await setDoc(doc(this.firestore, 'heros_armures', crypto.randomUUID()), {
      hero_nom: heroCode,
      armure_code: arme,
      equipe: equipe,
      supprime: false,
    });
  }

  async removeFromHero(heroCode: string, arme: string) {
    let armesHero = await getDocs(
      query(
        collection(this.firestore, 'heros_armes'),
        where('hero_nom', '==', heroCode),
        where('arme_code', '==', arme),
        where('supprime', '==', false),
      ),
    );

    let firstDealedWith: boolean = false;

    armesHero.forEach(async (document) => {
      const docId = document.id; // Get document ID
      const docData = document.data(); // Get document data
      docData['supprime'] = true;

      if (!firstDealedWith) {
        firstDealedWith = true;
        await setDoc(doc(this.firestore, 'heros_armes', docId), docData);
      }
    });
  }

  async removeArmureFromHero(heroCode: string, armure: string) {
    let armesHero = await getDocs(
      query(
        collection(this.firestore, 'heros_armures'),
        where('hero_nom', '==', heroCode),
        where('armure_code', '==', armure),
        where('supprime', '==', false),
      ),
    );

    let firstDealedWith: boolean = false;

    armesHero.forEach(async (document) => {
      const docId = document.id; // Get document ID
      const docData = document.data(); // Get document data
      docData['supprime'] = true;

      if (!firstDealedWith) {
        firstDealedWith = true;
        await setDoc(doc(this.firestore, 'heros_armures', docId), docData);
      }
    });
  }

  //#region Trophes

  async setTrophe(joueur: string, titre: string): Promise<string> {
    let trophesOwned = await this.getInnerJoueurTrophes(joueur);

    if (trophesOwned.includes(titre)) {
      return '';
    }

    let document: DocumentData = {
      titre: titre,
      code_joueur: joueur,
    };

    await setDoc(
      doc(this.firestore, 'joueurs_trophes', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(StorageKeys.TROPHES, document);

    return titre;
  }

  async getInnerJoueurTrophes(joueur: string): Promise<string[]> {
    let trophes: DocumentData[] = await this.getAllTrophes();

    return trophes
      ?.filter((x) => x['code_joueur'] == joueur)
      .map((x) => x['titre']);
  }

  async getAllTrophes(): Promise<DocumentData[]> {
    if (!this.storage.get(StorageKeys.TROPHES)) {
      const trophes = (
        await getDocs(query(collection(this.firestore, 'heros_trophes')))
      ).docs.map((entries) => entries.data());
      this.storage.set<DocumentData[]>(StorageKeys.TROPHES, trophes);
    }

    return this.storage.get<DocumentData[]>(StorageKeys.TROPHES) ?? [];
  }

  //#endregion

  private async getCachedCollection(key: StorageKeys): Promise<DocumentData[]> {
    const cached = this.storage.get<DocumentData[]>(key);
    if (cached) return cached;

    const data = (await getDocs(collection(this.firestore, key))).docs.map(
      (d) => d.data(),
    );
    this.storage.set(key, data);
    return data;
  }
}
