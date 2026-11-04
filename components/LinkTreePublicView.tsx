"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Share2,
  Copy,
  Check,
  MapPin,
  Clock,
  Mail,
  Phone,
  FileText,
  Globe,
  BadgeCheck,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { LinkTreeItem, LinkTreeLinkItem } from '@/lib/cmsTypes';

const SOCIAL_SVGS: Record<string, React.ReactNode> = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
    </svg>
  )
};

export function getAutoSocialKey(url: string): string | null {
  if (!url) return null;
  try {
    const full = /^[a-z][a-z0-9+.-]*:/i.test(url) ? url : 'https://' + url;
    const host = new URL(full).hostname.toLowerCase();
    const is = (d: string) => host === d || host.endsWith('.' + d);
    if (is('wa.me') || is('whatsapp.com')) return 'whatsapp';
    if (is('instagram.com') || is('instagr.am')) return 'instagram';
    if (is('linkedin.com')) return 'linkedin';
    if (is('facebook.com') || is('fb.com') || is('fb.me')) return 'facebook';
    if (is('twitter.com') || is('x.com')) return 'twitter';
    if (is('youtube.com') || is('youtu.be')) return 'youtube';
    if (is('tiktok.com')) return 'tiktok';
  } catch {
    return null;
  }
  return null;
}

export function resolveLinkIconName(link: LinkTreeLinkItem): string {
  if (link.icon && link.icon !== 'auto') return link.icon;
  return getAutoSocialKey(link.url) || 'globe';
}

interface LinkTreePublicViewProps {
  item: LinkTreeItem;
}

