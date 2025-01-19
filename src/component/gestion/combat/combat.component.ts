import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerosService } from '../../../app/services/hero.service';
import { DocumentData } from '@angular/fire/firestore';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Mob } from '../../model/ennemi';
import { MobsService } from '../../../app/services/mob.service';

@Component({
  selector: 'app-combat',
  standalone: true,
  imports: [PanelModule, ToastModule,TableModule, CommonModule,AutoCompleteModule,ButtonModule,InputNumberModule,FormsModule],
  providers:[ConfirmationService, MessageService],
  templateUrl: './combat.component.html',
  styleUrl: './combat.component.css'
})
export class CombatComponent {
  title = 'nhbk';
  heroSession$ : Promise<DocumentData[]> | undefined;

  allMobs$ : Promise<Mob[]> | undefined;
  mobs : Mob[] = [];
  mobsToSearch : Mob[] = [];
  autoCompleteMobs:any;

  addIntensite:number=0;
  addDegats:number=0;
  addMob:Mob | undefined;
  addMobNumber:number=1;
  
  sidebarVisible : boolean;

  constructor(
    private herosService:HerosService,
    private mobsService: MobsService,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ){

    this.confirmationService = confirmationService;

    this.sidebarVisible = false;
   
    this.heroSession$ = herosService.getAllFromSession();

    this.allMobs$ = mobsService.getAll();

    this.allMobs$.then((m) =>{
      this.mobsToSearch = m;
    })
  }


  addMort(hero:string){
    this.herosService.addMort(hero)
    .then(()=> {
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Mort ajoutée"
      });
    });
  }

  addCoupCritique(hero:string){
    this.herosService.addCritique(hero,this.addIntensite)
    .then(()=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Coup critique ajouté"
      });
    });
  }

  addEchecCritique(hero:string){
    this.herosService.addEchecCritique(hero,this.addIntensite)
    .then(()=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Echec critique ajouté"
      });
    });
  }

  
  addCoupCritiqueMJ(){
    this.herosService.addCritiqueMJ(this.addIntensite)
    .then(()=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Coup critique ajouté"
      });
    });
  }

  addEchecCritiqueMJ(){
    this.herosService.addEchecCritiqueMJ(this.addIntensite)
    .then(()=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Echec critique ajouté"
      });
    });
  }

  updateDegatsDealt(hero:string){
    this.herosService.updateDegatsDealt(hero,this.addDegats)
    .then(()=> {
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:`${this.addDegats} ajouté(s)`
      });
      this.addDegats = 0;
    });
  }

  removeDestin(hero:string){
    this.herosService.removeDestin(hero)
    .then(()=> {
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Point de destin retiré"
      });
      
    this.heroSession$ = this.herosService.getAllFromSession();
    });
  }

  generateMob(){
    let mobCode = this.addMob?.code ?? "";
    let nombre = this.addMobNumber;
    for (let i = 0; i < this.addMobNumber; i++) {
      this.mobs.push(this.mobsToSearch.find(x=>x.code == mobCode) ?? this.mobsToSearch[0]);
    }
    this.heroSession$?.then((hero) =>{
      this.herosService.addMobCombattu(hero[0]['nom'] as string,mobCode,nombre);
    })
    this.addMobNumber = 1;
    this.addMob = undefined;
   }

  
  generateCustomMob(){ 
    this.mobs.push(
      {
        armure : 0,
        attaque : 0,
        code : "*",
        degats : "dégats",
        experience : 0,
        informations : "infos",
        libelle : "nom",
        parade : 0,
        vie : 0,
        zone : "*"
      }
    );
  }

  
  search(event:AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    this.autoCompleteMobs = this.mobsToSearch ?? [];
    for (let i = 0; i < this.mobsToSearch.length; i++) {
      let type = this.mobsToSearch[i];
      if (type['libelle'].toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(type);
      }
    }

    this.autoCompleteMobs = filtered;
  }

}