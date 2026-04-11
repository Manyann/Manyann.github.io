import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  increment,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Critique } from './statistiques.service';
import { StorageKeys, StorageService } from './storage.service';
import { TrophesService } from './trophes.service';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  constructor(
    private firestore: Firestore,
    private storage: StorageService,
    private trophesService: TrophesService,
  ) {}

  //#region All

  async resetStorage() {
    this.storage.clear();
  }

  async getAll() {
    return this.getCachedCollection(StorageKeys.HEROS);
  }

  async getAllOrigine() {
    return this.getCachedCollection(StorageKeys.ORIGINES);
  }

  async getAllMetier() {
    return this.getCachedCollection(StorageKeys.METIERS);
  }

  async getAllHerosCritique() {
    return this.getCachedCollection(StorageKeys.HERO_CRITIQUES);
  }

  async getAllHerosParade() {
    return this.getCachedCollection(StorageKeys.HERO_PARADES);
  }

  async getAllHerosEchec() {
    return this.getCachedCollection(StorageKeys.HERO_ECHECS);
  }

  async getAllHerosEntropique() {
    return this.getCachedCollection(StorageKeys.HERO_ENTROPIQUES);
  }

  async getAllHerosDegat() {
    return this.getCachedCollection(StorageKeys.HERO_DEGATS);
  }

  async getAllHerosMob() {
    return this.getCachedCollection(StorageKeys.HERO_MOBS);
  }

  async getAllTrophes() {
    return this.getCachedCollection(StorageKeys.TROPHES);
  }

  async getAllFromSession() {
    return (await this.getAll())?.filter((x) => x['actif']) ?? [];
  }

  async getByName(name: string) {
    return (await this.getAll())?.filter((x) => x['nom'] == name) ?? [];
  }

  async getAllHeroOfJoueur(joueur: string) {
    return (await this.getAll())?.filter((x) => x['code_joueur'] == joueur);
  }

  //#endregion All

  async updateSession(nom: string, isActif: boolean) {
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { actif: isActif }, { merge: true });

    this.storage.updatePropertyInStorage<DocumentData, boolean>(
      StorageKeys.HEROS,
      'nom',
      nom,
      'actif',
      isActif,
    );
  }

  async add(
    joueur: string,
    nom: string,
    origine: string,
    metier: string,
    or: number,
    destin: number,
    niveau: number,
  ): Promise<string[]> {
    let document: DocumentData = {
      code_joueur: joueur,
      nom: nom.toLowerCase(),
      origine: origine,
      metier: metier,
      or: or,
      destin: destin,
      niveau: niveau,
      actif: false,
      vivant: true,
      km: 0,
      bon_point: 0,
      mauvais_point: 0,
      mana: 0,
      morts: 0,
      vie: 0,
      destin_utilise: 0,
    };

    await setDoc(doc(this.firestore, 'heros', nom.toLowerCase()), document);
    this.storage.addElementInStorageGroup(StorageKeys.HEROS, document);

    //#region trophes

    let allHeros = await this.getAllHeroOfJoueur(joueur);

    let originesJouees = this.trophesService.getOriginesJouees();
    let metiersJoues = this.trophesService.getMetiersJouees();
    for (let hero of allHeros) {
      originesJouees[hero['origine']]++;
      metiersJoues[hero['metier']]++;
    }

    let trophes = [];

    let trophesOrigine = this.trophesService.getTrophesOrigines();
    if (trophesOrigine[origine]) {
      trophes.push(await this.setTrophe(joueur, trophesOrigine[origine]));
    }

    let trophesMetier = this.trophesService.getTrophesMetier();
    if (trophesMetier[metier]) {
      trophes.push(await this.setTrophe(joueur, trophesMetier[metier]));
    }

    let trophesOrigineMetier = this.trophesService.getTrophesOriginesMetier();
    if (
      trophesOrigineMetier[origine] &&
      trophesOrigineMetier[origine][metier]
    ) {
      trophes.push(
        await this.setTrophe(joueur, trophesOrigineMetier[origine][metier]),
      );
    }

    let trophesComplexe = this.trophesService.getTrophesComplexeClasse(
      originesJouees,
      metiersJoues,
      await this.getAllOrigine(),
      await this.getAllMetier(),
    );
    for (let trophe of trophesComplexe) {
      trophes.push(await this.setTrophe(joueur, trophe));
    }

    return trophes;

    //#endregion
  }

  //#endregion All

  //#region Joueurs

  //#region Statistiques

  async addBonPoint(nom: string): Promise<string[]> {
    const hero = doc(this.firestore, 'heros', nom);

    //#region trophes

    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];

    const current = heros[0]['bon_point'] ?? 0;
    const next = current + 1;

    await setDoc(hero, { bon_point: increment(1) }, { merge: true });
    this.storage.updatePropertyInStorage<DocumentData, number>(
      StorageKeys.HEROS,
      'nom',
      nom,
      'bon_point',
      next,
    );

    let trophes = [];

    if (next >= 5) {
      trophes.push(await this.setTrophe(joueur, 'Gentilhomme'));
    }
    if (next >= 10) {
      trophes.push(await this.setTrophe(joueur, 'Un saint parmi les saints'));
    }
    if (next >= 15) {
      trophes.push(await this.setTrophe(joueur, 'Gros lèche botte là'));
    }

    return trophes;

    //#endregion
  }

  async addMauvaisPoint(nom: string): Promise<string[]> {
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { mauvais_point: increment(1) }, { merge: true });

    //#region trophes

    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];

    const current = heros[0]['mauvais_point'] ?? 0;
    const next = current + 1;

    this.storage.updatePropertyInStorage<DocumentData, number>(
      StorageKeys.HEROS,
      'nom',
      nom,
      'mauvais_point',
      next,
    );

    let trophes = [];

    if (next == 5) {
      trophes.push(await this.setTrophe(joueur, 'Filer du mauvais coton'));
    }
    if (next == 10) {
      trophes.push(await this.setTrophe(joueur, "L'incarnation du mal"));
    }
    if (next == 15) {
      trophes.push(await this.setTrophe(joueur, 'Là tu cherches'));
    }

    return trophes;

    //#endregion
  }

  async addMort(nom: string) {
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { morts: increment(1) }, { merge: true });

    let heros = await this.getByName(nom);

    const current = heros[0]['morts'] ?? 0;
    const next = current + 1;

    this.storage.updatePropertyInStorage<DocumentData, number>(
      StorageKeys.HEROS,
      'nom',
      nom,
      'morts',
      next,
    );
  }

  async addNiveau(nom: string): Promise<string[]> {
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(hero, { niveau: increment(1) }, { merge: true });

    //#region trophes

    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];

    const current = heros[0]['niveau'] ?? 0;
    const next = current + 1;

    this.storage.updatePropertyInStorage<DocumentData, number>(
      StorageKeys.HEROS,
      'nom',
      nom,
      'niveau',
      next,
    );

    let trophes = [];

    if (next == 10) {
      trophes.push(await this.setTrophe(joueur, "C'est donc possible ..."));
    }

    return trophes;

    //#endregion
  }

  async addFinCombatStats(
    heroDegats: Record<string, number>,
  ): Promise<string[]> {
    const degats = Object.values(heroDegats);
    const moyenne = degats.reduce((a, b) => a + b, 0) / degats.length;

    const tousSimilaires = degats.every((val) => {
      const min = moyenne * 0.9;
      const max = moyenne * 1.1;
      return val >= min && val <= max;
    });

    const herosAvecZeroDegats = Object.entries(heroDegats)
      .filter(([_, val]) => val === 0)
      .map(([key, _]) => key);

    const herosAvecDegats = Object.entries(heroDegats)
      .filter(([_, val]) => val !== 0)
      .map(([key, _]) => key);

    let hyperCarry = '';
    for (const [key, value] of Object.entries(heroDegats)) {
      const otherTotal = Object.entries(heroDegats)
        .filter(([k]) => k !== key)
        .reduce((sum, [, v]) => sum + v, 0);

      if (value > 3 * otherTotal) {
        hyperCarry = key;
      }
    }

    let trophes = [];

    for (const hero of Object.keys(heroDegats)) {
      if (
        tousSimilaires ||
        (herosAvecDegats.includes(hero) && herosAvecDegats.length === 1) ||
        herosAvecZeroDegats.includes(hero)
      ) {
        let heros = await this.getByName(hero);

        let joueur = heros[0]['code_joueur'];

        if (tousSimilaires) {
          trophes.push(await this.setTrophe(joueur, "Sur un pied d'égalité"));
        }
        if (hyperCarry == hero) {
          trophes.push(await this.setTrophe(joueur, 'Hyper carry'));
        }
        if (herosAvecDegats.includes(hero) && herosAvecDegats.length === 1) {
          trophes.push(await this.setTrophe(joueur, 'Solo carry'));
        }
        if (herosAvecZeroDegats.includes(hero)) {
          trophes.push(await this.setTrophe(joueur, 'Spectateur'));
        }
      }
    }

    return trophes;
  }

  async updateDegatsDealt(
    nom: string,
    degats: number,
    tour: number,
  ): Promise<string[]> {
    let document: DocumentData = {
      hero_nom: nom,
      intensite: degats,
      date: new Date(),
      tour: tour,
    };

    await setDoc(
      doc(this.firestore, 'heros_degats', crypto.randomUUID()),
      document,
    );

    //#region trophes

    let heros = await this.getByName(nom);

    let joueur = heros[0]['code_joueur'];

    let allHeros = await this.getAllHeroOfJoueur(joueur);

    let trophes = [];
    if (degats >= 10) {
      trophes.push(await this.setTrophe(joueur, 'Sacré torgnole'));
    }

    if (degats >= 20) {
      trophes.push(await this.setTrophe(joueur, 'Patate de forain'));
    }

    if (degats >= 30) {
      trophes.push(
        await this.setTrophe(joueur, 'Coup de pied au cul du Daron'),
      );
    }

    let totalDegat = 0;
    const allDegats = await this.getAllHerosDegat();
    for (const hero of allHeros) {
      const heroDegats = allDegats.filter((x) => x['hero_nom'] === hero['nom']);
      heroDegats.forEach((element) => {
        totalDegat += element['intensite'];
      });
    }

    if (totalDegat > 1000) {
      trophes.push(
        await this.setTrophe(joueur, 'Premiers pas... dans leur tronche'),
      );
    }
    if (totalDegat > 3000) {
      trophes.push(await this.setTrophe(joueur, 'I hate you 3 thousands'));
    }
    if (totalDegat > 9000) {
      trophes.push(await this.setTrophe(joueur, 'Over 9000 !'));
    }
    if (totalDegat > 25000) {
      trophes.push(await this.setTrophe(joueur, 'La fierté de Thanos'));
    }
    this.storage.addElementInStorageGroup(StorageKeys.HERO_DEGATS, document);

    //#endregion trophes

    return trophes;
  }

  async removeDestin(nom: string): Promise<string[]> {
    const hero = doc(this.firestore, 'heros', nom);
    await setDoc(
      hero,
      { destin: increment(-1), destin_utilise: increment(1) },
      { merge: true },
    );

    //#region trophes

    let heros = await this.getByName(nom);

    const current = heros[0]['destin_utilise'] ?? 0;
    const next = current - 1;

    this.storage.updatePropertyInStorage<DocumentData, number>(
      StorageKeys.HEROS,
      'nom',
      nom,
      'destin_utilise',
      next,
    );

    let joueur = heros[0]['code_joueur'];

    let allHeros = await this.getAllHeroOfJoueur(joueur);
    let trophes = [];
    let herosDestinUtilise = 0;

    for (const hero of allHeros) {
      herosDestinUtilise += hero['destin_utilise'];
    }

    trophes.push(await this.setTrophe(joueur, 'Try Again'));

    if (heros[0]['destin'] == 0) {
      trophes.push(await this.setTrophe(joueur, 'Un destin tout tracé'));
    }

    if (herosDestinUtilise > 8) {
      trophes.push(await this.setTrophe(joueur, 'El Gato'));
    }
    if (herosDestinUtilise > 99) {
      trophes.push(await this.setTrophe(joueur, 'I can do this all day'));
    }

    return trophes;

    //#endregion
  }

  async updateStats(nom: string, kms: number, or: number): Promise<string[]> {
    const hero = doc(this.firestore, 'heros', nom);
    if (kms !== 0 || or !== 0) {
      await setDoc(
        hero,
        { km: increment(kms), or: increment(or) },
        { merge: true },
      );
    }
    if (or !== 0) {
      await setDoc(
        doc(this.firestore, 'heros_transactions', crypto.randomUUID()),
        {
          hero_nom: nom,
          or: or,
          date: new Date(),
        },
      );
    }

    let currentHero = (
      await getDocs(
        query(collection(this.firestore, 'heros'), where('nom', '==', nom)),
      )
    ).docs.map((entries) => entries.data())[0];
    let joueur = currentHero['code_joueur'];

    let trophes = [];
    if (currentHero['or'] >= 5000) {
      trophes.push(await this.setTrophe(joueur, 'Smaug'));
    } else if (currentHero['or'] >= 3000) {
      trophes.push(await this.setTrophe(joueur, 'Picsou'));
    }
    if (currentHero['km'] >= 1000) {
      trophes.push(
        await this.setTrophe(joueur, 'One does not simply walk 1000km'),
      );
    }
    return trophes;
  }

  async addMobCombattu(
    nom: string,
    mob: string,
    nombre: number,
  ): Promise<string[]> {
    const hero = doc(this.firestore, 'heros_mobs', nom);
    await setDoc(hero, { [mob]: increment(nombre) }, { merge: true });

    //#region trophes

    let heros = await this.getByName(nom);

    let joueur = heros[0]['code_joueur'];

    let extinction = false;
    let heroMobs = (await this.getAllHerosMob())?.filter(
      (x) => x['nom'] == nom,
    );

    let mobToUpdate = await doc(this.firestore, 'mobs', mob);
    await setDoc(mobToUpdate, { apparition: increment(1) }, { merge: true });

    let storageMob = this.storage
      .get<DocumentData[]>(StorageKeys.MOBS)
      ?.find((x) => x['code'] == mob);
    let apparition = storageMob !== undefined ? storageMob['apparition'] : 0;
    this.storage.updatePropertyInStorage<DocumentData, number>(
      StorageKeys.MOBS,
      'code',
      mob,
      'apparition',
      apparition + 1,
    );

    let trophes = [];

    for (const key in heroMobs[0]) {
      if (heroMobs[0][key] >= 50) {
        // Vérifie que la clé est propre à l'objet (et non héritée)
        extinction = true;
      }
    }
    if (extinction) {
      trophes.push(await this.setTrophe(joueur, "En voie d'extinction"));
    }
    if (Object.keys(heroMobs).length >= 50) {
      trophes.push(await this.setTrophe(joueur, 'Charles Darwin'));
    }

    //#endregion

    return trophes;
  }

  //#endregion Statistiques

  //#region Critiques

  async addCritique(
    nom: string,
    intensite: number,
    tour: number,
  ): Promise<string[]> {
    let document: DocumentData = {
      hero_nom: nom,
      intensite: intensite,
      date: new Date(),
      tour: tour,
    };

    await setDoc(
      doc(this.firestore, 'heros_critiques', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(StorageKeys.HERO_CRITIQUES, document);

    //#region trophes

    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];

    let trophes = [];
    const allHeros = await this.getAllHeroOfJoueur(joueur);
    const all = await this.getAllHerosCritique(); // 1 seule lecture
    const noms = new Set(allHeros.map((h) => h['nom'])); // noms des héros du joueur
    const heroCritiques = all
      .filter((x) => noms.has(x['hero_nom']))
      .map((x) => x as Critique);

    if (
      [19, 20].some((e) => heroCritiques.map((x) => x.intensite).includes(e))
    ) {
      trophes.push(await this.setTrophe(joueur, 'Mort instantané'));
    }
    if (
      heroCritiques.filter((x) => x.intensite == 19 || x.intensite == 20)
        .length >= 10
    ) {
      trophes.push(await this.setTrophe(joueur, 'Highlander'));
    }
    if (
      heroCritiques.filter((x) => x.intensite == 19 || x.intensite == 20)
        .length >= 100
    ) {
      trophes.push(await this.setTrophe(joueur, 'One punch man'));
    }
    if (
      [19, 20].some((e) =>
        heroCritiques
          .filter((x) => x.tour == 1)
          .map((x) => x.intensite)
          .includes(e),
      )
    ) {
      trophes.push(await this.setTrophe(joueur, 'Pas de temps à perdre'));
    }

    return trophes;

    //#endregion
  }

  async addParade(
    nom: string,
    intensite: number,
    tour: number,
  ): Promise<string[]> {
    let document: DocumentData = {
      hero_nom: nom,
      intensite: intensite,
      date: new Date(),
      tour: tour,
    };

    await setDoc(
      doc(this.firestore, 'heros_parades', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(StorageKeys.HERO_PARADES, document);

    //#region trophes

    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];

    let trophes = [];
    const allHeros = await this.getAllHeroOfJoueur(joueur);
    const all = await this.getAllHerosParade();
    const noms = new Set(allHeros.map((h) => h['nom']));
    const heroParades = all
      .filter((x) => noms.has(x['hero_nom']))
      .map((x) => x as Critique);

    if (heroParades.length > 0) {
      trophes.push(await this.setTrophe(joueur, 'The Hail Mary'));
    }
    if ([19, 20].some((e) => heroParades.map((x) => x.intensite).includes(e))) {
      trophes.push(await this.setTrophe(joueur, 'La chatasse ultime'));
    }

    return trophes;

    //#endregion
  }

  async addEchecCritique(
    nom: string,
    intensite: number,
    tour: number,
  ): Promise<string[]> {
    let document: DocumentData = {
      hero_nom: nom,
      intensite: intensite,
      date: new Date(),
      tour: tour,
    };

    await setDoc(
      doc(this.firestore, 'heros_echecs', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(StorageKeys.HERO_ECHECS, document);

    //#region trophes

    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];

    let trophes = [];
    const allHeros = await this.getAllHeroOfJoueur(joueur);
    const all = await this.getAllHerosEchec(); // (et pas Parade)
    const noms = new Set(allHeros.map((h) => h['nom']));
    const heroEchecs = all
      .filter((x) => noms.has(x['hero_nom']))
      .map((x) => x['intensite'] as number);

    if (heroEchecs.includes(19)) {
      trophes.push(await this.setTrophe(joueur, 'Pourquoi moi ?!'));
    }
    if ([10, 11, 12].some((e) => heroEchecs.includes(e))) {
      trophes.push(await this.setTrophe(joueur, 'Expelliarmus'));
    }
    if ([8, 9].some((e) => heroEchecs.includes(e))) {
      trophes.push(await this.setTrophe(joueur, 'Mon fidèle bras droit'));
    }
    if ([6, 7].some((e) => heroEchecs.includes(e))) {
      trophes.push(await this.setTrophe(joueur, 'Mon fidèle bras gauche'));
    }
    if ([13, 14, 15].some((e) => heroEchecs.includes(e))) {
      trophes.push(
        await this.setTrophe(joueur, 'Façon elle était moche cette armure'),
      );
    }
    if ([16, 17, 18].some((e) => heroEchecs.includes(e))) {
      trophes.push(await this.setTrophe(joueur, 'Sacrieur'));
    }
    if ([3, 5].some((e) => heroEchecs.includes(e))) {
      trophes.push(await this.setTrophe(joueur, 'Petite sieste reposante'));
    }
    if (heroEchecs.length > 0) {
      trophes.push(await this.setTrophe(joueur, "C'est un échec"));
    }

    return trophes;

    //#endregion
  }

  async addEntropique(
    nom: string,
    intensite: number,
    tour: number,
  ): Promise<string[]> {
    let document: DocumentData = {
      hero_nom: nom,
      intensite: intensite,
      date: new Date(),
      tour: tour,
    };

    await setDoc(
      doc(this.firestore, 'heros_entropiques', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(
      StorageKeys.HERO_ENTROPIQUES,
      document,
    );

    //#region trophes

    let heros = await this.getByName(nom);
    let joueur = heros[0]['code_joueur'];

    let trophes = [];
    const allHeros = await this.getAllHeroOfJoueur(joueur);
    const all = await this.getAllHerosEntropique(); // (et pas Parade)
    const noms = new Set(allHeros.map((h) => h['nom']));
    const heroEntropiques = all
      .filter((x) => noms.has(x['hero_nom']))
      .map((x) => x as Critique);

    if (heroEntropiques.length > 100) {
      trophes.push(await this.setTrophe(joueur, 'Agent du chaos'));
    }

    return trophes;

    //#endregion
  }

  //#endregion Critiques

  //#endregion Joueurs

  //#region MJ

  //#region Critiques

  async addCritiqueMJ(intensite: number) {
    let document: DocumentData = {
      hero_nom: 'MJ',
      intensite: intensite,
      date: new Date(),
    };

    await setDoc(
      doc(this.firestore, 'heros_critiques', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(StorageKeys.HERO_CRITIQUES, document);
  }

  async addParadeMJ(intensite: number) {
    let document: DocumentData = {
      hero_nom: 'MJ',
      intensite: intensite,
      date: new Date(),
    };

    await setDoc(
      doc(this.firestore, 'heros_parades', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(StorageKeys.HERO_PARADES, document);
  }

  async addEchecCritiqueMJ(intensite: number) {
    let document: DocumentData = {
      hero_nom: 'MJ',
      intensite: intensite,
      date: new Date(),
    };

    await setDoc(
      doc(this.firestore, 'heros_echecs', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(StorageKeys.HERO_ECHECS, document);
  }

  async addEntropiqueMJ(intensite: number) {
    let document: DocumentData = {
      hero_nom: 'MJ',
      intensite: intensite,
      date: new Date(),
    };

    await setDoc(
      doc(this.firestore, 'heros_entropiques', crypto.randomUUID()),
      document,
    );

    this.storage.addElementInStorageGroup(
      StorageKeys.HERO_ENTROPIQUES,
      document,
    );
  }

  //#endregion Critiques

  //#endregion MJ

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
