import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';
import { JoueursService } from '../../app/services/joueur.service';
import { HerosService } from '../../app/services/hero.service';
import { TableModule } from 'primeng/table';
import { HeroPipe, HeroTypePipe, IsFromSessionPipe } from './gestion.pipe';
import { DocumentData } from '@angular/fire/firestore';
import { ItemsService } from '../../app/services/items.service';
import { InputSwitchModule, InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-ingame',
  standalone: true,
  imports: [CommonModule, TabViewModule, SplitterModule , 
    TableModule, InputSwitchModule, FormsModule, AutoCompleteModule, DropdownModule, ButtonModule,
    ReactiveFormsModule,InputNumberModule, SidebarModule,
    HeroPipe,HeroTypePipe, IsFromSessionPipe],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {
  title = 'nhbk';
  joueurs: any[] = [];
  allHeros$: Promise<DocumentData[]> | undefined;
  herosService:HerosService;
  armesService: ItemsService;
  hero$ : Promise<DocumentData[]> | undefined;
  armes$ : Promise<DocumentData[]> | undefined;
  herosTypes : DocumentData[] | undefined;
  herosTypesSelect : DocumentData[] | undefined;
  herosMetiers : DocumentData[] | undefined;
  herosMetiersSelect : DocumentData[] | undefined;
  sidebarVisible : boolean;

  addJoueur:string="";
  addNom:string="";
  addOrigine:{code:string,libelle:string}={code:" ",libelle:" "};
  addMetier:{code:string,libelle:string}={code:" ",libelle:" "};
  addDestin:number=0;
  addOr:number=0;
  addNiveau:number=1;

  constructor(
    joueursService:JoueursService,
    herosService:HerosService,
    armesService:ItemsService
  ){
    this.sidebarVisible = false;
     joueursService.getAll().then(snap =>{
      this.joueurs = snap
    });

   
     this.allHeros$ = herosService.getAll();
    this.herosService = herosService;
    this.armesService = armesService;
    herosService.getAllOrigine().then(snap => {
      this.herosTypes = snap;
    })
    herosService.getAllMetier().then(snap => {
      this.herosMetiers = snap;
    })
  }

  handleSelect(hero:string){
    this.hero$ = this.herosService.getByName(hero);
    this.armes$ = this.armesService.getArmesByHero(hero);
  }

  changeSession(e:InputSwitchOnChangeEvent, heroNom:string){
    e.originalEvent.stopPropagation();
    this.herosService.updateSession(heroNom,e.checked).then(()=>{
      // this.allHeros$ = this.herosService.getAll();
    });
  }

  search(event:AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    this.herosTypesSelect = this.herosTypes ?? [];
    for (let i = 0; i < this.herosTypesSelect.length; i++) {
      let type = this.herosTypesSelect[i];
      if (type['libelle'].toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(type);
      }
    }

    this.herosTypesSelect = filtered;
  }

  
  searchMetier(event:AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    this.herosMetiersSelect = this.herosMetiers ?? [];
    for (let i = 0; i < this.herosMetiersSelect.length; i++) {
      let type = this.herosMetiersSelect[i];
      if (type['libelle'].toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(type);
      }
    }

    this.herosMetiersSelect = filtered;
  }

  triggerAjouter(){
    this.sidebarVisible = true;
  }

  valider(){
    this.herosService.add(this.addJoueur,this.addNom,this.addOrigine.code,this.addMetier.code,this.addOr,this.addDestin,this.addNiveau).then(() => {
      this.allHeros$ = this.herosService.getAll();
    });
  }

}