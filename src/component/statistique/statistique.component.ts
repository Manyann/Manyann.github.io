import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { JoueursService } from '../../app/services/joueur.service';
import { JoueurStatistique, StatistiquesService, Trophe } from '../../app/services/statistiques.service';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { TrophesPipe } from './trophe.pipe';
import { UIChart } from 'primeng/chart'

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [CommonModule, TabViewModule, ChartModule, PanelModule, TrophesPipe],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css',
})
export class StatistiqueComponent {
  title = 'nhbk';
  joueurs: any[] = [];
  
  // État de chargement
  isLoading = true;
  isLoadingPlayerStatsCrit = true;
  isLoadingPlayerStatsCombat = true;
  isLoadingPlayerStatsTrivia = true;
  chartsReady = false;

  dataOrigines: { title: string, labels: string[], datasets: any[] } = { title: "", labels: [], datasets: [] };
  dataMetiers: { title: string, labels: string[], datasets: any[] } = { title: "", labels: [], datasets: [] };
  dataCrits: { title: string, labels: string[], datasets: any[] } = { title: "", labels: [], datasets: [] };
  dataEchecCrits: { title: string, labels: string[], datasets: any[] } = { title: "", labels: [], datasets: [] };
  dataDegatsTotal: { title: string, labels: string[], datasets: any[] } = { title: "", labels: [], datasets: [] };
  dataDegatsMax: { title: string, labels: string[], datasets: any[] } = { title: "", labels: [], datasets: [] };
  dataEnnemis: { title: string, labels: string[], datasets: any[] } = { title: "", labels: [], datasets: [] };
  dataRapports: { title: string, labels: string[], datasets: any[] } = { title: "", labels: [], datasets: [] };

  //#region Options
  optionsBardataOrigines: {} = {};
  optionsBardataMetiers: {} = {};
  optionsBardataCrits: {} = {};
  optionsBardataCritsdataEchecCrits: {} = {};
  optionsBardataDegatsTotal: {} = {};
  optionsBardataDegatsMax: {} = {};
  optionsBardataEnnemis: {} = {};
  optionsBardataRapports: {} = {};
  //#endregion Options

  statistiquesJoueurCritiques: JoueurStatistique | undefined;
  statistiquesJoueurCombat: JoueurStatistique | undefined;
  statistiquesJoueurTrivia: JoueurStatistique | undefined;
  trophesJoueur: Trophe[] | undefined;

  expandedChart: string | null = null;

  @ViewChildren('chart') chartsRef!: QueryList<UIChart>;

  constructor(
    private joueursService: JoueursService,
    private statistiquesService: StatistiquesService
  ) {
    this.initializeComponent();
  }

  async initializeComponent() {
    try {
      this.isLoading = true;
      
      // Charger les joueurs
      this.joueurs = await this.joueursService.getAll();
      
      // Obtenir les options des charts
      this.getOptions();
      
      // Charger toutes les données de manière séquentielle
      await this.getDatas(true, 3);
      
      // Attendre un peu pour s'assurer que tout est prêt
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Marquer comme prêt
      this.chartsReady = true;
      this.isLoading = false;
      
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      this.isLoading = false;
      this.chartsReady = false;
    }
  }

  getBackgroundColorChart(onlyTop: boolean = false) {
    return onlyTop
      ? ["#FFD700", "#C0C0C0", "#cd7f32"]
      : ["#FFFFFF"];
  }

  getDataSet(values: number[], onlyTop: boolean) {
    return [
      {
        data: values,
        backgroundColor: this.getBackgroundColorChart(onlyTop),
      },
    ];
  }

