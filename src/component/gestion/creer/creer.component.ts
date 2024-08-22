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
      restrictionsMetierShortCode: ["NA","VL","PI","NB"],
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
      caracteristiques : ["40EV","+1AT" ,"-1PRD","50% plus chère","Consomme 2 rations"],
      restrictions : ["Armes à feu","Armure complète"],
      competencesHerites :["Appel du tonneau","Appel du ventre","Armes de bourrins","Instinct de survie","Intimider","Sentier des pieds","Tête vide"],
      competencesAleatoire : ["Bourre pif","Chercher des noises","Langues des montress","Truc de mauvietes"],
      restrictionsMetier : ["Ninja assassin","Voleur","Prêtres","Mage, Sorcier","Paladin","Pirate","Noble","Démonologue","Artiste","Forgeur de rûnes","Ingénieur"],
      restrictionsMetierShortCode: ['NA','VL','PR','MG','PL','RA','PI','NB','DM','AR','FR','IN'],
      isOpen : false
    },
    {
      nom:"Centaure",
      courage: new Caracteristique(),
      intelligence: {type:"max",nombre:"10"},
      charisme: {type:"max",nombre:"9"},
      adresse: {type:"max",nombre:"11"},
      force: {type:"min",nombre:"13"},
      chance: new Caracteristique(),
      caracteristiques : ["45EV","+1AT" ,"-1PRD","30% plus chère"],
      restrictions : ["Armes de jet","Armure complète","4PR Max"],
     competencesHerites :["Appel du tonneau","Armes de bourrins","Bourre pif","Chercher des noises","Truc de mauviette"],
      competencesAleatoire : ["Ambidextrie","Erudition","Intimider","Méfiance","Premier soin","Pister","Tirer correctement"],
      restrictionsMetier : ["Ninja assassin","Voleur","Prêtres","Mage, Sorcier","Paladin","Pirate","Noble","Démonologue","Artiste"],
      restrictionsMetierShortCode: ['NA','VL','PR','MG','PL','RA','PI','NB','DM','AR','IN'],
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
      caracteristiques : ["25EV","+2PRD","+1 ESQ"],
      restrictions : ["Armes à 2 mains sauf masses","3PR Max","Pas de magie","Arme de jet sauf arme a feu"],
      competencesHerites :["Déplacement silencieux","Détection","Pister","Tirer correctement"],
      competencesAleatoire : ["Désamorcer","Appel des renforts","Instinct de survie","Méfiance","Nager","Premier soins"],
      restrictionsMetier : ["Guerrier","Prêtre","Mage, Sorcier","Paladin","Pirate","Noble"],
      restrictionsMetierShortCode: ["GR","PR","MG","PR","PL","PI","NB"],
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
      caracteristiques : ["25EV","+1D4 level up"],
      restrictions : ["Armes à 2 mains","3PR Max","Arme de jet sauf lance pierre"],
      competencesHerites :["Appel du tonneau","Instinct de survie","Cuistot"],
      competencesAleatoire : ["Chouraver","Erudition","Fariboles","Mendier et pleurnicher","Tirer correctement"],
      restrictionsMetier : ["Guerrier","Ninja, Assassin","Prêtre","Mage, Sorcier","Paladin","Pirate","Démonologue","Forgeur de rûnes"],
      restrictionsMetierShortCode: ["GR","PR","MG","PR","PL","PI","NB","FR","NA"],
      isOpen : false
    },
    {
      nom:"Walkyrie",
      courage:{type:"min",nombre:"13"},
      intelligence: new Caracteristique(),
      charisme:{type:"min",nombre:"12"},
      adresse:{type:"min",nombre:"12"},
      force: {type:"min",nombre:"11"},
      chance: new Caracteristique(),
      caracteristiques : ["40EV","+2D6 level up"],
      restrictions : ["Armes à 2 mains sauf lance","4PR Max","Arme de jet"],
      competencesHerites :["Ambidextrie","Déplacement silencieux","Erudition","Premier soins"],
      competencesAleatoire : ["Chef de groupe","Méfiance","Récupération","Rûnes bizarres","Tomber dans les pièges"],
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
      competencesHerites :["Ambidextrie","Armes de bourrin","Erudition","Attire les monstres","Chevaucher","Tirer correctement"],
      competencesAleatoire : ["Forgeron","Méfiance","Intimider","Premier soins","Pister","Truc de mauviette"],
      restrictionsMetier : ["Pretre","Mage, Sorcier","Paladin","Démonologue","Ménestrel","Ingénieur","Ninja, Assassin"],
      restrictionsMetierShortCode: ["PR","MG","PL","DM","ME","IN","NA"],
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
      competencesAleatoire : ["Ambidestrie","Chercher des noises","Chevaucher","Forgeron","Intimider","Tirer correctement","Truc de mauviette"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"Ninja, Assassin",
      shortCode:"NA",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: {type:"min",nombre:"13"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["11AT" , "8PRD","50% attaque après ESQ"],
      restrictions : ["3PR Max"],
      competencesHerites :["Déplacement silencieux","Frapper lachement","Tirer correctement"],
      competencesAleatoire : ["Ambidextrie","Chercher des noises","Chevaucher","Erudition","Escalader","Méfiance","Nager","Ressemble à rien"],
      autres : [],
      isOpen : false,
    },
    {
      nom:"VOLEUR",
      shortCode:"VL",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse:{type:"min",nombre:"12"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : [],
      restrictions : ["3PR Max"],
      competencesHerites :["Appel des renforts","Chouraver","Déplacement silencieux","Détection","Serrurier"],
      competencesAleatoire : ["Arnaque et carambouille","Désamorcer","Erudition","Escalader","Fouiller dans les poubelles","Frapper lachement","Méfiance","Ressemble à rien"],
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
      competencesAleatoire : ["Arnaquet et carambouille","Chevaucher","Fariboles","Premier soins","Radin","Rûnes bizarre"],
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
      competencesAleatoire : ["Appel des renforts","Chef de groupe","Chevaucehr","Fariboles","Langues des montres","Premier soins"],
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
      competencesAleatoire : ["Arme de bourrin","Chercher des noises","Erudition","Fariboles","Premier soins"],
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
      competencesAleatoire : ["Ambidextrie","Chef de groupe","Comprendre les animaux","Désamorcer","Erudition","Escalader","Mefiance","Premier soins","Tirer correctement"],
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
      competencesAleatoire : ["Détection","Fouiller dans les poubelles","Instinct du trésor","Mefiance","Mendier et pleurnicher","Tirer correcetement"],
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
      competencesAleatoire : ["Chevaucher","Intimider","Méfiance","Nager","Radin","Tête vide"],
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
      competencesAleatoire : ["Chevaucher","Détection","Intimider","Méfiance","Nager","Truc de mauviette"],
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
      competencesAleatoire : ["Appel des renforts","Instinct du trésor","Fariboles","Premier soins","Tirer correctement"],
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
      competencesAleatoire : ["Chevaucher","Cuistot","Détecter","Instinct du trésort","Premier soins","Tirer correctement"],
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
