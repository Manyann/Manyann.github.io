import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { JoueursService } from '../../app/services/joueur.service';
import { CodeValeur } from '../model/code-libelle';
import { JoueurStatistique, StatistiquesService, Trophe } from '../../app/services/statistiques.service';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { TrophesPipe } from './trophe.pipe';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [CommonModule,TabViewModule,ChartModule,PanelModule,TrophesPipe],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistiqueComponent {
  title = 'nhbk';
  joueurs: any[] = [];

  dataOrigines : {} = {};
  dataMetiers : {} = {};
  dataArmes : {} = {};
  dataArmures : {} = {};
  dataCrits : {} = {};
  dataEchecCrits : {} = {};
  dataDegatsTotal : {} = {};
  dataDegatsMax : {} = {};
  dataOrs : {} = {};
  dataKms : {} = {};
  dataEnnemis : {} = {};

  //#region Options
  optionsBardataOrigines : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Origines",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataMetiers : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Metiers",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataArmes : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Armes",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataArmures : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Armures",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataCrits : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Coups Critiques",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataCritsdataEchecCrits : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Echecs Critiques",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataDegatsTotal : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Dégats Totals",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataDegatsMax : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Dégats Max",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataOrs : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"PO dépensés",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataKms : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Km parcourus",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }
  optionsBardataEnnemis : {} =  { 
      indexAxis: 'y', 
      plugins: {
      title: {
        text:"Ennemis rencontrés",
        display: true,
        fontSize: 16,
      },
      legend: {
        display: false, 
      },
    }
  }

  //#endregion Options

  statistiquesJoueur : JoueurStatistique | undefined;
  trophesJoueur : Trophe[] | undefined;

  constructor(
    joueursService:JoueursService,
    private statistiquesService:StatistiquesService
  ){
      
     joueursService.getAll().then(snap =>{
      this.joueurs = snap
    });

    statistiquesService.getOrigines("").then(snap =>{
      this.dataOrigines = { 
        title:"Origines",
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getMetier("").then(snap =>{
      this.dataMetiers = { 
        title:"Metiers",
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"],  
          }, 
        ], 
      };
    });
    statistiquesService.getArmes().then(snap =>{
      this.dataArmes = { 
        title:"Armes",
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getArmures().then(snap =>{
      this.dataArmures = { 
        title:"Armures",
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getCrits().then(snap =>{
      this.dataCrits = { 
        title:"Critiques",
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getEchecCrits().then(snap =>{
      this.dataEchecCrits = { 
        title:"Echecs Critiques",
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getDegatsTotaux().then(snap =>{
      this.dataDegatsTotal = { 
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getDegatsMax().then(snap =>{
      this.dataDegatsMax = { 
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getOrs().then(snap =>{
      this.dataOrs = { 
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>Math.abs(x.valeur)), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getKms().then(snap =>{
      this.dataKms = { 
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
    statistiquesService.getEnnemis().then(snap =>{
      this.dataEnnemis = { 
        labels: snap.map(x=>x.code), 
        datasets: [ 
          { 
            data: snap.map(x=>x.valeur), 
            backgroundColor: ["#FFD700",  
                              "#C0C0C0",  
                              "#cd7f32"], 
          }, 
        ], 
      };
    });
  }

  // async updateStats(joueur:string){
  //   console.log(joueur + "aaa");
  //   this.statistiquesJoueur = await this.statistiquesService.getJoueurStatistique(joueur);
  // }

  onTabChange(event: any) {
    const index = (event as { index: number }).index; // Cast $event to the correct type
    const joueur = this.joueurs[index-1];
    if (joueur) {
      this.updateStats(joueur.code);
      this.updateTrophes(joueur.code);
    }
  }
  
  async updateStats(joueurCode: string) {
    this.statistiquesJoueur = await this.statistiquesService.getJoueurStatistique(joueurCode);
  }

  async updateTrophes(joueurCode:string){
    this.trophesJoueur = await this.statistiquesService.getJoueurTrophes(joueurCode);
  }
  
  

}