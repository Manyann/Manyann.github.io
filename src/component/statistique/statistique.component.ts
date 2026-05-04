import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule, UIChart } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';

import { JoueursService } from '../../app/services/joueur.service';
import {
  JoueurStatistique,
  StatistiquesService,
  Trophe,
} from '../../app/services/statistiques.service';
import { TrophesPipe } from './trophe.pipe';
import { StatistiqueDashboardData } from './models/statistique-dashboard-data.model';
import { StatistiqueChartDataService } from './services/statistique-chart-data.service';
import {
  getChartOptions,
  getChartOptionsMiroir,
  getChartOptionsStackedVertical,
} from './utils/chart-options.util';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [CommonModule, TabViewModule, ChartModule, PanelModule, TrophesPipe],
  templateUrl: './statistique.component.html',
  styleUrls: [
    '../../assets/css/trophe.css',
    '../../assets/css/stat-panel.css',
    '../../assets/css/tabview.css',
    './statistique.component.css',
    '../../assets/css/chart.css',
  ],
  providers: [StatistiqueChartDataService],
})
export class StatistiqueComponent {
  title = 'nhbk';
  joueurs: any[] = [];

  isLoading = true;
  isLoadingPlayerStatsCrit = true;
  isLoadingPlayerStatsCombat = true;
  isLoadingPlayerStatsTrivia = true;
  chartsReady = false;

  dataOrigines: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();
  dataMetiers: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();
  dataCrits: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();
  dataEchecCrits: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();
  dataDegatsTotal: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();
  dataDegatsMax: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();
  dataEnnemis: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();
  dataRapports: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();
  dataRapportsJoueurMj: StatistiqueDashboardData =
    StatistiqueChartDataService.emptyChart();

  optionsBardataOrigines: any = {};
  optionsBardataMetiers: any = {};
  optionsBardataCrits: any = {};
  optionsBardataCritsdataEchecCrits: any = {};
  optionsBardataDegatsTotal: any = {};
  optionsBardataDegatsMax: any = {};
  optionsBardataEnnemis: any = {};
  optionsBardataRapports: any = {};
  optionsBardataRapportsJoueurMj: any = {};

  statistiquesJoueurCritiques: JoueurStatistique | undefined;
  statistiquesJoueurCombat: JoueurStatistique | undefined;
  statistiquesJoueurTrivia: JoueurStatistique | undefined;
  trophesJoueur: Trophe[] | undefined;

  expandedChart: string | null = null;

  @ViewChildren('chart') chartsRef!: QueryList<UIChart>;

  constructor(
    private joueursService: JoueursService,
    private statistiquesService: StatistiquesService,
    private chartDataService: StatistiqueChartDataService,
  ) {
    this.initializeComponent();
  }

  async initializeComponent(): Promise<void> {
    try {
      this.isLoading = true;
      this.joueurs = await this.joueursService.getAll();
      this.getOptions();
      await this.getDatas(true, 3);
      await new Promise((resolve) => setTimeout(resolve, 200));
      this.chartsReady = true;
      this.isLoading = false;
    } catch (error) {
      console.error("Erreur lors de l'initialisation:", error);
      this.isLoading = false;
      this.chartsReady = false;
    }
  }

  async getDatas(onlyTop = false, slice: number | null = null): Promise<void> {
    try {
      const data = await this.chartDataService.loadDashboardData(
        onlyTop,
        slice,
      );

      this.dataOrigines = data.origines;
      this.dataMetiers = data.metiers;
      this.dataCrits = data.crits;
      this.dataEchecCrits = data.echecCrits;
      this.dataDegatsTotal = data.degatsTotal;
      this.dataDegatsMax = data.degatsMax;
      this.dataEnnemis = data.ennemis;
      this.dataRapportsJoueurMj = data.rapportsJoueurMj;
      this.dataRapports = data.rapports;

      this.optionsBardataRapports = getChartOptionsMiroir(
        'Échecs vs Critiques',
      );
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  }

  updateChartsDisplay(): void {
    this.chartsRef?.forEach((chart) => chart.chart?.update());
  }

  getOptions(): void {
    this.optionsBardataOrigines = getChartOptions('Origines');
    this.optionsBardataMetiers = getChartOptions('Métiers');
    this.optionsBardataCrits = getChartOptions('Coups Critiques');
    this.optionsBardataCritsdataEchecCrits =
      getChartOptions('Échecs Critiques');
    this.optionsBardataDegatsTotal = getChartOptions('Dégâts Totaux');
    this.optionsBardataDegatsMax = getChartOptions('Dégâts Max');
    this.optionsBardataEnnemis = getChartOptions('Ennemis rencontrés');
    this.optionsBardataRapports = getChartOptions('Rapport Critiques / Echecs');
    this.optionsBardataRapportsJoueurMj = getChartOptionsStackedVertical(
      'Rapport Crit et Echec Joueurs / MJ',
    );
  }

  async toggleChart(chartKey: string): Promise<void> {
    const isToggleOff = this.expandedChart === chartKey;
    await this.getDatas(isToggleOff, isToggleOff ? 3 : null);
    this.expandedChart = isToggleOff ? null : chartKey;
    this.resizeExpandedChart();
  }

  async toggleStackedChart(chartKey: string): Promise<void> {
    const isToggleOff = this.expandedChart === chartKey;
    await this.getDatas(isToggleOff, null);
    this.expandedChart = isToggleOff ? null : chartKey;
    this.resizeExpandedChart();
  }

  onTabChange(event: { index: number }): void {
    const joueur = this.joueurs[event.index - 1];
    if (!joueur) {
      return;
    }

    this.updateStats(joueur.code);
    this.updateTrophes(joueur.code);
  }

  async updateStats(joueurCode: string): Promise<void> {
    this.isLoadingPlayerStatsCrit = true;
    this.isLoadingPlayerStatsCombat = true;
    this.isLoadingPlayerStatsTrivia = true;

    this.statistiquesJoueurCritiques =
      (await this.statistiquesService.getJoueurStatistiqueCritique(
        joueurCode,
      )) ?? undefined;
    this.isLoadingPlayerStatsCrit = false;

    this.statistiquesJoueurCombat =
      (await this.statistiquesService.getJoueurStatistiqueCombat(joueurCode)) ??
      undefined;
    this.isLoadingPlayerStatsCombat = false;

    this.statistiquesJoueurTrivia =
      (await this.statistiquesService.getJoueurStatistiqueTrivia(joueurCode)) ??
      undefined;
    this.isLoadingPlayerStatsTrivia = false;
  }

  async updateTrophes(joueurCode: string): Promise<void> {
    const data = await this.statistiquesService.getJoueurTrophes(joueurCode);
    this.trophesJoueur = [...(data ?? [])].sort(
      (a, b) => Number(a.categorie) - Number(b.categorie),
    );
  }

  private resizeExpandedChart(): void {
    setTimeout(() => {
      const chartToResize = this.chartsRef.find((chart) =>
        chart.el.nativeElement
          .closest('.chart')
          ?.classList.contains('expanded'),
      );
      chartToResize?.chart?.resize();
    }, 300);
  }
}
