'use client';

import React, { useState } from 'react';
import { Terminal, Database, Shield, FileCode2, Copy, Check, Server, Lock, Cpu, Globe } from 'lucide-react';

export function TechSpecsDocs() {
  const [activeTab, setActiveTab] = useState<'block1' | 'block2' | 'block3' | 'block4' | 'block5'>('block1');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tech-specs-docs" className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>CTO & VP ENGINEERING TECHNICAL DOSSIER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Production Engineering Deliverables & Architecture Blueprints
          </h2>
          <p className="text-sm text-slate-300">
            Review the exact directory layout, PostgreSQL Prisma schemas, rate-limited API handlers, component
            structures, and Cloudflare/AWS WAF deployment guides powering our agency client builds.
          </p>
        </div>

        {/* Deliverable Block Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 mb-6">
          {[
            { id: 'block1', label: 'Block 1: Directory Layout', icon: <FileCode2 className="w-3.5 h-3.5" /> },
            { id: 'block2', label: 'Block 2: Database & Prisma Schema', icon: <Database className="w-3.5 h-3.5" /> },
            { id: 'block3', label: 'Block 3: API Route Handlers', icon: <Server className="w-3.5 h-3.5" /> },
            { id: 'block4', label: 'Block 4: Component Architecture', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'block5', label: 'Block 5: WAF & Cloud Security', icon: <Shield className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-600 text-white font-semibold shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 overflow-hidden">
          {activeTab === 'block1' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">Block 1: Production Directory & File Tree Architecture</span>
                <span className="text-[11px] font-mono text-slate-500">Next.js 15 App Router</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`├── app/
│   ├── api/
│   │   ├── contact/route.ts        # Lead intake validation, rate limiting & notifications
│   │   ├── health/route.ts         # 24/7 uptime health endpoint & WAF diagnostic telemetry
│   │   └── ai/analyze/route.ts     # Intelligent customer inquiry parsing via Gemini / RAG
│   ├── globals.css                 # Deep Slate Navy design system & Tailwind v4
│   ├── layout.tsx                  # Root HTML entry point & sync with metadata.json
│   └── page.tsx                    # Production agency portal
├── components/
│   ├── Navbar.tsx                  # Sticky navy header, LLC branding & live SLA status
│   ├── HeroSection.tsx             # Dual CTAs, real-time telemetry card & proof stats
│   ├── ServicesGrid.tsx            # 3-column interactive grid with proof impact badges
│   ├── IndustrySolutions.tsx       # Sector tabs (FinTech, Health, Commerce) + compliance
│   ├── CaseStudies.tsx             # Verified client proof, tech tags & 5-star Clutch badges
│   ├── ContactForm.tsx             # 4-step lead intake form with live AI scope estimator
│   ├── SystemTelemetry.tsx         # Live infrastructure & WAF observability metrics
│   ├── ArchitecturalModal.tsx      # Deep technical blueprint inspector
│   ├── TechSpecsDocs.tsx           # Technical deliverables & architecture reference
│   └── Footer.tsx                  # LLC legal disclaimers, GDPR handling, Austin/SF offices
├── lib/
│   ├── agency-data.ts              # Knowledge base, case proof, and services catalog
│   ├── leads-store.ts              # Resilient repository, in-memory buffer & rate-limiter
│   ├── types.ts                    # Strict domain interfaces and telemetry models
│   └── utils.ts                    # Class name merging utility (cn)
├── prisma/
│   ├── schema.prisma               # PostgreSQL schema for leads, analytics & portfolio
│   └── init.sql                    # Pure PostgreSQL DDL definitions & UUID extensions
└── docs/
    └── deployment-security-guide.md # WAF configuration, SSL, and CDN caching guides`}
              </pre>
            </div>
          )}

          {activeTab === 'block2' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">Block 2: Enterprise Prisma & PostgreSQL Schema Definition</span>
                <span className="text-[11px] font-mono text-slate-500">PostgreSQL 14+ / Neon / Cloud SQL</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[450px]">
{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Lead {
  id                    String                 @id @default(uuid())
  createdAt             DateTime               @default(now())
  updatedAt             DateTime               @updatedAt
  fullName              String
  workEmail             String
  companyName           String
  companyRole           String
  category              ProjectCategory
  budgetRange           BudgetRange
  timeline              TargetTimeline
  complianceNeeded      ComplianceRequirement  @default(NONE)
  projectDescription    String                 @db.Text
  qualificationScore    Int                    @default(70)
  status                LeadStatus             @default(NEW_UNQUALIFIED)

  @@index([workEmail])
  @@index([status])
  @@map("leads")
}

model SystemHealthLog {
  id                    String                 @id @default(uuid())
  timestamp             DateTime               @default(now())
  endpointTested        String                 @default("/api/health")
  statusCode            Int                    @default(200)
  responseTimeMs        Float
  wafStatus             String                 @default("ACTIVE_PROTECT")
  rateLimitLoadPercent  Float                  @default(12.4)
  activeInstances       Int                    @default(4)

  @@index([timestamp])
  @@map("system_health_logs")
}`}
              </pre>
            </div>
          )}

          {activeTab === 'block3' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">Block 3: API Route Handler with Rate Limiting & Validation</span>
                <span className="text-[11px] font-mono text-slate-500">/api/contact/route.ts</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[450px]">
{`export async function POST(req: NextRequest) {
  // 1. Enforce IP-based rate limiting (5 submissions / min)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
  const rateLimit = checkRateLimit(ip, 5, 60000);
  if (!rateLimit.allowed) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded.' }, { status: 429 });
  }

  // 2. Strict Input Sanitization & Email RFC validation
  const body = await req.json();
  const workEmail = sanitize(body.workEmail);
  if (!isValidEmail(workEmail)) {
    return NextResponse.json({ success: false, error: 'Valid work email required.' }, { status: 400 });
  }

  // 3. Persist Lead and return SLA confirmation window
  const newLead = saveLead(body);
  return NextResponse.json({
    success: true,
    message: 'Inquiry received. A Principal Solutions Architect will review within 1 hour.',
    leadId: newLead.id,
    slaWindow: '< 1-Hour Guaranteed Response',
  }, { status: 201 });
}`}
              </pre>
            </div>
          )}

          {activeTab === 'block4' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">Block 4: Component Architecture & WCAG AA Design Tokens</span>
                <span className="text-[11px] font-mono text-slate-500">React 19 + Tailwind CSS</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">ServicesGrid.tsx</div>
                  <p className="font-sans text-slate-300 text-[11px]">
                    3-column grid mapping 6 core practices with quantifiable impact badges (e.g. 75% Acceleration),
                    tech tags, and interactive blueprint inspection triggers.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">HeroSection.tsx</div>
                  <p className="font-sans text-slate-300 text-[11px]">
                    High-converting enterprise headline, dual CTA buttons, four contractual proof stats, and live
                    system terminal telemetry simulation.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">ContactForm.tsx</div>
                  <p className="font-sans text-slate-300 text-[11px]">
                    4-step intake wizard with domain selection, budget tiers, compliance checklists, and instant
                    AI-powered scope and risk evaluation via Gemini.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'block5' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">Block 5: Enterprise WAF, CDN & Global Security Configuration</span>
                <span className="text-[11px] font-mono text-slate-500">Cloudflare Enterprise + AWS WAFv2</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[450px]">
{`# 1. AWS WAFv2 Managed Rule Sets (Terraform sample):
resource "aws_wafv2_web_acl" "agency_perimeter" {
  name  = "apexlogic-production-waf"
  scope = "REGIONAL"

  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1
    override_action { none {} }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
  }

  rule {
    name     = "RateLimitPerIP"
    priority = 2
    action { block {} }
    statement {
      rate_based_statement {
        limit              = 300
        aggregate_key_type = "IP"
      }
    }
  }
}

# 2. Edge CDN Cache-Control Headers:
# Static Assets: Cache-Control: public, max-age=31536000, immutable
# API Routes:    Cache-Control: no-store, max-age=0, must-revalidate
# Security:      Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
