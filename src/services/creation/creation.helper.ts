import { Caracteristique, Metier, Origine } from './models/creation.model';
import { createBasiqueCompetences } from './data/competences.data';
import { createMetiers } from './data/metiers.data';
import { createOrigines } from './data/origines.data';
import { CodeLibelle } from '../../component/model/code-libelle';

export class CreationHelper {
  static getAllMetierCodeLibelle(): Array<CodeLibelle> {
    return this.getAllMetier().map((metier: Metier) => ({
      code: metier.shortCode,
      libelle: metier.nom,
    }));
  }

  static getAllBasiqueCompetences(): Array<CodeLibelle> {
    return createBasiqueCompetences();
  }

  static getDefaultOrigine(): Origine {
    return {
      nom: '',
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques: [],
      restrictions: [],
      competencesHerites: [],
      restrictionsMetierShortCode: [],
      isForbidden: false,
    };
  }

  static getOrigineByName(name: string): Origine | undefined {
    return this.getAllOrigine().find((origine) => origine.nom === name);
  }

  static getDefaultMetier(): Metier {
    return {
      nom: '',
      shortCode: '',
      courage: new Caracteristique(),
      intelligence: new Caracteristique(),
      charisme: new Caracteristique(),
      adresse: new Caracteristique(),
      force: new Caracteristique(),
      chance: new Caracteristique(),
      caracteristiques: [],
      restrictions: [],
      competencesHerites: [],
      isForbidden: false,
      shortCodeParents: [],
      subMetiers: [],
      autres: [],
    };
  }

  static getAllOrigine(): Array<Origine> {
    return createOrigines();
  }

  static getAllMetier(): Array<Metier> {
    return createMetiers();
  }
}
