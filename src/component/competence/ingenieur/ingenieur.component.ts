import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  competencesIngenieur,
  MecaRecap,
} from '../../../services/creation/data/competences.data';

@Component({
  selector: 'app-competences-ingenieur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingenieur.component.html',
  styleUrls: [
    './ingenieur.component.css',
    '../../../assets/css/competence.css',
  ],
})
export class IngenieurComponent {
  public mecas = competencesIngenieur();
  branches = ['Méca', 'Supplément 1', 'Supplément 2'];

  getMecasByBranche(branche: string): MecaRecap[] {
    return this.mecas.filter((m) => m.branche === branche);
  }

  getBrancheClass(branche: string): string {
    switch (branche) {
      case 'Supplément 1':
        return 'branch-sup1';
      case 'Supplément 2':
        return 'branch-sup2';
      default:
        return 'branch-base';
    }
  }

  getBrancheDescription(branche: string): string {
    switch (branche) {
      case 'Supplément 1':
        return 'Améliorations renforcées : blindage, soins et modules de soutien avancés.';
      case 'Supplément 2':
        return 'Prototypes de haute qualité : mécas spécialisés, robustes et optimisés.';
      default:
        return 'Modèles de base conçus pour couvrir soin, protection, attaque et soutien.';
    }
  }
}
