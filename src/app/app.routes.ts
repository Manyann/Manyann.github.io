import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocumentationComponent } from '../component/documentation/documentation.component';
import { BestiaireComponent } from '../component/documentation/bestiaire/bestiaire.component';
import { AutreComponent } from '../component/documentation/autre/autre.component';
import { HeroComponent } from '../component/documentation/hero/hero.component';
import { EquipementComponent } from '../component/documentation/equipement/equipement.component';
import { IngredientComponent } from '../component/documentation/equipement/ingredient/ingredient.component';
import { SortComponent } from '../component/documentation/hero/sort/sort.component';
import { InGameComponent } from '../component/in-game/in-game.component';
import { ShopComponent } from '../component/in-game/shop/shop.component';
import { CreationComponent } from '../component/in-game/creation/creation.component';
import { GestionComponent } from '../component/gestion/gestion.component';
import { CombatComponent } from '../component/gestion/combat/combat.component';
import { StatistiqueComponent } from '../component/statistique/statistique.component';
import { LootboxComponent } from '../component/in-game/lootbox/lootbox.component';
import { CompetencesComponent } from '../component/competence/competence.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Accueil' },
  {
    path: 'documentation',
    pathMatch: 'full',
    component: DocumentationComponent,
    title: 'Document',
  },
  { path: 'documentation/autres', component: AutreComponent, title: 'Autre' },
  {
    path: 'documentation/bestiaires',
    component: BestiaireComponent,
    title: 'Bestiaire',
  },
  {
    path: 'documentation/equipements',
    component: EquipementComponent,
    title: 'Equipement',
  },
  {
    path: 'documentation/equipements/ingredients',
    component: IngredientComponent,
    title: 'Ingrédient',
  },
  { path: 'documentation/heros', component: HeroComponent, title: 'Heros' },
  { path: 'documentation/heros/sorts', component: SortComponent },
  {
    path: 'in-game',
    pathMatch: 'full',
    component: InGameComponent,
  },
  { path: 'in-game/shop', component: ShopComponent, title: 'Shop' },
  { path: 'in-game/creer', component: CreationComponent, title: 'Création' },
  {
    path: 'gestion',
    pathMatch: 'full',
    component: GestionComponent,
  },
  { path: 'gestion/combat', component: CombatComponent, title: 'Combat' },
  {
    path: 'statistique',
    pathMatch: 'full',
    component: StatistiqueComponent,
    title: 'Statistique',
  },
  { path: 'loot', component: LootboxComponent, title: 'Butin' },
  {
    path: 'competences',
    component: CompetencesComponent,
    title: 'Compétences',
  },
];
