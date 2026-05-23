export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          STG-Sales Intelligence
        </h1>
        <p className="text-sm text-slate-500">
          Enterprise branch-secured analytics platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600">
          Assigned Branches
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Admin User
        </div>
      </div>
    </header>
  );
}
