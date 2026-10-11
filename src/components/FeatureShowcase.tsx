import React from 'react';

export const FeatureShowcase: React.FC = () => {
  const features = [
    {
      badge: '01. Telemetry Ingestion',
      title: 'Proactive Account Risk Telemetry',
      description:
        'Continuously ingests seat utilization drops, executive champion turnover, support ticket velocity, and CSV export spikes to calculate real-time Account Health Scores.',
      metrics: ['Seat Utilization %', 'Champion Activity', 'Support Spike Velocity', 'Contracted ARR'],
    },
    {
      badge: '02. Autonomous AI Diagnostics',
      title: 'LLM-Powered Root Cause Synthesis',
      description:
        'Generates automated executive diagnostics detailing exact risk vectors, contract expiry timelines, and estimated ARR saved prior to renewal negotiations.',
      metrics: ['Gemini 1.5 Synthesis', 'Risk Vector Scoring', 'Competitor POC Alerts', 'ARR Saved Forecast'],
    },
    {
      badge: '03. Automated Playbooks',
      title: 'CSM Workflow Orchestration',
      description:
        'Triggers targeted retention playbooks—from executive sponsor introduction sequences to custom pricing reviews and high-touch technical support escalation.',
      metrics: ['Auto Email Sequences', 'Executive Sponsor Alerts', 'Discount Approval Triggers', 'Quarterly Health Review'],
    },
  ];

  return (
    <section style={{ padding: '3rem 0 2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            fontWeight: 500,
            color: '#f8fafc',
            marginBottom: '0.6rem',
            letterSpacing: '-0.01em',
          }}
        >
          Built for High-Growth B2B SaaS RevOps Teams
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.0rem', fontWeight: 400, maxWidth: '600px', margin: '0 auto' }}>
          Eliminate surprise churn with an intelligent, continuous retention loop designed for Customer Success Leaders.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            style={{
              background: '#18191d',
              borderRadius: '10px',
              padding: '1.8rem',
            }}
          >
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 400,
                color: '#ff2e4c',
                marginBottom: '1rem',
              }}
            >
              {item.badge}
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.6rem' }}>
              {item.title}
            </h3>

            <p style={{ color: '#94a3b8', fontSize: '0.92rem', fontWeight: 400, lineHeight: 1.6, marginBottom: '1.2rem' }}>
              {item.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {item.metrics.map((m, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: '#cbd5e1',
                  }}
                >
                  • {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
