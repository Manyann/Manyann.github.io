import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';
import { JoueursService } from '../../app/services/joueur.service';
import { HerosService } from '../../app/services/hero.service';
import { TableModule } from 'primeng/table';
import { HeroPipe } from './gestion.pipe';
import { DocumentData } from '@angular/fire/firestore';
import { ItemsService } from '../../app/services/items.service';

@Component({
  selector: 'app-ingame',
  standalone: true,
  imports: [CommonModule, TabViewModule, SplitterModule , TableModule,HeroPipe],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {
  title = 'nhbk';
  joueurs: any[] = [];
  heros: any[] = [];
  herosService:HerosService;
  armesService: ItemsService;
  hero$ : Promise<DocumentData[]> | undefined;
  armes$ : Promise<DocumentData[]> | undefined;

  constructor(
    joueursService:JoueursService,
    herosService:HerosService,
    armesService:ItemsService
  ){
     joueursService.getAll().then(snap =>{
      this.joueurs = snap
    });

    herosService.getAll().then(snap =>{
     this.heros = snap
   });
    this.herosService = herosService;
    this.armesService = armesService;
  }

  handleSelect(hero:string){
    console.log(hero);
    this.hero$ = this.herosService.getByName(hero);
    this.armes$ = this.armesService.getByHero(hero);
  }

}