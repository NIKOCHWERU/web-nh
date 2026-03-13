
import React from 'react';
import ServiceDetailClient from './ServiceDetailClient';

export function generateStaticParams() {
  // Optional: Pre-render these paths at build time
  return [
    { slug: 'hukum' },
    { slug: 'perizinan' },
    { slug: 'pelatihan-sdm' }
  ];
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params for Next.js 15+ compatibility
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
