// ==============================================================================
// APEXLOGIC DIGITAL ENGINEERING LLC - ENTERPRISE KNOWLEDGE BASE & DATA
// ==============================================================================

import { ServiceCardData, IndustrySolution, CaseStudyData } from './types';

export const CORE_SERVICES: ServiceCardData[] = [
  {
    id: 'custom-web-apps',
    category: 'CUSTOM_WEB_APPLICATION',
    title: 'Custom Web Applications & Enterprise Software',
    tagline: 'High-concurrency web platforms engineered for 99.99% availability and zero technical debt.',
    description:
      'We architect, build, and deploy mission-critical software tailored to complex enterprise workflows. Combining modular domain-driven architectures with modern reactive interfaces, we replace brittle legacy monoliths with lightning-fast, scalable systems.',
    proofBadge: '75% Operational Acceleration',
    slaMetric: '99.99% Availability SLA',
    keyDeliverables: [
      'Micro-frontend & modular monolith architecture',
      'Row-level security (RLS) with automated audit logging',
      'Real-time bi-directional WebSockets & event streaming',
      'Sub-200ms p95 global transaction response times',
    ],
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Node.js', 'Docker', 'AWS ECS'],
    architectureBlueprint: {
      frontend: 'Next.js App Router with Server Components & Edge SSR',
      backend: 'Containerized Node.js/Go Microservices with gRPC inter-service mesh',
      database: 'PostgreSQL with connection pooling (PgBouncer) & read replicas',
      security: 'OAuth 2.0 / OIDC with fine-grained RBAC and AES-256 data encryption',
      observability: 'OpenTelemetry, Datadog APM, and automated synthetic canary testing',
    },
  },
  {
    id: 'rapid-mvp-saas',
    category: 'RAPID_MVP_SAAS',
    title: 'Rapid MVP Engineering & Multi-Tenant SaaS',
    tagline: 'Turn strategic product specs into commercial production SaaS in 4 to 8 weeks.',
    description:
      'Engineered specifically for venture-backed founders and innovation teams. We assemble clean, scalable multi-tenant foundations with isolated customer schemas, Stripe billing engines, subscription tiers, and developer documentation from day one.',
    proofBadge: '4.2x Faster Time-to-Market',
    slaMetric: '2-Week Sprint Velocity Guarantee',
    keyDeliverables: [
      'Isolated multi-tenant data architecture (tenant partitioning)',
      'Enterprise subscription, usage-based metering & billing webhooks',
      'Automated tenant onboarding with custom subdomains',
      'Production CI/CD pipelines with automated end-to-end regression suites',
    ],
    techStack: ['React 19', 'Next.js', 'Prisma ORM', 'Stripe Billing', 'Redis', 'AWS Fargate'],
    architectureBlueprint: {
      frontend: 'Turborepo Monorepo with shared design system & client apps',
      backend: 'Next.js Server Actions + Node.js API with tenant context middleware',
      database: 'Multi-tenant PostgreSQL with schema-per-tenant or shared-schema RLS',
      security: 'JWT rotation with short-lived session tokens & IP velocity checks',
      observability: 'Sentry error tracking, PostHog product analytics, and uptime monitors',
    },
  },
  {
    id: 'ai-workflow-agents',
    category: 'AUTONOMOUS_AI_AGENTS',
    title: 'AI-Powered Applications & Autonomous Workflow Agents',
    tagline: 'Custom RAG pipelines, fine-tuned agentic models, and proprietary business automations.',
    description:
      'We bridge cutting-edge LLMs with enterprise systems of record. From semantic document intelligence and vector retrieval to autonomous multi-agent decision loops with human-in-the-loop guardrails, we unlock immense operational savings.',
    proofBadge: '91% AI Query Resolution',
    slaMetric: '< 1.2s Semantic Retrieval Latency',
    keyDeliverables: [
      'Hybrid dense/sparse vector retrieval (RAG) with reranking algorithms',
      'Multi-agent state machines with fallback heuristics & hallucination checks',
      'Enterprise data privacy compliance (Zero LLM training data retention)',
      'Custom fine-tuning & prompt evaluation benchmarking suites',
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'OpenAI API', 'Gemini Pro'],
    architectureBlueprint: {
      frontend: 'Streaming markdown & generative UI components with latency status indicators',
      backend: 'FastAPI async microservice orchestrating LangGraph workflows',
      database: 'Pinecone / pgvector hybrid vector store with document chunk hash index',
      security: 'Prompt injection firewalls, PII masking middleware, and audit logs',
      observability: 'LangSmith / Phoenix telemetry with token cost & latency tracking',
    },
  },
  {
    id: 'ui-ux-prototyping',
    category: 'UI_UX_PROTOTYPING',
    title: 'Goal-Focused UI/UX & Interactive Prototyping',
    tagline: 'High-fidelity design systems crafted for quantifiable conversion and zero cognitive friction.',
    description:
      'Design is a strategic revenue multiplier. We conduct deep user journey mapping, design accessible component libraries adhering to WCAG 2.1 AA standards, and build fully functional prototypes that validate product-market fit before writing backend code.',
    proofBadge: '+37% Conversions',
    slaMetric: '100% WCAG 2.1 AA Accessibility',
    keyDeliverables: [
      'Full Figma design systems with atomic token architecture',
      'Interactive Framer Motion kinetic prototypes for stakeholder testing',
      'Comprehensive usability testing & quantitative funnel optimization',
      'Developer handoff blueprints with CSS variables and responsive specifications',
    ],
    techStack: ['Figma', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Storybook', 'TypeScript'],
    architectureBlueprint: {
      frontend: 'Component-driven design system with zero-layout-shift (CLS) styling',
      backend: 'Mock API servers and headless CMS integration for instant content updates',
      database: 'Stateless design tokens compiled directly into CSS custom properties',
      security: 'Content Security Policy (CSP) compliant asset delivery',
      observability: 'Hotjar session recordings and Google Lighthouse 95+ performance scores',
    },
  },
  {
    id: 'api-architecture',
    category: 'API_SYSTEMS_INTEGRATION',
    title: 'API Architecture & Enterprise Systems Integration',
    tagline: 'Robust, resilient API backbones connecting ERPs, CRMs, payment networks, and legacy cores.',
    description:
      'We design RESTful, GraphQL, and event-driven API gateways that handle millions of requests without degradation. Featuring automatic circuit breakers, distributed rate limiting, and comprehensive OpenAPI/Swagger documentation.',
    proofBadge: '< 18ms p99 Gateway Latency',
    slaMetric: '99.999% Core Highway Uptime',
    keyDeliverables: [
      'Contract-first OpenAPI & GraphQL schema design',
      'High-throughput message queuing with Apache Kafka & RabbitMQ',
      'Distributed Redis caching with smart cache invalidation',
      'Seamless bi-directional synchronization with Salesforce, SAP, and NetSuite',
    ],
    techStack: ['Go / Node.js', 'GraphQL', 'Kafka', 'Redis', 'PostgreSQL', 'Kong Gateway'],
    architectureBlueprint: {
      frontend: 'Client SDK generation with TypeScript type-safety from schema contracts',
      backend: 'Asynchronous event bus with idempotent worker queues and dead-letter queues',
      database: 'Transactional PostgreSQL with Redis distributed locking and caches',
      security: 'Mutual TLS (mTLS), HMAC payload signatures, and IP whitelisting',
      observability: 'Distributed request tracing with OpenTelemetry and Jaeger',
    },
  },
  {
    id: 'cloud-security-ops',
    category: 'CLOUD_SECURITY_DEVSECOPS',
    title: 'Cloud Operations, Web Security & Speed Acceleration',
    tagline: 'Enterprise Cloud Application Firewall (WAF), automated DevSecOps, and global edge delivery.',
    description:
      'We harden infrastructure against advanced threats, DDoS floods, and zero-day vulnerabilities. Implementing Infrastructure as Code (Terraform), continuous vulnerability scanning, and multi-region CDN caching for sub-second global load times.',
    proofBadge: '< 1-Hour SLA Incident Response',
    slaMetric: 'Zero Unplanned Downtime',
    keyDeliverables: [
      'Cloudflare Enterprise / AWS WAF managed rule enforcement',
      'Zero-trust network architecture with automated SSL/TLS rotation',
      'Terraform & GitHub Actions CI/CD pipelines with automated security scans',
      'SOC-2 Type II, HIPAA, and PCI-DSS readiness compliance audits',
    ],
    techStack: ['AWS', 'Cloudflare WAF', 'Terraform', 'Kubernetes', 'Datadog', 'GitHub Actions'],
    architectureBlueprint: {
      frontend: 'Global CDN edge with Brotli compression and immutable cache-control headers',
      backend: 'Private VPC subnets with NAT gateways and strict security group ingress',
      database: 'Multi-AZ encrypted RDS databases with automated point-in-time recovery',
      security: 'AWS WAF rate limiting, Bot Control, and OWASP Top 10 automated shielding',
      observability: '24/7 PagerDuty alerts, AWS CloudWatch alarms, and Datadog SIEM',
    },
  },
];

export const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    id: 'fintech',
    name: 'FinTech & Capital Markets',
    badge: 'PCI-DSS & SOC-2 Ready',
    challenge: 'High-frequency transactions, strict regulatory audits, and zero tolerance for data discrepancies or race conditions.',
    architectureSolution: 'Double-entry ledger databases, distributed ACID transactions, event-sourcing with Kafka, and automated fraud-detection rules.',
    complianceStandards: ['PCI-DSS Level 1', 'SOC-2 Type II', 'GLBA', 'FinCEN BSA/AML'],
    provenImpact: {
      metric: '45,000 QPS',
      label: 'Sustained throughput with zero ledger mismatch',
    },
    technologies: ['Node.js / Go', 'PostgreSQL Ledger', 'Kafka', 'Redis Cluster', 'AWS Nitro Enclaves'],
    sampleCase: 'Built algorithmic lending gateway processing $1.2B annually with automated KYC/AML verification.',
  },
  {
    id: 'healthcare',
    name: 'HealthTech & Digital Health',
    badge: 'HIPAA & BAA Compliant',
    challenge: 'Protected Health Information (PHI) privacy, FHIR/HL7 interoperability, and clinician workflow overload.',
    architectureSolution: 'End-to-end encrypted telehealth pipelines, FHIR-compliant API middleware, and HIPAA-governed AI clinical note summarization.',
    complianceStandards: ['HIPAA BAA', 'HITECH', 'FDA 21 CFR Part 11', 'SOC-2 Type II'],
    provenImpact: {
      metric: '62% Reduction',
      label: 'In physician documentation time via automated AI triage',
    },
    technologies: ['Next.js', 'Python FastAPI', 'AWS HealthLake', 'PostgreSQL Encrypted', 'Pinecone RAG'],
    sampleCase: 'Telehealth platform connecting 120,000+ active patients with verified EMR integrations and sub-second triage.',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & High-Volume Retail',
    badge: 'Sub-Second Global P95',
    challenge: 'Flash sale traffic spikes, dynamic multi-warehouse inventory race conditions, and abandoned cart friction.',
    architectureSolution: 'Edge-rendered Next.js storefronts, Redis distributed inventory reservations, and headless checkout integrations.',
    complianceStandards: ['PCI-DSS L1', 'GDPR', 'CCPA', 'ADA Title III Compliance'],
    provenImpact: {
      metric: '+34% Lift',
      label: 'In checkout conversion during Peak Black Friday traffic',
    },
    technologies: ['Next.js App Router', 'Stripe Elements', 'Algolia AI Search', 'Redis', 'AWS CloudFront'],
    sampleCase: 'Custom omnichannel commerce system serving 8M monthly sessions across 14 international currencies.',
  },
  {
    id: 'realestate',
    name: 'PropTech & Commercial Real Estate',
    badge: 'GIS & Financial Modeling',
    challenge: 'Disparate MLS syndications, large geospatial shapefiles, and multi-variable financial underwriting engines.',
    architectureSolution: 'PostGIS spatial databases, automated MLS ingestion pipelines, interactive vector map layers, and multi-tenant investor portals.',
    complianceStandards: ['RESO Web API Standards', 'SOC-2 Type II', 'ADA Web Accessibility'],
    provenImpact: {
      metric: '88% Faster',
      label: 'Underwriting model generation for commercial portfolios',
    },
    technologies: ['PostgreSQL / PostGIS', 'Mapbox GL', 'React 19', 'Python Pandas', 'FastAPI'],
    sampleCase: 'Commercial investment portal managing $4.8B in pipeline assets with real-time demographic analytics.',
  },
  {
    id: 'supplychain',
    name: 'Supply Chain, Logistics & Fleet',
    badge: 'IoT & Telemetry At Scale',
    challenge: 'Fragmented carrier APIs, offline warehouse environments, and delayed route visibility leading to costly supply bottlenecks.',
    architectureSolution: 'Offline-first Progressive Web Apps (PWA), real-time MQTT telemetry pipelines, and predictive ETAs using machine learning.',
    complianceStandards: ['ISO 27001', 'C-TPAT Security Standards', 'DOT Compliance'],
    provenImpact: {
      metric: '21% Fuel & Route Cost',
      label: 'Reduction across active fleet of 2,400 vehicles',
    },
    technologies: ['Next.js PWA', 'MQTT Broker', 'AWS IoT Core', 'TimeScaleDB', 'Docker'],
    sampleCase: 'Cross-border logistics management engine syncing 35,000 daily bill-of-lading documents automatically.',
  },
];

