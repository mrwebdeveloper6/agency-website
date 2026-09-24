'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowUpRight, Terminal, Menu, X, ChevronDown, Cpu, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator?: () => void;
  onOpenDiscovery?: () => void;
}

export function Navbar({ onOpenEstimator, onOpenDiscovery }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-xl shadow-black/20'
          : 'bg-[#0F172A]/60 backdrop-blur-sm border-b border-slate-800/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & LLC Entity Marker */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            id="brand-logo"
            className="flex items-center gap-2.5 text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold text-lg tracking-wider border border-cyan-400/40">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                APEXLOGIC
                <span className="text-[10px] uppercase font-sans font-semibold tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  LLC
                </span>
              </span>
              <span className="text-[11px] font-sans text-slate-400 tracking-wide hidden sm:inline">
                Digital Product Engineering & AI
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
          <div className="relative">
            <button
              id="nav-services-trigger"
              onClick={() => setServicesDropdown(!servicesDropdown)}
              onMouseEnter={() => setServicesDropdown(true)}
              className="flex items-center gap-1 px-3.5 py-2 rounded-md hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
            >
              Services & Architecture
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>

            {servicesDropdown && (
              <div
                id="services-dropdown-panel"
                onMouseLeave={() => setServicesDropdown(false)}
                className="absolute top-full left-0 mt-1 w-80 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 px-3 py-1.5">
                  Core Engineering Practices
                </div>
                <button
                  onClick={() => scrollToSection('core-services')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-cyan-300 text-xs font-medium text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span>Custom Web & Enterprise Apps</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">99.99%</span>
                </button>
                <button
                  onClick={() => scrollToSection('core-services')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-cyan-300 text-xs font-medium text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span>Rapid MVP & Multi-Tenant SaaS</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">4.2x Speed</span>
                </button>
                <button
                  onClick={() => scrollToSection('core-services')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-cyan-300 text-xs font-medium text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span>Autonomous AI & RAG Agents</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">91% Res</span>
                </button>
                <button
                  onClick={() => scrollToSection('core-services')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-cyan-300 text-xs font-medium text-slate-200 flex items-center justify-between transition-colors"
                >
                  <span>Cloud Operations, WAF & DevSecOps</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">&lt; 1hr SLA</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => scrollToSection('industry-solutions')}
            className="px-3.5 py-2 rounded-md hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
          >
            Sectors & Compliance
          </button>

          <button
            onClick={() => scrollToSection('case-studies')}
            className="px-3.5 py-2 rounded-md hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
          >
            Verified Case Proof
          </button>

          <button
            onClick={() => scrollToSection('telemetry-section')}
            className="px-3.5 py-2 rounded-md hover:text-cyan-400 hover:bg-slate-800/50 transition-colors flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 SLA Telemetry</span>
          </button>

          <button
            onClick={() => scrollToSection('tech-specs-docs')}
            className="px-3.5 py-2 rounded-md hover:text-cyan-400 hover:bg-slate-800/50 transition-colors font-mono text-xs text-cyan-300"
          >
            [DevSecOps Specs]
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Operational Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400 text-[11px]">SLA:</span>
            <span className="text-emerald-400 font-semibold">100% On-Time</span>
          </div>

          {/* Primary CTA */}
          <button
            id="nav-book-call-cta"
            onClick={() => {
              if (onOpenDiscovery) {
                onOpenDiscovery();
              } else {
                scrollToSection('contact-intake-section');
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs sm:text-sm tracking-wide shadow-md shadow-cyan-900/30 transition-all active:scale-[0.98] border border-cyan-400/30"
          >
            <span>Book Discovery Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-200">
            <button
              onClick={() => scrollToSection('core-services')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-800"
            >
              Core Services & Proof Badges
            </button>
            <button
              onClick={() => scrollToSection('industry-solutions')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-800"
            >
              Industry Sectors & Compliance
            </button>
            <button
              onClick={() => scrollToSection('case-studies')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-800"
            >
              Verified Case Studies
            </button>
            <button
              onClick={() => scrollToSection('telemetry-section')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-800"
            >
              24/7 SLA Telemetry
            </button>
            <button
              onClick={() => scrollToSection('tech-specs-docs')}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-800 text-cyan-400 font-mono text-xs"
            >
              Architecture & Security Blueprints
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('contact-intake-section');
              }}
              className="w-full text-center py-2.5 px-4 rounded-lg bg-cyan-600 text-white font-medium text-sm"
            >
              Schedule Technical Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
