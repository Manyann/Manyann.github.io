import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {Card} from '../../app/common/card';

@Component({
  selector: 'app-autre',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
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
    if(url.indexOf("pdd") != -1){
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
      url:""
    },
    {
      image:"assets/img/card/autre/calamite.PNG",
      titre:"Calamité",
      url:""
    },
    {
      image:"assets/img/card/autre/mutation.PNG",
      titre:"Mutation",
      url:""
    },
    {
      image:"assets/img/card/autre/teleportation.PNG",
      titre:"téléportation",
      url:""
    },
  ]

  return list;
}
}
