
import React from 'react';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
  // Optional: Pre-render these paths at build time
  return [
    { slug: 'bidang-hukum' },
    { slug: 'bidang-perizinan-perpajakan-keimigrasian-legalitas' },
    { slug: 'bidang-pengembangan-pelatihan-sdm' }
  ];
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params for Next.js 15+ compatibility
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
