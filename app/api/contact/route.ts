// ==============================================================================
// APEXLOGIC DIGITAL ENGINEERING LLC - API ROUTE: /api/contact
// Robust Lead Intake, Validation, Rate Limiting & Enterprise SLA Dispatch
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, saveLead } from '@/lib/leads-store';
import { LeadSubmissionPayload } from '@/lib/types';

// Simple sanitizer
function sanitize(input: string | undefined): string {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (5 submissions per minute per IP)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rateLimit = checkRateLimit(ip, 5, 60000);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait before submitting another inquiry.',
          resetMs: rateLimit.resetMs,
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateLimit.resetMs / 1000).toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // 2. Parse Payload
    const body = await req.json();

    const fullName = sanitize(body.fullName);
    const workEmail = sanitize(body.workEmail);
    const companyName = sanitize(body.companyName);
    const companyRole = sanitize(body.companyRole);
    const phoneNumber = sanitize(body.phoneNumber);
    const projectCategory = body.projectCategory;
    const budgetTier = body.budgetTier;
    const timeline = body.timeline;
    const complianceNeeded = body.complianceNeeded || 'NONE';
    const projectDescription = sanitize(body.projectDescription);
    const existingStack = sanitize(body.existingStack);
    const aiAnalysis = body.aiAnalysis;

    // 3. Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ success: false, error: 'Full name is required (minimum 2 characters).' }, { status: 400 });
    }

    if (!workEmail || !isValidEmail(workEmail)) {
      return NextResponse.json({ success: false, error: 'A valid professional work email is required.' }, { status: 400 });
    }

    if (!companyName || companyName.length < 2) {
      return NextResponse.json({ success: false, error: 'Company name is required.' }, { status: 400 });
    }

    if (!companyRole) {
      return NextResponse.json({ success: false, error: 'Company role or title is required.' }, { status: 400 });
    }

    if (!projectDescription || projectDescription.length < 15) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least 15 characters describing your project requirements.' },
        { status: 400 }
      );
    }

    const payload: LeadSubmissionPayload = {
      fullName,
      workEmail,
      companyName,
      companyRole,
      phoneNumber,
      projectCategory: projectCategory || 'CUSTOM_WEB_APPLICATION',
      budgetTier: budgetTier || 'TIER_2_30K_TO_75K',
      timeline: timeline || 'STANDARD_1_TO_3_MONTHS',
      complianceNeeded,
      projectDescription,
      existingStack,
    };

    // 4. Save to Repository (Prisma-ready / memory buffer)
    const newLead = saveLead(payload, aiAnalysis);

    // 5. Build Enterprise Response with SLA confirmation
    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received. A Principal Solutions Architect will review your architecture specifications within 1 business hour.',
        leadId: newLead.id,
        qualificationScore: newLead.qualificationScore,
        slaWindow: '< 1-Hour Guaranteed Response',
        timestamp: newLead.createdAt,
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
        },
      }
    );
  } catch (error) {
    console.error('Lead intake handler error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal system error processing intake request. Our DevSecOps team has been notified.' },
      { status: 500 }
    );
  }
}
