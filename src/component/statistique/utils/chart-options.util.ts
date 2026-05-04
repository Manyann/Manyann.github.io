import { CHART_GRID_COLOR, CHART_TICK_COLOR } from '../constants/chart-colors.constant';

export function getChartOptions(title: string): any {
  return {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        text: title,
        display: true,
        font: { size: 16 },
      },
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: getDefaultScales(),
  };
}

export function getChartOptionsMiroir(title: string): any {
  return {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        title: {
          text: title,
          display: true,
          font: { size: 16 },
        },
        legend: { display: false },
        callbacks: {
          label: (c: { raw: any; dataset: { label: any } }) => {
            const value = Number(c.raw);
            return `${c.dataset.label}: ${Math.abs(value)}`;
          },
        },
      },
    },
    scales: getDefaultScales(),
  };
}

export function getChartOptionsStackedVertical(title: string): any {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        text: title,
        display: true,
        font: { size: 16 },
      },
      legend: {
        display: true,
        labels: { color: CHART_TICK_COLOR },
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: CHART_TICK_COLOR },
        grid: { color: CHART_GRID_COLOR },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { color: CHART_TICK_COLOR },
        grid: { color: CHART_GRID_COLOR },
      },
    },
  };
}

function getDefaultScales(): any {
  return {
    x: {
      ticks: { color: CHART_TICK_COLOR },
      grid: { color: CHART_GRID_COLOR },
    },
    y: {
      ticks: { color: CHART_TICK_COLOR },
      grid: { color: CHART_GRID_COLOR },
    },
  };
}
