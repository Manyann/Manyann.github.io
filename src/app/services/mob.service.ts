import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { EnnemiHelper, Mob } from '../../component/model/ennemi';

@Injectable({
  providedIn: 'root'
})
export class MobsService {

  constructor(public firestore: Firestore) { }

  async getAll(){
    const mobs = (await getDocs(query(collection(this.firestore,'mobs')))).docs.map((entries) => entries.data() as Mob);
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
      ...EnnemiHelper.getMobEst(),
      ...EnnemiHelper.getMobDesert(),
      ...EnnemiHelper.getMobForet(),
      ...EnnemiHelper.getMobJungle(),
      ...EnnemiHelper.getMobMontagne(),
      ...EnnemiHelper.getMobTerreSauvage(),
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
