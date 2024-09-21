import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Card } from '../model/card';
import { CardListComponent } from '../common/card-list/card-list.component';
@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.css',
  imports:[CommonModule,CardListComponent],
  standalone:true
})
export class DocumentationComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(
    private router: Router){
    this.cards = this.buildCardList();
  }
  
public goToPage(url:string){
    this.router.navigate(["/documentation",url]);
}

private buildCardList():Array<Card>{
  const list : Array<Card> = [
    {
      image:"assets/img/card/hero.jpg",
      titre:"Héro",
      url:"heros"
    },
    {
      image:"assets/img/card/bestiaire.jpg",
      titre:"Bestiaire",
      url:"bestiaires"
    },
    {
      image:"assets/img/card/equipement.jpg",
      titre:"Equipement",
      url:"equipements"
    },
    {
      image:"assets/img/card/aide.png",
      titre:"Autres",
      url:"autres"
    },
  ]

  return list;
}

}