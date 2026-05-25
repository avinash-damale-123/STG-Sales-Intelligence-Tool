import { ApiRecordsTable } from '@/components/dashboard/ApiRecordsTable';
import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  { title: 'Total Pipeline', valueKey: 'totalPipeline', subtitle: 'Open acquisition opportunities', trend: 'Live' },
  { title: 'Hot Leads', valueKey: 'hotLeads', subtitle: 'High-conversion potential', trend: 'Hot' },
  { title: 'Proposal Stage', valueKey: 'proposalStage', subtitle: 'Proposal follow-up required', trend: 'Proposal' },
  { title: 'Negotiation', valueKey: 'negotiationStage', subtitle: 'Close-stage opportunities', trend: 'Close' },
];

const columns = [
  { key: 'accountName', label: 'Prospect' },
  { key: 'branchCode', label: 'Branch' },
  { key: 'stageName', label: 'Stage' },
  { key: 'status', label: 'Status' },
  { key: 'priorityLevel', label: 'Priority' },
  { key: 'ownerUserId', label: 'Owner' },
];

export default function NcaPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">NCA Pipeline</h1>
          <p className="mt-2 text-sm text-slate-500">
            Newly acquired corporate pipeline and branch-secured opportunity tracking.
          </p>
        </div>

        <ApiSummaryCards endpoint="/api/nca/summary" cards={cards} />

        <SectionCard title="Pipeline Dashboard" description="Branch-secured NCA records from synced CRM account data.">
          <ApiRecordsTable endpoint="/api/nca/records" columns={columns} emptyMessage="No NCA records available yet. Run CRM account sync first." />
        </SectionCard>
      </div>
    </main>
  );
}
