export type RiskCategory = 'CRITICAL' | 'AT_RISK' | 'HEALTHY' | 'EXPANSION';
export type Segment = 'Enterprise' | 'Mid-Market' | 'SMB';

export interface RiskFactor {
  id: string;
  category: 'TELEMETRY' | 'SUPPORT' | 'FINANCIAL' | 'RELATIONSHIP';
  title: string;
  description: string;
  impactScore: number; // -100 to 100
  trend: 'worsening' | 'stable' | 'improving';
}

export interface Account {
  id: string;
  name: string;
  domain: string;
  segment: Segment;
  arr: number; // in USD
  healthScore: number; // 0 - 100
  riskCategory: RiskCategory;
  telemetryVelocity: number; // % change in last 30 days
  activeUsers: number;
  totalLicensedSeats: number;
  supportTicketCount: number;
  unresolvedP1Tickets: number;
  sentimentScore: number; // 0 - 10
  executiveSponsorActive: boolean;
  renewalDate: string;
  csmName: string;
  csmAvatar: string;
  lastContactDaysAgo: number;
  riskFactors: RiskFactor[];
  aiSummary: string;
  suggestedAction: {
    title: string;
    description: string;
    estimatedArrAtRiskSaved: number;
    urgency: 'HIGH' | 'MEDIUM' | 'LOW';
    actionType: 'EXECUTIVE_OUTREACH' | 'TECHNICAL_INTERVENTION' | 'QBR_SCHEDULING' | 'RENEWAL_INCENTIVE';
  };
  metricsHistory: {
    week: string;
    healthScore: number;
    usageIndex: number;
    ticketVolume: number;
  }[];
}

export interface AutomationPlaybook {
  id: string;
  name: string;
  triggerCondition: string;
  targetSegment: string;
  automatedActions: string[];
  executionCount: number;
  arrProtected: number;
  status: 'ACTIVE' | 'PAUSED';
}

export interface RevOpsMetrics {
  totalMonitoredArr: number;
  netRetentionRate: number; // percentage e.g. 118.4
  atRiskArr: number; // USD
  savedArrThisQuarter: number; // USD
  avgTimeToDetectDays: number;
  accountCount: {
    critical: number;
    atRisk: number;
    healthy: number;
    expansion: number;
  };
}
