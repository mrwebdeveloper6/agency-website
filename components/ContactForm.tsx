'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Layers,
  FileText,
} from 'lucide-react';
import { ProjectCategory, BudgetTier, TimelineOption, ComplianceStandard } from '@/lib/types';

interface ContactFormProps {
  preselectedCategory?: ProjectCategory;
}

export function ContactForm({ preselectedCategory }: ContactFormProps) {
  // Step tracker: 1 -> 2 -> 3 -> 4 -> Complete
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form fields
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>(
    preselectedCategory || 'CUSTOM_WEB_APPLICATION'
  );
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('TIER_2_30K_TO_75K');
  const [timeline, setTimeline] = useState<TimelineOption>('STANDARD_1_TO_3_MONTHS');
  const [complianceNeeded, setComplianceNeeded] = useState<ComplianceStandard>('NONE');

  const [projectDescription, setProjectDescription] = useState<string>('');
  const [existingStack, setExistingStack] = useState<string>('');

  const [fullName, setFullName] = useState<string>('');
  const [workEmail, setWorkEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [companyRole, setCompanyRole] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // AI Scope Analysis state
  const [analyzingScope, setAnalyzingScope] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  // Submission state
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  // Call AI Scope Analyzer endpoint
  const handleRunAiAnalysis = async () => {
    if (!projectDescription || projectDescription.length < 15) {
      setErrorMessage('Please provide at least 15 characters of project description before running the AI Scope Analyzer.');
      return;
    }

    setErrorMessage(null);
    setAnalyzingScope(true);

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: projectCategory,
          budgetTier,
          timeline,
          compliance: complianceNeeded,
          description: projectDescription,
          existingStack,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        setErrorMessage(data.error || 'Unable to generate automated scope.');
      }
    } catch (err) {
      console.error('Error running AI scope analyzer:', err);
      setErrorMessage('Network or server error running AI analysis.');
    } finally {
      setAnalyzingScope(false);
    }
  };

  // Submit Lead Intake to /api/contact
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate Step 4
    if (!fullName || fullName.length < 2) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!workEmail || !workEmail.includes('@')) {
      setErrorMessage('Please provide a valid work email.');
      return;
    }
    if (!companyName) {
      setErrorMessage('Please enter your company name.');
      return;
    }
    if (!companyRole) {
      setErrorMessage('Please specify your role (e.g., CTO, Founder, VP Eng).');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          workEmail,
          companyName,
          companyRole,
          phoneNumber,
          projectCategory,
          budgetTier,
          timeline,
          complianceNeeded,
          projectDescription,
          existingStack,
          aiAnalysis,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmissionResult(data);
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('An unexpected network error occurred while transmitting your inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  // Render Completed State
  if (submissionResult) {
    return (
      <div
        id="lead-submission-success"
        className="rounded-2xl bg-slate-900 border border-emerald-500/50 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>{submissionResult.slaWindow || '< 1-Hour SLA Review'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Architecture Specifications Transmitted
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Thank you, <span className="text-white font-semibold">{fullName}</span>. Your technical dossier for{' '}
          <span className="text-cyan-400 font-semibold">{companyName}</span> has been dispatched to our Principal
          Engineering Directorate.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-xs text-slate-300 space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-slate-500">Tracking Reference ID:</span>
            <span className="text-cyan-400 font-bold">{submissionResult.leadId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Qualification Score:</span>
            <span className="text-emerald-400">{submissionResult.qualificationScore} / 100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">SLA Response Window:</span>
            <span className="text-slate-200">Under 60 Minutes (M-F 8am - 8pm EST)</span>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmissionResult(null);
            setCurrentStep(1);
            setProjectDescription('');
            setAiAnalysis(null);
          }}
          className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
        >
          Submit Another Technical Brief
        </button>
      </div>
    );
  }

  return (
    <div id="contact-intake-form-wrapper" className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>STEP {currentStep} OF 4</span>
          <span>
            {currentStep === 1 && 'Domain & Capability Focus'}
            {currentStep === 2 && 'Budget & Target Velocity'}
            {currentStep === 3 && 'Technical Scope & AI Architecture'}
            {currentStep === 4 && 'Enterprise Contact Details'}
          </span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="rounded-2xl bg-[#1E293B]/80 border border-slate-700/80 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitLead}>
          {/* STEP 1: Project Category */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Select Primary Engineering Engagement</h3>
                <p className="text-xs text-slate-400">
                  Choose the core discipline that best matches your immediate architecture or product objectives.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    id: 'CUSTOM_WEB_APPLICATION',
                    label: 'Custom Web & Enterprise Software',
                    desc: 'Scalable microservices, internal tools, high-concurrency portals.',
                  },
                  {
                    id: 'RAPID_MVP_SAAS',
                    label: 'Rapid MVP & Multi-Tenant SaaS',
                    desc: '4-8 week speed-to-market with tenant schema isolation and Stripe.',
                  },
                  {
                    id: 'AUTONOMOUS_AI_AGENTS',
                    label: 'AI Systems & Autonomous Agents',
                    desc: 'Custom RAG pipelines, vector search, LLM integrations & guardrails.',
                  },
                  {
                    id: 'UI_UX_PROTOTYPING',
                    label: 'Goal-Focused UI/UX & Prototyping',
                    desc: 'Framer kinetic prototypes, WCAG AA tokenized design systems.',
                  },
                  {
                    id: 'API_SYSTEMS_INTEGRATION',
                    label: 'API Gateway & Core Integrations',
                    desc: 'Kafka event streaming, GraphQL/REST highways, ERP connectors.',
                  },
                  {
                    id: 'CLOUD_SECURITY_DEVSECOPS',
                    label: 'Cloud Infrastructure & WAF Security',
                    desc: 'Terraform IaC, Cloudflare WAF, SOC-2 compliance & speed optimization.',
                  },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setProjectCategory(item.id as ProjectCategory)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      projectCategory === item.id
                        ? 'bg-cyan-950/70 border-cyan-500 shadow-md shadow-cyan-950/50 text-white'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-sm flex items-center justify-between">
                      <span>{item.label}</span>
                      {projectCategory === item.id && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-md shadow-cyan-900/30"
                >
                  <span>Continue to Budget & Velocity</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Budget & Velocity */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Target Budget Tier & Delivery Velocity</h3>
                <p className="text-xs text-slate-400">
                  Our transparent pricing structures align with your execution timeline and engineering requirements.
                </p>
              </div>

              {/* Budget Tiers */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                  Capital Allocation Budget:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'TIER_1_15K_TO_30K', label: '$15k – $30k', sub: 'Targeted MVP Sprint or Architecture Audit' },
                    { id: 'TIER_2_30K_TO_75K', label: '$30k – $75k', sub: 'Complete Commercial SaaS / AI Pipeline Build' },
                    { id: 'TIER_3_75K_TO_200K', label: '$75k – $200k', sub: 'Enterprise Multi-Tenant Scaled Platform' },
                    { id: 'TIER_4_200K_PLUS', label: '$200k+', sub: 'Large-Scale Digital Transformation / Dedicated Team' },
                  ].map((tier) => (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setBudgetTier(tier.id as BudgetTier)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        budgetTier === tier.id
                          ? 'bg-cyan-950/70 border-cyan-500 text-white'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm font-mono text-cyan-300">{tier.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{tier.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Options */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                  Target Launch Velocity:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'IMMEDIATE_UNDER_4_WEEKS', label: '< 4 Weeks (Sprint)' },
                    { id: 'STANDARD_1_TO_3_MONTHS', label: '1 - 3 Months' },
                    { id: 'STRATEGIC_3_TO_6_MONTHS', label: '3 - 6 Months' },
                    { id: 'LONG_TERM_ROADMAP', label: 'Ongoing Retainer' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTimeline(t.id as TimelineOption)}
                      className={`p-3 rounded-lg border text-xs font-mono text-center transition-all ${
                        timeline === t.id
                          ? 'bg-cyan-600 border-cyan-400 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-md shadow-cyan-900/30"
                >
                  <span>Continue to Technical Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Technical Scope & Live AI Scope Estimator */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Project Scope & Technical Specifications</h3>
                <p className="text-xs text-slate-400">
                  Outline your requirements. You can run our AI Architectural Estimator to generate an instant technical
                  complexity breakdown.
                </p>
              </div>

              {/* Compliance Standard */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                  Mandatory Security / Regulatory Compliance:
                </label>
                <select
                  value={complianceNeeded}
                  onChange={(e) => setComplianceNeeded(e.target.value as ComplianceStandard)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="NONE">Standard Enterprise Security (OWASP Top 10 + SSL)</option>
                  <option value="SOC2_TYPE_II">SOC-2 Type II Audit Readiness</option>
                  <option value="HIPAA_BAA">HIPAA BAA (Protected Health Information)</option>
                  <option value="PCI_DSS_L1">PCI-DSS Level 1 (Credit Cards & Payments)</option>
                  <option value="GDPR_CCPA">GDPR & CCPA Strict Privacy Protection</option>
                  <option value="ISO_27001">ISO 27001 Information Security Management</option>
                </select>
              </div>

              {/* Description Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono uppercase text-slate-300 font-semibold">
                    Describe Project Goals & Functional Scope: *
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {projectDescription.length} characters
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="e.g. We need to build a multi-tenant B2B analytics portal with customer authentication, Stripe subscription billing, and an automated RAG assistant for querying PDF reports..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              {/* Existing Tech Stack */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                  Existing Tech Stack / Legacy Systems (Optional):
                </label>
                <input
                  type="text"
                  value={existingStack}
                  onChange={(e) => setExistingStack(e.target.value)}
                  placeholder="e.g. React, Node.js, PostgreSQL, AWS RDS, Docker (or Greenfield)"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Instant AI Scope Estimator Trigger */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Run AI Architectural Estimator</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Get an instant AI-powered complexity analysis, estimated sprint velocity, and risk mitigations.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRunAiAnalysis}
                  disabled={analyzingScope}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shrink-0 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {analyzingScope ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing Scope...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate Blueprint</span>
                    </>
                  )}
                </button>
              </div>

              {/* Render AI Scope Result if present */}
              {aiAnalysis && (
                <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/50 space-y-3 font-mono text-xs animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI ARCHITECTURAL ASSESSMENT
                    </span>
                    <span className="text-emerald-400 text-[11px]">Validated Heuristic</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block">Estimated Velocity:</span>
                      <span className="text-slate-200 font-semibold">{aiAnalysis.estimatedVelocity}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Technical Complexity:</span>
                      <span className="text-cyan-300 font-semibold">{aiAnalysis.technicalComplexity}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Architectural Recommendation:</span>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed mt-0.5">
                      {aiAnalysis.architecturalRecommendation}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Suggested Production Stack:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {aiAnalysis.suggestedStack?.map((s: string) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!projectDescription || projectDescription.length < 15) {
                      setErrorMessage('Please provide at least 15 characters of project description.');
                      return;
                    }
                    setErrorMessage(null);
                    setCurrentStep(4);
                  }}
                  className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-md shadow-cyan-900/30"
                >
                  <span>Continue to Executive Contact</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Executive Contact Details & Submission */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Executive Contact Information</h3>
                <p className="text-xs text-slate-400">
                  Where should our Principal Engineering Lead transmit your architectural dossier and calendar link?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                    Full Name: *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                    Work Email (Corporate): *
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="s.jenkins@enterprise.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                    Company / Organization Name: *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Nexus FinTech Corp"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                    Executive Role / Title: *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyRole}
                    onChange={(e) => setCompanyRole(e.target.value)}
                    placeholder="e.g. CTO, VP of Engineering, Founder"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-mono uppercase text-slate-300 font-semibold block">
                    Direct Phone Number (Optional):
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* NDA and Security Guarantee */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-2 text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Enterprise Non-Disclosure Agreement (NDA) Guarantee</span>
                </div>
                <p>
                  All submitted technical details are held strictly confidential under our mutual enterprise confidentiality
                  protocols. We do not sell data or share code repositories.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-900/40 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Specs...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Technical Inquiry (&lt; 1hr SLA)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
