import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';
import { JoueursService } from '../../app/services/joueur.service';
import { HerosService } from '../../app/services/hero.service';
import { TableModule } from 'primeng/table';
import { HeroPipe, HeroTypePipe, IsFromSessionPipe, ShouldBeEquipePipe } from './gestion.pipe';
import { DocumentData } from '@angular/fire/firestore';
import { ItemsService } from '../../app/services/items.service';
import { InputSwitchModule, InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SidebarModule } from 'primeng/sidebar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeroArmes, HeroArmures } from '../model/item';
import { ConfirmationService,Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-ingame',
  standalone: true,
  imports: [CommonModule, ToastModule, TabViewModule, SplitterModule , 
    TableModule, InputSwitchModule, FormsModule, AutoCompleteModule, DropdownModule, ButtonModule,
    ReactiveFormsModule,InputNumberModule, SidebarModule,MultiSelectModule,ConfirmDialogModule, 
    HeroPipe,HeroTypePipe, IsFromSessionPipe, ShouldBeEquipePipe],
    providers:[ConfirmationService, MessageService],
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
  armes$ : Promise<HeroArmes> | undefined;
  armures$ : Promise<HeroArmures> | undefined;
  herosTypes : DocumentData[] | undefined;
  herosMetiers : DocumentData[] | undefined;
  
  sidebarVisible : boolean;
  sidebarStuffVisible : boolean;
  sidebarStatsVisible : boolean;

  herosMetiersSelect : DocumentData[] | undefined;
  herosTypesSelect : DocumentData[] | undefined;
  herosArmuresSelect : DocumentData[] | undefined;
  herosArmesSelect : DocumentData[] | undefined;

  addJoueur:string="";
  addNom:string="";
  addOrigine:{code:string,libelle:string}={code:" ",libelle:" "};
  addMetier:{code:string,libelle:string}={code:" ",libelle:" "};
  addDestin:number=0;
  addOr:number=0;
  addNiveau:number=1;
  addhero:string="";
  addArmes : Array<string> = [];
  addArmures : Array<string> = [];
  addStatsHero:DocumentData[] = [];
  addKmParcourus: number=0;
  addOrs: number=0;


  confirmationService:ConfirmationService;

  constructor(
    joueursService:JoueursService,
    herosService:HerosService,
    armesService:ItemsService,
    confirmationService:ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ){

    this.confirmationService = confirmationService;

    this.sidebarVisible = false;
    this.sidebarStuffVisible = false;
    this.sidebarStatsVisible = false;

     joueursService.getAll().then(snap =>{
      this.joueurs = snap
    });
   
    this.allHeros$ = herosService.getAll();
    this.herosService = herosService;
    this.armesService = armesService;
    herosService.getAllOrigine().then(snap => {
      this.herosTypes = snap;
    });
    herosService.getAllMetier().then(snap => {
      this.herosMetiers = snap;
    });
    armesService.getAllArmes().then(snap => {
      this.herosArmesSelect = snap;
    });
    armesService.getAllArmures().then(snap => {
      this.herosArmuresSelect = snap;
    });
  }

  handleSelect(hero:string){
    this.addhero = hero;
    this.hero$ = this.herosService.getByName(hero);
    this.armes$ = this.armesService.getArmesByHero(hero);
    this.armures$ = this.armesService.getArmuresByHero(hero);
  }

  changeSession(e:InputSwitchOnChangeEvent, heroNom:string){
    e.originalEvent.stopPropagation();
    this.herosService.updateSession(heroNom,e.checked).then(()=>{
       this.allHeros$ = this.herosService.getAll();
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

  triggerAjouterStuff(){
    this.sidebarStuffVisible = true;
  }

  triggerAjouterStats(){
    this.sidebarStatsVisible = true;
  }

  goToCombat(){
    this.router.navigate(["/gestion/combat"]);
  }

  valider(){
    this.sidebarVisible = false;
    this.herosService.add(this.addJoueur,this.addNom,this.addOrigine.code,this.addMetier.code,this.addOr,this.addDestin,this.addNiveau).then((trophes) => {
      this.handleTrophes(trophes);
      this.allHeros$ = this.herosService.getAll();
    });
  }

  equipe(hero:string,armeCode:string){
    this.armesService.equipe(hero,armeCode).then((trophes) => {
      this.handleTrophes(trophes); 
      this.handleSelect(hero)
    });
  }

  desequipe(hero:string,armeCode:string){
    this.armesService.desequipe(hero,armeCode).then(() => this.handleSelect(hero));
  }

  supprimer(hero:string,armeCode:string){
    this.confirmationService.confirm(
      {
        message:"T\'es sur frérot ?",
        header: 'T\'es sur frérot ?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {this.armesService.removeFromHero(hero,armeCode).then(() => this.handleSelect(hero));},
      }
    )
  }

  equipeArmure(hero:string,armureCode:string){
    this.armesService.equipeArmure(hero,armureCode).then(() => this.handleSelect(hero));
  }

  desequipeArmure(hero:string,armureCode:string){
    this.armesService.desequipeArmure(hero,armureCode).then(() => this.handleSelect(hero));
  }

  supprimerArmure(hero:string,armureCode:string){
    this.confirmationService.confirm(
      {
        message:"T\'es sur frérot ?",
        header: 'T\'es sur frérot ?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {this.armesService.removeArmureFromHero(hero,armureCode).then(() => this.handleSelect(hero));},
      }
    )
  }

  validerStuff(){
    this.sidebarStuffVisible = false;
    this.addArmes.forEach((arme:any) =>{
      this.armesService.addToHero(this.addhero,arme['code'],false);
    });
    this.addArmures.forEach((armure:any) =>{
      this.armesService.addArmureToHero(this.addhero,armure['code'],false);
    });
    this.addArmes = [];
    this.addArmures = [];
    this.handleSelect(this.addhero);
  }

  addBonPoint(hero:string){
    this.herosService.addBonPoint(hero).then((trophes) => {
      this.handleTrophes(trophes); 
      this.handleSelect(hero)
    });}

  addMauvaisPoint(hero:string){
    this.herosService.addMauvaisPoint(hero).then((trophes) => {
      this.handleTrophes(trophes); 
      this.handleSelect(hero)
    });}

  addMort(hero:string){
    this.herosService.addMort(hero).then(() => this.handleSelect(this.addhero));
  }

  levelUp(hero:string){
    this.herosService.addNiveau(hero).then((trophes) => {
      this.handleTrophes(trophes); 
      this.handleSelect(hero)
    });}

  removeDestin(hero:string){
    this.herosService.removeDestin(hero).then((trophes) => {
      this.handleTrophes(trophes); 
      this.handleSelect(hero)
    });}

  validerStats(){
    this.sidebarStatsVisible = false ;
    this.addStatsHero.forEach(element => { 
      this.herosService.updateStats(element['nom'],this.addKmParcourus,this.addOrs).then((trophes) => 
        this.handleTrophes(trophes));
    });
    
    this.addStatsHero = [];
    this.addKmParcourus = 0 ;
    this.addOrs = 0;
    this.handleSelect(this.addhero);
  }

  handleTrophes(trophes:string[]){
    for(let trophe of trophes.filter(x=>x !== "")){
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