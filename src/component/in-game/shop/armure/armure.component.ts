import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { BonusAdPipe, BonusArmurePipe, BonusForcePipe, BonusInfoPipe } from "../bonus.pipe";
import { OriginePipe, OriginePrixPipe } from "../origine.pipe";
import { PromotionPipe } from "../promotion.pipe";
import { Armure, Item, ItemHelper } from "../../../model/item";
import { Ville, VilleHelper } from "../../../model/villes";

@Component({
    selector: 'app-shop-armure',
    standalone: true,
    imports: [CommonModule,FormsModule,TableModule,ButtonModule,
      PromotionPipe,OriginePipe,OriginePrixPipe, BonusAdPipe, BonusForcePipe, BonusArmurePipe, BonusInfoPipe  ],
    templateUrl: './armure.component.html',
    styleUrl: './armure.component.css'
  })
  export class ArmureComponent {
    @Input() selectedVilleType:string = "capitale";
    
    villes: Array<Ville>;  
    items : Array<Armure>;
    
    constructor(){
      this.villes =  VilleHelper.getAll().sort((a,b)=> a.libelle.localeCompare(b.libelle));
      this.items = ItemHelper.getAllArmure();  
      }
  
      public filterItems(){
          let ville = this.villes.find(x=>x.region == "commun" 
            && x.type == this.selectedVilleType);
      
          this.items = ItemHelper.getAllArmure().filter(x=>this.estPresent(x, ville));
        }
      
        public estPresent(item:Item, ville:Ville|undefined):boolean{
          if(ville === undefined){
            return true;
          }
      
          let random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
          let handicap = item.basePourcentage;
          handicap -= ville.handicap
  
          if(handicap < 1 ){
            handicap = 1;
          }
          
          return random < handicap;
        }
        

      ngOnChanges() {
        this.filterItems();
      }
}  