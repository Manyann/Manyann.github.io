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
    console.log("bestiaire");
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
      url:"assets/img/pdfs/bestiaire/rencontres-desert-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/bestiaire/est.png",
      titre:"Est",
      url:"assets/img/pdfs/bestiaire/est.PNG"
    },
    {
      image:"assets/img/card/bestiaire/foret1.png",
      titre:"Fôret bas level",
      url:"assets/img/pdfs/bestiaire/rencontres-foret1-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/bestiaire/foret2.png",
      titre:"Fôret",
      url:"assets/img/pdfs/bestiaire/rencontres-foret2-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/bestiaire/givre.png",
      titre:"Givre",
      url:"assets/img/pdfs/bestiaire/bestiaire-confinsdugivre-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/bestiaire/grotte.png",
      titre:"Grotte",
      url:"assets/img/pdfs/bestiaire/Rencontres-grottes-naheulbeuk.pdf"
    },
    {
      image:"assets/img/card/bestiaire/jungle.png",
      titre:"Jungle",
      url:"assets/img/pdfs/bestiaire/jungle.PNG"
    },
    {
      image:"assets/img/card/bestiaire/mer.jpg",
      titre:"Mer",
      url:"assets/img/pdfs/bestiaire/mer.PNG"
    },
    {
      image:"assets/img/card/bestiaire/montagne.png",
      titre:"Montagne",
      url:"assets/img/pdfs/bestiaire/rencontres-montagne-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/bestiaire/souterrain.png",
      titre:"Souterrain",
      url:"assets/img/pdfs/bestiaire/rencontres-souterrains-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/bestiaire/terre-sauvage.png",
      titre:"Terre Sauvage",
      url:"assets/img/pdfs/bestiaire/rencontres-terresauvage2-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/bestiaire/urbain.png",
      titre:"Urbain",
      url:"assets/img/pdfs/bestiaire/rencontres-urbaines2-naheulbeuk-jdr.pdf"
    },
  ]

  return list;
}
}
