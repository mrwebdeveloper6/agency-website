'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, ArrowUpRight, Lock, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

export function Footer() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <footer id="agency-footer" className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Entity & Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-mono font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white border border-cyan-400/40">
                <Cpu className="w-4 h-4" />
              </div>
              <span>APEXLOGIC DIGITAL ENGINEERING LLC</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A premier United States registered digital product engineering and enterprise AI systems agency. We build
              fault-tolerant web applications, multi-tenant SaaS backbones, and autonomous AI agents for high-growth
              enterprises.
            </p>

            {/* Legal Entity Disclosures */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 font-mono text-[11px]">
              <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Registered Entity Legal Status:</span>
              </div>
              <div className="text-slate-400">Delaware LLC Filing Entity ID: #7491028</div>
              <div className="text-slate-400">DUNS & SAM.gov Registered Technical Contractor</div>
              <div className="text-emerald-400">Contractual SLA Guarantees (Tier 1 Mission Critical)</div>
            </div>
          </div>

          {/* Col 3: Engineering Practices */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Practices
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#core-services" className="hover:text-cyan-300 transition-colors">
                  Custom Web Applications
                </a>
              </li>
              <li>
                <a href="#core-services" className="hover:text-cyan-300 transition-colors">
                  Rapid MVP SaaS Engineering
                </a>
              </li>
              <li>
                <a href="#core-services" className="hover:text-cyan-300 transition-colors">
                  Autonomous RAG & AI Agents
                </a>
              </li>
              <li>
                <a href="#core-services" className="hover:text-cyan-300 transition-colors">
                  Goal-Focused UI/UX Prototyping
                </a>
              </li>
              <li>
                <a href="#core-services" className="hover:text-cyan-300 transition-colors">
                  API & Event Highway Architecture
                </a>
              </li>
              <li>
                <a href="#core-services" className="hover:text-cyan-300 transition-colors">
                  Cloud WAF & DevSecOps
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Industry Sectors */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Regulated Sectors
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#industry-solutions" className="hover:text-cyan-300 transition-colors">
                  FinTech & Capital Markets
                </a>
              </li>
              <li>
                <a href="#industry-solutions" className="hover:text-cyan-300 transition-colors">
                  HealthTech & HIPAA Telehealth
                </a>
              </li>
              <li>
                <a href="#industry-solutions" className="hover:text-cyan-300 transition-colors">
                  High-Throughput E-Commerce
                </a>
              </li>
              <li>
                <a href="#industry-solutions" className="hover:text-cyan-300 transition-colors">
                  PropTech & Spatial Modeling
                </a>
              </li>
              <li>
                <a href="#industry-solutions" className="hover:text-cyan-300 transition-colors">
                  Supply Chain & Fleet Telemetry
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: US Hubs & Contact */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Regional Engineering Hubs
            </div>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Austin, TX (Tech Hub)</strong>
                  <span>100 Congress Ave, Suite 2000, Austin, TX 78701</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">San Francisco, CA</strong>
                  <span>535 Mission St, 14th Fl, San Francisco, CA 94105</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-slate-300 font-mono text-[11px] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>inquiries@apexlogic.io</span>
                </div>
                <div className="text-slate-400 font-mono text-[11px] mt-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>security@apexlogic.io (PGP Key 0x4F8A)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers, GDPR & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} ApexLogic Digital Engineering LLC. All rights reserved. US Registered Entity.
            All client codebases, schemas, and IP remain 100% proprietary work-for-hire client property upon contract
            settlement.
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              Privacy Policy & GDPR
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setShowTermsModal(true)}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              Master Services Agreement (MSA)
            </button>
            <span className="text-slate-700">|</span>
            <a href="#telemetry-section" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              SLA Uptime Status (99.99%)
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy / GDPR Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white">Privacy Policy & GDPR/CCPA Compliance</h3>
            <div className="text-xs text-slate-300 leading-relaxed space-y-3 font-sans">
              <p>
                <strong>ApexLogic Digital Engineering LLC</strong> respects client data sovereignty. We operate under strict
                data protection standards compliant with EU GDPR, California Consumer Privacy Act (CCPA), and HIPAA BAA
                protocols.
              </p>
              <p>
                <strong>Zero AI Training Retention:</strong> Any client data processed through our AI pipelines (including
                Gemini, OpenAI, or LangChain agents) utilizes zero-data-retention enterprise agreements. Your proprietary
                inputs and IP are never used to train foundation models.
              </p>
              <p>
                <strong>Cookie Notice:</strong> This website utilizes only strictly necessary technical telemetry cookies
                to enforce rate limiting and prevent Cross-Site Request Forgery (CSRF). No third-party behavioral ad
                trackers are executed.
              </p>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-semibold"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms & MSA Modal */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-4 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white">Master Services Agreement (MSA) Terms</h3>
            <div className="text-xs text-slate-300 leading-relaxed space-y-3 font-sans">
              <p>
                <strong>1. Work-for-Hire IP Transfer:</strong> All custom code, database schemas, proprietary algorithms,
                and Figma design artifacts developed by ApexLogic Digital Engineering LLC are assigned entirely to the client
                upon invoice satisfaction.
              </p>
              <p>
                <strong>2. Contractual Sprint SLAs:</strong> Every engineering sprint is defined with unambiguous acceptance
                criteria and automated test suites. In the unlikely event of a sprint delay attributable to our engineering
                team, remediation sprints are performed at zero additional billing.
              </p>
              <p>
                <strong>3. Warranty & Defect Remediation:</strong> Every production delivery includes an unconditional
                60-day warranty against software defects and security vulnerabilities.
              </p>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-semibold"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
