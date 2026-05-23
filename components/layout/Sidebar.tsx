import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/dashboard' },
  { label: 'ERV Clients', href: '/erv' },
  { label: 'NCA Pipeline', href: '/nca' },
  { label: 'Revenue', href: '/revenue' },
  { label: 'Meetings', href: '/meetings' },
  { label: 'Alerts', href: '/alerts' },
  { label: 'Scorecard', href: '/scorecard' },
  { label: 'Admin', href: '/admin' },
];

export function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-slate-950 text-white p-5 hidden lg:block">
      <div className="mb-10">
        <div className="text-3xl font-bold">STG</div>
        <div className="text-sm text-slate-300">Sales Intelligence</div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-blue-600 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 text-xs text-slate-400">
        Data scope: Assigned branches
      </div>
    </aside>
  );
}