export const VERIFIED_CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'fintech-apex-vault',
    clientName: 'StrataPay Technologies',
    industry: 'FinTech / Payments Infrastructure',
    headline: 'Scaling Real-Time Cross-Border Settlement to 45k Transactions/Sec',
    challenge: 'Legacy Ruby monolith was failing under international merchant volume, incurring $180k/month in cloud overages and fragile database locks.',
    solution: 'Engineered an event-driven Go + Next.js architecture with PostgreSQL connection multiplexing, idempotent transaction processing, and automated ledger balancing.',
    primaryResult: '45,000 QPS Sustained Throughput',
    secondaryResult: '-64% AWS Cloud Expenditure',
    technologies: ['Next.js', 'Go', 'PostgreSQL', 'Redis', 'AWS ECS', 'Cloudflare WAF'],
    quote: 'ApexLogic was not an outsourcing vendor; they operated as our elite elite core engineering squad. They delivered our entire payment gateway 3 weeks ahead of deadline with zero launch defects.',
    author: 'David Sterling',
    role: 'Chief Technology Officer, StrataPay',
    rating: 5.0,
  },
  {
    id: 'health-care-triage',
    clientName: 'Vitalis Health Network',
    industry: 'Digital Health / Telemedicine',
    headline: 'Autonomous Clinical Intake & RAG Patient Triage System',
    challenge: 'Physicians spent 3.5 hours per shift transcribing and analyzing intake data, leading to severe clinician burnout and delayed critical care.',
    solution: 'Designed a HIPAA-compliant hybrid RAG pipeline using LangChain, Pinecone, and Gemini Pro with human-in-the-loop validation and FHIR interoperability.',
    primaryResult: '62% Documentation Time Saved',
    secondaryResult: '99.4% Clinical Summary Accuracy',
    technologies: ['React', 'FastAPI', 'Pinecone', 'Gemini Pro', 'HIPAA BAA Cloud', 'Docker'],
    quote: 'The AI triage platform built by ApexLogic transformed our clinical operations. Our physicians reclaimed hours of their day, and patient turnaround reached record highs.',
    author: 'Dr. Elena Rostova',
    role: 'VP of Medical Informatics, Vitalis Health',
    rating: 5.0,
  },
  {
    id: 'saas-omni-scale',
    clientName: 'Kura Operations Cloud',
    industry: 'B2B Enterprise SaaS',
    headline: 'Architecting an Enterprise Multi-Tenant SaaS Platform from Zero to $14M ARR',
    challenge: 'Founders had validated enterprise demand but lacked internal engineering bandwidth to build SOC-2 compliant multi-tenant architecture before Series A.',
    solution: 'Designed and shipped the complete product in 7 weeks: tenant isolation schemas, granular permission matrix, Stripe subscription billing, and real-time analytics dashboard.',
    primaryResult: '7 Weeks to Commercial Production',
    secondaryResult: '$14M ARR Scaled in 18 Months',
    technologies: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe Billing', 'AWS WAF'],
    quote: 'ApexLogic gave us the engineering firepower of a 20-person senior engineering team. Investors were stunned by the polish and architectural rigor of our codebase.',
    author: 'Julian Vance',
    role: 'Co-Founder & CEO, Kura Cloud',
    rating: 5.0,
  },
];

export const AGENCY_STATS = [
  { label: 'On-Time SLA Delivery', value: '100%', detail: 'Backed by contractual sprint milestones' },
  { label: 'Client Valuation Created', value: '$140M+', detail: 'Across venture and bootstrapped portfolio' },
  { label: 'Production Uptime SLA', value: '99.99%', detail: 'Global multi-region cloud failover' },
  { label: 'Incident Response Time', value: '< 1-Hour', detail: '24/7 dedicated engineering on-call' },
];

export const VERIFIED_BADGES = [
  { name: 'Clutch Top Developer 2026', score: '4.9 / 5.0 (38 Verified Reviews)' },
  { name: 'SOC-2 Type II Certified Process', score: 'Enterprise Security Assured' },
  { name: 'AWS Advanced Partner Tier', score: 'Certified Cloud Architects' },
  { name: 'Google Cloud Certified', score: 'Enterprise AI & Cloud Security' },
];
