import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Card} from '../model/card';
import { CardListComponent } from '../common/card-list/card-list.component';

@Component({
  selector: 'app-ingame',
  standalone: true,
  imports: [CommonModule,CardListComponent],
  templateUrl: './in-game.component.html',
  styleUrl: './in-game.component.css'
})
export class InGameComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(
    private router: Router){
    this.cards = this.buildCardList();
  }
  
public goToPage(url:string){
    this.router.navigate(["in-game",url]);
}

private buildCardList():Array<Card>{
  const list : Array<Card> = [
    {
      image:"assets/img/card/teleportation.PNG",
      titre:"Téléportation",
      url:"teleportation"
    },
    {
      image:"assets/img/card/ingame/shop.jpg",
      titre:"Armes / Armures",
      url:"shop"
    },
    {
      image:"assets/img/card/ingame/loot.jpg",
      titre:"Loot",
      url:"loot"
    },
    {
      image:"assets/img/card/ingame/guilde.PNG",
      titre:"Nos héros",
      url:"gestion"
    },
  ]

  return list;
}

}