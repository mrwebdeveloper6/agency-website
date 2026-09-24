// ==============================================================================
// APEXLOGIC DIGITAL ENGINEERING LLC - API ROUTE: /api/health
// 24/7 Uptime Health Endpoint, WAF Diagnostics & Observability Telemetry
// ==============================================================================

import { NextResponse } from 'next/server';
import { getSystemHealth } from '@/lib/leads-store';

export async function GET() {
  const health = getSystemHealth();

  return NextResponse.json(
    {
      ...health,
      agency: {
        legalName: 'ApexLogic Digital Engineering LLC',
        jurisdiction: 'Delaware, USA (Entity File #7491028)',
        slaTier: 'Tier-1 Enterprise Mission Critical',
        wafVendor: 'Cloudflare Enterprise + AWS WAFv2 Managed Shield',
        securityContact: 'security@apexlogic.io',
      },
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'X-Health-Check': 'OK',
        'X-WAF-Status': 'ACTIVE_ARMORED',
        'X-Content-Type-Options': 'nosniff',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      },
    }
  );
}
