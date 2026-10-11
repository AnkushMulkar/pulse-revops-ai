import React from 'react';

interface HeroSectionProps {
  onExploreWorkspace: () => void;
  onOpenDocs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWorkspace, onOpenDocs }) => {
  return (
    <section style={{ padding: '3.5rem 0 2rem 0', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Status */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.82rem',
          fontWeight: 400,
          color: '#94a3b8',
        }}
      >
        <span className="pulse-dot" />
        Open Source v1.0 • Enterprise Customer Success & Churn AI Engine
      </div>

      {/* Hero Title */}
      <h1
        style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
          fontWeight: 500,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '1.2rem',
          color: '#f8fafc',
        }}
      >
        Autonomous Churn Prevention & <br />
        <span style={{ color: '#94a3b8', fontWeight: 400 }}>Revenue Health Intelligence</span>
      </h1>

      {/* Hero Subtitle */}
      <p
        style={{
          fontSize: '1.1rem',
          color: '#94a3b8',
          maxWidth: '750px',
          margin: '0 auto 2.2rem auto',
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        Predict at-risk B2B SaaS accounts before renewal drops. Telemetry signal ingestion, automated root-cause AI diagnostics, and executive CSM playbooks in one unified workspace.
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '3.5rem' }}>
        <button
          onClick={onExploreWorkspace}
          className="btn-primary"
          style={{
            fontSize: '0.92rem',
            padding: '0.7rem 1.5rem',
          }}
        >
          Launch Live Intelligence Workspace
        </button>
        <button
          onClick={onOpenDocs}
          className="btn-secondary"
          style={{
            fontSize: '0.92rem',
            padding: '0.7rem 1.5rem',
          }}
        >
          Architecture & Open Source Spec →
        </button>
      </div>

      {/* Hero Image Showcase */}
      <div
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#18191d',
        }}
      >
        <img
          src="/hero.jpg"
          alt="PulseRevOps AI Platform Visual"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            display: 'block',
            objectFit: 'cover',
          }}
        />
      </div>
    </section>
  );
};
