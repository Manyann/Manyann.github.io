import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MobsService } from './services/mob.service';
import { ItemsService } from './services/items.service';
import { HerosService } from './services/hero.service';
import { StatistiquesService } from './services/statistiques.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true,
  imports: [HomeComponent,RouterModule,MenubarModule],
})
export class AppComponent {
  items: Array<MenuItem>;
  constructor(itemsService:MobsService){
    //  itemsService.clean();
    this.items = [
      {
        label :"Accueil",
        url:"/",
        icon:"pi pi-home"
      },
      {
        label :"Shop",
        url:"/in-game/shop",
        icon:"pi pi-shopping-cart"
      },
      {
        label :"Documentation",
        url:"/documentation",
        icon:"pi pi-file-o"
      },
      {
        label :"Bestiaire",
        url:"/documentation/bestiaires",
        icon:"pi pi-bullseye"
      },
      {
        label :"Création",
        url:"/in-game/creer",
        icon:"pi pi-user"
      },
      {
        label :"Statistiques",
        url:"/statistique",
        icon:"pi pi-chart-pie"
      },
      {
        label :"Gestion",
        url:"/gestion",
        icon:"pi pi-cog"
      },
    ]
  }
}
