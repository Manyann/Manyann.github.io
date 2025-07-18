import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocumentationComponent } from '../component/documentation/documentation.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BestiaireComponent } from '../component/documentation/bestiaire/bestiaire.component';
import { AutreComponent } from '../component/documentation/autre/autre.component';
import { HeroComponent } from '../component/documentation/hero/hero.component';
import { EquipementComponent } from '../component/documentation/equipement/equipement.component';
import { SortComponent } from '../component/documentation/hero/sort/sort.component';
import { InGameComponent } from '../component/in-game/in-game.component';
import { TeleportationComponent } from '../component/in-game/teleportation/teleportation.component';
import { ShopComponent } from '../component/in-game/shop/shop.component';
import { LootComponent } from '../component/in-game/loot/loot.component';
import { CreationComponent } from '../component/in-game/creation/creation.component';
import { GestionComponent } from '../component/gestion/gestion.component';
import { CombatComponent } from '../component/gestion/combat/combat.component';
import { StatistiqueComponent } from '../component/statistique/statistique.component';
import { LootboxComponent } from '../component/in-game/lootbox/lootbox.component';

export const routes: Routes = [
    { path: '',component: HomeComponent,title: 'Home page'},
    { 
        path: 'documentation',
        pathMatch:"full",
        component:DocumentationComponent,
    },
    {path:"documentation/autres", component:AutreComponent},
    {path:"documentation/bestiaires", component:BestiaireComponent},
    {path:"documentation/equipements", component:EquipementComponent},
    {path:"documentation/heros", component:HeroComponent},
    {path:"documentation/heros/sorts", component:SortComponent},
    { 
        path: 'in-game',
        pathMatch:"full",
        component:InGameComponent,
    },
    {path:"in-game/teleportation", component:TeleportationComponent},
    {path:"in-game/shop", component:ShopComponent},
    {path:"in-game/loot", component:LootComponent},
    {path:"in-game/creer", component:CreationComponent},
    { 
        path: 'gestion',
        pathMatch:"full",
        component:GestionComponent,
    },
    {path:"gestion/combat", component:CombatComponent},
    {
        path:"statistique",
        pathMatch:"full",
        component:StatistiqueComponent
    },
    {path:"loot", component:LootboxComponent},
];


@NgModule({
    declarations: [],
    imports: [
      BrowserModule,
      RouterModule ,
      RouterModule.forRoot(routes),
      AppComponent
    ],
    providers: [Router],
    exports: [RouterModule]
  })
  export class AppModule { }
  