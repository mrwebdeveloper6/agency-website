// ==============================================================================
// APEXLOGIC DIGITAL ENGINEERING LLC - API ROUTE: /api/ai/analyze
// Intelligent Customer Inquiry Parsing, Technical Complexity & Scope Estimation
// Powered by Server-Side Gemini API (gemini-3.8-flash) with Heuristic Fallback
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

interface HeuristicResult {
  estimatedVelocity: string;
  technicalComplexity: string;
  architecturalRecommendation: string;
  suggestedStack: string[];
  riskMitigations: string[];
}

function generateHeuristicScope(
  category: string,
  budgetTier: string,
  description: string,
  compliance: string
): HeuristicResult {
  const isAI = category.includes('AI') || description.toLowerCase().includes('rag') || description.toLowerCase().includes('llm');
  const isSaaS = category.includes('SAAS') || description.toLowerCase().includes('multi-tenant');
  const isEnterprise = budgetTier.includes('75K') || budgetTier.includes('200K') || compliance !== 'NONE';

  let velocity = '4 to 6 Weeks (2-3 Two-Week Sprints)';
  let complexity = 'Moderate - Standard Distributed Web Architecture';
  let stack = ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Node.js API', 'AWS ECS'];

  if (isAI) {
    velocity = '6 to 8 Weeks (Proof-of-Concept to Production RAG)';
    complexity = 'High - Vector Embeddings, Chunking & Latency Orchestration';
    stack = ['Next.js 15', 'Python FastAPI', 'Pinecone Vector DB', 'LangChain', 'OpenAI / Gemini', 'Docker'];
  } else if (isSaaS) {
    velocity = '6 to 10 Weeks (Tenant Schema Isolation & Stripe Billing)';
    complexity = 'High - Multi-Tenant Data Partitioning & Subscription Webhooks';
    stack = ['Next.js 15 App Router', 'Prisma ORM', 'PostgreSQL RLS', 'Stripe Billing', 'Redis', 'AWS Fargate'];
  } else if (isEnterprise) {
    velocity = '8 to 12 Weeks (Enterprise Security Hardening & SOC-2 Audit)';
    complexity = 'Enterprise Critical - High Availability, mTLS & Strict SLAs';
    stack = ['Next.js 15', 'Go / Node.js Microservices', 'PostgreSQL Multi-AZ', 'Kafka', 'Terraform', 'AWS WAF'];
  }

  const mitigations = [
    compliance !== 'NONE'
      ? `Implement BAA/SOC-2 automated audit logging and column-level AES-256 encryption.`
      : `Establish zero-trust API perimeter with JWT rotation and rate limiting.`,
    isAI
      ? `Deploy semantic caching via Redis to reduce LLM token overhead by ~40% and enforce guardrail evaluation against prompt injection.`
      : `Configure connection pooling (PgBouncer) to prevent database exhaustion under concurrency surges.`,
    `Build automated end-to-end regression tests in CI/CD pipeline before every staging merge.`,
  ];

  const recommendation = `Deploy a modular Next.js App Router frontend with isolated server-side microservices. Enforce strict type contracts via TypeScript/OpenAPI, and protect the network perimeter with automated Cloudflare/AWS WAF rule groups.`;

  return {
    estimatedVelocity: velocity,
    technicalComplexity: complexity,
    architecturalRecommendation: recommendation,
    suggestedStack: stack,
    riskMitigations: mitigations,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { category, budgetTier, timeline, compliance, description, existingStack } = await req.json();

    if (!description || description.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least 10 characters of project description.' },
        { status: 400 }
      );
    }

    const ai = getGenAI();

    if (ai) {
      try {
        const prompt = `
You are the Chief Technology Officer and Principal Solutions Architect at ApexLogic Digital Engineering LLC, a premier US digital product engineering firm.
Analyze the following client technical project intake and produce a concise, highly rigorous technical scope assessment in strict JSON format.

Client Input:
- Category: ${category || 'Web Application'}
- Budget Tier: ${budgetTier || 'Not specified'}
- Desired Timeline: ${timeline || 'Standard'}
- Compliance Required: ${compliance || 'None'}
- Existing Stack: ${existingStack || 'Greenfield'}
- Project Description: ${description}

Return ONLY valid JSON matching this exact structure:
{
  "estimatedVelocity": "string (e.g. '5-7 Weeks (3 Sprints)')",
  "technicalComplexity": "string (e.g. 'High - Distributed Event Processing & HIPAA')",
  "architecturalRecommendation": "string (2-3 sentences of precise technical advice describing frontend, backend, and data storage)",
  "suggestedStack": ["string", "string", "string", "string", "string"],
  "riskMitigations": ["string", "string", "string"]
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return NextResponse.json({ success: true, analysis: parsed, source: 'ai-engine' });
        }
      } catch (aiErr) {
        console.warn('Gemini API call failed, falling back to heuristic engine:', aiErr);
      }
    }

    // Fallback heuristic engine
    const heuristic = generateHeuristicScope(
      category || '',
      budgetTier || '',
      description || '',
      compliance || 'NONE'
    );

    return NextResponse.json({ success: true, analysis: heuristic, source: 'rule-engine' });
  } catch (error) {
    console.error('Scope analyzer route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process scope analysis.' },
      { status: 500 }
    );
  }
}
