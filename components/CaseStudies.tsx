'use client';

import React, { useState } from 'react';
import { VERIFIED_CASE_STUDIES, VERIFIED_BADGES } from '@/lib/agency-data';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, Award, ExternalLink, ArrowRight } from 'lucide-react';

export function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const study = VERIFIED_CASE_STUDIES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? VERIFIED_CASE_STUDIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === VERIFIED_CASE_STUDIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="case-studies" className="py-24 bg-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400">
              <span>VERIFIED PRODUCTION RESULTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Battle-Tested Case Proof & Executive Testimonials
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We do not measure success in story points; we measure it in customer revenue, latency reduction, and
              unbreakable system stability.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              id="btn-case-prev"
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors focus:outline-none"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-slate-400">
              {currentIndex + 1} / {VERIFIED_CASE_STUDIES.length}
            </span>
            <button
              onClick={handleNext}
              id="btn-case-next"
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors focus:outline-none"
              aria-label="Next case study"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Case Study Card */}
        <div className="rounded-2xl bg-[#1E293B]/70 border border-slate-700/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Challenge, Solution, Quote */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  {study.industry}
                </span>
                <span className="text-sm font-semibold text-slate-300">Client: {study.clientName}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                {study.headline}
              </h3>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-white font-semibold">The Challenge: </strong>
                  {study.challenge}
                </p>
                <p>
                  <strong className="text-cyan-300 font-semibold">Engineering Solution: </strong>
                  {study.solution}
                </p>
              </div>

              {/* Quote Block */}
              <div className="p-5 rounded-xl bg-slate-900/90 border-l-4 border-cyan-500 border-t border-r border-b border-slate-800 relative">
                <Quote className="w-6 h-6 text-cyan-500/40 mb-2" />
                <p className="text-sm text-slate-200 italic leading-relaxed mb-3">&ldquo;{study.quote}&rdquo;</p>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{study.author}</span>
                    <span className="text-slate-400 block">{study.role}</span>
                  </div>
                  {/* 5-Star Clutch Rating */}
                  <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-300 font-bold ml-1">5.0 Clutch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Metrics & Tech Stack */}
            <div className="lg:col-span-5 space-y-5">
              {/* Primary Metric Card */}
              <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-mono uppercase text-slate-400">Quantifiable Primary Result</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono my-2">
                  {study.primaryResult}
                </div>
                <div className="text-xs font-mono uppercase text-slate-400 mt-4">Secondary Operational Impact</div>
                <div className="text-xl font-bold text-cyan-300 font-mono mt-1">{study.secondaryResult}</div>
              </div>

              {/* Tech Stack Tags */}
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold block mb-2">
                  Production Stack Deployed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {study.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* NDA Assurance */}
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Client data and production codebases protected by mutual enterprise NDAs.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Badges Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VERIFIED_BADGES.map((b, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3"
            >
              <Award className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-semibold text-white">{b.name}</div>
                <div className="text-[11px] font-mono text-slate-400">{b.score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
