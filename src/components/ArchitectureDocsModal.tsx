import React from 'react';
import { X, Layers, Cpu, ShieldCheck, Database, Award } from 'lucide-react';

interface ArchitectureDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocsModal: React.FC<ArchitectureDocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          background: '#18191d',
          borderRadius: '12px',
          border: 'none',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#ff2e4c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Layers size={18} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#f8fafc' }}>
              PulseRevOps AI — Technical System Architecture & EM Strategy
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>
              Engineering Leadership Document • System Design • Business Outcomes • SLA Framework
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
          <div style={{ background: '#121316', padding: '1.25rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={16} color="#f8fafc" />
              1. Engineering Manager Vision & Product Thinking
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6', fontWeight: 400 }}>
              As an Engineering Leader, building AI applications requires grounding LLMs and predictive models in strict business realities—specifically Net Dollar Retention (NDR), Churn Avoidance, and CSM efficiency. PulseRevOps is engineered to bridge raw product telemetry (Clickhouse, Snowflake) with real-time operational workflows (Salesforce, Zendesk, Slack).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#121316', padding: '1.1rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Database size={15} color="#f8fafc" />
                Data Ingestion & Feature Store
              </h4>
              <ul style={{ fontSize: '0.82rem', color: '#94a3b8', paddingLeft: '1.2rem', lineHeight: '1.6', fontWeight: 400 }}>
                <li>Kafka / Event Hub streaming user activity metrics at 5k events/sec.</li>
                <li>dbt + Snowflake feature store computing 30-day seat velocity & API usage decay.</li>
                <li>Zendesk & Intercom webhooks ingesting support escalation events.</li>
              </ul>
            </div>

            <div style={{ background: '#121316', padding: '1.1rem', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Cpu size={15} color="#f8fafc" />
                AI Inference & Diagnostic Engine
              </h4>
              <ul style={{ fontSize: '0.82rem', color: '#94a3b8', paddingLeft: '1.2rem', lineHeight: '1.6', fontWeight: 400 }}>
                <li>Hybrid scoring: XGBoost classifier for churn probability + Gemini 1.5 Pro for contextual root-cause synthesis.</li>
                <li>Prompt guardrails ensuring PII scrubbing before LLM inference.</li>
                <li>Structured JSON schema output enforcing deterministic next best actions.</li>
              </ul>
            </div>
          </div>

          <div style={{ background: '#121316', padding: '1.25rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#f8fafc" />
              2. System SLAs & Enterprise Guardrails
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontWeight: 400 }}>Telemetry Latency SLA</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>&lt; 5 minutes event to radar</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontWeight: 400 }}>LLM Latency Target</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>p95 &lt; 1.2 seconds</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8', fontWeight: 400 }}>Security Compliance</div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>SOC2 Type II & GDPR Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
