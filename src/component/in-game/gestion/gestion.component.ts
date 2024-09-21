import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Card } from '../../model/card';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {
  title = 'nhbk';
  cards: Array<Card>;

  constructor(private router:Router){
    this.cards = this.buildCardList();
  }

  
  public openUrl(url:string):void{
    console.log(url);
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
      image:"assets/img/card/gestion/create.png",
      titre:"Créer",
      url:"creer"
    },
    {
      image:"assets/img/card/gestion/manage.jpg",
      titre:"Gérer",
      url:"gestionlist"
    },
  ]

  return list;
}
}
