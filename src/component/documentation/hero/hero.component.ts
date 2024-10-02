import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {Card} from '../../model/card';
import { CardListComponent } from '../../common/card-list/card-list.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterOutlet,CommonModule,CardListComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
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
      this.router.navigate(["documentation","heros",url]);
    }
  }
  
private buildCardList():Array<Card>{
  const list : Array<Card> = [
    {
      image:"assets/img/card/hero/origine-metier.PNG",
      titre:"Origines et Métiers",
      url:"assets/img/pdfs/hero/all-class-metier.pdf"
    },
    {
      image:"assets/img/pdfs/hero/naheulbeuk-feuilleduperso-v2.png",
      titre:"Fiche personnage",
      url:"assets/img/pdfs/hero/naheulbeuk-feuilleduperso-v2.png"
    },
    {
      image:"assets/img/card/hero/ape.PNG",
      titre:"APE",
      url:"assets/img/pdfs/hero/all-ape.pdf"
    },
    {
      image:"assets/img/card/equipement/livre.PNG",
      titre:"Livres de sort",
      url:"sorts"
    },
  ]

  return list;
}
}
