import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { PromotionPipe } from "../promotion.pipe";
import { Item, ItemHelper, Potion } from "../../../model/item";
import { Ville, VilleHelper } from "../../../model/villes";

@Component({
    selector: 'app-shop-potion',
    standalone: true,
    imports: [CommonModule,FormsModule,TableModule,ButtonModule,
      PromotionPipe ],
    templateUrl: './potion.component.html',
    styleUrl: './potion.component.css'
  })
  export class PotionComponent {
    @Input() selectedVilleType:string = "capitale";
    
    villes: Array<Ville>;  
    items : Array<Potion>;
    
    constructor(){
      this.villes =  VilleHelper.getAll().sort((a,b)=> a.libelle.localeCompare(b.libelle));
      this.items = ItemHelper.getAllPotion();  
      }
  
      public filterItems(){
          let ville = this.villes.find(x=>x.region == "commun" 
            && x.type == this.selectedVilleType);
      
          this.items = ItemHelper.getAllPotion().filter(x=>this.estPresent(x, ville));
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