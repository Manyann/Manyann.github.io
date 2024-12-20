import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MetierComponent } from './metier/metier.component';
import { OrigineComponent } from "./origine/origine.component";
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [RouterOutlet, CommonModule,TabViewModule, ButtonModule, MetierComponent, OrigineComponent],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.css'
})
export class CreationComponent {
  title = 'nhbk';
  activeIndex:number=0;
  restrictionsMetier : Array<string> = [];
  constructor(){
  }

  public openMetiers(restriction:Array<string>):void{
    this.restrictionsMetier = restriction;
    this.activeIndex = 1;
  }

}