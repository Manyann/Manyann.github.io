import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {Card} from '../../model/card';
import { CardListComponent } from "../../common/card-list/card-list.component";

@Component({
  selector: 'app-autre',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CardListComponent],
  templateUrl: './autre.component.html',
  styleUrl: './autre.component.css'
})
export class AutreComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(private router:Router){
    this.cards = this.buildCardList();
  }

  
  public openUrl(url:string):void{
    if(url.indexOf("pdf") != -1){
    window.open(url,'_blank')
    }
    else{
      this.router.navigate([url]);
    }
  }
  
private buildCardList():Array<Card>{
  const list : Array<Card> = [
    {
      image:"assets/img/card/autre/bienfait.PNG",
      titre:"Bienfait",
      url:"assets/img/pdfs/autre/tableau-bienfaits-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/autre/calamite.PNG",
      titre:"Calamité",
      url:"assets/img/pdfs/autre/tableau-calamites-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/autre/mutation.PNG",
      titre:"Mutation",
      url:"assets/img/pdfs/autre/tableau-mutations-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/autre/sort-entropique.PNG",
      titre:"Sort entropique",
      url:"assets/img/pdfs/autre/tableau-sortsentropiques-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/pdfs/autre/fangh_13.png",
      titre:"Carte Fangh",
      url:"assets/img/pdfs/autre/fangh_13.png"
    },
  ]

  return list;
}
}
