import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { DataTable } from '@/components/dashboard/DataTable';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  {
    title: 'Critical',
    valueKey: 'criticalAlerts',
    subtitle: 'Immediate attention',
    trend: 'P0',
  },
  {
    title: 'High',
    valueKey: 'highAlerts',
    subtitle: 'Urgent actions',
    trend: 'P1',
  },
  {
    title: 'Medium',
    valueKey: 'mediumAlerts',
    subtitle: 'This week',
    trend: 'P2',
  },
  {
    title: 'Info',
    valueKey: 'infoAlerts',
    subtitle: 'Monitoring',
    trend: 'Info',
  },
];

const columns = [
  { key: 'severity', label: 'Severity' },
  { key: 'category', label: 'Category' },
  { key: 'message', label: 'Message' },
  { key: 'action', label: 'Action' },
];

const rows = [
  { severity: 'Critical', category: 'Access', message: 'Branch-secured alerts pending data sync', action: 'Validate scope' },
  { severity: 'Info', category: 'CRM', message: 'CRM alert engine will populate after sync', action: 'Run sync' },
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

        <SectionCard title="Alert Details" description="Alerts are always generated within the user's assigned branch scope.">
          <DataTable columns={columns} rows={rows} />
        </SectionCard>
      </div>
    </main>
  );
}
