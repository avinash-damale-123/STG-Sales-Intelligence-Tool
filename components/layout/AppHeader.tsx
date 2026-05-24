import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/erv', label: 'ERV' },
  { href: '/nca', label: 'NCA' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/alerts', label: 'Alerts' },
  { href: '/scorecard', label: 'Scorecard' },
  { href: '/admin', label: 'Admin' },
];

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/dashboard" className="text-lg font-bold text-slate-950">
            STG-Sales Intelligence
          </Link>
          <p className="text-xs text-slate-500">Branch-secured sales performance platform</p>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950">
              {link.label}
            </Link>
          ))}
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}
