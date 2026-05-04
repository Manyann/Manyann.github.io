import { CodeValeur } from '../../model/code-libelle';
import {
  DEFAULT_CHART_COLORS,
  JOUEURS_CHART_COLOR,
  MJ_CHART_COLOR,
  TOP_CHART_COLORS,
} from '../constants/chart-colors.constant';

export function getBackgroundColorChart(onlyTop = false): string[] {
  return onlyTop ? TOP_CHART_COLORS : DEFAULT_CHART_COLORS;
}

export function getDataSet(values: number[], onlyTop: boolean): any[] {
  return [
    {
      data: values,
      backgroundColor: getBackgroundColorChart(onlyTop),
    },
  ];
}

export function getStackedDataSetJoueurMj(values: CodeValeur[]): any[] {
  return [
    {
      label: 'Joueurs',
      data: [
        values.find((v) => v.code === 'Critiques joueurs')?.valeur ?? 0,
        values.find((v) => v.code === 'Echecs joueurs')?.valeur ?? 0,
      ],
      backgroundColor: JOUEURS_CHART_COLOR,
    },
    {
      label: 'MJ',
      data: [
        values.find((v) => v.code === 'Critiques MJ')?.valeur ?? 0,
        values.find((v) => v.code === 'Echecs MJ')?.valeur ?? 0,
      ],
      backgroundColor: MJ_CHART_COLOR,
    },
  ];
}
