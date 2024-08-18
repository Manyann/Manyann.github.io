import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BestiaireComponent } from '../component/bestiaire/bestiaire.component';
import { EquipementComponent } from '../component/equipement/equipement.component';
import { AutreComponent } from '../component/autre/autre.component';
import { TeleportationComponent } from '../component/teleportation/teleportation.component';

export const routes: Routes = [
    { path: '',component: HomeComponent,title: 'Home page'},
    { path: 'bestiaire', component: BestiaireComponent },
    { path: 'equipement', component: EquipementComponent },
    { path: 'autre', component: AutreComponent },
    { path: 'teleportation', component: TeleportationComponent },
];
