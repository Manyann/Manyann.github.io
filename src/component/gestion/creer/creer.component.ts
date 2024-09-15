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
      courage: {type:"min",nombre:"12+"},
      intelligence: {type:"max",nombre:"9-"},
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"13+"},
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
      courage: {type:"min",nombre:"11+"},
      intelligence: {type:"min",nombre:"10+"},
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"12+"},
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
      intelligence: {type:"min",nombre:"11+"},
      charisme:{type:"min",nombre:"12+"},
      adresse: {type:"min",nombre:"12+"},
      force: {type:"max",nombre:"12-"},
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
      charisme:{type:"min",nombre:"10+"},
      adresse: {type:"min",nombre:"11+"},
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
      charisme:{type:"min",nombre:"11+"},
      adresse: {type:"min",nombre:"11+"},
      force: {type:"max",nombre:"10-"},
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
      intelligence: {type:"min",nombre:"12+"},
      charisme:new Caracteristique(),
      adresse: {type:"min",nombre:"13+"},
      force: {type:"max",nombre:"12-"},
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
      courage: {type:"min",nombre:"11+"},
      intelligence: new Caracteristique(),
      charisme: {type:"max",nombre:"10-"},
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"12+"},
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
      intelligence: {type:"min",nombre:"10+"},
      charisme: {type:"max",nombre:"11-"},
      adresse: {type:"max",nombre:"11-"},
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
      courage: {type:"min",nombre:"11+"},
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: {type:"max",nombre:"11-"},
      force: {type:"min",nombre:"13+"},
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
      intelligence: {type:"min",nombre:"11+"},
      charisme: new Caracteristique(),
      adresse: {type:"min",nombre:"11+"},
      force: {type:"min",nombre:"13+"},
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
      courage:{type:"min",nombre:"11+"},
      intelligence: new Caracteristique(),
      charisme:new Caracteristique(),
      adresse: {type:"min",nombre:"13+"},
      force: {type:"max",nombre:"11-"},
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
      courage:{type:"min",nombre:"12+"},
      intelligence: {type:"min",nombre:"10+"},
      charisme:new Caracteristique(),
      adresse:new Caracteristique(),
      force: {type:"max",nombre:"10-"},
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
      courage:{type:"min",nombre:"13+"},
      intelligence: new Caracteristique(),
      charisme:{type:"min",nombre:"13+"},
      adresse:{type:"min",nombre:"12+"},
      force: {type:"min",nombre:"11+"},
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
      courage:{type:"min",nombre:"13+"},
      intelligence: new Caracteristique(),
      charisme:{type:"min",nombre:"10+"},
      adresse:{type:"min",nombre:"11+"},
      force: {type:"min",nombre:"11+"},
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
      shortCodeParents:[],
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
      autres : [""],
      shortCodeParents:[],
      isOpen : false,
    },
    {
      nom:"Prêtre",
      shortCode:"PR",
      courage:  new Caracteristique(),
      intelligence: {type:"min",nombre:"11+"},
      charisme: {type:"min",nombre:"10+"},
      adresse: new Caracteristique(),
      force:  new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["20EA" ,"Augemente EV ou EA au level up"],
      restrictions : [],
      competencesHerites :["Erudition","Premiers soins","Runes bizarres"],
      autres : [],
      shortCodeParents:[],
      isOpen : false,
    },
    {
      nom:"Moine",
      shortCode:"MO",
      courage:  new Caracteristique(),
      intelligence: {type:"min",nombre:"9+"},
      charisme: {type:"min",nombre:"11+"},
      adresse: {type:"min",nombre:"10+"},
      force:  new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["Le moine à 1/2 chance de se réincarner sans utiliser de point de destin. Il revient à la vie mais perd 1D4+1 EA initiale"],
      restrictions : [],
      competencesHerites :["Comprendre les animaux","Déplacement silencieux","Récupération","Tête vide"],
      autres : ["Purification : 3EA, purge les effets d'un poison","Frappe d'énergie : A main nue le moine critique de 1 à 5"],
      shortCodeParents:["PR"],
      isOpen : false,
    },
    {
      nom:"Paladin",
      shortCode:"PL",
      courage: {type:"min",nombre:"10+"},
      intelligence: {type:"min",nombre:"9+"},
      charisme: {type:"min",nombre:"11+"},
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["Enlève jusqu'à 5EA pour les ajouters à ses EV initials"],
      restrictions : [],
      competencesHerites :["Armes de bourrin","Chevaucher","Intimider"],
      autres : [],
      shortCodeParents:["PR"],
      isOpen : false,
    },
    {
      nom:"Templier",
      shortCode:"TE",
      courage: {type:"min",nombre:"11+"},
      intelligence: {type:"min",nombre:"9+"},
      charisme: {type:"min",nombre:"11+"},
      adresse: new Caracteristique(),
      force: {type:"min",nombre:"10+"},
      chance: new Caracteristique(),
      caracteristiques : ["EV initial +3"],
      restrictions : [],
      competencesHerites :["Ambidextrie","Chef de groupe","Truc de mauviette"],
      autres : ["Bouclier de Foi, crée un bouclier avec 2*EA de puissance. Les attaques enlève de la puissance au bouclier avant de toucher la cible du templier. Un critique détruit le bouclier",
        "Banissement des infidèles, les adversaires du templier avec un alignement différent du sien tombe hors combat à 10hp au lieu de 3",
        "Conviction inébranlable, si une épreuve demande un test de courage ou de force que le templier reussit les autres membres ne sont pas obligé de réussir"],
      shortCodeParents:["PL"],
      isOpen : false,
    },
    {
      nom:"Voleur",
      shortCode:"VO",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse:{type:"min",nombre:"11+"},
      force: new Caracteristique(),
      chance: {type:"min",nombre:"10+"},
      caracteristiques : [],
      restrictions : ["3PR Max"],
      competencesHerites :["Chouraver","Déplacement silencieux","Détection","Serrurier"],
      autres : [],
      shortCodeParents:[],
      isOpen : false,
    },
    {
      nom:"Empoisoneur",
      shortCode:"EM",
      courage: new Caracteristique(),
      intelligence:  {type:"min",nombre:"11+"},
      charisme: new Caracteristique(),
      adresse:{type:"min",nombre:"11+"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["Immunisé : L'empoisonneur a 1/2 chance de ne pas subir les effets d'un poison"],
      restrictions : ["3PR Max"],
      competencesHerites :["Cuistot","Erudition","Méfiance","Rûnes bizarres"],
      autres : ["Dague empoisonnée : La première attaque de l'empoisonneur induit 1D4 de blessure à la cible",
        "Fiole de poison : Sur un test AD l'empoisonneur peut verser du poison dans un plat, verre, etc. Ou en combat mais efficacité /2. Test AS/INT pour fabrication",
        "Paralysie : -2AT/PRD => 1 feuille de Boulorne, 1 Herbe de Nilla, 1 dose poudre malachite",
        "Embrumement : -2 stats => 1 Ecorce de boulorne, 1 essence jujuba, 1 poivre noir"
      ],
      shortCodeParents:["VO"],
      isOpen : false,
    },
    {
      nom:"Assassin",
      shortCode:"AS",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"11+"},
      charisme: new Caracteristique(),
      adresse:{type:"min",nombre:"13+"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["Coup mortel : Le premier coup de l'assassin critique de 1 à 4","Précision mortelle : Les dagues de l'assassin ignore l'armure"],
      restrictions : ["3PR Max"],
      competencesHerites :["Ambidextrie","Déplacement silencieux","Intimider","Pister","Chevaucher"],
      autres : ["Fiole : Sur un test AD l'empoisonneur peut verser du poison dans un plat, verre, etc. Ou en combat mais efficacité /2. Test AS/INT pour fabrication",
        "Potion de frappe fantome: 3 attaques imparables => 3 doses poudre graddik, 2 Cimelweiss,10 orties du Chaos",
        "La mort en bouteille (Hors combat uniquement): mort de la cible => 1 dose sang démon majeu, 3 cheveux de vierge, 1 poisson noyé"
      ],
      shortCodeParents:["EM"],
      isOpen : false,
    },
    {
      nom:"Rodeur",
      shortCode:"RO",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"10+"},
      charisme: {type:"min",nombre:"10+"},
      adresse:{type:"min",nombre:"11+"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["Camouflage Naturel : Tant que le rodeur ne bouge pas, il n'est pas visible"],
      restrictions : ["3PR Max"],
      competencesHerites :["Détecter","Déplacement silencieux","Pister","Instinct de survie","Tirer correctement"],
      autres : ["Faucon : Le ranger peut compter sur son animal de compagnie. Impuissant en combat mais permet d'observer une zone. Grace au faucon, les aventuriers ont moins de chance de faire des rencontres (1-3 au dé 8)"],
      shortCodeParents:["VO"],
      isOpen : false,
    },
    {
      nom:"Ninja",
      shortCode:"NA",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse:{type:"min",nombre:"13+"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["Maître du Ninjutsu : Les attaques à main nue du ninja sont considéré comme tranchante","Frappe des ombres : Le ninja à dégats * 2 dans le dos peut importe l'arme"],
      restrictions : ["2PR Max"],
      competencesHerites :["Ambdiextrie","Désamorcer","Déplacement silencieux","Pister","Ressemble à rien","Serrurier"],
      autres : ["Permutation : Le ninja peut echanger de place avec un allié"],
      shortCodeParents:["RO"],
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
      autres : ["+2 épreuves charisme (+4 sexe opposé","+2 jets chance","Repos bien mérité : Alliés +1EV/PA par heure de repos"],
      isOpen : false,
      shortCodeParents:[],
    },
    {
      nom:"Magicien",
      shortCode:"MA",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"10+"},
      charisme: {type:"min",nombre:"10+"},
      adresse:{type:"min",nombre:"11+"},
      force: new Caracteristique(),
      chance: {type:"min",nombre:"10+"},
      caracteristiques : ["Pièce derrière l'oreille : Le magicien entourloupe toujours sa cible, il récupère 10% des PO de la transaction",
        "Réalité distordue : Les critiques sur le magicien sont réduit de 1"],
      restrictions : ["3PR Max"],
      competencesHerites :["Ambidextrie","Méfiance","Mendier et pleurnichier","Rûnes bizarres","Tirer correctement","Tête vide"],
      autres : ["Substitution : Test INT => Le magicien peut altérer 2 de ses statistiques pour 2 tours dans un maximum de +4 / -4"],
      shortCodeParents:["AR"],
      isOpen : false,
    },
    {
      nom:"Célébrité",
      shortCode:"CE",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: {type:"min",nombre:"14+"},
      adresse:new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["La fame : La célébrité et son groupe on 50% dans les auberges / tavernes / restaurants",
        "Merchandising : Tous les jours la célébrité jette 3 dés 20 de PO comme royalties sur ses oeuvres"],
      restrictions : ["3PR Max"],
      competencesHerites :["Ambidextrie","Méfiance","Mendier et pleurnichier","Rûnes bizarres","Tirer correctement","Tête vide"],
      autres : ["Rencontre amicale: Lors d'une rencontre si les ennemis sont des humains il y a 1/4 chance qu'ils soit fan de la célébrité et n'attaque pas",
        "Julia Roberts : Lors d'une rencontre si les ennemis sont des humains il y a 1/4 chance de détester la célébrité et la focus"],
      shortCodeParents:["MA","PE","GT","ME"],
      isOpen : false,
    },
    {
      nom:"Bourgeois",
      shortCode:"BE",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: {type:"min",nombre:"11+"},
      adresse:new Caracteristique(),
      force: new Caracteristique(),
      chance:  {type:"min",nombre:"10+"},
      caracteristiques : ["Le bourgeois commence avec 3 dés de PO"],
      restrictions : ["3PR Max"],
      competencesHerites :["Appel des renforts","Chevaucher","Erudtion","Fariboles","Tirer correctement"],
      autres : ["L’avare : Le bourgeois ne peut pas donner de l’argent ou du matériel, il garde tout pour lui",
        "Sens des affaires : Une fois par jour le bourgeois peut jouer en bourse. Il choisit d'engager une somme en PO. Avec 1D6, de 1 à 2 il gagne de l'argent, 3 et 4 rien, de 4 à 6 il pert de l'argent. 1D20 pour savoir le pourcentage d'argent gagné ou perdu"],
      shortCodeParents:[],
      isOpen : false,
    },
    {
      nom:"Noble",
      shortCode:"NB",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: {type:"min",nombre:"12+"},
      adresse:new Caracteristique(),
      force: new Caracteristique(),
      chance:  {type:"min",nombre:"10+"},
      caracteristiques : [],
      restrictions : ["3PR Max"],
      competencesHerites :["Chef de groupe","Détecter","Rûnes bizarres","Premiers soins"],
      autres : ["L’argent appelle l’argent : Le Noble gagne 20% PO supplémentaire dans sa cagnotte personnelle",
        "L’argent c’est du temps : Le Noble prend 10% xp supplémentaire du combat pour lui"],
      shortCodeParents:["BE"],
      isOpen : false,
    },
    {
      nom:"Seigneur",
      shortCode:"SE",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: {type:"min",nombre:"14+"},
      adresse:new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["Maitre d'arme: Le seigneur peut réarranger sont AT/PRD initiale comme il le souhaite, dans la limite de -5/+5"],
      restrictions : ["3PR Max"],
      competencesHerites :["Ambidextrie","Armes de bourrin","Chef de groupe","Instinct du trésor","Truc de mauviette"],
      autres : ["Taxes : Une fois par jour le seigneur reçoit l'argent des taxes de ses paysans (4D20)",
        "Héritié : Le seigneur hérite de l'équipement familial (non vendable). Cote de maille luxe avec manche et lame d'excellence de riche (lame d'excellence mais avec 1D+5)"],
      shortCodeParents:["NB"],
      isOpen : false,
    },
    {
      nom:"Commerçant",
      shortCode:"CO",
      courage: new Caracteristique(),
      intelligence:{type:"min",nombre:"11+"},
      charisme: {type:"min",nombre:"10+"},
      adresse:new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["Havre sac : Le commerçant peut stocker 4 items de toute taille dans son havre sac"],
      restrictions : ["2PR Max"],
      competencesHerites :["Arnaque et carambouille","Erudition","Fariboles","Instinct du trésor"],
      autres : ["Pignon sur rue : Le commerçant peut vendre des items peut importe l'endroit ou il est pour 40% du prix (selon etat) au lieu des 50% classique en ville ( arnaque et carambouille ne s'applique pas)"],
      shortCodeParents:["AT,BE"],
      isOpen : false,
    },
    {
      nom:"Herboriste",
      shortCode:"HE",
      courage: new Caracteristique(),
      intelligence:{type:"min",nombre:"12+"},
      charisme: new Caracteristique(),
      adresse:{type:"min",nombre:"11+"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["L'herboriste peut fabriquer des concoctions (AD/INT pour reussir fabrication)"],
      restrictions : ["3PR Max"],
      competencesHerites :["Instinct de survie","Naïveté touchante","Premiers soins"],
      autres : ["Onguent: 1 Oeuf de griffon, 1 plume chapon fanghien, 1 dent requin en poudre",
        "Hell on Musc : Repousse les animaux pour la nuit. 5 doses Spores de myconides, 2 doses huile de jujuba, 5 plumes coq noir",
        "Baume du tigre : Heal de 1D4+1 pendant 1D4+1 tours. 1 griffre dragon, 10 Herbe de Nilla , 1 dose de sel, 1 dose de guy, 1 dose sang elfete vierge "
      ],
      shortCodeParents:["AT"],
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
      shortCodeParents:["AT","FO"],
      isOpen : false,
    },
    {
      nom:"Ranger",
      shortCode:"RA",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: {type:"min",nombre:"10+"},
      adresse: {type:"min",nombre:"10+"},
      force: new Caracteristique(),
      chance: {type:"min",nombre:"10+"},
      caracteristiques : ["Peut échanger 1 point de cara avec un autre"],
      restrictions : ["4PR Max"],
      competencesHerites :["Détection","Chevaucher","Nager","Pister"],
      autres : [],
      shortCodeParents:[],
      isOpen : false,
    },
    {
      nom:"Chasseur de primes",
      shortCode:"CP",
      courage: {type:"min",nombre:"11+"},
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: {type:"min",nombre:"11+"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : [],
      restrictions : ["3PR Max"],
      competencesHerites :["Chercher des noises","Déplacement silencieux","Frapper lachement","Méfiance","Pister"],
      autres : ["Dead or alive : Si le chasseur de prime combat des humains, l'un d'eux (aléatoire) possède une prime équivalente à 4* l'xp de la cible. Le chasseur doit être celui qui achève la cible pour récupérer la prime",
        "L'expérience n'a pas de prix : Toutes les 5 primes récoltés, le chasseur de prime gagne 1PI contre humain",
        "Coup décisif : Le chasseur de prime peut décider que sa prochaine attaque sera critique de 1 à X et échec critique de 20-X à 20."
      ],
      shortCodeParents:["RA"],
      isOpen : false,
    },
    {
      nom:"Chasseur de monstres",
      shortCode:"CM",
      courage: {type:"min",nombre:"11+"},
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: {type:"min",nombre:"11+"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : [],
      restrictions : ["4PR Max"],
      competencesHerites :["Chercher des noises","Déplacement silencieux","Frapper lachement","Méfiance","Pister"],
      autres : ["Collectionneur : Si le chasseur de monstres combat des créatures (animaux aussi), et que le chasseur de prime achève l'un d'eux. Il gagne un trophé de ce monstre",
        "Tableau de chasse : Toutes les 5 primes récoltés, le chasseur de prime gagne 1PI contre créature",
        "Coup décisif : Le chasseur de prime peut décider que sa prochaine attaque sera critique de 1 à X et échec critique de 20-X à 20."
      ],
      shortCodeParents:["RA"],
      isOpen : false,
    },
    {
      nom:"Archéologue",
      shortCode:"AR",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"11+"},
      charisme: {type:"min",nombre:"11+"},
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["15EA","Une journée de plus sur le terrain : Familier des ruines, tombeau, etc, l'archéologue a +1AD dans ces environnement",
        "Ca m'a l'air ancien tout ça. Avant de rentrer dans une ruine, tombeau, etc, sur 1-2-3-4 au dé 20 l'archéologue est sûr de trouver un item précieux"
      ],
      restrictions : ["3PR Max"],
      competencesHerites :["Déplacement silencieux","Erudition","Escalader","Pister","Serrurier"],
      autres : ["Les parchemins mais y'en a trop à noter"],
      shortCodeParents:["RA"],
      isOpen : false,
    },
    {
      nom:"Chasseur de trésor",
      shortCode:"CT",
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: {type:"min",nombre:"11+"},
      caracteristiques : ["+ 15% sur tous les butins"],
      restrictions : ["3PR Max"],
      competencesHerites :["Chouraver","Instinct du trésor","Fariboles","Mendier et pleurnicher"],
      autres : ["Pas cette fois : le chasseur de trésor peut toujours effectuer un test de chance en plus du test de base pour éviter un piège",
        "Commissaire priseur : le chasseur de trésor connait la valeur des objets sans avoir besoin de les faire expertiser",
        "Corde de rappel : Le chasseur de trésor peut revenir quand il le souhaite (hors combat) ( avec son groupe contre EV/2) à l'entrée de la ruine, du tombeau, donjon, etc"
      ],
      shortCodeParents:["AR"],
      isOpen : false,
    },
    {
      nom:"Conservateur",
      shortCode:"CO",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"12+"},
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["+10EA","Maitrise des runes : Les armes du conservateur ont +2PI magique",
        "Contre-Sort : Les connaissances du conservateur lui permettent de ne pas etre la cible de mutation majeure de son choix",
        "Gallerie d'art : Tous les 10 items différents récoltés et exposés par le conservateur il gagne +1 INT"
      ],
      restrictions : ["2PR Max"],
      competencesHerites :["Arnaque et carambouille","Chef de groupe","Langue des monstres","Runes bizarres"],
      autres : ["Des parchemins lui aussi mais plus forts"],
      shortCodeParents:["AR"],
      isOpen : false,
    },
    {
      nom:"Démonologue",
      shortCode:"DM",
      courage: {type:"min",nombre:"12+"},
      intelligence: {type:"min",nombre:"12+"},
      charisme: {type:"min",nombre:"10+"},
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["-1PRD","Consomme PV alliés pour sorts"],
      restrictions : ["Armes à 2 mains","Bouclier","2PR Max"],
      competencesHerites :["Agoraphobie","Appel des renforts","Arnaque et carambouille","Comprendre les animaux","Erdition","Langue de monstres"],
      autres : ["Collecte des âmes. Toutes les 20 âmes capturés -> +1 dégâts Magique","Repos des Damnés : Libère 1 âme pour rendre 1 pv à un allié"],
      isOpen : false,
      shortCodeParents:[],
    },
    {
      nom:"Ingénieur",
      shortCode:"",
      courage: new Caracteristique(),
      intelligence: {type:"min",nombre:"12+"},
      charisme: new Caracteristique(),
      adresse: {type:"min",nombre:"11+"},
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques : ["L'ingénieur peut construire des Mécas","Tous les trois niveaux l’ingénieur ne gagne pas une nouvelle compétence, il peut invoquer un Méca de plus en combat et choisir un supplément de Méca"],
      restrictions : ["2PR Max"],
      competencesHerites :["Bricolo du dimanche","Désamorcer","Forgeron","Serrurier"],
      autres : ["L’ingénieur dispose de 2 points de Méca par tour pour effectuer des actions de Meca"],
      isOpen : false,
      shortCodeParents:[],
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
  "shortCodeParents" : Array<string>;
}

export class Caracteristique{
  "type" : string = "";
  "nombre" : string = "*"
}
