import { KpiCard } from '@/components/dashboard/KpiCard';
import { DataTable } from '@/components/dashboard/DataTable';
import { SectionCard } from '@/components/dashboard/SectionCard';

const columns = [
  { key: 'user', label: 'User' },
  { key: 'branch', label: 'Branch' },
  { key: 'role', label: 'Role Type' },
  { key: 'score', label: 'Score' },
  { key: 'status', label: 'Status' },
];

const rows = [
  { user: 'Sample User', branch: 'Assigned Branch', role: 'CSM', score: 0, status: 'Pending Data' },
];

export default function ScorecardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Scorecard</h1>
          <p className="mt-1 text-sm text-slate-500">
            User performance scoring across meetings, pipeline, ERV activity, and follow-up compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard title="Total Users" value="0" subtitle="Active users only" trend="Secure" />
          <KpiCard title="Average Score" value="0" subtitle="Current period" trend="Pending" />
          <KpiCard title="Top Performers" value="0" subtitle="Branch-scoped" trend="Rank" />
          <KpiCard title="Reviews Pending" value="0" subtitle="Admin review" trend="Monitor" />
        </div>

        <SectionCard title="User Scorecard" description="Performance data will populate after CRM sync and scoring rules are finalized.">
          <DataTable columns={columns} rows={rows} />
        </SectionCard>
      </div>
    </main>
  );
}
