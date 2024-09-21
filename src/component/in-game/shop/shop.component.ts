import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Ville, VilleHelper } from '../../model/villes';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule,AccordionModule ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  title = 'nhbk';
  villes: Array<Ville>;

  constructor(
    private router: Router){
    this.villes = VilleHelper.getAllVilles();
  }
  
public goToPage(url:string){
    this.router.navigate([url]);
}


}