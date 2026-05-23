import { KpiCard } from '@/components/dashboard/KpiCard';
import { SectionCard } from '@/components/dashboard/SectionCard';

export default function RevenuePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Revenue Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">
            Revenue performance, branch contribution, churn view, and top client analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Total Revenue" value="0" subtitle="Pending ledger sync" trend="Coming Soon" />
          <KpiCard title="Active Revenue" value="0" subtitle="Active ERV accounts" trend="Secure" />
          <KpiCard title="Lost Accounts" value="0" subtitle="Churn / reacquisition" trend="Monitor" />
          <KpiCard title="NCA Potential" value="0" subtitle="Pipeline value" trend="Sync Pending" />
        </div>

        <SectionCard title="Revenue by Branch" description="Branch contribution chart will populate after revenue data sync.">
          <div className="h-64 rounded-xl bg-slate-50 flex items-center justify-center text-sm text-slate-500">
            Revenue chart placeholder
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
