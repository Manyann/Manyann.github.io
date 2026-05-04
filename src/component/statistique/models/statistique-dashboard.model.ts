import { StatistiqueDashboardData } from './statistique-dashboard-data.model';

export interface StatistiqueDashboard {
  origines: StatistiqueDashboardData;
  metiers: StatistiqueDashboardData;
  crits: StatistiqueDashboardData;
  echecCrits: StatistiqueDashboardData;
  degatsTotal: StatistiqueDashboardData;
  degatsMax: StatistiqueDashboardData;
  ennemis: StatistiqueDashboardData;
  rapports: StatistiqueDashboardData;
  rapportsJoueurMj: StatistiqueDashboardData;
}
