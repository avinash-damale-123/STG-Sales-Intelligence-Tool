import { ChartCard } from '@/components/dashboard/ChartCard';
import { DashboardSummaryCards } from '@/components/dashboard/DashboardSummaryCards';
import { DataTable } from '@/components/dashboard/DataTable';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { SectionCard } from '@/components/dashboard/SectionCard';

const priorityColumns = [
  { key: 'client', label: 'Client' },
  { key: 'branch', label: 'Branch' },
  { key: 'type', label: 'Type' },
  { key: 'priority', label: 'Priority' },
  { key: 'action', label: 'Recommended Action' },
];

const priorityRows = [
  { client: 'ABC Global Ltd', branch: 'Nairobi', type: 'ERV', priority: 'High', action: 'Schedule retention meeting' },
  { client: 'Delta Manufacturing', branch: 'Lagos', type: 'NCA', priority: 'Hot', action: 'Send proposal follow-up' },
  { client: 'Kampala Trading Co', branch: 'Kampala', type: 'ERV', priority: 'Medium', action: 'Review no-contact status' },
];

const funnelData = [
  { label: 'New', value: 0 },
  { label: 'Cold', value: 0 },
  { label: 'Warm', value: 0 },
  { label: 'Hot', value: 0 },
  { label: 'Proposal', value: 0 },
  { label: 'Negotiation', value: 0 },
];

const portfolioData = [
  { label: 'ERV', value: 0 },
  { label: 'NCA', value: 0 },
  { label: 'Meetings', value: 0 },
  { label: 'Alerts', value: 0 },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Home Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Branch-secured sales intelligence overview.</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            Data as of: Live secured API
          </div>
        </div>

        <FilterBar />
        <DashboardSummaryCards />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="NCA Demand Funnel" description="Pipeline stage distribution after CRM sync." data={funnelData} />
          <ChartCard title="Portfolio Mix" description="High-level module activity mix." data={portfolioData} type="pie" />
        </div>

        <SectionCard title="Priority Action Queue" description="Sample structure for action-oriented sales follow-up.">
          <DataTable columns={priorityColumns} rows={priorityRows} />
        </SectionCard>
      </div>
    </main>
  );
}
