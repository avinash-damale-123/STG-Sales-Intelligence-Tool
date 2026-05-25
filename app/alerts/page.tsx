import { ApiRecordsTable } from '@/components/dashboard/ApiRecordsTable';
import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  { title: 'Critical', valueKey: 'criticalAlerts', subtitle: 'Immediate attention', trend: 'P0' },
  { title: 'High', valueKey: 'highAlerts', subtitle: 'Urgent actions', trend: 'P1' },
  { title: 'Medium', valueKey: 'mediumAlerts', subtitle: 'This week', trend: 'P2' },
  { title: 'Info', valueKey: 'infoAlerts', subtitle: 'Monitoring', trend: 'Info' },
];

const columns = [
  { key: 'severity', label: 'Severity' },
  { key: 'alertType', label: 'Type' },
  { key: 'branchCode', label: 'Branch' },
  { key: 'title', label: 'Title' },
  { key: 'isResolved', label: 'Resolved' },
  { key: 'createdAt', label: 'Created' },
];

export default function AlertsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Alerts</h1>
          <p className="mt-1 text-sm text-slate-500">
            Centralized sales intelligence alerts and recommended actions.
          </p>
        </div>

        <ApiSummaryCards endpoint="/api/alerts/summary" cards={cards} />

        <SectionCard title="Alert Details" description="Branch-secured alert records generated from sales intelligence rules.">
          <ApiRecordsTable endpoint="/api/alerts/records" columns={columns} emptyMessage="No alert records available yet." />
        </SectionCard>
      </div>
    </main>
  );
}
