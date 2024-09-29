import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Hero, HeroHelper, HeroType } from '../../model/hero';
import { TypeHeroPipe } from './type-hero.pipe';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [RouterOutlet,CommonModule,TableModule,TypeHeroPipe,ButtonModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {

  heros : Array<Hero>;
  herosType : Array<HeroType>;
  constructor(){
    this.heros = HeroHelper.getAllHero();
    this.herosType = HeroHelper.getAllHeroType();
  }

}
