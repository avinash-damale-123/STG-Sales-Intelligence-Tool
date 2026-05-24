import { AuditActivityPanel } from '@/components/admin/AuditActivityPanel';
import { BranchAccessPanel } from '@/components/admin/BranchAccessPanel';
import { BranchListPanel } from '@/components/admin/BranchListPanel';
import { RoleListPanel } from '@/components/admin/RoleListPanel';
import { SyncControlPanel } from '@/components/admin/SyncControlPanel';
import { UserListPanel } from '@/components/admin/UserListPanel';

const adminCards = [
  { title: 'Users', description: 'View active users and assigned roles' },
  { title: 'Roles', description: 'Review role access type' },
  { title: 'Branch Access', description: 'Assign exact branch access' },
  { title: 'Refresh History', description: 'Track CRM sync results' },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Admin Panel</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage users, roles, branch access, audit logs, CRM sync, and refresh history.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminCards.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>

        <UserListPanel />
        <RoleListPanel />
        <BranchListPanel />
        <BranchAccessPanel />
        <AuditActivityPanel />
        <SyncControlPanel />
      </div>
    </main>
  );
}
