import { Component } from '@angular/core';
import { Card } from '../../model/card';
import { CommonModule } from '@angular/common';
import { CardListComponent } from '../../common/card-list/card-list.component';

@Component({
  selector: 'app-bestiaire',
  templateUrl: './bestiaire.component.html',
  styleUrl: './bestiaire.component.css',
  standalone:true,
  imports:[CommonModule,CardListComponent]
})
export class BestiaireComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(){
    this.cards = this.buildCardList();
  }

  public openPdf(url:string):void{
    window.open(url,'_blank')
  }
  
private buildCardList():Array<Card>{
  const list : Array<Card> = [
    {
      image:"assets/img/card/bestiaire/desert.png",
      titre:"Désert",
      url:"assets/img/pdfs/bestiaire/rencontre-desert.PNG"
    },
    {
      image:"assets/img/card/bestiaire/est.png",
      titre:"Est",
      url:"assets/img/pdfs/bestiaire/est.PNG"
    },
    {
      image:"assets/img/card/bestiaire/foret1.png",
      titre:"Fôret",
      url:"assets/img/pdfs/bestiaire/rencontre-foret.PNG"
    },
    {
      image:"assets/img/card/bestiaire/jungle.png",
      titre:"Jungle",
      url:"assets/img/pdfs/bestiaire/rencontre-jungle.PNG"
    },
    {
      image:"assets/img/card/bestiaire/mer.jpg",
      titre:"Mer",
      url:"assets/img/pdfs/bestiaire/rencontre-mer.PNG"
    },
    {
      image:"assets/img/card/bestiaire/montagne.png",
      titre:"Montagne",
      url:"assets/img/pdfs/bestiaire/rencontre-montagne.PNG"
    },
    {
      image:"assets/img/card/bestiaire/terre-sauvage.png",
      titre:"Terre Sauvage",
      url:"assets/img/pdfs/bestiaire/rencontre-plaine.PNG"
    },
  ]

  return list;
}
}
