import { Component, Input, OnInit } from '@angular/core';
import { DemonologueComponent } from './demonologue/demonologue.component';
import { WalkyrieComponent } from './walkyrie/walkyrie.component';
import { ActivatedRoute } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ForgeurRunesComponent } from './forgeur-de-runes/forgeur-de-runes.component';
import { IngenieurComponent } from './ingenieur/ingenieur.component';
import { PretreComponent } from './pretre/pretre.component';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [
    PanelModule,
    TabViewModule,
    WalkyrieComponent,
    DemonologueComponent,
    ForgeurRunesComponent,
    IngenieurComponent,
    PretreComponent,
  ],
  templateUrl: './competence.component.html',
  styleUrl: './competence.component.css',
})
export class CompetencesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  tabIndexMap: Record<string, number> = {
    walkyrie: 0,
    demonologue: 1,
    forgeurDeRunes: 2,
  };

  activeIndex = 0;

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment && this.tabIndexMap[fragment] !== undefined) {
        this.activeIndex = this.tabIndexMap[fragment];
      }
    });
  }
}
