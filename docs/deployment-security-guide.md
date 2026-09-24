# APEXLOGIC DIGITAL ENGINEERING LLC
## Enterprise Production Deployment & Cloud Security Architecture Guide
### Target Audience: CTOs, VPs of Engineering & DevSecOps Directors

This document outlines the standard production deployment, Cloud Application Firewall (WAF), Content Delivery Network (CDN), SSL management, and high-availability architecture deployed for our enterprise clients.

---

### 1. Environment Variable Architecture & Secrets Management

Store production secrets in AWS Secrets Manager, HashiCorp Vault, or Google Cloud Secret Manager. Never inject raw production secrets directly into container images or Git repositories.

```bash
# Core Application Configuration
NODE_ENV="production"
PORT=3000
NEXT_TELEMETRY_DISABLED=1

# Enterprise Database Connection (PostgreSQL with PgBouncer Pooling)
DATABASE_URL="postgresql://apex_user:ENC_PASSWORD@aurora-cluster.internal:5432/apex_production?sslmode=require&pool_timeout=10&connection_limit=50"

# AI / LLM & Vector Pipeline Integration
GEMINI_API_KEY="AIzaSy...PROD_KEY"
OPENAI_API_KEY="sk-proj-...PROD_KEY"
PINECONE_API_KEY="pc_prod_..."
PINECONE_INDEX="apex-enterprise-knowledge"
PINECONE_ENVIRONMENT="us-east-1-aws"

# Security & Encryption Salts
NEXTAUTH_SECRET="7f98e8a71c3d9b4f..."
DATA_ENCRYPTION_KEY_AES256="hex_encoded_32_byte_key..."
RATE_LIMIT_REDIS_URL="rediss://default:token@redis-cluster.internal:6379"

# Notification Webhooks & Observability
SLACK_INCIDENT_WEBHOOK="https://hooks.slack.com/services/T00/B00/X00"
DATADOG_API_KEY="dd_api_..."
SENTRY_DSN="https://key@o000.ingest.sentry.io/000"
```

---

### 2. Cloud Application Firewall (WAF) & DDoS Mitigation

We deploy a dual-layer perimeter combining **Cloudflare Enterprise Edge** and **AWS WAFv2**:

#### A. Managed Rule Sets (AWS WAFv2 via Terraform)
1. **AWSManagedRulesCommonRuleSet**: Defends against OWASP Top 10 vulnerabilities (SQL Injection, Cross-Site Scripting, RCE).
2. **AWSManagedRulesKnownBadInputsRuleSet**: Blocks known exploit payloads, malicious user agents, and invalid request encodings.
3. **AWSManagedRulesAmazonIpReputationList**: Blocks IP addresses known for botnets, open proxies, and brute-force scans.
4. **AWSManagedRulesBotControlRuleSet**: Distinguishes between legitimate search crawlers and scrapers/credential stuffers.

#### B. Rate Limiting Rules (Adaptive Throttling)
- **Global Ingestion Endpoint (`/api/contact`)**: Limit to 5 requests per 60 seconds per source IP.
- **AI Scope Generator (`/api/ai/analyze`)**: Limit to 10 requests per 60 seconds per source IP.
- **General API Surface (`/api/*`)**: Maximum 300 requests per 5 minutes per source IP with automated 15-minute challenge/block.

---

### 3. Edge CDN Caching & Header Optimization

To guarantee sub-second global page loads (P95 < 200ms), Edge caching rules are structured as follows:

```http
# Static Assets (/static, /_next/static, images, fonts)
Cache-Control: public, max-age=31536000, immutable
Vary: Accept-Encoding

# Dynamic API Routes (/api/contact, /api/ai/analyze)
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
Pragma: no-cache
Expires: 0

# Security Headers (Enforced across all responses)
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

### 4. 24/7 Uptime Health Monitoring & Incident SLAs

Our automated synthetic monitors hit `/api/health` every 30 seconds from 12 distinct geographic AWS regions.

- **P1 Incident (Site Outage / Database Unreachable)**: PagerDuty triggers automated engineer on-call alert within **2 minutes**. Contractual SLA response time: **< 15 minutes**.
- **P2 Incident (Degraded Performance / Rate limit spike)**: Contractual SLA response time: **< 1 hour**.
- **P3 Incident (Minor UI glitch / non-blocking)**: Contractual SLA response time: **< 4 hours**.
