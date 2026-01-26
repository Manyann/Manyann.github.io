import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true,
  imports: [CommonModule ,RouterModule,MenubarModule,SidebarModule],
})
export class AppComponent {
  menuVisible = false;
  items: Array<MenuItem>;
  constructor(){
    this.items = [
      {
        label :"Accueil",
        routerLink:"/",
        icon:"pi pi-home"
      },
      {
        label :"Boutique",
        routerLink:"/in-game/shop",
        icon:"pi pi-shopping-cart"
      },
      {
        label :"Documentation",
        routerLink:"/documentation",
        icon:"pi pi-file-o"
      },
      {
        label :"Création",
        routerLink:"/in-game/creer",
        icon:"pi pi-user"
      },
      {
        label :"Gestion",
        routerLink:"/gestion",
        icon:"pi pi-cog"
      },
      {
        label :"Butin",
        routerLink:"/loot",
        icon:"pi pi-gift"
      },
      {
        label :"Statistiques",
        routerLink:"/statistique",
        icon:"pi pi-chart-pie"
      },
    ]
  }
}
