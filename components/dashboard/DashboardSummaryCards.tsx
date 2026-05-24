'use client';

import { useEffect, useState } from 'react';
import { KpiCard } from './KpiCard';

interface DashboardSummary {
  ervPortfolio: number;
  ncaPipeline: number;
  meetings: number;
  highPriority: number;
}

export function DashboardSummaryCards() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await fetch('/api/dashboard/summary', {
          method: 'GET',
          cache: 'no-store',
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          setMessage(result.message || 'Unable to load dashboard summary.');
          return;
        }

        setSummary(result.data);
      } catch {
        setMessage('Unable to connect to dashboard summary API.');
      } finally {
        setIsLoading(false);
      }
    }

    loadSummary();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {['ERV Portfolio', 'NCA Pipeline', 'High Priority', 'Meetings'].map((title) => (
          <KpiCard key={title} title={title} value="..." subtitle="Loading secured data" trend="Loading" />
        ))}
      </div>
    );
  }

  if (message) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        {message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        title="ERV Portfolio"
        value={String(summary?.ervPortfolio ?? 0)}
        subtitle="Existing revenue accounts"
        trend="Secure"
      />
      <KpiCard
        title="NCA Pipeline"
        value={String(summary?.ncaPipeline ?? 0)}
        subtitle="Open acquisition opportunities"
        trend="Live"
      />
      <KpiCard
        title="High Priority"
        value={String(summary?.highPriority ?? 0)}
        subtitle="Accounts needing action"
        trend="Action"
      />
      <KpiCard
        title="Meetings"
        value={String(summary?.meetings ?? 0)}
        subtitle="Held and planned activity"
        trend="This Month"
      />
    </div>
  );
}
