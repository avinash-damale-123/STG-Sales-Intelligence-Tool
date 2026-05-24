import { SyncControlPanel } from '@/components/admin/SyncControlPanel';

const adminCards = ['Users', 'Branch Access', 'Audit Logs', 'Refresh History'];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Admin Panel</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage users, branch access, audit logs, sessions, CRM sync, and refresh history.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminCards.map((item) => (
            <div key={item} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item}</h2>
              <p className="mt-2 text-sm text-slate-500">Coming Soon</p>
            </div>
          ))}
        </div>

        <SyncControlPanel />
      </div>
    </main>
  );
}
