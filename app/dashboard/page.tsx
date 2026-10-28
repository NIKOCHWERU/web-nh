import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard Admin & Visual Builder | Narasumber Hukum',
  description: 'Portal manajemen artikel, pesan klien, pengguna penulis, dan visual block builder Kantor Narasumber Hukum.',
  robots: {
    index: false,
    follow: false
  }
};

export default function DashboardPage() {
  return <DashboardClient />;
}
