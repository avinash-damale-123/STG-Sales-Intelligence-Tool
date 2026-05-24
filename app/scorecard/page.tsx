import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { DataTable } from '@/components/dashboard/DataTable';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  {
    title: 'Total Users',
    valueKey: 'totalUsers',
    subtitle: 'Active users only',
    trend: 'Secure',
  },
  {
    title: 'Average Score',
    valueKey: 'averageScore',
    subtitle: 'Current period',
    trend: 'Live',
  },
  {
    title: 'Top Performers',
    valueKey: 'topPerformers',
    subtitle: 'Branch-scoped',
    trend: 'Rank',
  },
  {
    title: 'Reviews Pending',
    valueKey: 'pendingReviews',
    subtitle: 'Admin review',
    trend: 'Monitor',
  },
];

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

        <ApiSummaryCards endpoint="/api/scorecard/summary" cards={cards} />

        <SectionCard title="User Scorecard" description="Performance data will populate after CRM sync and scoring rules are finalized.">
          <DataTable columns={columns} rows={rows} />
        </SectionCard>
      </div>
    </main>
  );
}
