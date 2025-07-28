import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, increment, query, setDoc, where } from '@angular/fire/firestore';
import { EnnemiHelper, Mob } from '../../component/model/ennemi';

type CacheStore<T> = {
  [key: string]: T;
};

@Injectable({
  providedIn: 'root'
})
export class MobsService {

  private cache: CacheStore<any> = {};
  constructor(public firestore: Firestore) { }

  async clean(){
    const propertiesSnapshot = await getDocs(collection(this.firestore,'mobs'));

const propertyNames:Array<string> = [];
propertiesSnapshot.forEach((doc) => {
  propertyNames.push(doc.id);
});

const sums : any= {};
propertyNames.forEach((prop) => {
  sums[prop] = 0;
});

const xxSnapshot = await getDocs(collection(this.firestore,'heros_mobs'));

xxSnapshot.forEach((doc) => {
  const data = doc.data();
  propertyNames.forEach((prop) => {
    if (typeof data[prop] === "number") {
      sums[prop] += data[prop];
    }
  });
});
propertiesSnapshot.forEach(async (doc) => {
  let apparition = Math.round(sums[doc.id]/3);
  // await setDoc(doc.ref, { apparition:0  }, { merge: true });
    await setDoc(doc.ref, { apparition: increment(apparition)  }, { merge: true });
});

}

  async getAll(){

     // Si la donnée est dans le cache, on la retourne
    if (this.cache['mobs']) {
      return this.cache['mobs'] as Mob[];
    }

    const mobs = (await getDocs(query(collection(this.firestore,'mobs')))).docs.map((entries) => entries.data() as Mob);
    
    this.cache['mobs'] = mobs; // Mise en cache
    return mobs;
  }

  async getByZone(zone:string){
    const mobs = (await getDocs(query(collection(this.firestore,'mobs')
          ,where('zone','==',zone)
        ))).docs.map((entries) => entries.data() as Mob);
    return mobs;
  }

  async insert(mob:Mob){
    let code = mob.libelle.replaceAll(" ","-").replaceAll("'","-").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
      
    await setDoc(doc(this.firestore, "mobs",code ), {
      code: code ,
      libelle: mob.libelle,
      zone:'autre',
      attaque:mob.attaque,
      parade:mob.parade,
      vie:mob.vie,
      informations:mob.informations,
      degats:mob.degats,
      armure:mob.armure,
      experience:mob.experience,
    });
  }

  async bulkInsert(){

    let mobs : Mob[] = [];
    mobs = [
      // ...EnnemiHelper.getMobEst(),
      // ...EnnemiHelper.getMobDesert(),
      // ...EnnemiHelper.getMobForet(),
      // ...EnnemiHelper.getMobJungle(),
      // ...EnnemiHelper.getMobMontagne(),
      // ...EnnemiHelper.getMobTerreSauvage(),
    ];

    mobs.forEach(async (mob) =>{
      await setDoc(doc(this.firestore, "mobs",mob.code ), {
              code: mob.code ,
              libelle: mob.libelle,
              zone:mob.zone,
              attaque:mob.attaque,
              parade:mob.parade,
              vie:mob.vie,
              informations:mob.informations,
              degats:mob.degats,
              armure:mob.armure,
              experience:mob.experience,
            });
      
    })

  }

}
