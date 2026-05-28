import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from '../../../model/card';
import { CardListComponent } from '../../../common/card-list/card-list.component';
@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CardListComponent],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css',
})
export class SortComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor() {
    this.cards = this.buildCardList();
  }

  public handleClick(url: string): void {
    window.open(url, '_blank');
  }

  private buildCardList(): Array<Card> {
    const list: Array<Card> = [
      {
        image: 'assets/img/card/sort/mage.PNG',
        titre: 'Mages',
        url: 'competences#mage',
      },
      {
        image: 'assets/img/card/sort/pretre.PNG',
        titre: 'Prêtres',
        url: 'competences#pretre',
      },
      {
        image: 'assets/img/card/sort/ingenieur.PNG',
        titre: 'Ingénieur',
        url: 'competences#ingenieur',
      },
    ];

    return list;
  }
}
