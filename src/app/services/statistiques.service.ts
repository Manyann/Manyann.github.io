import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { EnnemiHelper, Mob } from '../../component/model/ennemi';
import { CodeValeur } from '../../component/model/code-libelle';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  constructor(public firestore: Firestore) { }



  async getOrigines(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    let origines = (await getDocs(query(collection(this.firestore,'origines')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    if(joueur !== ""){
      heros = heros.filter(x=>x['code_joueur'] == joueur);
    }

    heros.forEach((hero) =>{
      libelle = origines.find(x=>x['code'] == hero['origine'])!['libelle'] ?? hero['origine'];
      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getMetier(joueur:string){
    let heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    let metiers = (await getDocs(query(collection(this.firestore,'metiers')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    if(joueur !== ""){
      heros = heros.filter(x=>x['code_joueur'] == joueur);
    }

    heros.forEach((hero) =>{
      libelle = metiers.find(x=>x['code'] == hero['metier'])!['libelle'] ?? hero['metier'];
      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });
    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getArmes(){
    let herosArmes = (await getDocs(query(collection(this.firestore,'heros_armes')))).docs.map((entries) => entries.data());
    let armes = (await getDocs(query(collection(this.firestore,'armes')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    herosArmes.forEach((heroArme) =>{
      libelle = armes.find(x=>x['code'] == heroArme['arme_code'])!['libelle'] ?? heroArme['arme_code'];
      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getArmures(){
    let herosArmes = (await getDocs(query(collection(this.firestore,'heros_armures')))).docs.map((entries) => entries.data());
    let armures = (await getDocs(query(collection(this.firestore,'armures')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    let libelle = "";

    herosArmes.forEach((heroArme) =>{
      libelle = armures.find(x=>x['code'] == heroArme['armure_code'])!['libelle'] ?? heroArme['armure_code'];

      if(statistiques.find(x=>x.code == libelle) === undefined){
        statistiques.push({code:libelle,valeur:0});
      }
      statistiques.find(x=>x.code == libelle)!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getCrits(){
    let critiques = (await getDocs(query(collection(this.firestore,'heros_critiques')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    critiques.forEach((critique) =>{
      if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
        statistiques.push({code:critique['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getEchecCrits(){
    let echecs = (await getDocs(query(collection(this.firestore,'heros_echecs')))).docs.map((entries) => entries.data());
    let statistiques : CodeValeur[] = [];

    echecs.forEach((critique) =>{
      if(statistiques.find(x=>x.code == critique['hero_nom']) === undefined){
        statistiques.push({code:critique['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == critique['hero_nom'])!.valeur ++;
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getDegatsTotaux(){
    let degats = (await getDocs(query(collection(this.firestore,'heros_degats')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    degats.forEach((degat) =>{
      if(statistiques.find(x=>x.code == degat['hero_nom']) === undefined){
        statistiques.push({code:degat['hero_nom'],valeur:0});
      }
      statistiques.find(x=>x.code == degat['hero_nom'])!.valeur +=degat['intensite'];
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getDegatsMax(){
    let degats = (await getDocs(query(collection(this.firestore,'heros_degats')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    degats.forEach((degat) =>{
      if(statistiques.find(x=>x.code == degat['hero_nom']) === undefined){
        statistiques.push({code:degat['hero_nom'],valeur:0});
      }
      if(statistiques.find(x=>x.code == degat['hero_nom'])!.valeur < degat['intensite']){
        statistiques.find(x=>x.code == degat['hero_nom'])!.valeur = degat['intensite'];
      }
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getOrs(){
    let transactions = (await getDocs(query(collection(this.firestore,'heros_transactions')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    transactions.forEach((transaction) =>{
      if(statistiques.find(x=>x.code == transaction['hero_nom']) === undefined){
        statistiques.push({code:transaction['hero_nom'],valeur:0});
      }
      if(transaction['or'] < 0){
        statistiques.find(x=>x.code == transaction['hero_nom'])!.valeur +=transaction['or'];
      }
    });

    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

  async getKms(){
    let heros = (await getDocs(query(collection(this.firestore,'heros')))).docs.map((entries) => entries.data());
    
    let statistiques : CodeValeur[] = [];

    heros.forEach((hero) =>{
      if(statistiques.find(x=>x.code == hero['nom']) === undefined){
        statistiques.push({code:hero['nom'],valeur:0});
      }
      statistiques.find(x=>x.code == hero['nom'])!.valeur +=hero['km'];
      
    });
    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }
  
  async getEnnemis(){
    let herosmobs = (await getDocs(query(collection(this.firestore,'heros_mobs')))).docs.map((entries) => entries.data());
    let mobs = (await getDocs(query(collection(this.firestore,'mobs')))).docs.map((entries) => entries.data());

    let statistiques : CodeValeur[] = [];
    mobs.forEach((mob) => {
      statistiques.push({code:mob['libelle'],valeur:0})
      herosmobs.forEach((heromob) =>{
        if(heromob[mob['code']]!== undefined){
          statistiques.find(x=>x.code == mob['libelle'])!.valeur +=heromob[mob['code']];
        }
      });
    });
    return statistiques.sort((n1,n2)=> n2.valeur - n1.valeur).slice(0,3);
  }

}
