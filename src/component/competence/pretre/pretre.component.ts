import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CompetenceRecap,
  competencesDemonologue,
  competencesPretre,
} from '../../../services/creation/data/competences.data';

@Component({
  selector: 'app-competences-pretre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pretre.component.html',
  styleUrl: './pretre.component.css',
})
export class PretreComponent {
  public competences = competencesPretre();
  ordres = [
    "Ordre de l'harmonie",
    'Ordre du néant',
    'Ordre du cycle éternel',
    'Ordre du destin',
  ];

  getNiveauxByOrdre(ordre: string): string[] {
    return [
      ...new Set(
        this.competences
          .filter((c) => c.branche === ordre)
          .map((c) => c.niveau as string),
      ),
    ];
  }

  getCompetencesByOrdreAndNiveau(
    ordre: string,
    niveau: string,
  ): CompetenceRecap[] {
    return this.competences.filter(
      (c) => c.branche === ordre && c.niveau === niveau,
    );
  }

  getOrdreClass(ordre: string): string {
    switch (ordre) {
      case "Ordre de l'harmonie":
        return 'ordre-harmonie';
      case 'Ordre du néant':
        return 'ordre-neant';
      case 'Ordre du cycle éternel':
        return 'ordre-cycle';
      case 'Ordre du destin':
        return 'ordre-destin';
      default:
        return '';
    }
  }

  getOrdreIcon(ordre: string): string {
    switch (ordre) {
      case "Ordre de l'harmonie":
        return 'pi pi-sun';
      case 'Ordre du néant':
        return 'pi pi-moon';
      case 'Ordre du cycle éternel':
        return 'pi pi-spinner';
      case 'Ordre du destin':
        return 'pi pi-compass';
      default:
        return 'pi pi-star';
    }
  }

  getOrdreDescription(ordre: string): string {
    switch (ordre) {
      case "Ordre de l'harmonie":
        return 'Lumière, chaleur et équilibre.';
      case 'Ordre du néant':
        return 'Ombres, vide et mystères.';
      case 'Ordre du cycle éternel':
        return 'Vie, mort et renaissance.';
      case 'Ordre du destin':
        return 'Hasard, karma et destinée.';
      default:
        return '';
    }
  }

  getCategorieIcon(categorie: string): string {
    switch (categorie) {
      case 'affaiblissement':
        return 'pi pi-angle-double-down';
      case 'amelioration':
        return 'pi pi-angle-double-up';
      case 'autre':
        return 'pi pi-sparkles';
      case 'degat':
        return 'pi pi-bolt';
      case 'soutient':
        return 'pi pi-shield';
      case 'soin':
        return 'pi pi-heart';
      default:
        return 'pi pi-sparkles';
    }
  }
}
