import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BestiaireComponent } from '../component/bestiaire/bestiaire.component';
import { EquipementComponent } from '../component/equipement/equipement.component';

export const routes: Routes = [
    { path: '',component: HomeComponent,title: 'Home page'},
    { path: 'bestiaire', component: BestiaireComponent },
    { path: 'equipement', component: EquipementComponent },
];
