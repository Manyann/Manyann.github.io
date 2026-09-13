import { Component } from '@angular/core';
import {
  CompetenceRecap,
  competencesSylvain,
} from '../../../services/creation/data/competences.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competences-sylvain',
  standalone: true,
  templateUrl: 'sylvain.component.html',
  styleUrls: ['sylvain.component.css', '../../../assets/css/competence.css'],
  imports: [CommonModule],
})
export class SylvainComponent {
  competences: CompetenceRecap[] = [...competencesSylvain()];

  branches = ['Eau', 'Bois / Végétal'];

  getCompetencesByBrancheAndNiveau(
    branche: string,
    niveau: number,
  ): CompetenceRecap[] {
    return this.competences.filter(
      (c) => c.branche === branche && c.niveau === niveau,
    );
  }

  getNiveauxByBranche(branche: string): number[] {
    return [
      ...new Set(
        this.competences
          .filter((c) => c.branche === branche && c.niveau !== undefined)
          .map((c) => c.niveau as number),
      ),
    ].sort((a, b) => a - b);
  }

  getBrancheClass(branche: string): string {
    return branche === 'Bois / Végétal' ? 'branche-vegetal' : 'branche-eau';
  }

  getBrancheDescription(branche: string): string {
    if (branche === 'Bois / Végétal') {
      return 'Maîtrise offensive et protectrice de la forêt, capable d’invoquer ses gardiens.';
    }

    return 'Voie de soin et de soutien puisant dans la force apaisante de l’eau.';
  }

  getBrancheIconPath(branche: string): string {
    if (branche === 'Bois / Végétal') {
      return 'assets/icons/elements/wood.svg';
    }

    return 'assets/icons/elements/water.svg';
  }

  getCategorieIconPath(categorie: string): string {
    const key = categorie
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{M}/gu, '');

    const icons: Record<string, string> = {
      affaiblissement: 'assets/icons/categories/affaiblissement.svg',
      amelioration: 'assets/icons/categories/amelioration.svg',
      autre: 'assets/icons/categories/autre.svg',
      degat: 'assets/icons/categories/degat.svg',
      soutient: 'assets/icons/categories/soutient.svg',
      soutien: 'assets/icons/categories/soutient.svg',
      soin: 'assets/icons/categories/soin.svg',
    };

    return icons[key] ?? icons['autre'];
  }
}
