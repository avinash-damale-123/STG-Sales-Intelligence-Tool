import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  {
    title: 'Total ERV Accounts',
    valueKey: 'totalAccounts',
    subtitle: 'Existing revenue portfolio',
    trend: 'Secure',
  },
  {
    title: 'High Priority',
    valueKey: 'highPriorityAccounts',
    subtitle: 'Accounts needing action',
    trend: 'Action',
  },
  {
    title: 'Lost Risk',
    valueKey: 'lostRiskAccounts',
    subtitle: 'Potential churn risk',
    trend: 'Monitor',
  },
  {
    title: 'No Contact',
    valueKey: 'noContactAccounts',
    subtitle: 'Follow-up required',
    trend: 'Review',
  },
];

export default function ErvPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">ERV Portfolio</h1>
          <p className="mt-2 text-sm text-slate-500">
            Existing revenue client intelligence and branch-secured portfolio monitoring.
          </p>
        </div>

        <ApiSummaryCards endpoint="/api/erv/summary" cards={cards} />

        <SectionCard
          title="ERV Account Monitoring"
          description="Detailed ERV account tables and risk queues will populate after CRM sync."
        >
          <div className="rounded-xl bg-slate-50 p-6 text-sm text-slate-500">
            Branch-secured ERV analytics are connected to the secured summary API.
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
