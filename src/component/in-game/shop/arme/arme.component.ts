import { CommonModule } from "@angular/common";
import { Component, Input, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { BonusAdPipe, BonusDegatPipe, BonusForcePipe, BonusInfoPipe, BonusRupturePipe } from "../bonus.pipe";
import { OriginePipe, OriginePrixPipe } from "../origine.pipe";
import { PromotionPipe } from "../promotion.pipe";
import { Ville, VilleHelper } from "../../../model/villes";
import { Arme, Item, ItemHelper } from "../../../model/item";
import { ItemsService } from "../../../../app/services/items.service";

@Component({
    selector: 'app-shop-arme',
    standalone: true,
    imports: [CommonModule,FormsModule,TableModule,ButtonModule,
      PromotionPipe,OriginePipe,OriginePrixPipe, BonusAdPipe, BonusForcePipe, BonusDegatPipe, BonusRupturePipe, BonusInfoPipe  ],
    templateUrl: './arme.component.html',
    styleUrl: './arme.component.css'
  })


  export class ArmeComponent {

    @Input() selectedVilleType:string = "capitale";
    
  villes: Array<Ville>;  
  items : Array<Arme>;
  
  constructor(itemsService:ItemsService){
    this.villes =  VilleHelper.getAll().sort((a,b)=> a.libelle.localeCompare(b.libelle));
    this.items = ItemHelper.getAll(); 
    }

    public filterItems(){
        let ville = this.villes.find(x=>x.region == "commun" 
          && x.type == this.selectedVilleType);
    
        this.items = ItemHelper.getAll().filter(x=>this.estPresent(x, ville));
      }
    
      public estPresent(item:Item, ville:Ville|undefined):boolean{
        if(ville === undefined){
          return true;
        }
    
        let random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
        let handicap = item.basePourcentage;
        handicap -= ville.handicap

        if(handicap < 2 ){
          handicap = 2;
        }
        
        return random < handicap;
      }

      ngOnChanges() {
        this.filterItems();
      }
}  