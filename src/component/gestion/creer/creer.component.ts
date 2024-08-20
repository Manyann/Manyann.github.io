import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-creer',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './creer.component.html',
  styleUrl: './creer.component.css'
})
export class CreerComponent {
  title = 'nhbk';
  origines: Array<Origine>;
  metiers: Array<Metier>;
  metiersBase: Array<Metier>;
  onglet: string;
  isMetier:boolean;
  isOrigine:boolean;

  constructor(){
    this.origines = this.buildOrigineList();
    this.metiers = this.buildMetierList();
    this.metiersBase = this.buildMetierList();
    this.onglet = "origine"
    this.isOrigine = true;
    this.isMetier = false;
  }

  public setOnglet(onglet:string):void{
    this.onglet = onglet;
    this.isOrigine = onglet == "origine";
    this.isMetier = onglet == "metier";
    if(this.isOrigine){
    this.metiers = this.metiersBase;
    }
    this.resetOpen();
  }

  public resetOpen() : void{
    this.origines.forEach((x)=>{x.isOpen = false;})
    this.metiers.forEach((x)=>{x.isOpen = false;})
  }

  public openOrigine(origine:string):void{
    this.origines.filter(x=>x.nom == origine)[0].isOpen = 
    !this.origines.filter(x=>x.nom == origine)[0].isOpen;
  }

  public openMetier(metier:string):void{
    this.metiers.filter(x=>x.shortCode == metier)[0].isOpen = 
    !this.metiers.filter(x=>x.shortCode == metier)[0].isOpen;
  }
  
