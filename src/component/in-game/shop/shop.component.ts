import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Ville, VilleHelper } from '../../model/villes';
import { FormsModule } from '@angular/forms';
import { Item,Categorie, ItemHelper } from '../../model/item';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PromotionPipe } from './promotion.pipe';
import { CodeLibelle } from '../../model/code-libelle';
import { OriginePipe, OriginePrixPipe } from './origine.pipe';
import { BonusAdPipe } from './bonus.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,FormsModule,TableModule,ButtonModule,
    PromotionPipe,OriginePipe,OriginePrixPipe, BonusAdPipe  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  title = 'nhbk';
  villes: Array<Ville>;
  villesType : Array<CodeLibelle>;
  targets : Array<CodeLibelle>;
  zones : Array<CodeLibelle>;
  items : Array<Item>;
  baseItems : Array<Item>;
  selectedVilleType : string;
  selectedTarget : string;
  selectedZone : string;

  constructor(){
    this.villes =  VilleHelper.getAll().sort((a,b)=> a.libelle.localeCompare(b.libelle));
    this.baseItems = ItemHelper.getAll();
    this.items = this.baseItems;
    this.targets = this.buildTargets();
    this.zones = this.buildZones();
    this.villesType = this.buildVillesType();
    this.selectedVilleType = "";
    this.selectedTarget = "";
    this.selectedZone = "";
  }

  buildTargets(): Array<CodeLibelle>{
    return [
      {
        code:"commun",
        libelle:"Commun"
      },
      {
        code:"elfe",
        libelle:"Elfes"
      },
      {
        code:"nain",
        libelle:"Nains"
      },
      {
        code:"samurai",
        libelle:"Samurais"
      },
    ];
  }

  buildZones(): Array<CodeLibelle>{
    return [
      {
        code:"commun",
        libelle:"Commun"
      },
      {
        code:"nord",
        libelle:"Grand Nord"
      },
      {
        code:"desert",
        libelle:"Désert"
      },
      {
        code:"sud",
        libelle:"Iles du sud"
      },
      {
        code:"est",
        libelle:"Est"
      },
    ];
  }

  buildVillesType(): Array<CodeLibelle>{
    return [
      {
        code:"capitale",
        libelle:"Capitale"
      },
      {
        code:"ville-grande",
        libelle:"Grande ville"
      },
      {
        code:"ville-moyenne",
        libelle:"Ville Moyenne"
      },
      {
        code:"ville-petite",
        libelle:"Petite Ville"
      },
      {
        code:"bourgade",
        libelle:"Bourgade, Hameaux, ..."
      },
      {
        code:"campement",
        libelle:"Campement, Groupement rustique, ..."
      },
    ];
  }

  onChangedVille(event:Event):void{
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedVilleType = value;
    this.filterItems();
  }

  onChangedRegion(event:Event):void{
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedZone = value;
  }

  onChangedTarget(event:Event):void{
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.selectedTarget = value;
  }

  public filterItems(){

    let ville = this.villes.find(x=>x.region == this.selectedZone 
      && x.type == this.selectedVilleType);

    this.items = this.baseItems.filter(x=>this.estPresent(x, ville));
  }

  public estPresent(item:Item, ville:Ville|undefined):boolean{

    if(ville === undefined){
      return true;
    }

    let random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    let handicap = item.basePourcentage;
    handicap -= ville.handicap
    // if(ville !== undefined && ville.region !== item.region){
    //   let regionalHandicap = ville.malus.find(x=>x.region === item.region)?.handicap ?? 0;
    //   handicap -= regionalHandicap;
    // }
    // if(this.selectedTarget != "" && this.selectedTarget != item.origine){
    //   handicap -= 10;
    // }
    
    return random < handicap;
  }

}