import React, { useState } from 'react';
import type { Account, RiskCategory } from '../types/revops';
import {
  Building,
  TrendingDown,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';

interface AccountsTableProps {
  accounts: Account[];
  onSelectAccount: (account: Account) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  onSelectAccount,
  searchTerm,
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'health' | 'arr' | 'velocity'>('health');

  const filtered = accounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.csmName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = selectedSegment === 'ALL' || acc.segment === selectedSegment;
    const matchesRisk = selectedRisk === 'ALL' || acc.riskCategory === selectedRisk;
    return matchesSearch && matchesSegment && matchesRisk;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'health') return a.healthScore - b.healthScore;
    if (sortBy === 'arr') return b.arr - a.arr;
    if (sortBy === 'velocity') return a.telemetryVelocity - b.telemetryVelocity;
    return 0;
  });

  const getBadgeStyle = (category: RiskCategory) => {
    switch (category) {
      case 'CRITICAL':
        return '#f87171';
      case 'AT_RISK':
        return '#fbbf24';
      case 'HEALTHY':
        return '#cbd5e1';
      case 'EXPANSION':
        return '#ffffff';
    }
  };

  return (
    <div style={{ background: '#111827', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem', border: 'none' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 500, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Account Health & AI Risk Detection Radar
            <span
              style={{
                fontSize: '0.72rem',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#94a3b8',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 400,
              }}
            >
              {sorted.length} Accounts Listed
            </span>
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>
            Real-time telemetry, sentiment analysis, and AI-prescribed next best actions
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#18191d', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
            <Building size={14} color="#94a3b8" />
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              style={{ background: 'transparent', color: '#f8fafc', border: 'none', outline: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <option value="ALL">All Segments</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Mid-Market">Mid-Market</option>
              <option value="SMB">SMB</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#18191d', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              style={{ background: 'transparent', color: '#f8fafc', border: 'none', outline: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <option value="ALL">All Health Tiers</option>
              <option value="CRITICAL">Critical Risk</option>
              <option value="AT_RISK">At-Risk Watchlist</option>
              <option value="HEALTHY">Healthy Tiers</option>
              <option value="EXPANSION">Expansion Candidates</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#18191d', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              style={{ background: 'transparent', color: '#f8fafc', border: 'none', outline: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <option value="health">Sort: Risk Severity</option>
              <option value="arr">Sort: Highest ARR ($)</option>
              <option value="velocity">Sort: Usage Drop %</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                color: '#64748b',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <th style={{ padding: '0.75rem 1rem' }}>Account & Tier</th>
              <th style={{ padding: '0.75rem 1rem' }}>ARR ($)</th>
              <th style={{ padding: '0.75rem 1rem' }}>Health Index</th>
              <th style={{ padding: '0.75rem 1rem' }}>Usage Velocity</th>
              <th style={{ padding: '0.75rem 1rem' }}>Seats</th>
              <th style={{ padding: '0.75rem 1rem' }}>CSM</th>
              <th style={{ padding: '0.75rem 1rem' }}>AI Diagnosis</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((account) => (
              <tr
                key={account.id}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                  transition: 'background 0.15s ease',
                  cursor: 'pointer',
                }}
                onClick={() => onSelectAccount(account)}
              >
                <td style={{ padding: '0.9rem 1rem' }}>
                  <div style={{ fontWeight: 500, color: '#f8fafc', fontSize: '0.9rem' }}>
                    {account.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{account.domain}</span>
                    <span>•</span>
                    <span>{account.segment}</span>
                  </div>
                </td>

                <td style={{ padding: '0.9rem 1rem', fontWeight: 500, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                  ${(account.arr / 1000).toFixed(0)}k
                </td>

                <td style={{ padding: '0.9rem 1rem' }}>
                  <span
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      color: getBadgeStyle(account.riskCategory),
                      background: 'rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    {account.healthScore}/100 • {account.riskCategory}
                  </span>
                </td>

                <td style={{ padding: '0.9rem 1rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: account.telemetryVelocity < 0 ? '#94a3b8' : '#f8fafc',
                      fontSize: '0.82rem',
                    }}
                  >
                    {account.telemetryVelocity < 0 ? (
                      <TrendingDown size={14} color="#94a3b8" />
                    ) : (
                      <TrendingUp size={14} color="#ffffff" />
                    )}
                    {account.telemetryVelocity > 0 ? '+' : ''}
                    {account.telemetryVelocity}%
                  </div>
                </td>

                <td style={{ padding: '0.9rem 1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                  {account.activeUsers} / {account.totalLicensedSeats}
                </td>

                <td style={{ padding: '0.9rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img
                      src={account.csmAvatar}
                      alt={account.csmName}
                      style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ fontSize: '0.8rem', color: '#f8fafc', fontWeight: 400 }}>
                      {account.csmName}
                    </div>
                  </div>
                </td>

                <td style={{ padding: '0.9rem 1rem', maxWidth: '280px' }}>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      color: '#94a3b8',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      background: '#18191d',
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                    title={account.aiSummary}
                  >
                    {account.aiSummary}
                  </div>
                </td>

                <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAccount(account);
                    }}
                    className="btn-primary"
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
                  >
                    Investigate
                    <ChevronRight size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
