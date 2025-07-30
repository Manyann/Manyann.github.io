import { Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs,  query, setDoc } from '@angular/fire/firestore';
import { Mob } from '../../component/model/ennemi';
import { StorageKeys, StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MobsService {

  constructor(
    public firestore: Firestore,
    private storage : StorageService
  ) { }


  async getAll(){

    if(!this.storage.get(StorageKeys.MOBS)){
      const mobs = (await getDocs(query(collection(this.firestore,'mobs')))).docs.map((entries) => entries.data());
      this.storage.set<DocumentData[]>(StorageKeys.MOBS,mobs);
    }
        
    return (this.storage.get<DocumentData[]>(StorageKeys.MOBS) ?? []) as Mob[];
  }

  async getByZone(zone:string){
    const mobs = (await this.getAll())
      .filter(x=>x.zone == zone);

    return mobs;
  }

  async insert(mob:Mob){
    let code = mob.libelle
      .replaceAll(" ","-")
      .replaceAll("'","-")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
      
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
