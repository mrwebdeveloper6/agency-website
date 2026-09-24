'use client';

import React, { useState } from 'react';
import { INDUSTRY_SOLUTIONS } from '@/lib/agency-data';
import { ShieldCheck, ArrowRight, CheckCircle, Database, Lock, Cpu, Globe } from 'lucide-react';

export function IndustrySolutions() {
  const [activeTabId, setActiveTabId] = useState<string>(INDUSTRY_SOLUTIONS[0].id);

  const activeSector = INDUSTRY_SOLUTIONS.find((s) => s.id === activeTabId) || INDUSTRY_SOLUTIONS[0];

  return (
    <section id="industry-solutions" className="py-24 bg-slate-950 border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400">
            <span>DOMAIN-SPECIFIC ARCHITECTURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Regulated Industry Solutions & Compliance Frameworks
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We solve the strict regulatory, data isolation, and low-latency demands of enterprise sectors. Certified for
            HIPAA BAA, PCI-DSS Level 1, and SOC-2 Type II audit readiness.
          </p>
        </div>

        {/* Sector Tabs Bar */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-800">
          {INDUSTRY_SOLUTIONS.map((sector) => (
            <button
              key={sector.id}
              id={`tab-sector-${sector.id}`}
              onClick={() => setActiveTabId(sector.id)}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTabId === sector.id
                  ? 'bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-900/30'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {sector.name}
            </button>
          ))}
        </div>

        {/* Active Sector Deep Dive Card */}
        <div className="mt-8 rounded-2xl bg-[#1E293B]/70 border border-slate-700/80 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Solution & Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold text-white tracking-tight">{activeSector.name}</span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                  {activeSector.badge}
                </span>
              </div>

              {/* Challenge vs Solution */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono uppercase text-red-400 font-semibold mb-1">
                    The Critical Constraint
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{activeSector.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs font-mono uppercase text-cyan-400 font-semibold mb-1">
                    ApexLogic Architectural Blueprint
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{activeSector.architectureSolution}</p>
                </div>
              </div>

              {/* Case Summary */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-900/40">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
                  Representative Shipped System:
                </div>
                <div className="text-sm text-cyan-200 font-medium">{activeSector.sampleCase}</div>
              </div>
            </div>

            {/* Right Column: Impact Metric & Compliance Grid */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quantifiable Impact Block */}
              <div className="p-6 rounded-xl bg-slate-900 border border-slate-700/80 shadow-inner">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Verifiable Sector Benchmark
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono my-2">
                  {activeSector.provenImpact.metric}
                </div>
                <div className="text-sm text-slate-300">{activeSector.provenImpact.label}</div>
              </div>

              {/* Regulatory Compliance Badges */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Compliance Protocols Enforced:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {activeSector.complianceStandards.map((std) => (
                    <div
                      key={std}
                      className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-xs text-slate-200 font-mono"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{std}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
                  Architectural Engine:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeSector.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
