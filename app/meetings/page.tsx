import { ApiRecordsTable } from '@/components/dashboard/ApiRecordsTable';
import { ApiSummaryCards } from '@/components/dashboard/ApiSummaryCards';
import { SectionCard } from '@/components/dashboard/SectionCard';

const cards = [
  { title: 'Total Meetings', valueKey: 'totalMeetings', subtitle: 'Current period', trend: 'Live' },
  { title: 'Held Meetings', valueKey: 'heldMeetings', subtitle: 'Productivity count', trend: 'Held' },
  { title: 'Marketing Meetings', valueKey: 'marketingMeetings', subtitle: 'Target tracking', trend: 'Marketing' },
  { title: 'Not Held', valueKey: 'notHeldMeetings', subtitle: 'Attempted activity', trend: 'Review' },
];

const columns = [
  { key: 'ownerUserId', label: 'Owner' },
  { key: 'branchCode', label: 'Branch' },
  { key: 'meetingType', label: 'Type' },
  { key: 'meetingStatus', label: 'Status' },
  { key: 'meetingDate', label: 'Meeting Date' },
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

        <SectionCard title="Meeting Records" description="Branch-secured meeting records from synced CRM meeting data.">
          <ApiRecordsTable endpoint="/api/meetings/records" columns={columns} emptyMessage="No meeting records available yet. Run CRM meeting sync first." />
        </SectionCard>
      </div>
    </main>
  );
}
