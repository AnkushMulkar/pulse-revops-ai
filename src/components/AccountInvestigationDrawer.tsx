import React, { useState } from 'react';
import type { Account } from '../types/revops';
import {
  X,
  Sparkles,
  AlertTriangle,
  Send,
  CheckCircle2,
  TrendingDown,
  Mail,
  Zap,
  Copy,
} from 'lucide-react';

interface AccountInvestigationDrawerProps {
  account: Account | null;
  onClose: () => void;
  onUpdateAccount: (updated: Account) => void;
}

export const AccountInvestigationDrawer: React.FC<AccountInvestigationDrawerProps> = ({
  account,
  onClose,
  onUpdateAccount,
}) => {
  if (!account) return null;

  const [activeTab, setActiveTab] = useState<'diagnosis' | 'outreach' | 'telemetry'>('diagnosis');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [outreachEmail, setOutreachEmail] = useState<string>(
    `Subject: Executive Alignment & Technical Performance Review for ${account.name}\n\nHi ${account.name} Team,\n\nI noticed our recent telemetry indicates a shift in API integration latency following the v4.2 update. Additionally, with the transition in your engineering leadership, we want to ensure zero disruption to your workflow.\n\nOur Solutions Engineering team has reserved dedicated cycles this week to review Ticket #4902 and optimize your cluster configuration.\n\nCould we connect for a brief 15-minute sync with our VP of Customer Success?\n\nBest regards,\n${account.csmName}\nCustomer Success Lead, PulseRevOps`
  );
  const [copied, setCopied] = useState(false);
  const [playbookExecuted, setPlaybookExecuted] = useState(false);

  const handleRunAiDiagnostics = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
    }, 900);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(outreachEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecutePlaybook = () => {
    setPlaybookExecuted(true);
    const updated = {
      ...account,
      healthScore: Math.min(100, account.healthScore + 20),
      riskCategory: 'AT_RISK' as const,
      aiSummary: 'Intervention Initiated: Executive outreach sent & Solutions Engineering ticket created.',
    };
    onUpdateAccount(updated);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '100vh',
          borderRadius: 0,
          borderLeft: '1px solid rgba(255, 46, 76, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          background: '#0c121e',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(16, 24, 40, 0.9)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                {account.name}
              </h2>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(255, 46, 76, 0.2)',
                  color: '#ff2e4c',
                  fontWeight: 600,
                }}
              >
                {account.segment}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ARR: ${(account.arr / 1000).toFixed(0)}k • CSM: {account.csmName} • Renewal: {account.renewalDate}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.4rem',
            }}
          >
            <X size={22} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(9, 13, 22, 0.5)',
            padding: '0 1.5rem',
          }}
        >
          {[
            { id: 'diagnosis', label: 'AI Root Cause Diagnosis', icon: Sparkles },
            { id: 'outreach', label: 'AI Executive Outreach', icon: Mail },
            { id: 'telemetry', label: 'Telemetry & Support Signals', icon: TrendingDown },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.8rem 1rem',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #ff2e4c' : '2px solid transparent',
                  background: 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                <Icon size={15} color={isActive ? '#ff2e4c' : 'currentColor'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {activeTab === 'diagnosis' && (
            <>
              <div
                style={{
                  background: 'rgba(255, 46, 76, 0.08)',
                  border: '1px solid rgba(255, 46, 76, 0.25)',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#ff2e4c', fontWeight: 600, textTransform: 'uppercase' }}>
                    Risk Severity Assessment
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Health Index: {account.healthScore}/100
                    <span style={{ fontSize: '0.85rem', color: '#ff2e4c', fontWeight: 600 }}>
                      ({account.riskCategory})
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleRunAiDiagnostics}
                  disabled={isGeneratingAi}
                  className="btn-primary"
                  style={{ fontSize: '0.82rem' }}
                >
                  <Sparkles size={16} />
                  {isGeneratingAi ? 'Re-analyzing Telemetry...' : 'Run Deep AI Diagnosis'}
                </button>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Sparkles size={16} color="#ff2e4c" />
                  Gemini AI Synthesis & Causality Engine
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                  {account.aiSummary}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                  Quantified Risk Signals ({account.riskFactors.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {account.riskFactors.map((factor) => (
                    <div
                      key={factor.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '0.85rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            background: 'rgba(255, 46, 76, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <AlertTriangle size={16} color="#ff2e4c" />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                            {factor.title}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {factor.description}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ff2e4c', fontSize: '0.85rem' }}>
                        {factor.impactScore} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 46, 76, 0.12) 0%, rgba(255, 46, 76, 0.12) 100%)',
                  border: '1px solid rgba(255, 46, 76, 0.3)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ fontSize: '0.78rem', color: '#ff2e4c', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Recommended Action (Estimated ${account.suggestedAction.estimatedArrAtRiskSaved.toLocaleString()} Saved)
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                  {account.suggestedAction.title}
                </div>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {account.suggestedAction.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    onClick={handleExecutePlaybook}
                    disabled={playbookExecuted}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Zap size={16} />
                    {playbookExecuted ? 'Playbook Initiated ✓' : 'Execute AI Intervention Playbook'}
                  </button>

                  <button
                    onClick={() => setActiveTab('outreach')}
                    className="btn-secondary"
                    style={{ fontSize: '0.82rem' }}
                  >
                    <Mail size={15} />
                    Edit Email Draft
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'outreach' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Personalized AI outreach generated from live telemetry drops, Zendesk ticket numbers, and executive contact history.
              </div>

              <textarea
                value={outreachEmail}
                onChange={(e) => setOutreachEmail(e.target.value)}
                rows={12}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1rem',
                  color: '#f8fafc',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  lineHeight: '1.6',
                  outline: 'none',
                  resize: 'none',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button
                  onClick={handleCopyEmail}
                  className="btn-secondary"
                >
                  {copied ? <CheckCircle2 size={16} color="#ff2e4c" /> : <Copy size={16} />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Outreach Draft'}
                </button>

                <button
                  onClick={() => alert(`Outreach dispatch simulated for ${account.name} executive team.`)}
                  className="btn-primary"
                >
                  <Send size={16} />
                  Send via Outreach / HubSpot
                </button>
              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-card" style={{ padding: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                  Telemetry Metric Breakdown
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.83rem' }}>
                  <div>Active Seat Ratio: <span style={{ color: '#fff', fontWeight: 700 }}>{account.activeUsers} / {account.totalLicensedSeats}</span></div>
                  <div>Support Ticket Volume: <span style={{ color: '#fff', fontWeight: 700 }}>{account.supportTicketCount} logged</span></div>
                  <div>Sentiment Rating: <span style={{ color: '#fff', fontWeight: 700 }}>{account.sentimentScore} / 10</span></div>
                  <div>Executive Sponsor Active: <span style={{ color: account.executiveSponsorActive ? '#e4e4e7' : '#ff2e4c', fontWeight: 700 }}>{account.executiveSponsorActive ? 'YES' : 'NO'}</span></div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>
                  Weekly Telemetry Stream History
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {account.metricsHistory.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                      }}
                    >
                      <span style={{ fontWeight: 700, color: '#ff2e4c' }}>{m.week}</span>
                      <span>Health: <strong style={{ color: '#fff' }}>{m.healthScore}</strong></span>
                      <span>Usage Index: <strong style={{ color: '#fff' }}>{m.usageIndex}</strong></span>
                      <span>Support Tickets: <strong style={{ color: '#fff' }}>{m.ticketVolume}</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
