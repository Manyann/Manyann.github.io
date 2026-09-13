import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Card } from '../../model/card';
import { CardListComponent } from '../../common/card-list/card-list.component';

@Component({
  selector: 'app-equipement',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CardListComponent],
  templateUrl: './equipement.component.html',
  styleUrl: './equipement.component.css',
})
export class EquipementComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(private router: Router) {
    this.cards = this.buildCardList();
  }

  public openPdf(url: string): void {
    if (url.indexOf('pdf') != -1) {
      window.open(url, '_blank');
    } else {
      this.router.navigateByUrl('/' + url);
    }
  }

  private buildCardList(): Array<Card> {
    const list: Array<Card> = [
      {
        image: 'assets/img/card/equipement/ingredient.PNG',
        titre: 'Ingrédients',
        url: 'documentation/equipements/ingredients',
      },
      {
        image: 'assets/img/card/equipement/materiel.PNG',
        titre: 'Matériels',
        url: 'assets/img/pdfs/equipement/tableau-materiel-naheulbeuk-jdr.pdf',
      },
      {
        image: 'assets/img/card/equipement/gemme.PNG',
        titre: 'Gemmes',
        url: 'assets/img/pdfs/equipement/gemme-mythique.pdf',
      },
    ];

    return list;
  }
}
