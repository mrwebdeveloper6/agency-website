// ==============================================================================
// APEXLOGIC DIGITAL ENGINEERING LLC - SYSTEM TYPES & DOMAIN MODELS
// ==============================================================================

export type ProjectCategory =
  | 'CUSTOM_WEB_APPLICATION'
  | 'ENTERPRISE_SOFTWARE'
  | 'RAPID_MVP_SAAS'
  | 'AUTONOMOUS_AI_AGENTS'
  | 'UI_UX_PROTOTYPING'
  | 'API_SYSTEMS_INTEGRATION'
  | 'CLOUD_SECURITY_DEVSECOPS';

export type BudgetTier =
  | 'TIER_1_15K_TO_30K'
  | 'TIER_2_30K_TO_75K'
  | 'TIER_3_75K_TO_200K'
  | 'TIER_4_200K_PLUS';

export type TimelineOption =
  | 'IMMEDIATE_UNDER_4_WEEKS'
  | 'STANDARD_1_TO_3_MONTHS'
  | 'STRATEGIC_3_TO_6_MONTHS'
  | 'LONG_TERM_ROADMAP';

export type ComplianceStandard =
  | 'NONE'
  | 'SOC2_TYPE_II'
  | 'HIPAA_BAA'
  | 'PCI_DSS_L1'
  | 'GDPR_CCPA'
  | 'ISO_27001'
  | 'STANDARD_ENTERPRISE';

export interface ServiceCardData {
  id: string;
  category: ProjectCategory;
  title: string;
  tagline: string;
  description: string;
  proofBadge: string;
  slaMetric: string;
  keyDeliverables: string[];
  techStack: string[];
  architectureBlueprint: {
    frontend: string;
    backend: string;
    database: string;
    security: string;
    observability: string;
  };
}

export interface IndustrySolution {
  id: string;
  name: string;
  badge: string;
  challenge: string;
  architectureSolution: string;
  complianceStandards: string[];
  provenImpact: {
    metric: string;
    label: string;
  };
  technologies: string[];
  sampleCase: string;
}

export interface CaseStudyData {
  id: string;
  clientName: string;
  industry: string;
  headline: string;
  challenge: string;
  solution: string;
  primaryResult: string;
  secondaryResult: string;
  technologies: string[];
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface LeadSubmissionPayload {
  fullName: string;
  workEmail: string;
  companyName: string;
  companyRole: string;
  phoneNumber?: string;
  projectCategory: ProjectCategory;
  budgetTier: BudgetTier;
  timeline: TimelineOption;
  complianceNeeded?: ComplianceStandard;
  projectDescription: string;
  existingStack?: string;
}

export interface LeadRecord extends LeadSubmissionPayload {
  id: string;
  createdAt: string;
  status: 'QUALIFYING' | 'TECHNICAL_REVIEW' | 'PROPOSAL_SENT';
  qualificationScore: number;
  aiAnalysis?: {
    estimatedVelocity: string;
    technicalComplexity: string;
    architecturalRecommendation: string;
    suggestedStack: string[];
    riskMitigations: string[];
  };
}

export interface SystemHealthData {
  status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
  timestamp: string;
  uptimePercentage: string;
  latencyMs: number;
  memoryUsageMb: number;
  wafShieldStatus: 'ACTIVE_ARMORED' | 'MONITORING';
  rateLimitLoad: string;
  activeNodes: number;
  sslCertGrade: string;
  ddosMitigationStatus: string;
}
