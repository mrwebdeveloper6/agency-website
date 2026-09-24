-- ==============================================================================
-- RAW POSTGRESQL DDL DEFINITIONS - APEXLOGIC DIGITAL ENGINEERING LLC
-- Compatible with PostgreSQL 14+, Neon, AWS Aurora Serverless, Supabase, Cloud SQL
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Enums
DO $$ BEGIN
    CREATE TYPE "LeadStatus" AS ENUM (
      'NEW_UNQUALIFIED', 'QUALIFYING', 'TECHNICAL_REVIEW', 
      'PROPOSAL_SENT', 'WON_ACTIVE_CONTRACT', 'DISQUALIFIED', 'ARCHIVED'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "ProjectCategory" AS ENUM (
      'CUSTOM_WEB_APPLICATION', 'ENTERPRISE_SOFTWARE', 'RAPID_MVP_SAAS',
      'AUTONOMOUS_AI_AGENTS', 'UI_UX_PROTOTYPING', 'API_SYSTEMS_INTEGRATION',
      'CLOUD_SECURITY_DEVSECOPS'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "BudgetRange" AS ENUM (
      'TIER_1_15K_TO_30K', 'TIER_2_30K_TO_75K', 
      'TIER_3_75K_TO_200K', 'TIER_4_200K_PLUS'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "TargetTimeline" AS ENUM (
      'IMMEDIATE_UNDER_4_WEEKS', 'STANDARD_1_TO_3_MONTHS', 
      'STRATEGIC_3_TO_6_MONTHS', 'LONG_TERM_ROADMAP'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "ComplianceRequirement" AS ENUM (
      'NONE', 'SOC2_TYPE_II', 'HIPAA_BAA', 'PCI_DSS_L1', 'GDPR_CCPA', 'ISO_27001'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    work_email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    company_name VARCHAR(255) NOT NULL,
    company_role VARCHAR(100) NOT NULL,
    company_website VARCHAR(255),
    company_size VARCHAR(50),
    category "ProjectCategory" NOT NULL,
    budget_range "BudgetRange" NOT NULL,
    timeline "TargetTimeline" NOT NULL,
    compliance_needed "ComplianceRequirement" DEFAULT 'NONE' NOT NULL,
    project_description TEXT NOT NULL,
    existing_tech_stack TEXT,
    ai_estimated_velocity VARCHAR(100),
    ai_technical_complexity VARCHAR(100),
    ai_architectural_notes TEXT,
    qualification_score INT DEFAULT 70 NOT NULL,
    status "LeadStatus" DEFAULT 'NEW_UNQUALIFIED' NOT NULL,
    internal_notes TEXT,
    assigned_engineer_email VARCHAR(255),
    nda_signed BOOLEAN DEFAULT FALSE NOT NULL,
    discovery_call_date TIMESTAMP WITH TIME ZONE,
    ip_address_hash VARCHAR(128),
    user_agent TEXT,
    referrer_source VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_leads_work_email ON leads(work_email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    proof_metric VARCHAR(100) NOT NULL,
    deliverables_summary TEXT[] NOT NULL,
    tech_stack_tags TEXT[] NOT NULL,
    sla_commitment VARCHAR(255) NOT NULL,
    is_core BOOLEAN DEFAULT TRUE NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 5. Case Studies Table
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(120) UNIQUE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    headline VARCHAR(255) NOT NULL,
    challenge_summary TEXT NOT NULL,
    solution_architecture TEXT NOT NULL,
    primary_metric VARCHAR(100) NOT NULL,
    secondary_metric VARCHAR(100) NOT NULL,
    technologies TEXT[] NOT NULL,
    client_quote TEXT,
    client_reviewer_name VARCHAR(150),
    client_reviewer_title VARCHAR(150),
    clutch_rating NUMERIC(2,1) DEFAULT 5.0,
    is_featured BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. System Health & Telemetry Logs
CREATE TABLE IF NOT EXISTS system_health_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    endpoint_tested VARCHAR(120) DEFAULT '/api/health' NOT NULL,
    status_code INT DEFAULT 200 NOT NULL,
    response_time_ms NUMERIC(6,2) NOT NULL,
    memory_used_mb NUMERIC(6,2) NOT NULL,
    waf_status VARCHAR(50) DEFAULT 'ACTIVE_PROTECT' NOT NULL,
    rate_limit_load_percent NUMERIC(5,2) DEFAULT 12.4 NOT NULL,
    active_instances INT DEFAULT 3 NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_telemetry_timestamp ON system_health_logs(timestamp);

-- 7. Analytics Events
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    session_fingerprint VARCHAR(128) NOT NULL,
    page_path VARCHAR(255) NOT NULL,
    metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_time ON analytics_events(event_type, timestamp);
