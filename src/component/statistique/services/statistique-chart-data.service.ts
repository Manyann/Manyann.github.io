import { Injectable } from '@angular/core';

import { StatistiqueDashboard } from '../models/statistique-dashboard.model';
import { StatistiqueDashboardData } from '../models/statistique-dashboard-data.model';
import { getDataSet } from '../utils/chart-dataset.util';
import { StatistiquesService } from '../../../app/services/statistiques.service';
import { CodeValeur } from '../../model/code-libelle';

@Injectable()
export class StatistiqueChartDataService {
  constructor(private statistiquesService: StatistiquesService) {}

  static emptyChart(): StatistiqueDashboardData {
    return { title: '', labels: [], datasets: [] };
  }

  async loadDashboardData(
    onlyTop = false,
    slice: number | null = null,
  ): Promise<StatistiqueDashboard> {
    const [
      originesData,
      metiersData,
      critsData,
      echecCritsData,
      degatsTotalData,
      degatsMaxData,
      soinsTotalData,
      soinsMaxData,
      ennemisData,
      rapportsJoueurMjData,
      rapportsData,
    ] = await Promise.all([
      this.statistiquesService.getOrigines('', slice),
      this.statistiquesService.getMetier('', slice),
      this.statistiquesService.getCrits(slice),
      this.statistiquesService.getEchecCrits(slice),
      this.statistiquesService.getDegatsTotaux(slice),
      this.statistiquesService.getDegatsMax(slice),
      this.statistiquesService.getSoinsTotaux(slice),
      this.statistiquesService.getSoinsMax(slice),
      this.statistiquesService.getEnnemis(slice),
      this.statistiquesService.getRapportJoueursMjStacked(),
      this.statistiquesService.getRapportCritiquesEchecs(slice),
    ]);

    return {
      origines: this.toHorizontalBarData('Origines', originesData, onlyTop),
      metiers: this.toHorizontalBarData('Metiers', metiersData, onlyTop),
      crits: this.toHorizontalBarData('Critiques', critsData, onlyTop),
      echecCrits: this.toHorizontalBarData(
        'Echecs Critiques / Entropiques',
        echecCritsData,
        onlyTop,
      ),
      degatsTotal: this.toHorizontalBarData(
        'Degats totaux',
        degatsTotalData,
        onlyTop,
      ),
      degatsMax: this.toHorizontalBarData('Dégats Max', degatsMaxData, onlyTop),
      soinsTotal: this.toHorizontalBarData(
        'Soins totaux',
        soinsTotalData,
        onlyTop,
      ),
      soinsMax: this.toHorizontalBarData('Soins Max', soinsMaxData, onlyTop),
      ennemis: this.toHorizontalBarData('Ennemis', ennemisData, onlyTop),
      rapportsJoueurMj: this.withTitle(
        'Rapport Crit et Echec Joueurs / MJ',
        rapportsJoueurMjData,
      ),
      rapports: this.withTitle('Échecs vs Critiques', rapportsData),
    };
  }

  private withTitle(
    title: string,
    data: { labels: string[]; datasets: any[] },
  ): StatistiqueDashboardData {
    return {
      title,
      labels: data.labels ?? [],
      datasets: data.datasets ?? [],
    };
  }

  private toHorizontalBarData(
    title: string,
    values: CodeValeur[] = [],
    onlyTop: boolean,
  ): StatistiqueDashboardData {
    return {
      title,
      labels: values.map((x) => x.code),
      datasets: getDataSet(
        values.map((x) => x.valeur),
        onlyTop,
      ),
    };
  }
}
