import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from '../../app/common/card';

@Component({
  selector: 'app-equipement',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './equipement.component.html',
  styleUrl: './equipement.component.css'
})
export class EquipementComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(){
    this.cards = this.buildCardList();
  }
  
private buildCardList():Array<Card>{
  const list : Array<Card> = [
    {
      image:"assets/img/card/equipement/desert.png",
      titre:"Armes",
      url:""
    },
    {
      image:"assets/img/card/equipement/est.png",
      titre:"Armures",
      url:""
    },
    {
      image:"assets/img/card/equipement/foret2.png",
      titre:"Bateaux",
      url:""
    },
    {
      image:"assets/img/card/equipement/foret1.png",
      titre:"Chapeaux",
      url:""
    },
    {
      image:"assets/img/card/equipement/givre.png",
      titre:"Gemmes",
      url:""
    },
    {
      image:"assets/img/card/equipement/grotte.png",
      titre:"Ingredients",
      url:""
    },
    {
      image:"assets/img/card/equipement/jungle.png",
      titre:"Instruments",
      url:""
    },
    {
      image:"assets/img/card/equipement/mer.jpg",
      titre:"Livres",
      url:""
    },
    {
      image:"assets/img/card/equipement/montagne.png",
      titre:"Materiels",
      url:""
    },
    {
      image:"assets/img/card/equipement/souterrain.png",
      titre:"Objets exclusif",
      url:""
    },
    {
      image:"assets/img/card/equipement/terre-sauvage.png",
      titre:"Pièges",
      url:""
    },
    {
      image:"assets/img/card/equipement/urbain.png",
      titre:"Poisons",
      url:""
    },
    {
      image:"assets/img/card/equipement/urbain.png",
      titre:"Potions",
      url:""
    },
  ]

  return list;
}

}
