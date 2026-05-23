export function FilterBar() {
  const filters = ['Region', 'Branch', 'Owner', 'Department', 'Account Type', 'Date Range'];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6">
        {filters.map((filter) => (
          <button
            key={filter}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <span>{filter}</span>
            <span className="text-slate-400">All</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Filters refine data already restricted by assigned branch access.
      </p>
    </div>
  );
}
