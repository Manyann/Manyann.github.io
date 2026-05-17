import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CompetenceRecap,
  competencesPretre,
} from '../../../services/creation/data/competences.data';

@Component({
  selector: 'app-competences-pretre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pretre.component.html',
  styleUrls: ['./pretre.component.css', '../../../assets/css/competence.css'],
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

  getOrdreIconPath(ordre: string): string {
    const icons: Record<string, string> = {
      "Ordre de l'harmonie": 'assets/icons/pretres/soleil.svg',
      'Ordre du néant': 'assets/icons/pretres/neant.svg',
      'Ordre du cycle éternel': 'assets/icons/pretres/cycle.svg',
      'Ordre du destin': 'assets/icons/pretres/destin.svg',
    };

    return icons[ordre] ?? 'assets/icons/pretres/soleil.svg';
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

  getCategorieIconPath(categorie: string): string {
    const icons: Record<string, string> = {
      affaiblissement: 'assets/icons/categories/affaiblissement.svg',

      amelioration: 'assets/icons/categories/amelioration.svg',

      autre: 'assets/icons/categories/autre.svg',

      degat: 'assets/icons/categories/degat.svg',

      soutient: 'assets/icons/categories/soutient.svg',

      soin: 'assets/icons/categories/soin.svg',
    };

    return (
      icons[
        categorie
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      ] ?? 'assets/icons/categories/autre.svg'
    );
  }
}
