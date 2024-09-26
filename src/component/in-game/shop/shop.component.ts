import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Ville, VilleHelper } from '../../model/villes';
import { FormsModule } from '@angular/forms';
import { Item,Categorie, ItemHelper } from '../../model/item';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PromotionPipe } from './promotion.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,FormsModule,TableModule,ButtonModule,PromotionPipe  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  title = 'nhbk';
  villes: Array<Ville>;
  items : Array<Item>;
  baseItems : Array<Item>;

  constructor(){
    this.villes =  VilleHelper.getAll().sort((a,b)=> a.libelle.localeCompare(b.libelle));
    this.baseItems = ItemHelper.getAll().filter(x=>this.estPresent(x,undefined));
    this.items = this.baseItems;
  }

  onChangedVille(event:Event):void{
    console.log("changed");
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    let ville = this.villes.find(x=>x.libelle===value);
    this.items = this.baseItems.filter(x=>this.estPresent(x,ville));
  }

  public estPresent(item:Item, ville:Ville|undefined):boolean{

    if(ville === undefined){
      return true;
    }

    let random = Math.floor(Math.random() * (100 - 0 + 1)) + 0
    let handicap = item.basePourcentage;
    handicap -= ville.handicap
    if(ville !== undefined && ville.region !== item.region){
      let regionalHandicap = ville.malus.find(x=>x.region === item.region)?.handicap ?? 0;
      handicap -= regionalHandicap;
    }
    
    return random < handicap;
  }

}