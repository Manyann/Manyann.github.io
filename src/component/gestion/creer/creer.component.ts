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
      restrictionsMetier : [],
      restrictionsMetierShortCode: [],
      isOpen : false
    },
    {
      nom:"Barbare",
      courage: {type:"min",nombre:"12"},
      intelligence: {type:"max",nombre:"9"},
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"13"},
      chance: new Caracteristique(),
      caracteristiques : ["35EV","+1AT -1PRD"],
      restrictions : ["Arbalètes","Armure complete","Bouclier"],
      competencesHerites :["Armes de bourrin","Bourre pif","Chercher des noises","Sentier des pieds","Tête vide", "6 : Truc de mauviette"],
      restrictionsMetier : ["Prêtre","Mage","Voleur","Ingénieur","Artiste","Bourgeois","Artisant","Démonologue","Ranger"],
      restrictionsMetierShortCode: ['PR','MG','VO','IN','AR','BR','AT','DM','RA'],
      isOpen : false
    },
    {
      nom:"Nain",
      courage: {type:"min",nombre:"11"},
      intelligence: {type:"min",nombre:"10"},
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["35EV"],
      restrictions : ["Arc et Arbalètes","Armes à 2 mains non naine","4PR Max"],
      competencesHerites :["Appel du tonneau","Chercher des noises","Méfiance","Instinct du trésor", "Pénible","Radin","Tirer Correctement" , "6 : Arnaque et carambouille"],
      restrictionsMetier : ["Moine","Mage","Herboriste","Artiste","Démonologue","Ranger","Voleur"],
      restrictionsMetierShortCode: ['MO','MG','HB','AR','DM','RA','VO'],
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
      restrictions : ["Armes à 2 mains","2PR Max"],
      competencesHerites :["Appel des renforst","Chef de groupe","Chevaucher","Erudition","Rûnes bizarres","Tomber dans les pièges ", "6 : Premiers soins"],
      restrictionsMetier : ["Prêtre","Voleur","Ranger","Ingénieur","Guerrier","Artiste","Artisant","Commerçant"],
      restrictionsMetierShortCode: ['PR','VO','RA','IN','GR','AR','AT','CO'],
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
      caracteristiques : ["28EV", "+1CHA level 2"],
      restrictions : ["5PR Max"],
      competencesHerites :["Appel des renforst","Détection","Chouraver","Méfiance","Mendier et pleurnicher","Instinct de survie","6 : Tirer correctement"],
      restrictionsMetier : [],
      restrictionsMetierShortCode: [],
      isOpen : false
    },
    {
      nom:"Elfe Sylvain",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme:{type:"min",nombre:"11"},
      adresse: {type:"min",nombre:"11"},
      force: {type:"max",nombre:"10"},
      chance: new Caracteristique(),
      caracteristiques : ["25EV","+1CHA niveau 2 et 3"],
      restrictions : ["Armes à 2 mains","4PR Max"],
      competencesHerites :["Chevaucher","Comprendre les animaux","Naïveté touchante","Premiers soins","Tirer Correctement","Tomber dans les pièges", "6 : Déplacements silencieux"],
      restrictionsMetier : ["Paladin","Guerrier","Bourgeois","Démonologue","Ingénieur", "Voleur","Forgeron","Forgeur de rûnes", "Inquisiteur"],
      restrictionsMetierShortCode: ["PL","GR","BR","DM","VO","FO","IQ","FR","IN"],
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
      restrictions : ["Armes à 2 mains","3PR Max"],
      competencesHerites :["Agoraphobie","Déplacement silencieux","Détection","Escalader","Méfiance","Pister","Tirer correctement" ,"6 : Ambidextrie"],
      restrictionsMetier : ["Prêtre","Guerrier","Artisant","Bourgeois","Ingénieur"],
      restrictionsMetierShortCode: ["PR","GR","AT","BR","IN"],
      isOpen : false
    },
    {
      nom:"Orque",
      courage: {type:"min",nombre:"11"},
      intelligence: new Caracteristique(),
      charisme: {type:"max",nombre:"10"},
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["35EV","+1AT", "-1PRD","22EA"],
      restrictions : ["Pas d'arme de jet"],
      competencesHerites :["Agoraphobie","Appel du tonneau","Bourre pif","Chercher des noises","Instinct de survie","Sentier des pieds","Truc de mauviette","6 : Armes de bourrin"],
      restrictionsMetier : ["Prêtre","Artiste","Bourgeois","Artisant", "Archéologue","Inquisiteur"],
      restrictionsMetierShortCode: ["PR","AR","BR","AR","AC","IQ"],
      isOpen : false
    },
    {
      nom:"Demi Orque",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"10"},
      charisme: {type:"max",nombre:"11"},
      adresse: {type:"max",nombre:"11"},
      force:  new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["32EV", "25EA","+1D javelots","Peut porter 3 javelots"],
      restrictions : ["Pas de magie"],
      competencesHerites :["Agoraphobie","Bourre pif","Chercher des noises","Instinct de survie","Intimider","Mendier et pleurnicher","Sentier des pieds","6 : Truc de mauviette"],
      restrictionsMetier : ["Moine","Bourgeois","Artiste","Archéologue"],
      restrictionsMetierShortCode: ["MO","BR","AR","AC"],
      isOpen : false
    },
    {
      nom:"Ogre",
      courage: {type:"min",nombre:"11"},
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: {type:"max",nombre:"11"},
      force: {type:"min",nombre:"13"},
      chance: new Caracteristique(),
      caracteristiques : ["40EV","1D+3 au level up","+1AT" ,"-1PRD","50% plus chère","Consomme 2 rations"],
      restrictions : ["Armes à feu","Armure complète"],
      competencesHerites :["Agoraphobie","Appel du tonneau","Appel du ventre","Armes de bourrins","Bourre pif","Instinct de survie","Intimider","Sentier des pieds","Tête vide","Truc de mauviette"],
      restrictionsMetier : ["Voleur","Prêtres","Mage", "Bourgeois","Démonologue","Artiste","Artisant","Ingénieur","Ranger"],
      restrictionsMetierShortCode: ['VO','PR','MG','BR','RA','PI','NB','DM','AR','FR','IN'],
      isOpen : false
    },
    {
      nom:"Centaure",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"11"},
      charisme: new Caracteristique(),
      adresse: {type:"min",nombre:"11"},
      force: {type:"min",nombre:"13"},
      chance: new Caracteristique(),
      caracteristiques : ["40EV","1D6 +1D4 au level up","+1AT" ,"-1PRD","30% plus chère","Consomme 2 rations"],
      restrictions : ["Armes de jet","Armes a feu","Armure complète","4PR Max"],
      competencesHerites :["Appel du tonneau","Armes de bourrins","Bourre pif","Intimider","Pister","Tirer correctement","Truc de mauviette", "6 : Premiers soins"],
      restrictionsMetier : ["Voleur","Prêtres","Mage","Bourgeois","Démonologue","Artiste","Herborsite","Commerçant","Ingénieur","Démonologue","Ranger"],
      restrictionsMetierShortCode: ['VO','PR','MG','RA','PI','BR','DM','AR','IN'],
      isOpen : false
    },
    {
      nom:"Homme des sables",
      courage:{type:"min",nombre:"11"},
      intelligence: new Caracteristique(),
      charisme:new Caracteristique(),
      adresse: {type:"min",nombre:"13"},
      force: {type:"max",nombre:"11"},
      chance: new Caracteristique(),
      caracteristiques : ["25EV","+2PRD","+1 ESQ","1/4 attaque après esquive au CAC"],
      restrictions : ["Armes à 2 mains sauf masses","3PR Max","Pas de magie","Arme de jet sauf arme a feu"],
      competencesHerites :["Déplacement silencieux","Désamorcer","Détection","Méfiance","Pister","Tirer correctement","6: Ambidextrie"],
      restrictionsMetier : ["Guerrier","Prêtre","Mage"],
      restrictionsMetierShortCode: ["GR","PR","MG"],
      isOpen : false
    },
    {
      nom:"Hobbit",
      courage:{type:"min",nombre:"12"},
      intelligence: {type:"min",nombre:"10"},
      charisme:new Caracteristique(),
      adresse:new Caracteristique(),
      force: {type:"max",nombre:"10"},
      chance: new Caracteristique(),
      caracteristiques : ["25EV","+1D4 level up", "Minimum 1 point destin"],
      restrictions : ["Armes à 2 mains","3PR Max","Arme de jet sauf lance pierre"],
      competencesHerites :["Appel du tonneau","Appel du ventre","Cuistot","Déplacement silencieux","Escalader","Instinct de survie","Mendier et pleurnicher","Naïveté touchante","6 : Jonglage et danse"],
      restrictionsMetier : ["Guerrier","Voleur","Prêtre","Mage","Ingénieur","Ranger","Démonologue","Forgeron","Forgeur de rûnes"],
      restrictionsMetierShortCode: ["GR","MG","PR","VO","IN","DM","FR","FO"],
      isOpen : false
    },
    {
      nom:"Walkyrie",
      courage:{type:"min",nombre:"13"},
      intelligence: new Caracteristique(),
      charisme:{type:"min",nombre:"13"},
      adresse:{type:"min",nombre:"12"},
      force: {type:"min",nombre:"11"},
      chance: new Caracteristique(),
      caracteristiques : ["40EV","+1D+3 level up","+1AT","+1PRD","Pas de malus aux lances"],
      restrictions : ["Peut utiliser que les lances / javelots","4PR Max","Arme de jet"],
      competencesHerites :["Agoraphobie","Chef de groupe","Erudition","Rûnes bizarres","Premier soins","6 : Déplacement silencieux"],
      restrictionsMetier : [],
      restrictionsMetierShortCode: [],
      isOpen : false
    },
    {
      nom:"Samurai",
      courage:{type:"min",nombre:"13"},
      intelligence: new Caracteristique(),
      charisme:{type:"min",nombre:"10"},
      adresse:{type:"min",nombre:"11"},
      force: {type:"min",nombre:"11"},
      chance: new Caracteristique(),
      caracteristiques : ["30EV"],
      restrictions : ["3PR Max","Arme de jet étrangère"],
      competencesHerites :["Ambidextrie","Erudition","Attire les monstres","Chevaucher","Tirer correctement","6 : Truc de mauviette"],
      restrictionsMetier : ["Pretre","Mage","Ingénieur","Voleur", "Artiste","Démonologue","Ranger"],
      restrictionsMetierShortCode: ["PR","MG","AR","DM","VO","IN","RA"],
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
      caracteristiques : ["35EV Humaine Barbare sinon initial +5","Peut échanger 1AT et 1PRD"],
      restrictions : [],
      competencesHerites :["Armes de bourrin","Bourre pif"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Voleur",
      shortCode:"VO",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse:{type:"min",nombre:"12"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : [],
      restrictions : ["3PR Max"],
      competencesHerites :["Appel des renforts","Chouraver","Déplacement silencieux","Détection","Serrurier"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Prêtre",
      shortCode:"PR",
      courage:  new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: {type:"min",nombre:"10"},
      adresse: new Caracteristique(),
      force:  new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["20EA" ,"Augemente EV ou EA au level up"],
      restrictions : [],
      competencesHerites :["Erudition","Méfiance","Récupération"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Mage, Sorcier",
      shortCode:"MG",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"12"},
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["20EV si humain, sinon -30%","30EA","EV ou EA au level up"],
      restrictions : ["Baton, poignard, dague, gourdin uniquement","Arcs, arbalètes, armes a feu","Bouclier","2PR Max"],
      competencesHerites :["Erudition","Récupération","Rûnes bizarre"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Paladin",
      shortCode:"PL",
      courage: {type:"min",nombre:"12"},
      intelligence: {type:"min",nombre:"11"},
      charisme: {type:"min",nombre:"10"},
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["32EV si humain, sinon +2","10EA","Au level up 1DEV ou 1D4 EA"],
      restrictions : [],
      competencesHerites :["Chevaucher","Intimider","Récupération"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Ranger",
      shortCode:"RA",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: {type:"min",nombre:"10"},
      adresse: {type:"min",nombre:"10"},
      force: new Caracteristique(),
      chance: {type:"min",nombre:"10"},
      caracteristiques : ["Peut échanger 1 point de cara avec un autre"],
      restrictions : ["4PR Max"],
      competencesHerites :["Détection","Chevaucher","Nager","Pister"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Pirate",
      shortCode:"PI",
      courage: {type:"min",nombre:"11"},
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse:  {type:"min",nombre:"11"},
      force: new Caracteristique(),
      chance:  {type:"min",nombre:"11"},
      caracteristiques : ["A chaque trésor trouvé le pirate gagne 1D20 PO bonus"],
      restrictions : ["Armes à 2 mains","3PR Max"],
      competencesHerites :["Appel des renforts","Appel du tonneau","Arnaque et carambouille","Chouraver","Escalader","Nager"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Démonologue",
      shortCode:"DM",
      courage: {type:"min",nombre:"12"},
      intelligence: {type:"min",nombre:"12"},
      charisme: {type:"min",nombre:"10"},
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["-1PRD","Consomme PV alliés pour sorts"],
      restrictions : ["Armes à 2 mains","Bouclier","2PR Max"],
      competencesHerites :["Agoraphobie","Appel des renforts","Arnaque et carambouille","Comprendre les animaux","Erdition","Langue de monstres"],
      autres : ["Collecte des âmes. Toutes les 20 âmes capturés -> +1 dégâts Magique","Repos des Damnés : Libère 1 âme pour rendre 1 pv à un allié"],
      isOpen : false,
    },
    {
      nom:"Forgeur de rûnes",
      shortCode:"FR",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"12"},
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"12"},
      chance: new Caracteristique(),
      caracteristiques : ["+5EV","18EA","1D6EV level up","1DEA level up"],
      restrictions : ["Le forgeur de runes ne peut apposer une rune plus d’une fois sur un joueurs ou une arme/armure."],
      competencesHerites :["Chef de groupe","Erudition","Forgeron","Rûnes bizarre","Serrurier"],
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
      autres : ["+2 épreuves charisme (+4 sexe opposé","+2 jets chance","Peinture de guerre: +1C et +1FO (*lvl) aux alliés sur test C","Repos bien mérité : Alliés +1EV/PA par heure de repos"],
      isOpen : false,
    },
    {
      nom:"Noble",
      shortCode:"NB",
      courage: {type:"max",nombre:"11"},
      intelligence: new Caracteristique(),
      charisme: {type:"min",nombre:"12"},
      adresse: new Caracteristique(),
      force: {type:"max",nombre:"11"},
      chance: {type:"min",nombre:"10"},
      caracteristiques : ["282EV","18 points à repartir entre AT et PRD (max 12 sur l’un ou l’autre)"],
      restrictions : ["L’avare : Le Noble ne peut pas donner de l’argent ou du matériel, il garde tout pour lui","Il ne peut pas vendre son épée familiale"],
      competencesHerites :["Appel des renforts","Chef de groupe","Chevaucher","Erudition"],
      autres : ["L’argent appelle l’argent : Le Noble gagne 20% PO supplémentaire dans sa cagnotte personnelle","L’argent c’est du temps : Le Noble prend 10% xp supplémentaire du combat pour lui","L’Héritier : Le Noble commence avec deux dés de PO au lieu d’un. Il possède l’épée familiale"],
      isOpen : false,
    },
    {
      nom:"Ingénieur",
      shortCode:"",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"12"},
      charisme: new Caracteristique(),
      adresse: {type:"min",nombre:"11"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["L'ingénieur peut construire des Mécas","Tous les trois niveaux l’ingénieur ne gagne pas une nouvelle compétence, il peut invoquer un Méca de plus en combat et choisir un supplément de Méca"],
      restrictions : ["2PR Max"],
      competencesHerites :["Bricolo du dimanche","Désamorcer","Forgeron","Serrurier"],
      autres : ["L’ingénieur dispose de 2 points de Méca par tour pour effectuer des actions de Meca"],
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
  "autres" : Array<string>
  "isOpen": boolean = false;
}

export class Caracteristique{
  "type" : string = "";
  "nombre" : string = "*"
}
