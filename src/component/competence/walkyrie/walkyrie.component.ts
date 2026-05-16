import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CompetenceRecap,
  competencesWalkyrie,
} from '../../../services/creation/data/competences.data';

@Component({
  selector: 'app-competences-walkyrie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './walkyrie.component.html',
  styleUrl: './walkyrie.component.css',
})
export class WalkyrieComponent {
  public competences = competencesWalkyrie();

  branches = [
    'Walkyrie',
    'Gardienne de l’aube',
    'Compagnie du crépuscule',
    'Légion céleste',
    'Archange',
  ];

  getCompetencesByBranche(branche: string): CompetenceRecap[] {
    return this.competences.filter((c) => c.branche === branche);
  }

  getBrancheClass(branche: string): string {
    switch (branche) {
      case 'Gardienne de l’aube':
        return 'branch-aube';
      case 'Compagnie du crépuscule':
        return 'branch-crepuscule';
      case 'Légion céleste':
        return 'branch-legion';
      case 'Archange':
        return 'branch-archange';
      default:
        return 'branch-walkyrie';
    }
  }

  getBrancheIcon(branche: string): string {
    switch (branche) {
      case 'Gardienne de l’aube':
        return 'pi pi-sun';
      case 'Compagnie du crépuscule':
        return 'pi pi-bolt';
      case 'Légion céleste':
        return 'pi pi-shield';
      case 'Archange':
        return 'pi pi-star-fill';
      default:
        return 'pi pi-heart';
    }
  }

  getBrancheDescription(branche: string): string {
    switch (branche) {
      case 'Gardienne de l’aube':
        return 'Voie lumineuse tournée vers le soin, la protection et la survie des alliés.';
      case 'Compagnie du crépuscule':
        return 'Voie vengeresse, offensive et implacable contre les ennemis.';
      case 'Légion céleste':
        return 'Formation d’élite disciplinée, équilibrée entre soutien martial et puissance divine.';
      case 'Archange':
        return 'Pouvoir ultime, réservé aux élues capables de transcender le champ de bataille.';
      default:
        return 'Base neutre et bienveillante de la Walkyrie.';
    }
  }
}
