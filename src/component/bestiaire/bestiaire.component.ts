import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Card} from '../../app/common/card';

@Component({
  selector: 'app-bestiaire',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './bestiaire.component.html',
  styleUrl: './bestiaire.component.css'
})
export class BestiaireComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(){
    this.cards = this.buildCardList();
  }
  
private buildCardList():Array<Card>{
  const list : Array<Card> = [
    {
      image:"assets/img/card/bestiaire/desert.png",
      titre:"Désert",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/est.png",
      titre:"Est",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/foret1.png",
      titre:"Fôret bas level",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/foret2.png",
      titre:"Fôret",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/givre.png",
      titre:"Givre",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/grotte.png",
      titre:"Grotte",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/jungle.png",
      titre:"Jungle",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/mer.jpg",
      titre:"Mer",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/montagne.png",
      titre:"Montagne",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/souterrain.png",
      titre:"Souterrain",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/terre-sauvage.png",
      titre:"Terre Sauvage",
      url:""
    },
    {
      image:"assets/img/card/bestiaire/urbain.png",
      titre:"Urbain",
      url:""
    },
  ]

  return list;
}
}
