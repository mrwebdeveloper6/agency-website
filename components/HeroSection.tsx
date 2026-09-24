'use client';

import React from 'react';
import { Shield, Zap, CheckCircle2, ArrowRight, Terminal, Lock, Server, Sparkles, Cpu } from 'lucide-react';
import { AGENCY_STATS } from '@/lib/agency-data';

interface HeroSectionProps {
  onOpenEstimator: () => void;
  onOpenDiscovery: () => void;
}

export function HeroSection({ onOpenEstimator, onOpenDiscovery }: HeroSectionProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0F172A] border-b border-slate-800/80"
    >
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle radial cyan glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & Dual CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Trust / Entity Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-cyan-400 font-semibold uppercase tracking-wider text-[11px]">US-Registered LLC</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">Contractual SLA Guarantees & ISO/SOC-2 Process</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Engineering Scalable,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                AI-First Digital Products
              </span>{' '}
              Built to Win
            </h1>

            {/* Subheading targeted at Founders, CTOs, and VPs of Engineering */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              We partner with visionary founders and enterprise engineering leaders to build custom web applications,
              multi-tenant SaaS platforms, autonomous AI workflows, and battle-hardened cloud security. Zero technical
              debt. Rapid two-week sprint velocity.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-primary-cta"
                onClick={onOpenDiscovery}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-cyan-900/40 transition-all transform active:scale-[0.98] border border-cyan-400/40"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-cyan-200" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onOpenEstimator}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base tracking-wide border border-slate-700/80 shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Run AI Scope Estimator</span>
              </button>
            </div>

            {/* Quick Proof Highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NDA Protected Before Ingestion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% US LLC IP Ownership Transfer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct Slack Channel with Principal Leads</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive System Telemetry Card */}
          <div className="lg:col-span-5">
            <div
              id="hero-telemetry-preview"
              className="rounded-2xl bg-slate-900/95 border border-slate-700/80 p-5 sm:p-6 shadow-2xl shadow-black/50 relative overflow-hidden backdrop-blur-md"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">apexlogic-cluster-edge::status</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE 99.99%
                </span>
              </div>

              {/* Terminal / Metric Rows */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    Global Edge Microservices
                  </span>
                  <span className="text-cyan-300 font-semibold">18 Regions (Active-Active)</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    P95 Global Latency
                  </span>
                  <span className="text-emerald-400 font-semibold">14.8 ms (Sub-second)</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    WAF Rule Firewall
                  </span>
                  <span className="text-slate-200">OWASP Top 10 + Bot Shield</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    AI Inference Pipeline
                  </span>
                  <span className="text-purple-300">RAG Hybrid Vector Mesh</span>
                </div>
              </div>

              {/* Live Status Command Output */}
              <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
                <div className="text-cyan-400">$ apexctl verify --sla-compliance</div>
                <div className="text-emerald-400">✓ 100% Sprint Milestones Met on Contract</div>
                <div className="text-slate-400">✓ Zero Unplanned Downtime across 42 Production Deployments</div>
                <div className="text-slate-500">$ _ readiness probe passed [200 OK]</div>
              </div>

              {/* Quick Action in Card */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Want an architecture audit?</span>
                <button
                  onClick={() => scrollToSection('contact-intake-section')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  Request Technical Audit <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Proof Stats Grid */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {AGENCY_STATS.map((stat, idx) => (
            <div
              key={idx}
              id={`stat-card-${idx}`}
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                  {stat.value}
                </span>
              </div>
              <div className="text-sm font-semibold text-cyan-400 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
