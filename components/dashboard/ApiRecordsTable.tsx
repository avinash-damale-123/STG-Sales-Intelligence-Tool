'use client';

import { useEffect, useState } from 'react';

type ColumnConfig = {
  key: string;
  label: string;
};

type ApiRecordsTableProps = {
  endpoint: string;
  columns: ColumnConfig[];
  emptyMessage?: string;
};

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString();
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return String(value);
}

export function ApiRecordsTable({ endpoint, columns, emptyMessage = 'No records available.' }: ApiRecordsTableProps) {
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecords() {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          cache: 'no-store',
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          setMessage(result.message || 'Unable to load records.');
          return;
        }

        setRecords(result.data || []);
      } catch {
        setMessage('Unable to connect to records API.');
      } finally {
        setIsLoading(false);
      }
    }

    loadRecords();
  }, [endpoint]);

  if (isLoading) {
    return <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">Loading records...</div>;
  }

  if (message) {
    return <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">{message}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-2">{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((record, index) => (
            <tr key={String(record.id || index)}>
              {columns.map((column) => (
                <td key={column.key} className="px-3 py-3 text-slate-600">
                  {formatValue(record[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {records.length === 0 ? (
        <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      ) : null}
    </div>
  );
}
