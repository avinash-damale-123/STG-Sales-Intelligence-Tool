'use client';

import { useEffect, useState } from 'react';

type UserItem = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
};

type BranchItem = {
  branchCode: string;
  branchName: string;
};

export function BranchAccessPanel() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersResponse, branchesResponse] = await Promise.all([
          fetch('/api/users', { method: 'GET', cache: 'no-store' }),
          fetch('/api/branches', { method: 'GET', cache: 'no-store' }),
        ]);

        const usersResult = await usersResponse.json();
        const branchesResult = await branchesResponse.json();

        if (usersResponse.ok && usersResult.success) {
          setUsers(usersResult.data || []);
        }

        if (branchesResponse.ok && branchesResult.success) {
          setBranches(branchesResult.data || []);
        }
      } catch {
        setMessage('Unable to load users or branches.');
      }
    }

    loadData();
  }, []);

  function toggleBranch(branchCode: string) {
    setSelectedBranches((current) =>
      current.includes(branchCode)
        ? current.filter((code) => code !== branchCode)
        : [...current, branchCode]
    );
  }

  async function saveAccess() {
    if (!selectedUserId) {
      setMessage('Select a user first.');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/branch-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUserId,
          branchCodes: selectedBranches,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setMessage(result.message || 'Unable to update branch access.');
        return;
      }

      setMessage('Branch access updated successfully.');
    } catch {
      setMessage('Unable to connect to branch access API.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Branch Access Assignment</h2>
        <p className="mt-1 text-sm text-slate-500">
          Assign exact branch access to non-admin users.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">User</label>
          <select
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.userId})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={saveAccess}
            disabled={isSaving}
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? 'Saving...' : 'Save Branch Access'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid max-h-72 grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch) => (
          <label
            key={branch.branchCode}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm"
          >
            <input
              type="checkbox"
              checked={selectedBranches.includes(branch.branchCode)}
              onChange={() => toggleBranch(branch.branchCode)}
            />
            <span>
              <span className="font-medium text-slate-800">{branch.branchCode}</span>
              <span className="ml-2 text-slate-500">{branch.branchName}</span>
            </span>
          </label>
        ))}
      </div>

      {branches.length === 0 ? (
        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
          No branches available. Run CRM branch sync first.
        </div>
      ) : null}

      {message ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {message}
        </div>
      ) : null}
    </section>
  );
}
