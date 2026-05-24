'use client';

import { useEffect, useState } from 'react';

type BranchItem = {
  id: string;
  branchCode: string;
  branchName: string;
  regionName?: string | null;
  countryName?: string | null;
  status: string;
};

export function BranchListPanel() {
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBranches() {
      try {
        const response = await fetch('/api/branches', {
          method: 'GET',
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          setMessage(result.message || 'Unable to load branches.');
          return;
        }

        setBranches(result.data || []);
      } catch {
        setMessage('Unable to connect to branches API.');
      } finally {
        setIsLoading(false);
      }
    }

    loadBranches();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Branch Master</h2>
        <p className="mt-1 text-sm text-slate-500">
          View synced branches used for user access and branch-secured reporting.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
          Loading branches...
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
                <th className="px-3 py-2">Code</th>
                <th className="px-3 py-2">Branch</th>
                <th className="px-3 py-2">Region</th>
                <th className="px-3 py-2">Country</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {branches.slice(0, 50).map((branch) => (
                <tr key={branch.id}>
                  <td className="px-3 py-3 font-medium text-slate-800">{branch.branchCode}</td>
                  <td className="px-3 py-3 text-slate-600">{branch.branchName}</td>
                  <td className="px-3 py-3 text-slate-600">{branch.regionName || '-'}</td>
                  <td className="px-3 py-3 text-slate-600">{branch.countryName || '-'}</td>
                  <td className="px-3 py-3 text-slate-600">{branch.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {branches.length === 0 ? (
            <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              No branches available yet. Run CRM branch sync first.
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
