import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CompetenceRecap,
  competencesDemonologue,
} from '../../../services/creation/data/competences.data';

@Component({
  selector: 'app-competences-demonologue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demonologue.component.html',
  styleUrls: [
    './demonologue.component.css',
    '../../../assets/css/competence.css',
  ],
})
export class DemonologueComponent {
  niveaux = [1, 2, 3, 4, 5, 6, 8];
  public competences = competencesDemonologue();

  getCompetencesByNiveau(niveau: number): CompetenceRecap[] {
    return this.competences.filter((x) => x.niveau === niveau);
  }
}
