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

  mobs : Mob[] = [];
  autoCompleteMobs:any;

  addIntensite:number=0;
  addDegats:number=0;
  addMob:string="";
  addMobNumber:number=0;
  
  sidebarVisible : boolean;

  constructor(
    private herosService:HerosService,
    private confirmationService:ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ){

    this.confirmationService = confirmationService;

    this.sidebarVisible = false;
   
    this.heroSession$ = herosService.getAllFromSession();

    this.mobs = [
        {
            armure:3,
            attaque:12,
            code:"a",
            degats:"1D+4",
            experience:22,
            informations:"",
            libelle:"Mob random",
            parade:10,
            vie:25
        },
        {
          armure:0,
          attaque:2,
          code:"a",
          degats:"1D-2",
          experience:1,
          informations:"1/4 chance de ce suicide par peur",
          libelle:"Mob nul",
          parade:0,
          vie:5
      }
    ];
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

  }

  
  generateCustomMob(){

  }

  
  search(event:AutoCompleteCompleteEvent){
    let filtered: any[] = [];
    let query = event.query;
    this.autoCompleteMobs = this.mobs ?? [];
    for (let i = 0; i < this.mobs.length; i++) {
      let type = this.mobs[i];
      if (type['libelle'].toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(type);
      }
    }

    this.autoCompleteMobs = filtered;
  }

}