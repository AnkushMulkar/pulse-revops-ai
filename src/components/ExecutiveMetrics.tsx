import React from 'react';
import type { RevOpsMetrics } from '../types/revops';
import { DollarSign, TrendingUp, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

interface ExecutiveMetricsProps {
  metrics: RevOpsMetrics;
}

export const ExecutiveMetrics: React.FC<ExecutiveMetricsProps> = ({ metrics }) => {
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  const cards = [
    {
      title: 'Monitored ARR',
      value: formatCurrency(metrics.totalMonitoredArr),
      change: '+14.2% YoY',
      isPositive: true,
      icon: DollarSign,
      color: '#ff2e4c',
      subtitle: 'Active subscription baseline',
    },
    {
      title: 'Net Retention Rate (NDR)',
      value: `${metrics.netRetentionRate}%`,
      change: '+3.4% QoQ target',
      isPositive: true,
      icon: TrendingUp,
      color: '#ff2e4c',
      subtitle: 'Best-in-class enterprise benchmark',
    },
    {
      title: 'ARR At-Risk (AI Flagged)',
      value: formatCurrency(metrics.atRiskArr),
      change: '8 Accounts Actionable',
      isPositive: false,
      icon: AlertTriangle,
      color: '#ff2e4c',
      subtitle: 'Requiring immediate CS intervention',
    },
    {
      title: 'ARR Saved This Quarter',
      value: formatCurrency(metrics.savedArrThisQuarter),
      change: '100% Retained via AI Playbooks',
      isPositive: true,
      icon: ShieldCheck,
      color: '#ff2e4c',
      subtitle: 'Quantified revenue preservation ROI',
    },
    {
      title: 'Mean Time to Detect (MTTD)',
      value: `${metrics.avgTimeToDetectDays} Days`,
      change: '-87% vs manual CS review',
      isPositive: true,
      icon: Clock,
      color: '#ff2e4c',
      subtitle: 'Real-time telemetry latency SLA',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        margin: '1.5rem 0',
      }}
    >
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="glass-card" style={{ padding: '1.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.83rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {card.title}
              </span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: `${card.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${card.color}35`,
                }}
              >
                <Icon size={18} color={card.color} />
              </div>
            </div>

            <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.3rem' }}>
              {card.value}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: card.isPositive ? '#e4e4e7' : '#e4e4e7', fontWeight: 600 }}>
                {card.change}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
