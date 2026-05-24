import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  {
    title: 'Total Pipeline',
    valueKey: 'totalPipeline',
    subtitle: 'Open acquisition opportunities',
    trend: 'Live',
  },
  {
    title: 'Hot Leads',
    valueKey: 'hotLeads',
    subtitle: 'High-conversion potential',
    trend: 'Hot',
  },
  {
    title: 'Proposal Stage',
    valueKey: 'proposalStage',
    subtitle: 'Proposal follow-up required',
    trend: 'Proposal',
  },
  {
    title: 'Negotiation',
    valueKey: 'negotiationStage',
    subtitle: 'Close-stage opportunities',
    trend: 'Close',
  },
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

        <SectionCard
          title="Pipeline Dashboard"
          description="Detailed NCA pipeline tables and stage movement will populate after CRM sync."
        >
          <div className="rounded-xl bg-slate-50 p-6 text-sm text-slate-500">
            Branch-secured NCA analytics are connected to the secured summary API.
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
