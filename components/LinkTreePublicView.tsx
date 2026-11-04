"use client";
import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  FileText,
  Globe,
  ChevronRight
} from 'lucide-react';
import { LinkTreeItem, LinkTreeLinkItem } from '@/lib/cmsTypes';

const SOCIAL_SVGS: Record<string, React.ReactNode> = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
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
  inMockup?: boolean;
}

export default function LinkTreePublicView({ item, inMockup = false }: LinkTreePublicViewProps) {
  const [imgErr, setImgErr] = useState(false);

  const theme = item.theme || 'gold_luxury';
  const isNavyTheme = theme === 'navy_gold';
  const isMinimalTheme = theme === 'minimal_white';

  const defaultAvatar = '/logo.png';
  const avatarSrc = !imgErr && item.profile.avatarUrl ? item.profile.avatarUrl : defaultAvatar;

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center antialiased relative selection:bg-amber-500/20 ${
        inMockup
          ? 'p-2'
          : 'p-3 sm:p-6 md:p-10 lg:p-14'
      } ${
        isNavyTheme
          ? 'bg-[#0A0B10] text-gray-100'
          : isMinimalTheme
          ? 'bg-slate-50 text-slate-900'
          : 'bg-[#FAF8F5] text-slate-800'
      }`}
    >
      {/* Ambient Top Glow (Desktop Background Enhancement) */}
      {!inMockup && (
        <div
          className={`fixed inset-0 pointer-events-none transition-opacity ${
            isNavyTheme
              ? 'bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(197,160,89,0.15),transparent_70%)]'
              : 'bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(197,160,89,0.2),transparent_70%)]'
          }`}
        />
      )}

      {/* Main Responsive Wrapper */}
      <div
        className={`w-full relative z-10 flex flex-col ${
          inMockup
            ? 'max-w-full'
            : 'max-w-md sm:max-w-xl md:max-w-2xl mx-auto'
        }`}
      >
        {/* Profile Card Frame */}
        <main
          className={`w-full rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-300 ${
            isNavyTheme
              ? 'bg-[#12131D] border border-white/10'
              : isMinimalTheme
              ? 'bg-white border border-slate-200 shadow-slate-200/50'
              : 'bg-white border border-amber-200/80 shadow-[0_20px_50px_rgba(197,160,89,0.15)]'
          }`}
        >
          {/* Header Banner */}
          <div
            className={`w-full overflow-hidden relative ${
              inMockup
                ? 'h-36 sm:h-40'
                : 'h-44 sm:h-56 md:h-64'
            } ${
              isNavyTheme
                ? 'bg-gradient-to-br from-[#1C1A29] via-[#2A2338] to-[#12131D]'
                : 'bg-gradient-to-br from-[#7C5E24] via-[#C5A059] to-[#F1E0B3]'
            }`}
          >
            {item.profile.bannerUrl && (
              <img
                src={item.profile.bannerUrl}
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* Ambient Blur Bottom Transition */}
            <div
              className="absolute inset-x-0 bottom-0 h-28 backdrop-blur-md"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000)',
                maskImage: 'linear-gradient(to bottom, transparent, #000)'
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b ${
                isNavyTheme
                  ? 'from-black/30 via-transparent to-[#12131D]'
                  : 'from-black/15 via-transparent to-white'
              }`}
            />
          </div>

          {/* Profile Card Body */}
          <div
            className={`relative z-10 ${
              inMockup
                ? 'px-4 pb-5 pt-0'
                : 'px-5 sm:px-8 md:px-10 pb-8 pt-0'
            }`}
          >
            {/* Avatar & Verified Badge */}
            <div
              className={`flex flex-col items-center text-center ${
                inMockup
                  ? '-mt-12 mb-4'
                  : '-mt-16 sm:-mt-20 md:-mt-22 mb-6 sm:mb-8'
              }`}
            >
              <div className="relative mb-3 group">
                <div
                  className={`rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-2xl relative overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                    inMockup
                      ? 'w-20 h-20'
                      : 'w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36'
                  } ${
                    isNavyTheme
                      ? 'bg-[#181926] border-2 sm:border-4 border-[#C5A059] ring-4 ring-[#12131D]'
                      : 'bg-white border-2 sm:border-4 border-[#C5A059] ring-4 ring-white'
                  }`}
                >
                  <img
                    src={avatarSrc}
                    alt={item.profile.name}
                    onError={() => setImgErr(true)}
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                  />
                </div>

                {/* Official Scalloped Verified Seal with Crisp White Check */}
                {item.profile.isVerified && (
                  <div
                    className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg"
                    title="Akun Resmi Terverifikasi"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`${
                        inMockup ? 'w-5 h-5' : 'w-6 h-6 sm:w-7 sm:h-7'
                      } drop-shadow-md`}
                    >
                      <path
                        fill="#C5A059"
                        d="M12 2l2.4 2.1 3.2-.4 1.2 3 2.9 1.4-.7 3.1 1.9 2.6-2.1 2.4.4 3.2-3 1.2-1.4 2.9-3.1-.7-2.6 1.9-2.4-2.1-3.2.4-1.2-3-2.9-1.4.7-3.1-1.9-2.6 2.1-2.4-.4-3.2 3-1.2 1.4-2.9 3.1.7L12 2z"
                      />
                      <path
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.5 12.5l2.5 2.5 5-5"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Full Name */}
              <h1
                className={`font-serif font-bold tracking-tight leading-snug mb-1.5 ${
                  inMockup
                    ? 'text-lg sm:text-xl'
                    : 'text-xl sm:text-2xl md:text-3xl'
                } ${isNavyTheme ? 'text-white' : 'text-slate-900'}`}
              >
                {item.profile.name}
              </h1>

              {/* Handle Pill (@handle) - High Contrast & Crystal Clear */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-[#8F6416] dark:text-amber-400 font-mono text-xs sm:text-sm font-bold mb-2.5 border border-amber-500/30 shadow-xs">
                <span>@{item.slug}</span>
              </div>

              {/* Tagline */}
              {item.profile.tagline && (
                <p className="text-xs sm:text-sm font-bold text-[#A27B2C] uppercase tracking-[0.2em] mb-2">
                  {item.profile.tagline}
                </p>
              )}

              {/* Bio Description */}
              {item.profile.bio && (
                <p
                  className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto ${
                    isNavyTheme ? 'text-gray-300' : 'text-slate-600'
                  }`}
                >
                  {item.profile.bio}
                </p>
              )}
            </div>

            {/* Links List */}
            <div className={`w-full ${inMockup ? 'space-y-2.5' : 'space-y-3 sm:space-y-3.5'}`}>
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
                    className={`group relative flex items-center rounded-2xl border transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-[0.99] ${
                      inMockup
                        ? 'gap-3 p-3'
                        : 'gap-3.5 sm:gap-4 p-3.5 sm:p-4.5 md:p-5'
                    } ${
                      isWA
                        ? 'bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] text-white border-emerald-400/60 shadow-emerald-500/20 hover:shadow-lg'
                        : isNavyTheme
                        ? 'bg-[#181926]/90 hover:bg-[#1F2134] text-white border-white/10 hover:border-[#C5A059]/60 hover:shadow-[0_10px_25px_-5px_rgba(197,160,89,0.25)]'
                        : 'bg-white hover:bg-slate-50/90 text-slate-800 border-slate-200 hover:border-[#C5A059] hover:shadow-[0_10px_25px_-5px_rgba(197,160,89,0.2)]'
                    }`}
                  >
                    {/* Icon Box */}
                    <div
                      className={`rounded-xl sm:rounded-2xl shrink-0 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 ${
                        inMockup
                          ? 'w-10 h-10'
                          : 'w-11 h-11 sm:w-12 sm:h-12'
                      } ${
                        isWA
                          ? 'bg-white/20 text-white'
                          : isNavyTheme
                          ? 'bg-gold/15 text-gold border border-gold/30'
                          : 'bg-amber-50 text-[#C5A059] border border-amber-200/70'
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
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : iconName === 'phone' ? (
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : iconName === 'mail' ? (
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : iconName === 'map-pin' ? (
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0 text-left">
                      <div
                        className={`font-bold tracking-tight truncate transition-colors ${
                          inMockup
                            ? 'text-xs'
                            : 'text-xs sm:text-sm md:text-base'
                        } ${
                          isWA
                            ? 'text-white'
                            : isNavyTheme
                            ? 'text-white group-hover:text-amber-400'
                            : 'text-slate-900 group-hover:text-navy'
                        }`}
                      >
                        {link.title}
                      </div>
                      {link.subtitle && (
                        <div
                          className={`truncate mt-0.5 ${
                            inMockup ? 'text-[10px]' : 'text-[11px] sm:text-xs'
                          } ${
                            isWA
                              ? 'text-white/85'
                              : isNavyTheme
                              ? 'text-gray-400'
                              : 'text-slate-500'
                          }`}
                        >
                          {link.subtitle}
                        </div>
                      )}
                    </div>

                    {/* Trailing Chevron */}
                    <ChevronRight
                      className={`shrink-0 transition-transform duration-300 group-hover:translate-x-1.5 ${
                        inMockup ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'
                      } ${
                        isWA
                          ? 'text-white/80'
                          : isNavyTheme
                          ? 'text-gray-500 group-hover:text-gold'
                          : 'text-slate-400 group-hover:text-gold'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Company Information Box */}
            {item.companyInfo && (
              <div
                className={`mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl border ${
                  inMockup ? 'text-xs space-y-2' : 'text-xs sm:text-sm space-y-2.5'
                } ${
                  isNavyTheme
                    ? 'bg-white/5 border-white/10 text-gray-300'
                    : 'bg-amber-50/50 border-amber-200/70 text-slate-700'
                }`}
              >
                {item.companyInfo.address && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span className="leading-tight">{item.companyInfo.address}</span>
                  </div>
                )}
                {item.companyInfo.hours && (
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A059] shrink-0" />
                    <span>{item.companyInfo.hours}</span>
                  </div>
                )}
                {item.companyInfo.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A059] shrink-0" />
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
                    <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#C5A059] shrink-0" />
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

            {/* Footer Copyright */}
            <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-100 dark:border-white/5 text-center text-[10px] sm:text-[11px] text-gray-400">
              <p>
                {item.companyInfo?.copyright ||
                  '© 2026 Kantor Narasumber Hukum. All rights reserved.'}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