export default function LinkTreePublicView({ item }: LinkTreePublicViewProps) {
  const [copied, setCopied] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const theme = item.theme || 'gold_luxury';
  const isNavyTheme = theme === 'navy_gold';
  const isMinimalTheme = theme === 'minimal_white';

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/@${item.slug}`
    : `https://narasumberhukum.com/@${item.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.profile.name} - Link Tree Resmi`,
          text: item.profile.bio || item.profile.tagline,
          url: currentUrl
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const defaultAvatar = '/logo.png';
  const avatarSrc = !imgErr && item.profile.avatarUrl ? item.profile.avatarUrl : defaultAvatar;

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 antialiased ${
        isNavyTheme
          ? 'bg-[#0B0C10] text-gray-100'
          : isMinimalTheme
          ? 'bg-slate-100 text-slate-900'
          : 'bg-[#F8F9FA] text-[#1E293B]'
      }`}
    >
      {/* Top Floating Actions Bar */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between mb-4 px-2">
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
            isNavyTheme
              ? 'bg-white/10 hover:bg-white/20 text-gray-300'
              : 'bg-white hover:bg-gray-100 text-slate-600 shadow-sm border border-slate-200/80'
          }`}
        >
          <img src="/logo.png" alt="NH" className="w-4 h-4 object-contain" />
          <span>Narasumber Hukum</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Salin URL Linktree"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : isNavyTheme
                ? 'bg-white/10 hover:bg-white/20 text-gray-200'
                : 'bg-white hover:bg-amber-50 text-slate-700 shadow-sm border border-slate-200/80 hover:border-amber-300'
            }`}
          >
            {copied ? <Check size={13} /> : <Copy size={13} className="text-amber-500" />}
            <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Bagikan Profil"
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              isNavyTheme
                ? 'bg-white/10 hover:bg-white/20 text-gray-200'
                : 'bg-white hover:bg-amber-50 text-slate-700 shadow-sm border border-slate-200/80'
            }`}
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>

      {/* Main Profile Card Container */}
      <div
        className={`w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-300 ${
          isNavyTheme
            ? 'bg-[#12131C] border border-white/10'
            : isMinimalTheme
            ? 'bg-white border border-slate-200'
            : 'bg-white border border-amber-200/60'
        }`}
      >
        {/* Banner Header */}
        <div
          className={`w-full h-44 sm:h-48 overflow-hidden relative ${
            isNavyTheme
              ? 'bg-gradient-to-br from-[#1F1D2B] via-[#2A2338] to-[#12131C]'
              : 'bg-gradient-to-br from-[#8a6a2b] via-[#C5A059] to-[#f3e2b3]'
          }`}
        >
          {item.profile.bannerUrl && (
            <img
              src={item.profile.bannerUrl}
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Ambient Blur overlay */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 backdrop-blur-md"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000)',
              maskImage: 'linear-gradient(to bottom, transparent, #000)'
            }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${
              isNavyTheme
                ? 'from-black/20 via-transparent to-[#12131C]'
                : 'from-black/10 via-transparent to-white'
            }`}
          />
        </div>

        {/* Profile Content Body */}
        <div className="px-5 sm:px-6 pb-6 pt-0 relative z-10">
          {/* Avatar & Monogram */}
          <div className="flex flex-col items-center text-center -mt-14 mb-6">
            <div className="relative mb-3 group">
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover p-1 shadow-xl relative overflow-hidden flex items-center justify-center ${
                  isNavyTheme
                    ? 'bg-[#181926] border-2 border-gold ring-4 ring-[#12131C]'
                    : 'bg-white border-2 border-[#C5A059] ring-4 ring-white'
                }`}
              >
                <img
                  src={avatarSrc}
                  alt={item.profile.name}
                  onError={() => setImgErr(true)}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {item.profile.isVerified && (
                <div
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-md"
                  title="Akun Resmi Terverifikasi"
                >
                  <BadgeCheck className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
              )}
            </div>

            {/* Name & Handle */}
            <h1
              className={`font-serif font-bold text-xl sm:text-2xl tracking-tight leading-snug mb-1 ${
                isNavyTheme ? 'text-white' : 'text-slate-900'
              }`}
            >
              {item.profile.name}
            </h1>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold mb-2 border border-amber-500/20">
              @{item.slug}
            </div>

            {item.profile.tagline && (
              <p className="text-xs sm:text-sm font-semibold text-[#C5A059] uppercase tracking-wider mb-2">
                {item.profile.tagline}
              </p>
            )}

            {item.profile.bio && (
              <p
                className={`text-xs sm:text-sm leading-relaxed max-w-sm mx-auto font-light ${
                  isNavyTheme ? 'text-gray-300' : 'text-slate-600'
                }`}
              >
                {item.profile.bio}
              </p>
            )}
          </div>

          {/* Links List */}
          <div className="space-y-3">
            {item.links.map((link, idx) => {
              const iconName = resolveLinkIconName(link);
              const isWA = iconName === 'whatsapp';
              const customIcon = link.customIconUrl;

              return (
                <a
                  key={link.id || idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 shadow-sm hover:-translate-y-0.5 ${
                    isWA
                      ? 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white border-[#25D366] shadow-emerald-500/20 hover:shadow-lg'
                      : isNavyTheme
                      ? 'bg-[#181926]/90 hover:bg-[#1E2032] text-white border-white/10 hover:border-gold/50 hover:shadow-[0_8px_20px_-4px_rgba(197,160,89,0.2)]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 hover:border-amber-300 hover:shadow-[0_8px_20px_-4px_rgba(197,160,89,0.25)]'
                  }`}
                >
                  {/* Icon Box */}
                  <div
                    className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 ${
                      isWA
                        ? 'bg-white/20 text-white'
                        : isNavyTheme
                        ? 'bg-gold/15 text-gold border border-gold/30'
                        : 'bg-amber-50 text-[#C5A059] border border-amber-200/60'
                    }`}
                  >
                    {customIcon ? (
                      <img
                        src={customIcon}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : SOCIAL_SVGS[iconName] ? (
                      SOCIAL_SVGS[iconName]
                    ) : iconName === 'file-text' ? (
                      <FileText className="w-5 h-5" />
                    ) : iconName === 'phone' ? (
                      <Phone className="w-5 h-5" />
                    ) : iconName === 'mail' ? (
                      <Mail className="w-5 h-5" />
                    ) : iconName === 'map-pin' ? (
                      <MapPin className="w-5 h-5" />
                    ) : (
                      <Globe className="w-5 h-5" />
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-bold text-xs sm:text-sm tracking-tight truncate group-hover:text-amber-500 transition-colors">
                      {link.title}
                    </div>
                    {link.subtitle && (
                      <div
                        className={`text-[11px] truncate mt-0.5 ${
                          isWA
                            ? 'text-white/80'
                            : isNavyTheme
                            ? 'text-gray-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {link.subtitle}
                      </div>
                    )}
                  </div>

                  {/* Trailing Arrow */}
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 ${
                      isWA
                        ? 'text-white/70'
                        : isNavyTheme
                        ? 'text-gray-500'
                        : 'text-slate-400'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Company Information Box */}
          {item.companyInfo && (
            <div
              className={`mt-6 p-4 rounded-2xl border text-xs space-y-2.5 ${
                isNavyTheme
                  ? 'bg-white/5 border-white/10 text-gray-300'
                  : 'bg-amber-50/40 border-amber-200/60 text-slate-700'
              }`}
            >
              {item.companyInfo.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span className="leading-tight">{item.companyInfo.address}</span>
                </div>
              )}
              {item.companyInfo.hours && (
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{item.companyInfo.hours}</span>
                </div>
              )}
              {item.companyInfo.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <a
                    href={`mailto:${item.companyInfo.email}`}
                    className="hover:underline hover:text-amber-600 transition-colors"
                  >
                    {item.companyInfo.email}
                  </a>
                </div>
              )}
              {item.companyInfo.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <a
                    href={`tel:${item.companyInfo.phone}`}
                    className="hover:underline hover:text-amber-600 transition-colors"
                  >
                    {item.companyInfo.phone}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Verified Official Seal */}
          <div className="mt-6 pt-4 border-t border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 text-center text-[11px] text-gray-400">
            <ShieldCheck size={14} className="text-[#C5A059]" />
            <span>Official LinkTree — Kantor Narasumber Hukum</span>
          </div>

          {/* Footer Copyright */}
          <div className="mt-3 text-center text-[10px] text-gray-400">
            <p>
              {item.companyInfo?.copyright ||
                '© 2026 Kantor Narasumber Hukum. All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
