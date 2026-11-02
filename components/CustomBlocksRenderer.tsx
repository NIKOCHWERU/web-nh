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
  ChevronUp,
  Zap,
  BookOpen,
  Compass,
  MessageSquare,
  Lightbulb,
  Award,
  Sparkles
} from 'lucide-react';
import { PageBlock, DEFAULT_PRESET_BLOCKS } from '@/lib/cmsTypes';

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
      const videoSrc = block.data?.bgVideoUrl || "https://res.cloudinary.com/dysw7tjks/video/upload/v1756377208/Desain_tanpa_judul_oeaojq.mp4";
      return (
        <section
          id="home"
          className={`relative overflow-hidden ${
            isPreview ? 'py-16 min-h-[380px] md:min-h-[460px]' : 'h-screen'
          } flex items-center bg-gradient-to-br from-[#0a0a0b] via-[#161618] to-[#0a0a0b] text-white`}
        >
          {/* Background Video with Dark Overlay (Matches actual site) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {videoSrc ? (
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                key={videoSrc}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : block.data?.bgImage ? (
              <img src={block.data.bgImage} alt="Banner" className="w-full h-full object-cover opacity-25" />
            ) : null}
            <div className="absolute inset-0 bg-black/75"></div>
          </div>

          <div className={`container mx-auto px-4 max-w-5xl relative z-10 ${alignClass} ${!isPreview ? 'pt-10' : ''}`}>
            {block.data?.badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-4">
                {block.data.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight uppercase font-sans">
              {block.data?.title}{' '}
              {block.data?.highlight && <span className="text-gold block sm:inline">{block.data.highlight}</span>}
            </h1>
            {block.data?.subtitle && (
              <p className="text-sm md:text-base lg:text-lg mb-8 max-w-3xl leading-relaxed text-gray-300 border-l-4 border-gold pl-4 font-light">
                {block.data.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              {block.data?.buttonText && (
                <Link
                  href={block.data.buttonUrl || '/services'}
                  className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl"
                >
                  {block.data.buttonText} <ArrowRight size={15} />
                </Link>
              )}
              {block.data?.secondaryBtnText && (
                <Link
                  href={block.data.secondaryBtnUrl || '/kontak'}
                  className="inline-flex items-center gap-2 border border-white/80 text-white px-8 py-4 rounded font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-navy transition-all"
                >
                  {block.data.secondaryBtnText}
                </Link>
              )}
            </div>
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
                dangerouslySetInnerHTML={{
                  __html: block.data.body.includes('<')
                    ? block.data.body
                    : block.data.body
                        .split(/\n\s*\n/)
                        .map((p: string) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
                        .join('')
                }}
              />
            )}
          </div>
        </section>
      );
    }

    case 'features_grid': {
      const defaultImages = [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
      ];
      const defaultBadges = ["34 Cakupan Perkara", "411 Layanan Izin & Pajak", "6 Program Utama"];
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
              {items.map((item: any, idx: number) => {
                const cardImg = item.image || defaultImages[idx % 3];
                const cardBadge = item.badge || defaultBadges[idx % 3];
                return (
                  <div
                    key={idx}
                    className="relative group overflow-hidden rounded-2xl shadow-lg border border-gray-200 h-[340px] flex flex-col justify-end text-left"
                  >
                    {/* Real background image with dark gradient like live website */}
                    <div className="absolute inset-0">
                      <img
                        src={cardImg}
                        alt={item.title || 'Layanan'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/35"></div>
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-navy/90 border border-gold/40 text-gold text-[10px] font-bold tracking-wider uppercase shadow-md">
                        {cardBadge}
                      </span>
                    </div>

                    <div className="relative z-10 p-6 flex flex-col justify-end text-white">
                      <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center mb-3 border border-gold/30">
                        {idx % 3 === 0 ? <Scale size={20} /> : idx % 3 === 1 ? <FileText size={20} /> : <ShieldCheck size={20} />}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-white font-sans">{item.title}</h3>
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 font-light mb-3">{item.desc}</p>
                      <div className="w-8 h-0.5 bg-gold"></div>
                    </div>
                  </div>
                );
              })}
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

        case 'navbar_section': {
      return (
        <header className="bg-[#0b0c10] text-white py-4 px-6 border-b border-gold/30 shadow-xl">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={block.data?.logoUrl || '/logo.png'} alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="text-lg font-bold font-serif text-gold tracking-wider leading-tight">
                  {block.data?.brandName || 'NARASUMBER HUKUM'}
                </div>
                <div className="text-[9px] text-gray-300 tracking-[0.25em] uppercase">
                  {block.data?.tagline || 'SENTRAL EDUKASI & SOLUSI'}
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-gray-300">
              <span className="text-gold">Beranda</span>
              <span>Tentang Kami</span>
              <span>Layanan</span>
              <span>Artikel</span>
              <span>Kontak</span>
            </div>
            <Link
              href={block.data?.ctaUrl || '/kontak'}
              className="px-5 py-2 rounded-full bg-gold text-navy font-bold text-xs uppercase tracking-widest hover:bg-white transition"
            >
              {block.data?.ctaText || 'HUBUNGI'}
            </Link>
          </div>
        </header>
      );
    }

    case 'footer_section': {
      const offices = Array.isArray(block.data?.offices) ? block.data.offices : [];
      return (
        <footer className="bg-[#08080a] text-white py-12 px-6 border-t border-white/10">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                <h4 className="text-lg font-bold font-serif text-gold">NARASUMBER HUKUM</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                {block.data?.aboutSummary || 'Sentral edukasi dan pendampingan hukum, perizinan, dan pelatihan SDM di seluruh Indonesia.'}
              </p>
              <div className="text-xs text-gray-400">
                WhatsApp: <strong className="text-gold">{block.data?.whatsapp || '0822 1102 0022'}</strong>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-4">Kantor Operasional</h4>
              <div className="space-y-3 text-xs text-gray-300">
                {offices.map((off: any, idx: number) => (
                  <div key={idx} className="border-b border-white/5 pb-2">
                    <div className="font-bold text-white">{off.name}</div>
                    <div className="text-[11px] text-gray-400">{off.addr}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-4">Legal & Hak Cipta</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Advocate, Intercessor, and Legal Consultant. Dilindungi Undang-Undang Republik Indonesia.
              </p>
              <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} Narasumber Hukum. {block.data?.copyright || 'All Rights Reserved.'}
              </div>
            </div>
          </div>
        </footer>
      );
    }

    case 'about_story': {
      const paragraphs = Array.isArray(block.data?.paragraphs) ? block.data.paragraphs : [];
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-black text-navy uppercase tracking-wider">
                {block.data?.title || 'NARASUMBER HUKUM'}
              </h2>
              <div className="w-24 h-1.5 bg-gold mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="space-y-5 text-gray-700 text-sm md:text-base leading-relaxed">
              {paragraphs.map((p: string, idx: number) => (
                <p key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case 'about_vision_mission': {
      const missions = Array.isArray(block.data?.missions) ? block.data.missions : [];
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide mb-3 text-gold">
                {block.data?.visionTitle || 'Visi Kami'}
              </h2>
              <p className="text-base md:text-xl italic max-w-3xl mx-auto leading-relaxed text-gray-200">
                "{block.data?.visionDesc}"
              </p>
            </div>
            <div className="border-t border-white/10 pt-10">
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-8 text-center text-white">
                {block.data?.missionTitle || 'Misi Kami'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {missions.map((m: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/40 transition">
                    <h4 className="text-sm font-bold text-gold mb-1.5">{m.title}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 'about_values': {
      const items = Array.isArray(block.data?.items) ? block.data.items : [];
      return (
        <section className={`relative overflow-hidden ${bgClass} ${padClass}`}>
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.14),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className="container relative z-10 mx-auto px-4 max-w-5xl">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              {block.data?.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {block.data.badge}
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide uppercase mb-3">
                <span className="block mb-1 sm:inline sm:mr-3">NILAI-NILAI UTAMA</span>
                <span className="text-gold tracking-[0.2em] font-sans font-light whitespace-nowrap text-xl sm:text-3xl md:text-4xl">
                  (R - I - C - C - I - E - P)
                </span>
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4" />
              {block.data?.subtitle && (
                <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                  {block.data.subtitle}
                </p>
              )}
            </div>

            {/* Vertical Executive Charter Rows (R | ....) */}
            <div className="space-y-4 md:space-y-5">
              {items.map((it: any, idx: number) => {
                const titleStr = (it.title || '').trim();

                const badgeLetter = (() => {
                  if (!titleStr) return String(idx + 1);
                  if (titleStr.includes(' - ')) {
                    const prefix = titleStr.split(' - ')[0].trim();
                    if (prefix.length <= 2) return prefix.toUpperCase();
                  }
                  return titleStr.charAt(0).toUpperCase() || String(idx + 1);
                })();

                const cleanTitle = (() => {
                  if (titleStr.includes(' - ')) {
                    return titleStr.split(' - ').slice(1).join(' - ').trim();
                  }
                  return titleStr;
                })();

                const descStr = (it.desc || '').trim();
                let slogan = '';
                let explanation = descStr;
                const periodIdx = descStr.indexOf('.');
                if (periodIdx !== -1 && periodIdx < 45) {
                  slogan = descStr.slice(0, periodIdx).trim();
                  explanation = descStr.slice(periodIdx + 1).trim();
                }

                const renderIcon = () => {
                  switch (badgeLetter) {
                    case 'R':
                      return <Zap className="w-4 h-4 text-gold" />;
                    case 'I':
                      return idx === 1 ? <BookOpen className="w-4 h-4 text-gold" /> : <Compass className="w-4 h-4 text-gold" />;
                    case 'C':
                      return idx === 2 ? <MessageSquare className="w-4 h-4 text-gold" /> : <Lightbulb className="w-4 h-4 text-gold" />;
                    case 'E':
                      return <Award className="w-4 h-4 text-gold" />;
                    case 'P':
                      return <ShieldCheck className="w-4 h-4 text-gold" />;
                    default:
                      return <Sparkles className="w-4 h-4 text-gold" />;
                  }
                };

                return (
                  <div
                    key={idx}
                    className="group relative p-5 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-r from-[#141624]/95 via-[#10121a]/90 to-[#0b0c12]/95 border border-white/10 hover:border-gold/50 shadow-lg hover:shadow-[0_10px_35px_rgba(197,160,89,0.15)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Left Accent Gold Highlight Line on Hover */}
                    <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-gold/50 via-gold to-gold/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />

                    {/* Watermark Monogram Letter in Background */}
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl sm:text-8xl md:text-9xl font-serif font-black text-gold/[0.03] group-hover:text-gold/[0.08] select-none pointer-events-none transition-colors duration-500">
                      {badgeLetter}
                    </span>

                    {/* Horizontal / Responsive Flex Row */}
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      {/* Left: Monogram Seal with Principle Number */}
                      <div className="flex sm:flex-col items-center gap-3 sm:gap-1.5 shrink-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-gold/30 via-gold/15 to-gold/5 border border-gold/40 flex items-center justify-center font-serif text-2xl sm:text-3xl md:text-4xl font-black text-gold shadow-[0_0_25px_rgba(197,160,89,0.2)] group-hover:scale-105 group-hover:border-gold transition-all duration-300">
                          {badgeLetter}
                        </div>
                        <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-gold/70 group-hover:text-gold font-bold uppercase">
                          PRINSIP #{idx + 1}
                        </span>
                      </div>

                      {/* Vertical Divider Line (|) */}
                      <div className="hidden sm:block w-[1.5px] self-stretch min-h-[60px] bg-gradient-to-b from-transparent via-gold/40 to-transparent group-hover:via-gold transition-colors shrink-0" />

                      {/* Right: Content Section */}
                      <div className="flex-1 min-w-0">
                        {/* Title & Slogan Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                            <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-white tracking-wide uppercase group-hover:text-gold transition-colors">
                              {cleanTitle}
                            </h3>
                            {slogan && (
                              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs sm:text-sm font-serif italic font-medium">
                                "{slogan}"
                              </span>
                            )}
                          </div>

                          {/* Micro Icon Badge */}
                          <div className="hidden md:flex w-8 h-8 rounded-lg bg-white/5 border border-white/10 items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/30 transition-colors">
                            {renderIcon()}
                          </div>
                        </div>

                        {/* Divider Line */}
                        <div className="w-full h-px bg-white/5 mb-2.5 group-hover:bg-gold/20 transition-colors" />

                        {/* Explanation Text */}
                        <p className="text-xs sm:text-sm md:text-[15px] text-gray-300/90 leading-relaxed font-light">
                          {explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    case 'services_intro': {
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            {block.data?.badge && (
              <span className="inline-block px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                {block.data.badge}
              </span>
            )}
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase text-white">
              {block.data?.title}
            </h2>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {block.data?.subtitle}
            </p>
          </div>
        </section>
      );
    }

    case 'services_catalog': {
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md">
                <div className="text-xs font-bold text-gold uppercase mb-2">Slide 1</div>
                <h3 className="text-lg font-bold text-navy mb-2">{block.data?.slide1Title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{block.data?.slide1Desc}</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md">
                <div className="text-xs font-bold text-gold uppercase mb-2">Slide 2</div>
                <h3 className="text-lg font-bold text-navy mb-2">{block.data?.slide2Title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{block.data?.slide2Desc}</p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-md">
                <div className="text-xs font-bold text-gold uppercase mb-2">Slide 3</div>
                <h3 className="text-lg font-bold text-navy mb-2">{block.data?.slide3Title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{block.data?.slide3Desc}</p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    case 'contact_form_section': {
      return (
        <section className={`${bgClass} ${padClass}`}>
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-navy mb-2 uppercase">{block.data?.title || 'Hubungi Kami'}</h2>
              <p className="text-xs md:text-sm text-gray-500">{block.data?.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white border border-gray-200 text-center">
                <div className="text-[11px] font-bold text-gray-400 uppercase">WhatsApp</div>
                <div className="text-xs font-bold text-navy">{block.data?.whatsapp}</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200 text-center">
                <div className="text-[11px] font-bold text-gray-400 uppercase">Email</div>
                <div className="text-xs font-bold text-navy">{block.data?.email}</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200 text-center">
                <div className="text-[11px] font-bold text-gray-400 uppercase">Alamat</div>
                <div className="text-xs font-bold text-navy">{block.data?.address}</div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}

export default function CustomBlocksRenderer({ page }: { page: 'home' | 'tentang' | 'services' | 'kontak' }) {
  const [blocks, setBlocks] = useState<PageBlock[]>(() =>
    DEFAULT_PRESET_BLOCKS.filter((b) => b.page === page && b.visible).sort((a, b) => {
      if (a.id === 'blk-home-hero' && b.id === 'blk-home-stats') return -1;
      if (a.id === 'blk-home-stats' && b.id === 'blk-home-hero') return 1;
      return a.order - b.order;
    })
  );

  useEffect(() => {
    fetch('/api/cms', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.blocks)) {
          const filtered = data.blocks
            .filter((b: PageBlock) => b.page === page && b.visible)
            .sort((a: PageBlock, b: PageBlock) => {
              if (a.id === 'blk-home-hero' && b.id === 'blk-home-stats') return -1;
              if (a.id === 'blk-home-stats' && b.id === 'blk-home-hero') return 1;
              return a.order - b.order;
            });
          if (filtered.length > 0) {
            setBlocks(filtered);
          }
        }
      })
      .catch(() => {});
  }, [page]);

  if (blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block) => (
        <BlockRendererItem key={block.id} block={block} isPreview={false} />
      ))}
    </>
  );
}
