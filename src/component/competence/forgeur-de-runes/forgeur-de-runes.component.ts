import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CompetenceRecap,
  competencesForgeurDeRunes,
} from '../../../services/creation/data/competences.data';

@Component({
  selector: 'app-competences-forgeur-de-runes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forgeur-de-runes.component.html',
  styleUrls: [
    './forgeur-de-runes.component.css',
    '../../../assets/css/competence.css',
  ],
})
export class ForgeurRunesComponent {
  niveaux = [4, 5, 6, 8];
  public competences = competencesForgeurDeRunes();

  getCompetencesByNiveau(niveau: number): CompetenceRecap[] {
    return this.competences.filter((x) => x.niveau === niveau);
  }
}
