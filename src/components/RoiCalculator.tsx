import React, { useState } from 'react';
import { TrendingUp, Calculator, Award } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [monitoredArr, setMonitoredArr] = useState<number>(25);
  const [baselineChurnRate, setBaselineChurnRate] = useState<number>(8.5);
  const [aiChurnReductionPercent, setAiChurnReductionPercent] = useState<number>(45);

  const annualLossWithoutAi = (monitoredArr * 1000000) * (baselineChurnRate / 100);
  const arrPreserved = annualLossWithoutAi * (aiChurnReductionPercent / 100);
  const csmProductivityGain = 3.5;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={20} color="#ff2e4c" />
          Quantified SaaS Business Outcomes & Financial ROI Modeler
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Interactive impact simulation showcasing revenue preservation, Net Retention Rate (NDR) lift, and CSM team leverage
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Calculator size={18} color="#ff2e4c" />
            SaaS Business Parameters
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Monitored ARR Baseline:</span>
              <span style={{ fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                ${monitoredArr}M USD
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={monitoredArr}
              onChange={(e) => setMonitoredArr(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#ff2e4c', cursor: 'pointer' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Baseline Annual Gross Churn:</span>
              <span style={{ fontWeight: 800, color: '#ff2e4c', fontFamily: 'var(--font-mono)' }}>
                {baselineChurnRate}% / yr
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              step={0.5}
              value={baselineChurnRate}
              onChange={(e) => setBaselineChurnRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#ff2e4c', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>AI Early-Intervention Churn Reduction:</span>
              <span style={{ fontWeight: 800, color: '#e4e4e7', fontFamily: 'var(--font-mono)' }}>
                {aiChurnReductionPercent}% Reduction
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={aiChurnReductionPercent}
              onChange={(e) => setAiChurnReductionPercent(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#ff2e4c', cursor: 'pointer' }}
            />
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 46, 76, 0.15) 0%, rgba(255, 46, 76, 0.15) 100%)',
            border: '1px solid rgba(255, 46, 76, 0.35)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', color: '#ff2e4c', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Projected Annual Business Value
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.2rem' }}>
              ${(arrPreserved / 1000000).toFixed(2)}M / yr
            </div>
            <div style={{ fontSize: '0.85rem', color: '#e4e4e7', fontWeight: 600, marginBottom: '1.25rem' }}>
              Direct ARR Preserved via Predictive Risk Mitigation
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.82rem' }}>
              <div className="glass-card" style={{ padding: '0.85rem' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>NDR Expansion Impact</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>+{(aiChurnReductionPercent * 0.08).toFixed(1)}% Lift</div>
              </div>

              <div className="glass-card" style={{ padding: '0.85rem' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>CSM Capacity Multiplier</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{csmProductivityGain}x Accounts/CSM</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Award size={16} color="#ff2e4c" />
            <span>Modeled using standard B2B Enterprise SaaS benchmarks (SaaStr & Bessemer Venture Partners frameworks)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
