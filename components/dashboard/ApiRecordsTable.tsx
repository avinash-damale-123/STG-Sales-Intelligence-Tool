'use client';

import { useEffect, useMemo, useState } from 'react';

type ColumnConfig = {
  key: string;
  label: string;
};

type ApiRecordsTableProps = {
  endpoint: string;
  columns: ColumnConfig[];
  emptyMessage?: string;
  exportFileName?: string;
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

function escapeCsv(value: unknown) {
  const text = formatValue(value).replace(/"/g, '""');
  return `"${text}"`;
}

export function ApiRecordsTable({
  endpoint,
  columns,
  emptyMessage = 'No records available.',
  exportFileName = 'records.csv',
}: ApiRecordsTableProps) {
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

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

  const filteredRecords = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return records;
    }

    return records.filter((record) =>
      columns.some((column) => String(formatValue(record[column.key])).toLowerCase().includes(query))
    );
  }, [columns, records, searchText]);

  function exportCsv() {
    const header = columns.map((column) => escapeCsv(column.label)).join(',');
    const rows = filteredRecords.map((record) =>
      columns.map((column) => escapeCsv(record[column.key])).join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = exportFileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (isLoading) {
    return <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">Loading records...</div>;
  }

  if (message) {
    return <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">{message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search records..."
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm md:max-w-sm"
        />

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>{filteredRecords.length} of {records.length} records</span>
          <button
            type="button"
            onClick={exportCsv}
            disabled={filteredRecords.length === 0}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

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
            {filteredRecords.map((record, index) => (
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

        {filteredRecords.length === 0 ? (
          <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">
            {searchText ? 'No records match your search.' : emptyMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}
