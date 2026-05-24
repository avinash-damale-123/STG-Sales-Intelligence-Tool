import './globals.css';
import type { Metadata } from 'next';
import { AppChrome } from '@/components/layout/AppChrome';

export const metadata: Metadata = {
  title: 'STG-Sales Intelligence',
  description: 'Branch-secured sales performance intelligence platform for Satguru Travel Group.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
