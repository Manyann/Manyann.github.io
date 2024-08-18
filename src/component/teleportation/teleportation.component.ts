import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {Card} from '../../app/common/card';

@Component({
  selector: 'app-teleportation',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './teleportation.component.html',
  styleUrl: './teleportation.component.css'
})
export class TeleportationComponent {
  title = 'nhbk';
  panels: Array<Panel>;

  constructor(){
    this.panels = this.buildCardList();
  }
  
private buildCardList():Array<Panel>{

  var numbers = [ 1, 2, 3, 4, 5, 6, 7,8,9 ];

  while(
    numbers.findIndex(function(v, i) {
      return v == i + 1 || (i && Math.abs(numbers[i - 1] - v) == 1);
    }) != -1
  ) {
    numbers.sort(function() { return Math.random() - 0.5; });
  }

  var list : Array<Panel> = [
    {
      image:"assets/img/card/teleportation/desert.jpg",
      titre:"Cité de Rancurac",
      numero : numbers[0]
    },
    {
      image:"assets/img/card/teleportation/est-camp.PNG",
      titre:"Camp de Ablé",
      numero : numbers[1]
    },
    {
      image:"assets/img/card/teleportation/glandorn.jpg",
      titre:"Bois de Glandord",
      numero : numbers[2]
    },
    {
      image:"assets/img/card/teleportation/glargh.PNG",
      titre:"Ville de Glargh",
      numero : numbers[3]
    },
    {
      image:"assets/img/card/teleportation/iceland.png",
      titre:"Avant poste d'Audiair",
      numero : numbers[4]
    },
    {
      image:"assets/img/card/teleportation/island-sud.jpg",
      titre:"Port de Matir",
      numero : numbers[5]
    },
    {
      image:"assets/img/card/teleportation/lac.PNG",
      titre:"Village de Nirghall",
      numero : numbers[6]
    },
    {
      image:"assets/img/card/teleportation/schlipac.jpg",
      titre:"Foret de Schlipak",
      numero : numbers[7]
    },
    {
      image:"assets/img/card/teleportation/waldorg.jpg",
      titre:"Ville de Waldorg",
      numero : numbers[8]
    },
  ]

  return list;
}

}


export class Panel {
  titre!:string;
  numero!:number;
  image!:string;
} 
