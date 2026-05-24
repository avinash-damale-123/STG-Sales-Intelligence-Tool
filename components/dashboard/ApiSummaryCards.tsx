'use client';

import { useEffect, useState } from 'react';
import { KpiCard } from './KpiCard';

interface SummaryCardConfig {
  title: string;
  valueKey: string;
  subtitle: string;
  trend?: string;
}

interface ApiSummaryCardsProps {
  endpoint: string;
  cards: SummaryCardConfig[];
}

export function ApiSummaryCards({ endpoint, cards }: ApiSummaryCardsProps) {
  const [data, setData] = useState<Record<string, number | string> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          cache: 'no-store',
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          setMessage(result.message || 'Unable to load summary data.');
          return;
        }

        setData(result.data || {});
      } catch {
        setMessage('Unable to connect to summary API.');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [endpoint]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <KpiCard
            key={card.title}
            title={card.title}
            value="..."
            subtitle="Loading secured data"
            trend="Loading"
          />
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
      {cards.map((card) => (
        <KpiCard
          key={card.title}
          title={card.title}
          value={String(data?.[card.valueKey] ?? 0)}
          subtitle={card.subtitle}
          trend={card.trend}
        />
      ))}
    </div>
  );
}
