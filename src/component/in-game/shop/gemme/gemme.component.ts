import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { PromotionPipe } from "../promotion.pipe";
import { Item, ItemHelper, Gemme } from "../../../model/item";
import { Ville, VilleHelper } from "../../../model/villes";

@Component({
    selector: 'app-shop-gemme',
    standalone: true,
    imports: [CommonModule,FormsModule,TableModule,ButtonModule],
    templateUrl: './gemme.component.html',
    styleUrl: './gemme.component.css'
  })
  export class GemmeComponent {
    @Input() selectedVilleType:string = "capitale";
    
    villes: Array<Ville>;  
    items : Array<Gemme>;
    
    constructor(){
      this.villes =  VilleHelper.getAll().sort((a,b)=> a.libelle.localeCompare(b.libelle));
      this.items = ItemHelper.getAllGemmes();  
      }
}  