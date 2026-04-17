import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CreationHelper, Metier, Origine } from '../../../model/creation';

@Component({
  selector: 'app-statistique-merge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistique-merge.component.html',
  styleUrl: './statistique-merge.component.css',
})
export class StatistiqueMergeComponent {
  @Input() public origine: Origine = CreationHelper.getDefaultOrigine();
  @Input() public metier: Metier = CreationHelper.getDefaultMetier();

  public statistiquesMerged: Array<{
    label: string;
    stat: { valeur: string; type: string };
  }> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['origine'] || changes['metier']) {
      this.mergeStatistique();
    }
  }

  private mergeStatistique(): void {
    this.statistiquesMerged = [
      {
        label: 'COU',
        stat: this.getBadge(
          this.origine.courage.nombre,
          this.metier.courage.nombre,
        ),
      },
      {
        label: 'INT',
        stat: this.getBadge(
          this.origine.intelligence.nombre,
          this.metier.intelligence.nombre,
        ),
      },
      {
        label: 'CHA',
        stat: this.getBadge(
          this.origine.charisme.nombre,
          this.metier.charisme.nombre,
        ),
      },
      {
        label: 'AD',
        stat: this.getBadge(
          this.origine.adresse.nombre,
          this.metier.adresse.nombre,
        ),
      },
      {
        label: 'FO',
        stat: this.getBadge(
          this.origine.force.nombre,
          this.metier.force.nombre,
        ),
      },
      {
        label: 'CHN',
        stat: this.getBadge(
          this.origine.chance.nombre,
          this.metier.chance.nombre,
        ),
      },
    ];
  }

  private getBadge(
    origineValeur: string,
    metierValeur: string,
  ): { valeur: string; type: string } {
    let minMax: number = 0;
    let upDown: string = '';
    if (origineValeur.indexOf('+') != -1 && metierValeur.indexOf('+') != -1) {
      minMax = Math.max(
        parseInt(origineValeur.replace('+', '')),
        parseInt(metierValeur.replace('+', '')),
      );

      upDown = 'up';
    } else if (
      origineValeur.indexOf('-') != -1 &&
      metierValeur.indexOf('-') != -1
    ) {
      minMax = Math.min(
        parseInt(origineValeur.replace('-', '')),
        parseInt(metierValeur.replace('-', '')),
      );

      upDown = 'down';
    } else if (origineValeur.indexOf('-') != -1) {
      minMax = parseInt(origineValeur.replace('-', ''));
      upDown = 'down';
    } else if (metierValeur.indexOf('-') != -1) {
      minMax = parseInt(metierValeur.replace('-', ''));
      upDown = 'down';
    } else if (origineValeur.indexOf('+') != -1) {
      minMax = parseInt(origineValeur.replace('+', ''));
      upDown = 'up';
    } else if (metierValeur.indexOf('+') != -1) {
      minMax = parseInt(metierValeur.replace('+', ''));
      upDown = 'up';
    } else {
      return { valeur: '*', type: 'neutral' };
    }

    return { valeur: `${minMax}`, type: upDown };
  }
}
