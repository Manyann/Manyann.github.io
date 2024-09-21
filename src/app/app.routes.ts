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
    {path:"documentation/heros/sorts", component:SortComponent}
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
  