'use client';

import React from 'react';
import {
  Code,
  Boxes,
  Cpu,
  Palette,
  Network,
  ShieldAlert,
  ArrowRight,
  Check,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { CORE_SERVICES } from '@/lib/agency-data';
import { ServiceCardData } from '@/lib/types';

interface ServicesGridProps {
  onSelectService: (service: ServiceCardData) => void;
  onInitiateInquiry: (service: ServiceCardData) => void;
}

export function ServicesGrid({ onSelectService, onInitiateInquiry }: ServicesGridProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'custom-web-apps':
        return <Code className="w-6 h-6 text-cyan-400" />;
      case 'rapid-mvp-saas':
        return <Boxes className="w-6 h-6 text-blue-400" />;
      case 'ai-workflow-agents':
        return <Cpu className="w-6 h-6 text-purple-400" />;
      case 'ui-ux-prototyping':
        return <Palette className="w-6 h-6 text-emerald-400" />;
      case 'api-architecture':
        return <Network className="w-6 h-6 text-amber-400" />;
      case 'cloud-security-ops':
        return <ShieldAlert className="w-6 h-6 text-cyan-400" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="core-services" className="py-24 bg-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400">
            <span>FULL-LIFECYCLE ENGINEERING SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            High-Performance Digital Engineering Built for Mission-Critical Workloads
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every practice is staffed by senior systems engineers, certified cloud architects, and veteran product
            designers. We deliver verified business ROI backed by contractual SLAs.
          </p>
        </div>

        {/* 3-Column Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="rounded-2xl bg-[#1E293B]/70 hover:bg-[#1E293B] border border-slate-700/80 hover:border-cyan-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:shadow-cyan-950/40 group relative overflow-hidden"
            >
              {/* Top Row: Icon & Quantifiable Proof Badge */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/90 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.id)}
                  </div>
                  {/* Proof-Point Impact Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {service.proofBadge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors mb-2.5">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{service.description}</p>

                {/* SLA Commitment Pill */}
                <div className="mb-6 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{service.slaMetric}</span>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                    Core Technical Deliverables:
                  </span>
                  {service.keyDeliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="pt-2 pb-6 flex flex-wrap gap-1.5">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions: Inspect Blueprint & Engage */}
              <div className="pt-5 border-t border-slate-700/60 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectService(service)}
                  id={`btn-inspect-blueprint-${service.id}`}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors focus:outline-none"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Blueprint</span>
                </button>

                <button
                  onClick={() => onInitiateInquiry(service)}
                  id={`btn-quote-${service.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-medium transition-all flex items-center gap-1"
                >
                  <span>Scope Practice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
