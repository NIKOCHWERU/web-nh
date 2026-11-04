import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { readCmsDb } from '@/lib/cmsStorage';
import LinkTreePublicView from '@/components/LinkTreePublicView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug || '').replace(/^@/, '').toLowerCase().trim();
  const db = readCmsDb();
  const item = (db.linktrees || []).find((lt) => lt.slug.toLowerCase() === cleanSlug);

  if (!item || !item.active) {
    return {
      title: 'Link Tree Tidak Ditemukan | Narasumber Hukum',
      description: 'Halaman Link Tree tidak ditemukan atau sedang tidak aktif.'
    };
  }

  const title = `${item.profile.name} (@${item.slug}) | Link Tree Resmi Narasumber Hukum`;
  const description = item.profile.bio || item.profile.tagline || 'Tautan dan kontak resmi Narasumber Hukum.';
  const image = item.profile.avatarUrl || '/logo.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.narasumberhukum.com/@${item.slug}`,
      siteName: 'Narasumber Hukum',
      images: [
        {
          url: image,
          width: 600,
          height: 600,
          alt: item.profile.name
        }
      ],
      type: 'profile'
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [image]
    }
  };
}

export default async function LinkTreePage({ params }: PageProps) {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug || '').replace(/^@/, '').toLowerCase().trim();
  const db = readCmsDb();
  const item = (db.linktrees || []).find((lt) => lt.slug.toLowerCase() === cleanSlug);

  if (!item || !item.active) {
    return (
      <div className="min-h-screen bg-navy text-white flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="max-w-md w-full bg-[#14151F] border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-gold mb-5">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
            Link Tree Tidak Tersedia
          </h1>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Tautan <span className="font-mono text-gold font-bold">@{cleanSlug || 'profil'}</span> tidak ditemukan atau sedang dinonaktifkan oleh administrator.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-navy font-bold text-xs uppercase tracking-wider transition shadow-lg"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Website Utama</span>
          </Link>
        </div>
      </div>
    );
  }

  return <LinkTreePublicView item={item} />;
}
