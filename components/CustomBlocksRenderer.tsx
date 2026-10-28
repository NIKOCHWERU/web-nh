"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Scale,
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PageBlock } from '@/lib/cmsTypes';

export function BlockRendererItem({ block, isPreview = false }: { block: PageBlock; isPreview?: boolean }) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!block.visible && !isPreview) return null;

  const bgClass =
    block.style?.bgTheme === 'navy'
      ? 'bg-navy text-white'
      : block.style?.bgTheme === 'dark'
      ? 'bg-[#111114] text-white'
      : block.style?.bgTheme === 'gray'
      ? 'bg-gray-50 text-navy'
      : 'bg-white text-navy';

  const padClass =
    block.style?.paddingY === 'sm'
      ? 'py-8 md:py-10'
      : block.style?.paddingY === 'lg'
      ? 'py-20 md:py-24'
      : 'py-12 md:py-16';

  const alignClass = block.style?.align === 'left' ? 'text-left' : 'text-center';
  const isDark = block.style?.bgTheme === 'navy' || block.style?.bgTheme === 'dark';

  switch (block.type) {
    case 'stats_bar': {
      const items = Array.isArray(block.data?.items) ? block.data.items : [];
      return (
        <section className={`${bgClass} ${padClass} border-y ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            {(block.data?.badge || block.data?.title || block.data?.subtitle) && (
              <div className={`${alignClass} mb-10`}>
                {block.data?.badge && (
                  <span className="inline-block px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                    {block.data.badge}
                  </span>
                )}
                {block.data?.title && (
                  <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                    {block.data.title}
                  </h2>
                )}
                {block.data?.subtitle && (
                  <p className={`text-sm md:text-base max-w-3xl ${block.style?.align === 'center' ? 'mx-auto' : ''} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {block.data.subtitle}
                  </p>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((stat: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border text-center transition-all ${
                    isDark
                      ? 'bg-[#16161b] border-white/10 hover:border-gold/40'
                      : 'bg-white border-gray-200 shadow-sm hover:border-gold'
                  }`}
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-gold mb-1.5 font-sans">
                    {stat.value}
                  </div>
                  <div className={`text-xs md:text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'hero': {
      return (
        <section className={`relative overflow-hidden ${bgClass} ${padClass}`}>
          {block.data?.bgImage && (
            <div className="absolute inset-0">
              <img src={block.data.bgImage} alt={block.data.title || 'Banner'} className="w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-navy/80"></div>
            </div>
          )}
          <div className={`container mx-auto px-4 max-w-6xl relative z-10 ${alignClass}`}>
            {block.data?.badge && (
              <span className="inline-block px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-4">
                {block.data.badge}
              </span>
            )}
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {block.data?.title}{' '}
              {block.data?.highlight && <span className="text-gold">{block.data.highlight}</span>}
            </h2>
            {block.data?.subtitle && (
              <p className={`text-base md:text-lg mb-8 max-w-2xl leading-relaxed ${block.style?.align === 'center' ? 'mx-auto' : ''} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {block.data.subtitle}
              </p>
            )}
            {block.data?.buttonText && (
              <Link
                href={block.data.buttonUrl || '/kontak'}
                className="inline-flex items-center gap-2 bg-gold text-navy px-7 py-3.5 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-md"
              >
                {block.data.buttonText} <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </section>
      );
    }

    case 'heading_text': {
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className={`container mx-auto px-4 max-w-4xl ${alignClass}`}>
            {block.data?.badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                {block.data.badge}
              </span>
            )}
            {block.data?.title && (
              <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wide">
                {block.data.title}
              </h2>
            )}
            <div className={`w-16 h-1 bg-gold mb-6 ${block.style?.align === 'center' ? 'mx-auto' : ''}`}></div>
            {block.data?.body && (
              <div
                className={`prose max-w-none leading-relaxed ${isDark ? 'text-gray-300 prose-headings:text-white' : 'text-gray-600 prose-headings:text-navy'}`}
                dangerouslySetInnerHTML={{ __html: block.data.body }}
              />
            )}
          </div>
        </section>
      );
    }

    case 'features_grid': {
      const items = Array.isArray(block.data?.items) ? block.data.items : [];
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className={`${alignClass} mb-10`}>
              {block.data?.badge && (
                <span className="inline-block px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                  {block.data.badge}
                </span>
              )}
              {block.data?.title && (
                <h2 className="text-2xl md:text-4xl font-bold mb-3 uppercase tracking-wide">
                  {block.data.title}
                </h2>
              )}
              {block.data?.subtitle && (
                <p className={`text-sm md:text-base max-w-2xl ${block.style?.align === 'center' ? 'mx-auto' : ''} ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {block.data.subtitle}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border transition-all ${
                    isDark
                      ? 'bg-[#16161b] border-white/10 hover:border-gold/50'
                      : 'bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-gold'
                  }`}
                >
                  <div className="w-11 h-11 rounded-lg bg-gold/15 border border-gold/30 text-gold flex items-center justify-center mb-4">
                    {idx % 3 === 0 ? <Scale size={22} /> : idx % 3 === 1 ? <FileText size={22} /> : <ShieldCheck size={22} />}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'split_content': {
      const bullets = Array.isArray(block.data?.bullets) ? block.data.bullets : [];
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className={block.data?.imagePosition === 'right' ? 'md:order-2' : ''}>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gold/20 aspect-video bg-gray-100">
                  <img
                    src={block.data?.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80'}
                    alt={block.data?.title || 'Section Image'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className={block.data?.imagePosition === 'right' ? 'md:order-1' : ''}>
                {block.data?.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                    {block.data.badge}
                  </span>
                )}
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{block.data?.title}</h2>
                <p className={`text-sm md:text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {block.data?.desc}
                </p>
                {bullets.length > 0 && (
                  <ul className="space-y-2.5 mb-6">
                    {bullets.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle size={17} className="text-gold shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {block.data?.buttonText && (
                  <Link
                    href={block.data.buttonUrl || '/kontak'}
                    className="inline-flex items-center gap-2 bg-gold text-navy px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider hover:opacity-90 transition"
                  >
                    {block.data.buttonText} <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 'faq': {
      const items = Array.isArray(block.data?.items) ? block.data.items : [];
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 uppercase">{block.data?.title || 'Pertanyaan Umum'}</h2>
              <div className="w-16 h-1 bg-gold mx-auto"></div>
            </div>
            <div className="space-y-3">
              {items.map((faq: any, i: number) => (
                <div
                  key={i}
                  className={`rounded-xl border px-5 py-4 ${
                    isDark ? 'bg-[#16161b] border-white/10' : 'bg-white border-gray-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm md:text-base gap-4"
                  >
                    <span>{faq.q}</span>
                    {openFaqIdx === i ? <ChevronUp size={18} className="text-gold shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                  </button>
                  {openFaqIdx === i && (
                    <p className={`mt-3 pt-3 border-t text-sm leading-relaxed ${isDark ? 'border-white/10 text-gray-300' : 'border-gray-100 text-gray-600'}`}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'testimonials': {
      const items = Array.isArray(block.data?.items) ? block.data.items : [];
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 uppercase">{block.data?.title || 'Testimoni Klien'}</h2>
              <div className="w-16 h-1 bg-gold mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {items.map((tItem: any, i: number) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl border border-l-4 border-l-gold ${
                    isDark ? 'bg-[#16161b] border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <p className={`italic text-sm md:text-base mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    "{tItem.text}"
                  </p>
                  <div className="font-bold text-sm">{tItem.name}</div>
                  <div className="text-xs text-gold uppercase tracking-wider">{tItem.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'cta_banner': {
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-snug">
              {block.data?.title} <span className="text-gold">{block.data?.highlight}</span>
            </h2>
            {block.data?.subtitle && (
              <p className={`text-sm md:text-base mb-7 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {block.data.subtitle}
              </p>
            )}
            <a
              href={block.data?.buttonUrl || 'https://wa.me/6282211020022'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gold text-navy px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
            >
              <Phone size={16} />
              {block.data?.buttonText || 'Konsultasi Sekarang'}
            </a>
          </div>
        </section>
      );
    }

    case 'custom_html': {
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div
            className="container mx-auto px-4 max-w-6xl"
            dangerouslySetInnerHTML={{ __html: block.data?.html || '' }}
          />
        </section>
      );
    }

    default:
      return null;
  }
}

export default function CustomBlocksRenderer({ page }: { page: 'home' | 'tentang' | 'services' | 'kontak' }) {
  const [blocks, setBlocks] = useState<PageBlock[]>([]);

  useEffect(() => {
    fetch('/api/cms', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.blocks)) {
          const filtered = data.blocks
            .filter((b: PageBlock) => b.page === page && b.visible)
            .sort((a: PageBlock, b: PageBlock) => a.order - b.order);
          setBlocks(filtered);
        }
      })
      .catch(() => {});
  }, [page]);

  if (blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block) => (
        <BlockRendererItem key={block.id} block={block} />
      ))}
    </>
  );
}
