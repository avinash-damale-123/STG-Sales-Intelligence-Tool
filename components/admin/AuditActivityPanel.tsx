'use client';

import { useEffect, useState } from 'react';

type AuditItem = {
  id: string;
  actionType: string;
  actionDescription?: string | null;
  createdAt: string;
  user?: {
    userId: string;
    firstName: string;
    lastName: string;
  } | null;
};

export function AuditActivityPanel() {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const response = await fetch('/api/audit', {
          method: 'GET',
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          setMessage(result.message || 'Unable to load audit activity.');
          return;
        }

        setLogs(result.data || []);
      } catch {
        setMessage('Unable to connect to audit API.');
      } finally {
        setIsLoading(false);
      }
    }

    loadLogs();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Audit Activity</h2>
        <p className="mt-1 text-sm text-slate-500">
          Review recent login and system activity.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
          Loading audit activity...
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
                <th className="px-3 py-2">Action</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.slice(0, 25).map((log) => (
                <tr key={log.id}>
                  <td className="px-3 py-3 font-medium text-slate-800">
                    {log.user ? `${log.user.firstName} ${log.user.lastName}` : '-'}
                    <div className="text-xs text-slate-500">{log.user?.userId || ''}</div>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{log.actionType}</td>
                  <td className="px-3 py-3 text-slate-600">{log.actionDescription || '-'}</td>
                  <td className="px-3 py-3 text-slate-600">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {logs.length === 0 ? (
            <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              No audit activity available yet.
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
