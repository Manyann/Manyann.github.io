import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CreationHelper, Metier, Origine } from '../../model/creation';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ToastModule, TableModule,ButtonModule],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css'
})
export class CreationComponent {
  title = 'nhbk';
  origines: Array<Origine>;
  metiers: Array<Metier>;
  metiersBase: Array<Metier>;
  onglet: string;
  isMetier:boolean;
  isOrigine:boolean;

  constructor(){
    this.origines = CreationHelper.getAllOrigine();
    this.metiersBase = CreationHelper.getAllMetier();
    this.metiers = this.metiersBase;
    this.onglet = "origine"
    this.isOrigine = true;
    this.isMetier = false;
  }

  public setOnglet(onglet:string):void{
    this.onglet = onglet;
    this.isOrigine = onglet == "origine";
    this.isMetier = onglet == "metier";
    if(this.isOrigine){
    this.metiers = this.metiersBase;
    }
    this.resetOpen();
  }

  public resetOpen() : void{
    this.origines.forEach((x)=>{x.isOpen = false;})
    this.metiers.forEach((x)=>{x.isOpen = false;})
  }

  public openOrigine(origine:string):void{
    this.origines.filter(x=>x.nom == origine)[0].isOpen = 
    !this.origines.filter(x=>x.nom == origine)[0].isOpen;
  }

  public openMetier(metier:string):void{
    this.metiers.filter(x=>x.shortCode == metier)[0].isOpen = 
    !this.metiers.filter(x=>x.shortCode == metier)[0].isOpen;
  }
  
  public filterAndOpenMetier(forbidden:Array<string>):void{
    this.metiers = this.metiersBase.filter(x => !forbidden.includes(x.shortCode));
    this.setOnglet("metier");
  }

}