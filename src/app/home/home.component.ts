import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Card} from '../../component/model/card';
import { CardListComponent } from "../../component/common/card-list/card-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(
    private router: Router){
    this.cards = this.buildCardList();
  }
  
public goToPage(url:string){
    this.router.navigate([url]);
}

private buildCardList():Array<Card>{
  const list : Array<Card> = [
    {
      image:"assets/img/card/equipement/materiel.PNG",
      titre:"Documentation",
      url:"documentation"
    },
    {
      image:"assets/img/card/gestion.PNG",
      titre:"In Game",
      url:"in-game"
    },
    {
      image:"assets/img/card/gestion.PNG",
      titre:"Maitre du jeu",
      url:"gestion"
    },
  ]

  return list;
}

}