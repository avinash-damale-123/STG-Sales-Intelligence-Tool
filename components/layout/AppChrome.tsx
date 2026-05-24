'use client';

import { usePathname } from 'next/navigation';
import { AppHeader } from './AppHeader';

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeader = pathname !== '/login';

  return (
    <>
      {showHeader ? <AppHeader /> : null}
      {children}
    </>
  );
}
