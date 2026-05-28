import { Component } from '@angular/core';
import {
  CompetenceRecap,
  competencesArcheologue,
  competencesConservateur,
} from '../../../services/creation/data/competences.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competences-archeologue',
  standalone: true,
  templateUrl: 'archeologue.component.html',
  styleUrls: [
    'archeologue.component.css',
    '../../../assets/css/competence.css',
  ],
  imports: [CommonModule],
})
export class ArcheologueComponent {
  competences: CompetenceRecap[] = [
    ...competencesArcheologue(),
    ...competencesConservateur(),
  ];

  branches = ['Archéologue', 'Conservateur'];

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
    return branche === 'Conservateur'
      ? 'branche-conservateur'
      : 'branche-archeologue';
  }

  getBrancheDescription(branche: string): string {
    if (branche === 'Conservateur') {
      return 'Évolution savante de l’Archéologue, capable d’exploiter les reliques les plus puissantes.';
    }

    return 'Spécialiste des parchemins, manuscrits, traités et reliques anciennes.';
  }

  getBrancheIconPath(branche: string): string {
    if (branche === 'Conservateur') {
      return 'assets/icons/archeologues/conservateur.svg';
    }

    return 'assets/icons/archeologues/archeologue.svg';
  }

  getCategorieIconPath(categorie: string): string {
    const key = categorie
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const icons: Record<string, string> = {
      affaiblissement: 'assets/icons/categories/affaiblissement.svg',
      amelioration: 'assets/icons/categories/amelioration.svg',
      autre: 'assets/icons/categories/autre.svg',
      degat: 'assets/icons/categories/degat.svg',
      soutient: 'assets/icons/categories/soutient.svg',
      soin: 'assets/icons/categories/soin.svg',
    };

    return icons[key] ?? icons['autre'];
  }
}
