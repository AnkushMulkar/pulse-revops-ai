import React, { useState } from 'react';
import type { AutomationPlaybook } from '../types/revops';
import { Zap, Play, Pause, Plus, CheckCircle2 } from 'lucide-react';

interface AutomationPlaybooksProps {
  playbooks: AutomationPlaybook[];
}

export const AutomationPlaybooks: React.FC<AutomationPlaybooksProps> = ({ playbooks: initialPlaybooks }) => {
  const [playbooks, setPlaybooks] = useState(initialPlaybooks);

  const toggleStatus = (id: string) => {
    setPlaybooks(
      playbooks.map((p) =>
        p.id === id ? { ...p, status: p.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : p
      )
    );
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={20} color="#ff2e4c" />
            RevOps Playbook Automation Engine
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Configurable event-driven rules that automatically trigger cross-functional revenue preservation workflows
          </p>
        </div>

        <button
          onClick={() => alert('New Playbook Rule Builder opened')}
          className="btn-primary"
          style={{ fontSize: '0.82rem' }}
        >
          <Plus size={16} />
          Create Playbook Rule
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {playbooks.map((pb) => (
          <div key={pb.id} className="glass-card" style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    background: pb.status === 'ACTIVE' ? 'rgba(255, 46, 76, 0.15)' : 'rgba(255, 46, 76, 0.15)',
                    color: pb.status === 'ACTIVE' ? '#e4e4e7' : '#e4e4e7',
                    border: `1px solid ${pb.status === 'ACTIVE' ? 'rgba(255, 46, 76, 0.3)' : 'rgba(255, 46, 76, 0.3)'}`,
                  }}
                >
                  {pb.status}
                </span>

                <button
                  onClick={() => toggleStatus(pb.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.78rem',
                  }}
                >
                  {pb.status === 'ACTIVE' ? <Pause size={14} /> : <Play size={14} />}
                  {pb.status === 'ACTIVE' ? 'Pause Rule' : 'Activate'}
                </button>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                {pb.name}
              </h3>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: '#ff2e4c',
                  marginBottom: '0.85rem',
                  border: '1px solid rgba(255, 46, 76, 0.2)',
                }}
              >
                IF {pb.triggerCondition}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>Automated Actions:</div>
                {pb.automatedActions.map((action, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                    <CheckCircle2 size={13} color="#ff2e4c" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
              }}
            >
              <span style={{ color: 'var(--text-dim)' }}>Executions: <strong style={{ color: '#fff' }}>{pb.executionCount}</strong></span>
              <span style={{ color: '#e4e4e7', fontWeight: 700 }}>
                ${(pb.arrProtected / 1000).toFixed(0)}k ARR Protected
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
