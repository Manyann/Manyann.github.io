export class Origine {
  nom: string = '';
  courage: Caracteristique = new Caracteristique();
  intelligence: Caracteristique = new Caracteristique();
  charisme: Caracteristique = new Caracteristique();
  adresse: Caracteristique = new Caracteristique();
  force: Caracteristique = new Caracteristique();
  chance: Caracteristique = new Caracteristique();
  caracteristiques: Array<string> = [];
  restrictions: Array<string> = [];
  competencesHerites: Array<string> = [];
  competencesSpeciales: Array<string> = [];
  restrictionsMetierShortCode: Array<string> = [];
  isForbidden: boolean = false;
}

export class Metier {
  nom: string = '';
  shortCode: string = '';
  courage: Caracteristique = new Caracteristique();
  intelligence: Caracteristique = new Caracteristique();
  charisme: Caracteristique = new Caracteristique();
  adresse: Caracteristique = new Caracteristique();
  force: Caracteristique = new Caracteristique();
  chance: Caracteristique = new Caracteristique();
  caracteristiques: Array<string> = [];
  restrictions: Array<string> = [];
  competencesHerites: Array<string> = [];
  competencesSpeciales: Array<string> = [];
  isForbidden: boolean = false;
  shortCodeParents: Array<string> = [];
  subMetiers: Array<Metier> = [];
}

export class Caracteristique {
  type: string = '';
  nombre: string = '*';
}
