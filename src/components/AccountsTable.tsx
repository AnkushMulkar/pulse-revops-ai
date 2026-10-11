import React, { useState } from 'react';
import type { Account, RiskCategory } from '../types/revops';
import {
  Filter,
  ArrowUpDown,
  Sparkles,
  AlertTriangle,
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
        return 'badge-critical';
      case 'AT_RISK':
        return 'badge-at-risk';
      case 'HEALTHY':
        return 'badge-healthy';
      case 'EXPANSION':
        return 'badge-expansion';
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
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
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Account Health & AI Risk Detection Radar
            <span
              style={{
                fontSize: '0.75rem',
                background: 'rgba(255, 46, 76, 0.2)',
                color: '#ff2e4c',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 600,
              }}
            >
              {sorted.length} Accounts Listed
            </span>
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Real-time telemetry, sentiment analysis, and AI-prescribed next best actions
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Building size={14} color="var(--text-muted)" />
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <option value="ALL" style={{ background: '#090d16' }}>All Segments</option>
              <option value="Enterprise" style={{ background: '#090d16' }}>Enterprise</option>
              <option value="Mid-Market" style={{ background: '#090d16' }}>Mid-Market</option>
              <option value="SMB" style={{ background: '#090d16' }}>SMB</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Filter size={14} color="var(--text-muted)" />
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <option value="ALL" style={{ background: '#090d16' }}>All Health Tiers</option>
              <option value="CRITICAL" style={{ background: '#090d16' }}>Critical Risk</option>
              <option value="AT_RISK" style={{ background: '#090d16' }}>At-Risk Watchlist</option>
              <option value="HEALTHY" style={{ background: '#090d16' }}>Healthy Tiers</option>
              <option value="EXPANSION" style={{ background: '#090d16' }}>Expansion Candidates</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.3rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <ArrowUpDown size={14} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <option value="health" style={{ background: '#090d16' }}>Sort: Risk Severity (Lowest Health First)</option>
              <option value="arr" style={{ background: '#090d16' }}>Sort: Highest ARR ($)</option>
              <option value="velocity" style={{ background: '#090d16' }}>Sort: Usage Drop %</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <th style={{ padding: '0.75rem 1rem' }}>Account & Tier</th>
              <th style={{ padding: '0.75rem 1rem' }}>ARR ($)</th>
              <th style={{ padding: '0.75rem 1rem' }}>Health Index</th>
              <th style={{ padding: '0.75rem 1rem' }}>Usage Velocity</th>
              <th style={{ padding: '0.75rem 1rem' }}>Seats & Tickets</th>
              <th style={{ padding: '0.75rem 1rem' }}>CSM Sponsor</th>
              <th style={{ padding: '0.75rem 1rem' }}>AI Diagnosis</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((account) => (
              <tr
                key={account.id}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  transition: 'background 0.15s ease',
                  cursor: 'pointer',
                }}
                className="table-row-hover"
                onClick={() => onSelectAccount(account)}
              >
                <td style={{ padding: '0.9rem 1rem' }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                    {account.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{account.domain}</span>
                    <span>•</span>
                    <span
                      style={{
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {account.segment}
                    </span>
                  </div>
                </td>

                <td style={{ padding: '0.9rem 1rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                  ${(account.arr / 1000).toFixed(0)}k
                </td>

                <td style={{ padding: '0.9rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span
                      className={`badge-critical ${getBadgeStyle(account.riskCategory)}`}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {account.healthScore}/100
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                      {account.riskCategory}
                    </span>
                  </div>
                </td>

                <td style={{ padding: '0.9rem 1rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: account.telemetryVelocity < 0 ? '#ff2e4c' : '#e4e4e7',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                    }}
                  >
                    {account.telemetryVelocity < 0 ? (
                      <TrendingDown size={15} color="#ff2e4c" />
                    ) : (
                      <TrendingUp size={15} color="#ff2e4c" />
                    )}
                    {account.telemetryVelocity > 0 ? '+' : ''}
                    {account.telemetryVelocity}%
                  </div>
                </td>

                <td style={{ padding: '0.9rem 1rem', fontSize: '0.8rem' }}>
                  <div style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{account.activeUsers}</span> / {account.totalLicensedSeats} seats
                  </div>
                  {account.unresolvedP1Tickets > 0 ? (
                    <div style={{ color: '#ff2e4c', fontSize: '0.73rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <AlertTriangle size={12} color="#ff2e4c" />
                      {account.unresolvedP1Tickets} Unresolved P1 Ticket
                    </div>
                  ) : (
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.73rem' }}>
                      {account.supportTicketCount} tickets logged
                    </div>
                  )}
                </td>

                <td style={{ padding: '0.9rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img
                      src={account.csmAvatar}
                      alt={account.csmName}
                      style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 500 }}>
                      {account.csmName}
                    </div>
                  </div>
                </td>

                <td style={{ padding: '0.9rem 1rem', maxWidth: '280px' }}>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      color: 'var(--text-muted)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      background: 'rgba(255, 46, 76, 0.08)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 46, 76, 0.2)',
                    }}
                    title={account.aiSummary}
                  >
                    <Sparkles size={12} color="#ff2e4c" style={{ display: 'inline', marginRight: '4px' }} />
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
                    style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', borderRadius: '6px' }}
                  >
                    Investigate
                    <ChevronRight size={14} />
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
