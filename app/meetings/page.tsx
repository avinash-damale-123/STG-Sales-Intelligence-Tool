import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { DataTable } from '@/components/dashboard/DataTable';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  {
    title: 'Total Meetings',
    valueKey: 'totalMeetings',
    subtitle: 'Current period',
    trend: 'Live',
  },
  {
    title: 'Held Meetings',
    valueKey: 'heldMeetings',
    subtitle: 'Productivity count',
    trend: 'Held',
  },
  {
    title: 'Marketing Meetings',
    valueKey: 'marketingMeetings',
    subtitle: 'Target tracking',
    trend: 'Marketing',
  },
  {
    title: 'Not Held',
    valueKey: 'notHeldMeetings',
    subtitle: 'Attempted activity',
    trend: 'Review',
  },
];

const columns = [
  { key: 'owner', label: 'Owner' },
  { key: 'branch', label: 'Branch' },
  { key: 'held', label: 'Held' },
  { key: 'notHeld', label: 'Not Held' },
  { key: 'status', label: 'Status' },
];

const rows = [
  { owner: 'Sample Owner', branch: 'Assigned Branch', held: 0, notHeld: 0, status: 'Pending Data' },
];

export default function MeetingsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Meeting Activity</h1>
          <p className="mt-1 text-sm text-slate-500">
            Branch-secured customer engagement, held meetings, and productivity tracking.
          </p>
        </div>

        <ApiSummaryCards endpoint="/api/meetings/summary" cards={cards} />

        <SectionCard title="Meetings by Owner" description="Only users from assigned branch scope should appear here.">
          <DataTable columns={columns} rows={rows} />
        </SectionCard>
      </div>
    </main>
  );
}
