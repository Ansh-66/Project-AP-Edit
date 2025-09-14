import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { yearData, crimeData } from '../data';

// Register Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Global defaults
const AXIS_TICK_COLOR = '#e6eef8';
const AXIS_GRID_COLOR = 'rgba(230,238,248,0.06)';
const LEGEND_COLOR = '#e6eef8';
const TOOLTIP_TITLE_COLOR = '#ffffff';
const TOOLTIP_BODY_COLOR = '#e6eef8';

ChartJS.defaults.color = AXIS_TICK_COLOR;
ChartJS.defaults.plugins.legend.labels.color = LEGEND_COLOR;
ChartJS.defaults.plugins.tooltip.titleColor = TOOLTIP_TITLE_COLOR;
ChartJS.defaults.plugins.tooltip.bodyColor = TOOLTIP_BODY_COLOR;

export default function ChartsSection() {
  const yearLabels = yearData.map((d) => d.year);

  // Chart Data
  const barData = {
    labels: yearLabels,
    datasets: [
      {
        label: 'FIR Registrations',
        data: yearData.map((d) => d.count),
        backgroundColor: ['#60a5fa', '#a78bfa', '#34d399'],
        borderRadius: 8,
      },
    ],
  };

  const doughData = {
    labels: yearLabels,
    datasets: [
      {
        data: yearData.map((d) => d.percentage),
        backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981'],
        borderWidth: 2,
        borderColor: '#0f172a',
      },
    ],
  };

  const crimeDataSet = {
    labels: crimeData.map((c) => c.class),
    datasets: [
      {
        data: crimeData.map((c) => c.cases),
        backgroundColor: '#60a5fa',
        borderRadius: 12, // rounded corners for bars
      },
    ],
  };

  // Chart Options
  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => v / 1000 + 'K', color: AXIS_TICK_COLOR },
        grid: { color: AXIS_GRID_COLOR },
      },
      x: {
        ticks: { color: AXIS_TICK_COLOR },
        grid: { display: false },
      },
    },
    animation: { duration: 700 },
  };

  const doughOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { color: LEGEND_COLOR } },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
        },
        backgroundColor: 'rgba(15,23,42,0.96)',
        titleColor: TOOLTIP_TITLE_COLOR,
        bodyColor: TOOLTIP_BODY_COLOR,
      },
    },
    animation: { duration: 700 },
  };

  const horizOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15,23,42,0.96)',
        titleColor: TOOLTIP_TITLE_COLOR,
        bodyColor: TOOLTIP_BODY_COLOR,
        callbacks: {
          label: (ctx) =>
            `${ctx.parsed.x?.toLocaleString?.()} cases (${crimeData[ctx.dataIndex].percentage}%)`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { callback: (v) => v / 1000 + 'K', color: AXIS_TICK_COLOR },
        grid: { color: AXIS_GRID_COLOR },
      },
      y: { ticks: { color: AXIS_TICK_COLOR }, grid: { display: false } },
    },
    animation: { duration: 900 },
  };

  return (
    <section
      id="charts"
      className="section-scroll grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
    >
      {/* FIR Registrations by Year */}
      <div className="rounded-xl p-4 glass-card border border-white/6 shadow-lg">
        <h3 className="text-lg font-semibold text-center border-b pb-3 text-slate-100 border-slate-700/40">
          📅 FIR Registrations by Year
        </h3>
        <Bar data={barData} options={barOptions} />
      </div>

      {/* Year-wise Distribution */}
      <div className="rounded-xl p-4 glass-card border border-white/6 shadow-lg">
        <h3 className="text-lg font-semibold text-center border-b pb-3 text-slate-100 border-slate-700/40">
          🥧 Year-wise Distribution
        </h3>
        <Doughnut data={doughData} options={doughOptions} />
      </div>

      {/* Crime Category Analysis */}
      <div className="lg:col-span-2 rounded-xl p-4 glass-card border border-white/6 shadow-lg">
        <h3 className="text-lg font-semibold text-center border-b pb-3 text-slate-100 border-slate-700/40">
          🚨 Crime Category Analysis
        </h3>

        {/* Desktop / Tablet */}
        <div className="hidden md:block">
          <Bar data={crimeDataSet} options={horizOptions} />
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {crimeData.map((c, i) => (
            <div
              key={i}
              className="p-4 rounded-lg glass-card border border-white/10 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-slate-100">{c.class}</span>
                <span className="text-slate-400 text-sm">Class {c.code}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>Cases: {c.cases.toLocaleString()}</span>
                <span>{c.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