  async getDatas(onlyTop: boolean = false, slice: number | null = null) {
    try {
      // Utiliser Promise.all pour charger toutes les données en parallèle
      const [
        originesData,
        metiersData,
        critsData,
        echecCritsData,
        degatsTotalData,
        degatsMaxData,
        ennemisData
      ] = await Promise.all([
        this.statistiquesService.getOrigines("", slice),
        this.statistiquesService.getMetier("", slice),
        this.statistiquesService.getCrits(slice),
        this.statistiquesService.getEchecCrits(slice),
        this.statistiquesService.getDegatsTotaux(slice),
        this.statistiquesService.getDegatsMax(slice),
        this.statistiquesService.getEnnemis(slice),
      ]);

      // Assigner les données
      this.dataOrigines = {
        title: "Origines",
        labels: originesData.map(x => x.code),
        datasets: this.getDataSet(originesData.map(x => x.valeur), onlyTop)
      };

      this.dataMetiers = {
        title: "Metiers",
        labels: metiersData.map(x => x.code),
        datasets: this.getDataSet(metiersData.map(x => x.valeur), onlyTop)
      };

      this.dataCrits = {
        title: "Critiques",
        labels: critsData?.map(x => x.code) ?? [],
        datasets: this.getDataSet(critsData.map(x => x.valeur), onlyTop)
      };

      this.dataEchecCrits = {
        title: "Echecs Critiques / Entropiques",
        labels: echecCritsData?.map(x => x.code) ?? [],
        datasets: this.getDataSet(echecCritsData.map(x => x.valeur), onlyTop)
      };

      this.dataDegatsTotal = {
        title: "Degats totaux",
        labels: degatsTotalData?.map(x => x.code) ?? [],
        datasets: this.getDataSet(degatsTotalData.map(x => x.valeur), onlyTop)
      };

      this.dataDegatsMax = {
        title: "Dégats Max",
        labels: degatsMaxData?.map(x => x.code) ?? [],
        datasets: this.getDataSet(degatsMaxData.map(x => x.valeur), onlyTop)
      };

      this.dataEnnemis = {
        title: "Ennemis",
        labels: ennemisData?.map(x => x.code) ?? [],
        datasets: this.getDataSet(ennemisData.map(x => x.valeur), onlyTop)
      };

     
  // Chart miroir
  const echecsMiroirData = await this.statistiquesService.getRapportCritiquesEchecs(slice);
  this.dataRapports = echecsMiroirData;
  this.optionsBardataRapports = this.getChartOptionsMiroir('Échecs vs Critiques');

      // Les charts se mettront à jour automatiquement grâce au data binding

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  }

  updateChartsDisplay() {
    if (this.chartsRef) {
      this.chartsRef.forEach(chart => {
        if (chart.chart) {
          chart.chart.update();
        }
      });
    }
  }

  getOptions() {
    this.optionsBardataOrigines = this.getChartOptions('Origines');
    this.optionsBardataMetiers = this.getChartOptions('Métiers');
    this.optionsBardataCrits = this.getChartOptions('Coups Critiques');
    this.optionsBardataCritsdataEchecCrits = this.getChartOptions('Échecs Critiques');
    this.optionsBardataDegatsTotal = this.getChartOptions('Dégâts Totaux');
    this.optionsBardataDegatsMax = this.getChartOptions('Dégâts Max');
    this.optionsBardataEnnemis = this.getChartOptions('Ennemis rencontrés');
    this.optionsBardataRapports = this.getChartOptions('Rapport Critiques / Echecs');
  }

  getChartOptions(title: string): any {
    return {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          text: title,
          display: true,
          font: {
            size: 16
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          enabled: true
        }
      },
      scales: {
        x: {
          ticks: { color: '#e0e0e0' },
          grid: { color: '#333' }
        },
        y: {
          ticks: { color: '#e0e0e0' },
          grid: { color: '#333' }
        }
      }
    };
  }

  // Options spéciales pour le chart miroir
getChartOptionsMiroir(title: string): any {
  return {
  indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
  plugins: {
    tooltip: {
        title: {
          text: title,
          display: true,
          font: {
            size: 16
          }
        },
        legend: {
          display: false
        },
      callbacks: {
        label: (c: { raw: any; dataset: { label: any; }; }) => {          
          const value = Number(c.raw);
          return `${c.dataset.label}: ${Math.abs(value)}`;
        },
      },
    },
  },
      scales: {
        x: {
          ticks: { color: '#e0e0e0' },
          grid: { color: '#333' }
        },
        y: {
          ticks: { color: '#e0e0e0' },
          grid: { color: '#333' }
        }
      }
};
}

  async toggleChart(chartKey: string): Promise<void> {
    let isToggleOff = this.expandedChart === chartKey;
    await this.getDatas(isToggleOff, isToggleOff ? 3 : null);
    this.expandedChart = isToggleOff ? null : chartKey;
    
    setTimeout(() => {
      const chartToResize = this.chartsRef.find((chart) =>
        chart.el.nativeElement.closest('.chart')?.classList.contains('expanded')
      );
      chartToResize?.chart?.resize();
    }, 300);
  }

  onTabChange(event: any) {
    const index = (event as { index: number }).index;
    const joueur = this.joueurs[index - 1];
    if (joueur) {
      this.updateStats(joueur.code);
      this.updateTrophes(joueur.code);
    }
  }

  async updateStats(joueurCode: string) {
    this.isLoadingPlayerStatsCrit = true;
    this.isLoadingPlayerStatsCombat = true;
    this.isLoadingPlayerStatsTrivia = true;
    this.statistiquesJoueurCritiques = await this.statistiquesService.getJoueurStatistiqueCritique(joueurCode) ?? undefined;
    this.isLoadingPlayerStatsCrit = false;
    this.statistiquesJoueurCombat = await this.statistiquesService.getJoueurStatistiqueCombat(joueurCode) ?? undefined;
    this.isLoadingPlayerStatsCombat = false;
    this.statistiquesJoueurTrivia = await this.statistiquesService.getJoueurStatistiqueTrivia(joueurCode) ?? undefined;
    this.isLoadingPlayerStatsTrivia = false;
  }

  async updateTrophes(joueurCode: string) {
    this.trophesJoueur = await this.statistiquesService.getJoueurTrophes(joueurCode);
  }
}