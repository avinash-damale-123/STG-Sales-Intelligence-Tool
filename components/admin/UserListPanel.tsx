'use client';

import { useEffect, useState } from 'react';

type UserItem = {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  department?: string | null;
  status: string;
  primaryBranchCode?: string | null;
  role?: {
    roleName: string;
    isSuperAdmin: boolean;
  } | null;
  branchAccess?: Array<{
    branchCode: string;
  }>;
};

export function UserListPanel() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          setMessage(result.message || 'Unable to load users.');
          return;
        }

        setUsers(result.data || []);
      } catch {
        setMessage('Unable to connect to users API.');
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">User Management</h2>
        <p className="mt-1 text-sm text-slate-500">
          View active users, roles, and assigned branch access.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
          Loading users...
        </div>
      ) : null}

      {message ? (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          {message}
        </div>
      ) : null}

      {!isLoading && !message ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2">User</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Branches</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-3 py-3 font-medium text-slate-800">
                    {user.firstName} {user.lastName}
                    <div className="text-xs text-slate-500">{user.userId}</div>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{user.email}</td>
                  <td className="px-3 py-3 text-slate-600">{user.role?.roleName || '-'}</td>
                  <td className="px-3 py-3 text-slate-600">
                    {user.role?.isSuperAdmin
                      ? 'All branches'
                      : user.branchAccess?.map((branch) => branch.branchCode).join(', ') || '-'}
                  </td>
                  <td className="px-3 py-3 text-slate-600">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 ? (
            <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              No users available yet.
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
