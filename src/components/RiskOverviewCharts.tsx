import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import type { Account } from '../types/revops';
import { ShieldAlert, TrendingDown } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RiskOverviewChartsProps {
  accounts: Account[];
}

export const RiskOverviewCharts: React.FC<RiskOverviewChartsProps> = ({ accounts }) => {
  const arrByCategory = accounts.reduce(
    (acc, account) => {
      acc[account.riskCategory] = (acc[account.riskCategory] || 0) + account.arr;
      return acc;
    },
    { CRITICAL: 0, AT_RISK: 0, HEALTHY: 0, EXPANSION: 0 } as Record<string, number>
  );

  const doughnutData = {
    labels: ['Critical ($ Risk)', 'At-Risk Watchlist', 'Healthy Baseline', 'Expansion Opportunity'],
    datasets: [
      {
        data: [
          arrByCategory.CRITICAL,
          arrByCategory.AT_RISK,
          arrByCategory.HEALTHY,
          arrByCategory.EXPANSION,
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(148, 163, 184, 0.75)',
          'rgba(255, 255, 255, 0.90)',
        ],
        borderColor: [
          '#ef4444',
          '#f59e0b',
          '#94a3b8',
          '#ffffff',
        ],
        borderWidth: 1.5,
      },
    ],
  };

  const lineData = {
    labels: ['W1 (Sep)', 'W2 (Sep)', 'W3 (Sep)', 'W4 (Oct)', 'W5 (Current)'],
    datasets: [
      {
        label: 'Acme Global (Critical)',
        data: [84, 78, 65, 50, 38],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.12)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'BioGenetics AI (Expansion)',
        data: [80, 84, 88, 90, 92],
        borderColor: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Portfolio Avg Health Index',
        data: [72, 71, 69, 70, 73],
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem',
      }}
    >
      <div className="glass-card" style={{ padding: '1.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <ShieldAlert size={16} color="#ef4444" />
              ARR Portfolio Risk Allocation
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Real-time distribution of annual recurring revenue across account health tiers
            </div>
          </div>
        </div>

        <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Doughnut
            data={doughnutData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    color: '#94a3b8',
                    font: { family: 'Plus Jakarta Sans', size: 11 },
                    padding: 14,
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const val = context.raw as number;
                      return ` $${(val / 1000).toFixed(0)}k ARR`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <TrendingDown size={16} color="#94a3b8" />
              5-Week Telemetry & Health Score Trajectory
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Comparing critical decay accounts vs expansion candidates
            </div>
          </div>
        </div>

        <div style={{ height: '220px' }}>
          <Line
            data={lineData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  min: 20,
                  max: 100,
                  grid: { color: 'rgba(255, 255, 255, 0.05)' },
                  ticks: { color: '#64748b', font: { family: 'JetBrains Mono', size: 10 } },
                },
                x: {
                  grid: { color: 'rgba(255, 255, 255, 0.05)' },
                  ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans', size: 10 } },
                },
              },
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#94a3b8',
                    font: { family: 'Plus Jakarta Sans', size: 11 },
                    boxWidth: 12,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
