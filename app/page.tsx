'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ServicesGrid } from '@/components/ServicesGrid';
import { IndustrySolutions } from '@/components/IndustrySolutions';
import { CaseStudies } from '@/components/CaseStudies';
import { ContactForm } from '@/components/ContactForm';
import { SystemTelemetry } from '@/components/SystemTelemetry';
import { TechSpecsDocs } from '@/components/TechSpecsDocs';
import { ArchitecturalModal } from '@/components/ArchitecturalModal';
import { Footer } from '@/components/Footer';
import { ServiceCardData, ProjectCategory } from '@/lib/types';
import { ShieldCheck, Sparkles, PhoneCall, CheckCircle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  // State for architectural blueprint modal
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceCardData | null>(null);

  // State to pass preselected category into the contact form
  const [preselectedCategory, setPreselectedCategory] = useState<ProjectCategory>('CUSTOM_WEB_APPLICATION');

  const scrollToContact = (category?: ProjectCategory) => {
    if (category) {
      setPreselectedCategory(category);
    }
    const el = document.getElementById('contact-intake-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPracticeForInquiry = (service: ServiceCardData) => {
    scrollToContact(service.category);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Sticky Navigation */}
      <Navbar
        onOpenEstimator={() => scrollToContact()}
        onOpenDiscovery={() => scrollToContact()}
      />

      {/* 2. Hero Section */}
      <HeroSection
        onOpenDiscovery={() => scrollToContact()}
        onOpenEstimator={() => scrollToContact()}
      />

      {/* 3. Core Services Grid (3-column, 6 cards, quantifiable impact badges) */}
      <ServicesGrid
        onSelectService={(service) => setSelectedServiceForModal(service)}
        onInitiateInquiry={(service) => scrollToContact(service.category)}
      />

      {/* 4. Industry Solutions & Compliance Frameworks */}
      <IndustrySolutions />

      {/* 5. Verified Client Case Studies & Testimonial Carousel */}
      <CaseStudies />

      {/* 6. Live 24/7 SLA Telemetry & Cloud Security Diagnostics */}
      <SystemTelemetry />

      {/* 7. Interactive Lead Intake Form & Live AI Scope Estimator */}
      <section id="contact-intake-section" className="py-24 bg-[#0F172A] relative border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONFIDENTIAL ARCHITECTURE INTAKE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Initiate Project Intake & AI Scope Assessment
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Step through our technical intake questionnaire to generate an instant AI architectural estimate and
              schedule a discovery session with a Principal Systems Architect. All inquiries backed by mutual NDA.
            </p>
          </div>

          <ContactForm preselectedCategory={preselectedCategory} />
        </div>
      </section>

      {/* 8. Technical Dossier & Architecture Reference (Block 1 - 5 Deliverables) */}
      <TechSpecsDocs />

      {/* 9. Footer */}
      <Footer />

      {/* 10. Architectural Blueprint Inspector Modal */}
      <ArchitecturalModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onSelectPracticeForInquiry={handleSelectPracticeForInquiry}
      />
    </div>
  );
}
