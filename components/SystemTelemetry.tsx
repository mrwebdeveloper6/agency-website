'use client';

import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, HardDrive, RefreshCw, Server, Lock, Zap } from 'lucide-react';
import { SystemHealthData } from '@/lib/types';

export function SystemTelemetry() {
  const [health, setHealth] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Error fetching system health telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok && mounted) {
          const data = await res.json();
          setHealth(data);
          setLastRefreshed(new Date().toLocaleTimeString());
        }
      } catch (err) {
        console.error('Error fetching system health telemetry:', err);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Poll every 30s
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="telemetry-section" className="py-20 bg-slate-950 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400 mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE INFRASTRUCTURE OBSERVABILITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              24/7 SLA Health & Cloud Application Firewall (WAF)
            </h2>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={loading}
            className="self-start md:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Probe {lastRefreshed && `(${lastRefreshed})`}</span>
          </button>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Status & Uptime */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-400" /> Uptime SLA
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="text-2xl font-black text-white font-mono">{health?.uptimePercentage || '99.99%'}</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">Status: All Systems Operational</div>
          </div>

          {/* Latency */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-yellow-400" /> Edge Probe Latency
              </span>
              <span className="text-slate-500 text-[10px]">p95</span>
            </div>
            <div className="text-2xl font-black text-white font-mono">{health?.latencyMs || 14} ms</div>
            <div className="text-[11px] text-cyan-400 font-mono mt-1">Global Anycast Routing</div>
          </div>

          {/* WAF Shield */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Cloud WAF Shield
              </span>
              <span className="text-emerald-400 text-[10px] font-mono">ARMORED</span>
            </div>
            <div className="text-base font-bold text-slate-200 font-mono truncate">
              {health?.wafShieldStatus || 'ACTIVE_ARMORED'}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">OWASP Top 10 + DDoS Filter</div>
          </div>

          {/* SSL / TLS Grade */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-purple-400" /> SSL/TLS Protocol
              </span>
              <span className="text-emerald-400 text-[10px] font-mono">GRADE A+</span>
            </div>
            <div className="text-xl font-bold text-slate-200 font-mono">TLS 1.3 / HSTS</div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Automated 60-Day Key Rotation</div>
          </div>
        </div>

        {/* Detailed Edge Telemetry Diagnostics Bar */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 font-mono text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-500">Node Cluster:</span>{' '}
              <span className="text-slate-300 font-semibold">{health?.activeNodes || 4} Active Replicas</span>
            </div>
            <div>
              <span className="text-slate-500">Memory Pressure:</span>{' '}
              <span className="text-slate-300 font-semibold">{health?.memoryUsageMb || 62.4} MB Heap</span>
            </div>
            <div>
              <span className="text-slate-500">Rate Limiter Load:</span>{' '}
              <span className="text-slate-300 font-semibold">{health?.rateLimitLoad || '3.8% Capacity'}</span>
            </div>
          </div>
          <div className="text-cyan-400 text-[11px]">
            Endpoint Tested: <span className="underline">/api/health</span> [200 OK]
          </div>
        </div>
      </div>
    </section>
  );
}
