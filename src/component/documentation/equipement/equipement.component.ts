import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from '../../model/card';
import { CardListComponent } from '../../common/card-list/card-list.component';

@Component({
  selector: 'app-equipement',
  standalone: true,
  imports: [RouterOutlet,CommonModule,CardListComponent],
  templateUrl: './equipement.component.html',
  styleUrl: './equipement.component.css'
})
export class EquipementComponent {
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
      image:"assets/img/card/equipement/arme.PNG",
      titre:"Armes",
      url:"assets/img/pdfs/equipement/arme.pdf"
    },
    {
      image:"assets/img/card/equipement/armure.PNG",
      titre:"Armures",
      url:"assets/img/pdfs/equipement/tableau-protections-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/equipement/chapeau.PNG",
      titre:"Chapeaux",
      url:"assets/img/pdfs/equipement/tableau-chapeaux-couvrechefs-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/equipement/gemme.PNG",
      titre:"Gemmes",
      url:"assets/img/pdfs/equipement/gemmes-pierres-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/equipement/ingredient.PNG",
      titre:"Ingredients",
      url:"assets/img/pdfs/equipement/tableau-ingredients-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/equipement/instrument.PNG",
      titre:"Instruments",
      url:"assets/img/pdfs/equipement/instruments-naheulbeuk-jdr(licoy).pdf"
    },
    {
      image:"assets/img/card/equipement/livre.PNG",
      titre:"Livres",
      url:"assets/img/pdfs/equipement/tableau-livres-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/equipement/materiel.PNG",
      titre:"Materiels",
      url:"assets/img/pdfs/equipement/tableau-materiel-naheulbeuk-jdr.pdf"
    },
    {
      image:"assets/img/card/equipement/objet-exclusif.PNG",
      titre:"Objets exclusif",
      url:"assets/img/pdfs/equipement/objets-exclusifs-naheulbeuk-jdr(licoy).pdf"
    },
  ]

  return list;
}

}
