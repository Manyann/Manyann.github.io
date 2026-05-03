import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CodeLibelle } from '../../model/code-libelle';
import { CreationHelper } from '../../../services/creation';

@Component({
  selector: 'app-unmetier-list',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './unmetier-list.component.html',
  styleUrls: [
    './unmetier-list.component.css',
    '../../../assets/css/sidebar-stats.css',
  ],
})
export class UnMetierListComponent {
  @Input() public unMetiers: Array<string> = [];

  public allMetier: Array<CodeLibelle> =
    CreationHelper.getAllMetierCodeLibelle();
  public unMetierFiltered: Array<string> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['unMetiers']) {
      this.filterMetiers();
    }
  }

  private filterMetiers(): void {
    if (!this.unMetiers) {
      this.unMetierFiltered = [];
      return;
    }

    const map = new Map(
      [
        ...this.unMetiers.reduce((acc, item) => {
          acc.set(item, (acc.get(item) ?? 0) + 1);
          return acc;
        }, new Map<string, number>()),
      ].filter(([_, count]) => count > 1),
    );

    this.unMetierFiltered = this.allMetier
      .filter((x) => this.unMetiers.includes(x.code))
      .map(
        (x) =>
          `${x.libelle} ${map.get(x.code) != undefined ? 'x' + map.get(x.code) : ''}`,
      );
  }
}
