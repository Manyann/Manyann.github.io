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
  herosCode : string[] = [];

  allMobs$ : Promise<Mob[]> | undefined;
  mobs : Mob[] = [];
  mobsToSearch : Mob[] = [];
  autoCompleteMobs:any;

  addIntensite:number=0;
  addDegats:number=0;
  addMob:Mob | undefined;
  addMobNumber:number=1;
  tour:number=1;
  
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
    this.heroSession$.then(
      (heros) => {
        heros.forEach((hero) =>{
          let code :string  = hero['nom'];
          this.herosCode.push(code);
        });
      }
    );

    this.allMobs$ = mobsService.getAll();

    this.allMobs$.then((m) =>{
      this.mobsToSearch = m;
    })
  }

  nextTour(){
    this.tour++;
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
    this.herosService.addCritique(hero,this.addIntensite,this.tour)
    .then((trophes)=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Coup critique ajouté"
      });
      this.handleTrophes(trophes); 
    });
  }

  addEchecCritique(hero:string){
    this.herosService.addEchecCritique(hero,this.addIntensite,this.tour)
    .then((trophes)=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Echec critique ajouté"
      });
      this.handleTrophes(trophes); 
    });
  }

  addParadeCritique(hero:string){
    this.herosService.addParade(hero,this.addIntensite,this.tour)
    .then((trophes)=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Parade critique ajoutée"
      });
      this.handleTrophes(trophes); 
    });
  }

  addEntropique(hero:string){
    this.herosService.addEntropique(hero,this.addIntensite,this.tour)
    .then((trophes)=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Entropique ajoutée"
      });
      this.handleTrophes(trophes); 
    });
  }

  addEntropiqueMJ(){
    this.herosService.addEntropiqueMJ(this.addIntensite,this.tour)
    .then(()=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Entropique ajoutée"
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

  addParadeCritiqueMJ(){
    this.herosService.addParadeMJ(this.addIntensite)
    .then(()=> {
      this.addIntensite = 0;
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Parade critique ajoutée"
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
    this.herosService.updateDegatsDealt(hero,this.addDegats,this.tour)
    .then((trophes)=> {
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:`${this.addDegats} ajouté(s)`
      });
      this.handleTrophes(trophes); 
      this.addDegats = 0;
    });
  }

  removeDestin(hero:string){
    this.herosService.removeDestin(hero)
    .then((trophes)=> {
      this.messageService.add({
        severity:'info',
        closable:true,
        summary:"Point de destin retiré"
      });
      this.handleTrophes(trophes); 
    this.heroSession$ = this.herosService.getAllFromSession();
    });
  }

  generateMob(){
    debugger;
    let mobCode = this.addMob?.code ?? "";
    for (let i = 0; i < this.addMobNumber; i++) {
      let mob = this.mobsToSearch.find(x=>x.code == mobCode) ?? this.mobsToSearch[0];
      this.mobs.push(
        {
          index: this.mobs.length,
          armure : mob.armure,
          attaque : mob.attaque,
          code :mob.code,
          degats : mob.degats,
          experience : mob.experience,
          informations : mob.informations,
          libelle : mob.libelle,
          parade : mob.parade,
          vie : mob.vie,
          zone : mob.zone
        }
      );
    }
    
    this.addMobNumber = 1;
    this.addMob = undefined;
   }

  
  generateCustomMob(){ 
    this.mobs.push(
      {
        index: this.mobs.length,
        armure : 0,
        attaque : 0,
        code :"*-" +this.mobs.length,
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

  killMob(index:number,mobCode:string,mobLibelle:string){
    let id = mobCode.startsWith("*") ? mobLibelle :mobCode;
    this.herosCode.forEach((hero) =>{
      this.herosService.addMobCombattu(hero,id.toLowerCase(),1).then((trophes) => {
        this.handleTrophes(trophes); 
      });
    });

    this.mobs =  this.mobs.filter(x=>x.index != index);
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

  handleTrophes(trophes:string[]){
    console.log(trophes);
    for(let trophe of trophes.filter(x=>x != "")){
      console.log(trophe);
      this.messageService.add({
        severity:'success',
        icon:'pi-crown',
        closable:true,
        summary:trophe,
        life:7000
      });
    }
  }

}