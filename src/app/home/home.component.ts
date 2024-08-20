import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Card} from '../common/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
      image:"assets/img/card/hero.jpg",
      titre:"Héro",
      url:"hero"
    },
    {
      image:"assets/img/card/bestiaire.jpg",
      titre:"Bestiaire",
      url:"bestiaire"
    },
    {
      image:"assets/img/card/equipement.jpg",
      titre:"Equipement",
      url:"equipement"
    },
    {
      image:"assets/img/card/gestion.PNG",
      titre:"Gestion personnage",
      url:"gestion"
    },
    {
      image:"assets/img/card/aide.png",
      titre:"Autres",
      url:"autre"
    },
  ]

  return list;
}

}