'use client';

import { useEffect, useState } from 'react';

type RoleItem = {
  id: string;
  roleName: string;
  isSuperAdmin: boolean;
  createdAt: string;
};

export function RoleListPanel() {
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRoles() {
      try {
        const response = await fetch('/api/roles', {
          method: 'GET',
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          setMessage(result.message || 'Unable to load roles.');
          return;
        }

        setRoles(result.data || []);
      } catch {
        setMessage('Unable to connect to roles API.');
      } finally {
        setIsLoading(false);
      }
    }

    loadRoles();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Role Management</h2>
        <p className="mt-1 text-sm text-slate-500">
          View available roles and Super Admin status.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
          Loading roles...
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
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Access Type</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="px-3 py-3 font-medium text-slate-800">{role.roleName}</td>
                  <td className="px-3 py-3 text-slate-600">
                    {role.isSuperAdmin ? 'All branches' : 'Assigned branches'}
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {roles.length === 0 ? (
            <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              No roles available yet.
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