  public filterAndOpenMetier(forbidden:Array<string>):void{
    this.metiers = this.metiersBase.filter(x => !forbidden.includes(x.shortCode));
    this.setOnglet("metier");
  }

private buildOrigineList():Array<Origine>{
  const list : Array<Origine> = [
    {
      nom:"Humain",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["30EV"],
      restrictions : [],
      competencesHerites :[],
      competencesAleatoire : [],
      restrictionsMetier : [],
      restrictionsMetierShortCode: [],
      isOpen : false
    },
    {
      nom:"Barbare",
      courage: {type:"min",nombre:"12"},
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"13"},
      chance: new Caracteristique(),
      caracteristiques : ["35EV","+1AT -1PRD"],
      restrictions : ["Arbalètes","Armure complete","Bouclier"],
      competencesHerites :["Ambidextrie","Chercher des noises","Sentier des pieds","Tête vide"],
      competencesAleatoire : ["Armes de bourrin","Bourre pif","Chevaucher","Escalader","Intimider","Nager","Pister","Tirer correctement","Truc de mauviette"],
      restrictionsMetier : ["Ninja, Assassin","Pretre","Mage, Sorcier","Paladin","Noble","Demonologue","Artiste","Forgeur de runes","Ingénieur"],
      restrictionsMetierShortCode: ['NA','PR','MG','PL','NB','DM','AR','FR','IN'],
      isOpen : false
    },
    {
      nom:"Nain",
      courage: {type:"min",nombre:"11"},
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["35EV"],
      restrictions : ["Arc et Arbalètes","Armes à 2 mains non naine","4PR Max"],
      competencesHerites :["Appel du tonneau","Instinct du trésor", "Pénible","Radin"],
      competencesAleatoire : ["Appel des renforts","Arnaque et carambouille","Bourre pif","Bricolo du dimanche","Chercher des noises","Fariboles","Forgeron","Mefiance","Tirer correctement","Truc de mauviette"],
      restrictionsMetier : ["Ninja, Assassin","Pretre","Mage, Sorcier","Paladin","Demonologue","Artiste"],
      restrictionsMetierShortCode: ['NA','PR','MG','PL','DM','AR'],
      isOpen : false
    },
    {
      nom:"Haut Elfe",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"11"},
      charisme:{type:"min",nombre:"12"},
      adresse: {type:"min",nombre:"12"},
      force: {type:"max",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["25EV","+1CHA niveau 2 et 3"],
      restrictions : ["Armes à 2 mains","4PR Max"],
      competencesHerites :["Erudition","Rûnes bizarres","Tomber dans les pièges"],
      competencesAleatoire : ["Chef de groupe","Chevaucher","Jonglage et danse","Nager","Premiers soins","Tirer corectement"],
      restrictionsMetier : ["Ninja, Assassin","Voleur","Paladin","Artiste","Ranger","Pirate","Forgeur de rûnes","Ingénieur"],
      restrictionsMetierShortCode: ['NA','VL','PL','RA','PI','FR','IN'],
      isOpen : false
    },
    {
      nom:"Demi Elfe",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme:{type:"min",nombre:"10"},
      adresse: {type:"min",nombre:"11"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["28EV"],
      restrictions : ["Armes à 2 mains","5PR Max"],
      competencesHerites :["Appel des renforst","Détection","Chouraver","Méfiance"],
      competencesAleatoire : ["Bricolo du dimanche","Chevaucher","Erudition","Escalader","Fouiller dans les poubelles","Mendier et pleurnicher","Nager","Tirer corectement"],
      restrictionsMetier : [],
      restrictionsMetierShortCode: [],
      isOpen : false
    },
    {
      nom:"Elfe Sylvain",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme:{type:"min",nombre:"12"},
      adresse: {type:"min",nombre:"10"},
      force: {type:"max",nombre:"11"},
      chance: new Caracteristique(),
      caracteristiques : ["25EV","+1CHA niveau 2 et 3"],
      restrictions : ["Armes à 2 mains","4PR Max"],
      competencesHerites :["Chevaucher","Naïveté touchante","Premiers soins","Tomber dans les pièges"],
      competencesAleatoire : ["Comprendre les animaux","Déplacements silencieux","Jonglage et danse","Nager","Pister","Tête vide"],
      restrictionsMetier : ["Paladin","Pirate","Noble","Forgeur de rûnes","Ingénieur"],
      restrictionsMetierShortCode: ["PL","PI","NB","FR","IN"],
      isOpen : false
    },
    {
      nom:"Elfe Noir",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"12"},
      charisme:new Caracteristique(),
      adresse: {type:"min",nombre:"13"},
      force: {type:"max",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["25EV","+1CHA niveau 2 et 3"],
      restrictions : ["Armes à 2 mains","4PR Max","Pas de magie"],
      competencesHerites :["Agoraphobie","Déplacement silencieux","Détection","Tirer correctement"],
      competencesAleatoire : ["Ambidextrie","Chouraver","Erudition","Escalader","Forgeron","Frapper lachement","Méfiance","Pister","Rûnes bizarres"],
      restrictionsMetier : ["Paladin","Pirate","Noble","Ingénieur"],
      restrictionsMetierShortCode: ["PL","PI","NB","IN"],
      isOpen : false
    },
    {
      nom:"Demi Orque",
      courage: new Caracteristique(),
      intelligence: {type:"max",nombre:"10"},
      charisme: new Caracteristique(),
      adresse: {type:"max",nombre:"11"},
      force: {type:"min",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["35EV"],
      restrictions : ["Pas de magie"],
      competencesHerites :["Agoraphobie","Chercher des noises","Instinct de survie","Sentier des pieds","Tête vide"],
      competencesAleatoire : ["Bricolo du dimanche","Chevaucher","Erudition","Escalader","Fouiller dans les poubelles","Mendier et pleurnicher","Nager","Tirer corectement"],
      restrictionsMetier : ["Ninja assassin","Voleur","Pirate","Noble"],
      restrictionsMetierShortCode: ["NA","VO","PI","NB"],
      isOpen : false
    },
    {
      nom:"Ogre",
      courage: new Caracteristique(),
      intelligence: {type:"max",nombre:"10"},
      charisme: {type:"max",nombre:"9"},
      adresse: {type:"max",nombre:"11"},
      force: {type:"min",nombre:"13"},
      chance: new Caracteristique(),
      caracteristiques : ["45EV","+1AT" ,"-1PRD","30% plus chère"],
      restrictions : ["Armes de jet","Armure complète","4PR Max"],
      competencesHerites :["Appel du tonneau","Appel du ventre","Armes de bourrins","Instinct de survie","Intimider","Sentier des pieds","Tête vide"],
      competencesAleatoire : ["Bourre pif","Chercher des noises","Langues des montress","Truc de mauvietes"],
      restrictionsMetier : ["Ninja assassin","Voleur","Prêtres","Mage, Sorcier","Paladin","Pirate","Noble","Démonologue","Artiste","Forgeur de rûnes","Ingénieur"],
      restrictionsMetierShortCode: ['NA','VL','PR','MG','PL','RA','PI','NB','DM','AR','FR','IN'],
      isOpen : false
    },
  ];

  return list;
}

private buildMetierList():Array<Metier>{
  const list : Array<Metier> = [
    {
      nom:"Guerrier",
      shortCode:"GR",
      courage: {type:"min",nombre:"12"},
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["30EV"],
      restrictions : [],
      competencesHerites :[],
      competencesAleatoire : [],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Artiste",
      shortCode:"AR",
      courage:new Caracteristique(),
      intelligence: {type:"min",nombre:"10"},
      charisme: {type:"min",nombre:"10"},
      adresse: {type:"min",nombre:"10"},
      force: {type:"max",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["-3EV","+1PRD"],
      restrictions : ["Armes à 2 mains", "Bouclier", "2PR Max"],
      competencesHerites :["Arnaque et carambouille","Jonglage et danse", "Mendier et pleurnicher *2","Naïveté touchante","Pénible","Tomber dans les pièges"],
      competencesAleatoire : ["Chouraver","Erudition","Fariboles","Mendier et pleurnicher","Tirer correctement"],
      autres : ["+2 épreuves charisme (+4 sexe opposé","+2 jets chance","Peinture de guerre: +1C et +1FO (*lvl) aux alliés sur test C","Repos bien mérité : Alliés +1EV/PA par heure de repos"],
      isOpen : false,
    },
  ]

  return list;
}
}

export class Origine{
  "nom":string = "";
  "courage":Caracteristique;
  "intelligence":Caracteristique;
  "charisme":Caracteristique;
  "adresse":Caracteristique;
  "force":Caracteristique;
  "chance":Caracteristique;
  "caracteristiques" : Array<string>;
  "restrictions" : Array<string>;
  "competencesHerites" : Array<string>;
  "competencesAleatoire" : Array<string>;
  "restrictionsMetier" : Array<string>;
  "restrictionsMetierShortCode" : Array<string>;
  "isOpen": boolean = false;
}

export class Metier{
  "nom":string = "";
  "shortCode" : string;
  "courage":Caracteristique;
  "intelligence":Caracteristique;
  "charisme":Caracteristique;
  "adresse":Caracteristique;
  "force":Caracteristique;
  "chance":Caracteristique;
  "caracteristiques" : Array<string>;
  "restrictions" : Array<string>;
  "competencesHerites" : Array<string>;
  "competencesAleatoire" : Array<string>;
  "autres" : Array<string>
  "isOpen": boolean = false;
}

export class Caracteristique{
  "type" : string = "";
  "nombre" : string = "*"
}
