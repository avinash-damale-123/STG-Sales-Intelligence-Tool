'use client';

import { useEffect, useState } from 'react';

type RefreshItem = {
  id: string;
  endpointName: string;
  refreshStatus: string;
  recordsProcessed: number;
  errorMessage?: string | null;
  triggeredBy: string;
  startedAt: string;
  completedAt?: string | null;
};

export function SyncControlPanel() {
  const [history, setHistory] = useState<RefreshItem[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [syncType, setSyncType] = useState('all');

  async function loadHistory() {
    try {
      const response = await fetch('/api/refresh-history', {
        method: 'GET',
        cache: 'no-store',
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setHistory(result.data || []);
      }
    } catch {
      setMessage('Unable to load refresh history.');
    }
  }

  async function runSync() {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/crm/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ syncType }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(result.message || 'CRM sync failed.');
        return;
      }

      setMessage('CRM sync completed successfully.');
      await loadHistory();
    } catch {
      setMessage('Unable to connect to CRM sync API.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">CRM Sync Control</h2>
          <p className="mt-1 text-sm text-slate-500">
            Trigger secured CRM sync and review latest refresh history.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={syncType}
            onChange={(event) => setSyncType(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            <option value="all">All Data</option>
            <option value="branches">Branches</option>
            <option value="accounts">Accounts</option>
            <option value="meetings">Meetings</option>
          </select>

          <button
            type="button"
            onClick={runSync}
            disabled={isLoading}
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Syncing...' : 'Run Sync'}
          </button>
        </div>
      </div>

      {message ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {message}
        </div>
      ) : null}

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Endpoint</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Records</th>
              <th className="px-3 py-2">Triggered By</th>
              <th className="px-3 py-2">Completed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {history.slice(0, 10).map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-3 font-medium text-slate-800">{item.endpointName}</td>
                <td className="px-3 py-3 text-slate-600">{item.refreshStatus}</td>
                <td className="px-3 py-3 text-slate-600">{item.recordsProcessed}</td>
                <td className="px-3 py-3 text-slate-600">{item.triggeredBy}</td>
                <td className="px-3 py-3 text-slate-600">
                  {item.completedAt ? new Date(item.completedAt).toLocaleString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
            No refresh history available yet.
          </div>
        ) : null}
      </div>
    </section>
  );
}
