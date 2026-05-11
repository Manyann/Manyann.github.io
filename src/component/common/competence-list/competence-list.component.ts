import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CodeLibelle } from '../../model/code-libelle';
import { CreationHelper } from '../../../services/creation';

@Component({
  selector: 'app-competence-list',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './competence-list.component.html',
  styleUrls: [
    './competence-list.component.css',
    '../../../assets/css/sidebar-stats.css',
  ],
})
export class CompetenceListComponent {
  @Input() public competences: Array<string> = [];
  @Input() public type: string = 'héritées';

  public allCompetence: Array<CodeLibelle> =
    CreationHelper.getAllBasiqueCompetences();
  public competencesFiltered: Array<string> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['competences']) {
      this.filterCompetences();
    }
  }

  private filterCompetences(): void {
    if (!this.competences) {
      this.competencesFiltered = [];
      return;
    }
    const map = new Map(
      [
        ...this.competences.reduce((acc, item) => {
          acc.set(item, (acc.get(item) ?? 0) + 1);
          return acc;
        }, new Map<string, number>()),
      ].filter(([_, count]) => count > 1),
    );

    this.competencesFiltered = this.allCompetence
      .filter((x) => this.competences.includes(x.code))
      .map(
        (x) =>
          `${x.libelle} ${map.get(x.code) != undefined ? 'x' + map.get(x.code) : ''}`,
      );
  }
}
