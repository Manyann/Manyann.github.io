import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:true,
  imports: [HomeComponent,RouterModule,MenubarModule],
})
export class AppComponent {
  items: Array<MenuItem>;
  constructor(){
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
    ]
  }
}
