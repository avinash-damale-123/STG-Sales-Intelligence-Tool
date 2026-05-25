import { ApiRecordsTable } from '@/components/dashboard/ApiRecordsTable';
import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  { title: 'Total ERV Accounts', valueKey: 'totalAccounts', subtitle: 'Existing revenue portfolio', trend: 'Secure' },
  { title: 'High Priority', valueKey: 'highPriorityAccounts', subtitle: 'Accounts needing action', trend: 'Action' },
  { title: 'Lost Risk', valueKey: 'lostRiskAccounts', subtitle: 'Potential churn risk', trend: 'Monitor' },
  { title: 'No Contact', valueKey: 'noContactAccounts', subtitle: 'Follow-up required', trend: 'Review' },
];

const columns = [
  { key: 'accountName', label: 'Client' },
  { key: 'branchCode', label: 'Branch' },
  { key: 'status', label: 'Status' },
  { key: 'priorityLevel', label: 'Priority' },
  { key: 'lastContactDate', label: 'Last Contact' },
  { key: 'noContactDays', label: 'No Contact Days' },
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

        <SectionCard title="ERV Account Monitoring" description="Branch-secured ERV records from synced CRM account data.">
          <ApiRecordsTable endpoint="/api/erv/records" columns={columns} emptyMessage="No ERV records available yet. Run CRM account sync first." />
        </SectionCard>
      </div>
    </main>
  );
}
