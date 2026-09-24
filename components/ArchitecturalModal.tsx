'use client';

import React from 'react';
import { X, Layers, Cpu, Server, Database, Shield, Activity, ArrowRight, Check } from 'lucide-react';
import { ServiceCardData } from '@/lib/types';

interface ArchitecturalModalProps {
  service: ServiceCardData | null;
  onClose: () => void;
  onSelectPracticeForInquiry: (service: ServiceCardData) => void;
}

export function ArchitecturalModal({ service, onClose, onSelectPracticeForInquiry }: ArchitecturalModalProps) {
  if (!service) return null;

  return (
    <div
      id="architecture-blueprint-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          id="btn-close-blueprint-modal"
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Layers className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL BLUEPRINT SPECIFICATION</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{service.title}</h3>
          <p className="text-sm text-slate-300">{service.tagline}</p>
        </div>

        {/* Blueprint Specifications Grid */}
        <div className="space-y-3 font-mono text-xs">
          {/* Frontend */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>1. FRONTEND / CLIENT RUNTIME</span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {service.architectureBlueprint.frontend}
            </p>
          </div>

          {/* Backend */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>2. BACKEND & API GATEWAY</span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {service.architectureBlueprint.backend}
            </p>
          </div>

          {/* Database */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-cyan-400 font-semibold mb-1 flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>3. DATA LAYER & PERSISTENCE</span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {service.architectureBlueprint.database}
            </p>
          </div>

          {/* Security */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-emerald-400 font-semibold mb-1 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>4. PERIMETER SECURITY & COMPLIANCE</span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {service.architectureBlueprint.security}
            </p>
          </div>

          {/* Observability */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-purple-400 font-semibold mb-1 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>5. OBSERVABILITY & SLA MONITORING</span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {service.architectureBlueprint.observability}
            </p>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="pt-2">
          <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
            Scope Guarantees:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.keyDeliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-400">
            Verified SLA: <span className="text-emerald-400 font-semibold">{service.slaMetric}</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onSelectPracticeForInquiry(service);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-900/30"
          >
            <span>Proceed to Scope Estimator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
