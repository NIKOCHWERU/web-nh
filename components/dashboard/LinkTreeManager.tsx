"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Copy,
  Check,
  Search,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  ArrowUp,
  ArrowDown,
  Upload,
  FileText,
  RotateCcw,
  Download,
  Code,
  Share2,
  ShieldCheck,
  CheckCircle,
  Smartphone,
  Sliders,
  User,
  Building,
  Link2,
  AlertCircle,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';
import { CmsDatabase, LinkTreeItem, LinkTreeLinkItem } from '@/lib/cmsTypes';
import LinkTreePublicView, { getAutoSocialKey, resolveLinkIconName } from '@/components/LinkTreePublicView';

interface LinkTreeManagerProps {
  db: CmsDatabase;
  onSaveDb: (nextDb: CmsDatabase, message?: string) => Promise<void>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
  savingDb: boolean;
}

const ICON_OPTIONS: [string, string][] = [
  ['auto', 'Otomatis (Deteksi URL)'],
  ['whatsapp', 'WhatsApp'],
  ['instagram', 'Instagram'],
  ['linkedin', 'LinkedIn'],
  ['facebook', 'Facebook'],
  ['twitter', 'X / Twitter'],
  ['youtube', 'YouTube'],
  ['tiktok', 'TikTok'],
  ['globe', 'Website / Portal'],
  ['file-text', 'Dokumen / PDF'],
  ['phone', 'Telepon Hotline'],
  ['map-pin', 'Lokasi Kantor'],
  ['mail', 'Email Resmi']
];

export default function LinkTreeManager({
  db,
  onSaveDb,
  showToast,
  savingDb
}: LinkTreeManagerProps) {
  const linktrees = useMemo(() => db.linktrees || [], [db.linktrees]);

  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [editingItem, setEditingItem] = useState<LinkTreeItem | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<'profile' | 'links' | 'info'>('profile');
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  // Resize image helper
  const resizeImageToDataUrl = (
    file: File,
    maxSize: number,
    cb: (dataUrl: string) => void,
    mime = 'image/jpeg',
    quality = 0.85
  ) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const raw = evt.target?.result as string;
      if (file.type === 'image/svg+xml') return cb(raw);
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = Math.max(1, Math.round(img.width * scale));
        c.height = Math.max(1, Math.round(img.height * scale));
        const ctx = c.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, c.width, c.height);
          cb(c.toDataURL(mime, quality));
        } else {
          cb(raw);
        }
      };
      img.onerror = () => cb(raw);
      img.src = raw;
    };
    reader.readAsDataURL(file);
  };

  // Filtered Linktrees
  const filteredLinktrees = useMemo(() => {
    return linktrees.filter((lt) => {
      const matchSearch =
        lt.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lt.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lt.profile.tagline || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'active'
          ? lt.active
          : !lt.active;
      return matchSearch && matchStatus;
    });
  }, [linktrees, searchQuery, statusFilter]);

  // Copy URL
  const handleCopyUrl = (slug: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://narasumberhukum.com';
    const url = `${origin}/@${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    showToast(`URL @${slug} berhasil disalin ke clipboard!`, 'success');
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  // Toggle Status
  const handleToggleStatus = async (id: string) => {
    const target = linktrees.find((lt) => lt.id === id);
    if (!target) return;
    const nextStatus = !target.active;
    const nextLinktrees = linktrees.map((lt) =>
      lt.id === id ? { ...lt, active: nextStatus, updated_at: new Date().toISOString() } : lt
    );
    await onSaveDb(
      { ...db, linktrees: nextLinktrees },
      `Link Tree @${target.slug} sekarang ${nextStatus ? 'Aktif' : 'Nonaktif'}.`
    );
  };

  // Delete Linktree
  const handleDeleteConfirm = async () => {
    if (!deleteModalId) return;
    const target = linktrees.find((lt) => lt.id === deleteModalId);
    const nextLinktrees = linktrees.filter((lt) => lt.id !== deleteModalId);
    setDeleteModalId(null);
    await onSaveDb(
      { ...db, linktrees: nextLinktrees },
      `Link Tree @${target?.slug || ''} berhasil dihapus.`
    );
  };

  // Create New Linktree
  const handleCreateNew = () => {
    const newSlug = `profil${linktrees.length + 1}`;
    const newItem: LinkTreeItem = {
      id: `lt-${Date.now()}`,
      slug: newSlug,
      active: true,
      theme: 'gold_luxury',
      profile: {
        bannerUrl: '',
        avatarUrl: '/logo.png',
        name: 'Nama Profil / Brand',
        tagline: 'Konsultan Hukum & Advokat',
        bio: 'Kantor Narasumber Hukum — Sentral Edukasi & Solusi Hukum Terpercaya di Indonesia.',
        isVerified: true
      },
      companyInfo: {
        address: 'Jl. M.H Thamrin No. 9 Lt 12, Kebon Sirih, Menteng, DKI Jakarta',
        hours: 'Senin - Jumat: 08:30 - 17:30 WIB',
        email: 'hello@narasumberhukum.com',
        phone: '+62 822-1102-0022',
        copyright: '© 2026 Kantor Narasumber Hukum. All rights reserved.'
      },
      links: [
        {
          id: `link-${Date.now()}-1`,
          title: 'Konsultasi WhatsApp Hotline',
          subtitle: 'Respon Cepat Tim Legal Narasumber Hukum',
          url: 'https://wa.me/6282211020022',
          icon: 'auto'
        },
        {
          id: `link-${Date.now()}-2`,
          title: 'Kunjungi Website Resmi',
          subtitle: 'Portal Narasumber Hukum Indonesia',
          url: 'https://narasumberhukum.com',
          icon: 'globe'
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setEditingItem(newItem);
    setViewMode('editor');
    setActiveEditorTab('profile');
  };

  // Open Edit
  const handleOpenEdit = (item: LinkTreeItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setViewMode('editor');
    setActiveEditorTab('profile');
  };

  // Save Editor
  const handleSaveEditor = async () => {
    if (!editingItem) return;

    const cleanSlug = editingItem.slug
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '')
      .trim();

    if (!cleanSlug) {
      showToast('Slug username tidak boleh kosong.', 'error');
      return;
    }

    // Check duplicate slug
    const duplicate = linktrees.find(
      (lt) => lt.slug.toLowerCase() === cleanSlug && lt.id !== editingItem.id
    );
    if (duplicate) {
      showToast(`Slug @${cleanSlug} sudah digunakan oleh profil lain. Harap gunakan nama lain.`, 'error');
      return;
    }

    if (!editingItem.profile.name.trim()) {
      showToast('Nama profil/perusahaan wajib diisi.', 'error');
      return;
    }

    const updatedItem: LinkTreeItem = {
      ...editingItem,
      slug: cleanSlug,
      updated_at: new Date().toISOString()
    };

    const exists = linktrees.some((lt) => lt.id === updatedItem.id);
    const nextLinktrees = exists
      ? linktrees.map((lt) => (lt.id === updatedItem.id ? updatedItem : lt))
      : [updatedItem, ...linktrees];

    await onSaveDb(
      { ...db, linktrees: nextLinktrees },
      `Link Tree @${updatedItem.slug} berhasil disimpan!`
    );
    setViewMode('list');
    setEditingItem(null);
  };

  // Add Link to Editor
  const handleAddLink = () => {
    if (!editingItem) return;
    const newLink: LinkTreeLinkItem = {
      id: `link-${Date.now()}`,
      title: 'Tautan Baru / Layanan',
      subtitle: 'Klik untuk informasi selengkapnya',
      url: 'https://narasumberhukum.com',
      icon: 'auto'
    };
    setEditingItem({
      ...editingItem,
      links: [...editingItem.links, newLink]
    });
  };

  // Update Link Field
  const handleUpdateLink = (id: string, key: keyof LinkTreeLinkItem, val: any) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      links: editingItem.links.map((link) => {
        if (link.id !== id) return link;
        const updated = { ...link, [key]: val };
        // Auto-detect social handle for subtitle if user changes URL and subtitle hasn't been set manually
        if (key === 'url') {
          const autoKey = getAutoSocialKey(val);
          if (autoKey && (!link.subtitle || link.subtitle.startsWith('@'))) {
            try {
              const u = new URL(/^[a-z][a-z0-9+.-]*:/i.test(val) ? val : 'https://' + val);
              const seg = u.pathname.split('/').filter(Boolean);
              if (seg[0]) {
                updated.subtitle = '@' + seg[0].replace(/^@/, '');
              }
            } catch {
              // ignore
            }
          }
        }
        return updated;
      })
    });
  };

  // Move Link
  const handleMoveLink = (idx: number, direction: 'up' | 'down') => {
    if (!editingItem) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= editingItem.links.length) return;
    const nextLinks = [...editingItem.links];
    const temp = nextLinks[idx];
    nextLinks[idx] = nextLinks[targetIdx];
    nextLinks[targetIdx] = temp;
    setEditingItem({ ...editingItem, links: nextLinks });
  };

  // Delete Link
  const handleDeleteLink = (id: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      links: editingItem.links.filter((l) => l.id !== id)
    });
  };

  // Generate Standalone HTML (Exportable index.html)
  const generateStandaloneHtml = (item: LinkTreeItem) => {
    const isNavy = item.theme === 'navy_gold';
    const bgBody = isNavy ? '#0B0C10' : '#FAFAFA';
    const textBody = isNavy ? '#F3F4F6' : '#1E293B';
    const cardBg = isNavy ? '#12131C' : '#FFFFFF';
    const borderCard = isNavy ? 'rgba(255,255,255,0.1)' : 'rgba(229,231,235,0.9)';

    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${item.profile.name} (@${item.slug}) - Narasumber Hukum LinkTree</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script src="https://unpkg.com/lucide@0.468.0"><\/script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: ${bgBody}; color: ${textBody}; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeInUp 0.4s ease-out forwards; }
        .link-card { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .link-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(197, 160, 89, 0.25); }
    </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 antialiased">
    <div class="w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl relative" style="background: ${cardBg}; border: 1px solid ${borderCard};">
        <div class="w-full h-44 overflow-hidden relative bg-gradient-to-br from-[#8a6a2b] via-[#C5A059] to-[#f3e2b3]">
            ${item.profile.bannerUrl ? `<img src="${item.profile.bannerUrl}" alt="" class="absolute inset-0 w-full h-full object-cover">` : ''}
            <div class="absolute inset-x-0 bottom-0 h-20 backdrop-blur-md" style="-webkit-mask-image:linear-gradient(to bottom,transparent,#000);mask-image:linear-gradient(to bottom,transparent,#000)"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white"></div>
        </div>
        <div class="px-6 pb-6 pt-0 relative z-10">
            <div class="flex flex-col items-center text-center -mt-12 mb-6">
                <img src="${item.profile.avatarUrl || '/logo.png'}" class="w-24 h-24 rounded-2xl object-cover bg-white p-1 border-2 border-[#C5A059] shadow-lg mb-3">
                <h1 class="font-bold text-xl text-slate-900 tracking-tight">${item.profile.name}</h1>
                <div class="text-xs font-semibold text-amber-600 font-mono mt-0.5">@${item.slug}</div>
                ${item.profile.tagline ? `<p class="text-xs font-semibold text-[#C5A059] uppercase tracking-wider mt-1 mb-2">${item.profile.tagline}</p>` : ''}
                ${item.profile.bio ? `<p class="text-xs text-slate-600 leading-relaxed max-w-xs">${item.profile.bio}</p>` : ''}
            </div>
            <div class="space-y-3">
                ${item.links.map((l, i) => `
                <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="link-card animate-fade-in flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 shadow-sm text-left" style="animation-delay: ${i * 0.08}s">
                    <div class="w-10 h-10 rounded-xl bg-amber-50 text-[#C5A059] flex items-center justify-center shrink-0">
                        <i data-lucide="${resolveLinkIconName(l)}" class="w-5 h-5"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-xs sm:text-sm text-slate-800 truncate">${l.title}</div>
                        ${l.subtitle ? `<div class="text-[11px] text-slate-500 truncate">${l.subtitle}</div>` : ''}
                    </div>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400 shrink-0"></i>
                </a>
                `).join('')}
            </div>
            ${item.companyInfo ? `
            <div class="mt-6 p-4 rounded-xl border border-amber-200/60 bg-amber-50/40 text-xs text-slate-700 space-y-2">
                ${item.companyInfo.address ? `<div class="flex items-start gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5"></i><span>${item.companyInfo.address}</span></div>` : ''}
                ${item.companyInfo.hours ? `<div class="flex items-center gap-2"><i data-lucide="clock" class="w-4 h-4 text-[#C5A059] shrink-0"></i><span>${item.companyInfo.hours}</span></div>` : ''}
                ${item.companyInfo.email ? `<div class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-[#C5A059] shrink-0"></i><span>${item.companyInfo.email}</span></div>` : ''}
                ${item.companyInfo.phone ? `<div class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-[#C5A059] shrink-0"></i><span>${item.companyInfo.phone}</span></div>` : ''}
            </div>
            ` : ''}
            <div class="mt-6 text-center text-[10px] text-slate-400">
                <p>${item.companyInfo?.copyright || '© 2026 Kantor Narasumber Hukum. All rights reserved.'}</p>
            </div>
        </div>
    </div>
    <script>lucide.createIcons();<\/script>
</body>
</html>`;
  };

  const handleDownloadHtml = (item: LinkTreeItem) => {
    const html = generateStandaloneHtml(item);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linktree-${item.slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`File linktree-${item.slug}.html berhasil diunduh!`, 'success');
  };

  const handleCopyHtml = (item: LinkTreeItem) => {
    const html = generateStandaloneHtml(item);
    navigator.clipboard.writeText(html);
    showToast('Kode HTML lengkap berhasil disalin ke clipboard!', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =====================================================================
          VIEW 1: DAFTAR LINK TREE (TABLE / LIST)
      ====================================================================== */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#171720] via-[#1A1A26] to-[#14141E] border border-white/10 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={13} />
                <span>Link In Bio Generator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Daftar Link Tree Perusahaan & Tim
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
                Kelola kartu tautan resmi berformat{' '}
                <span className="font-mono text-gold font-bold">narasumberhukum.com/@namalinktree</span>{' '}
                untuk profile bio Instagram, TikTok, WhatsApp, dan kartu nama digital.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCreateNew}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold hover:bg-gold-light text-navy font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-gold/20 active:scale-95 shrink-0 cursor-pointer"
            >
              <Plus size={16} />
              <span>+ Buat Link Tree Baru</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#15151D] p-3 rounded-xl border border-white/10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan @slug, nama, atau tagline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:border-gold outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 hidden md:inline">Status:</span>
              <div className="flex rounded-lg bg-black/40 p-1 border border-white/10 text-xs">
                {(['all', 'active', 'inactive'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-md capitalize transition font-medium cursor-pointer ${
                      statusFilter === st
                        ? 'bg-gold text-navy font-bold shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {st === 'all' ? 'Semua' : st === 'active' ? 'Aktif' : 'Nonaktif'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-[#15151D] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {filteredLinktrees.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-4">
                  <Link2 size={28} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  Belum ada Link Tree yang sesuai
                </h3>
                <p className="text-xs text-gray-400 max-w-sm mb-6">
                  {searchQuery
                    ? 'Tidak ada link tree yang cocok dengan kata kunci pencarian Anda.'
                    : 'Mulai buat link tree pertama Anda untuk tim legal atau divisi perusahaan.'}
                </p>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-navy font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition"
                >
                  <Plus size={15} />
                  <span>Buat Link Tree Baru</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1A1A24] border-b border-white/10 text-gray-400 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Nama Link Tree</th>
                      <th className="py-3.5 px-4 hidden md:table-cell">Jumlah Tautan</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-200">
                    {filteredLinktrees.map((lt) => {
                      const origin =
                        typeof window !== 'undefined'
                          ? window.location.origin
                          : 'https://narasumberhukum.com';
                      const publicUrl = `${origin}/@${lt.slug}`;

                      return (
                        <tr
                          key={lt.id}
                          className="hover:bg-white/[0.02] transition-colors group"
                        >
                          {/* Nama Link Tree Column */}
                          <td className="py-4 px-4">
                            <div className="flex items-start gap-3">
                              <img
                                src={lt.profile.avatarUrl || '/logo.png'}
                                alt=""
                                className="w-10 h-10 rounded-xl object-cover border border-gold/40 bg-navy shrink-0 mt-0.5"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                                }}
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-sm font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-md border border-gold/20">
                                    @{lt.slug}
                                  </span>
                                  {lt.profile.isVerified && (
                                    <ShieldCheck
                                      size={15}
                                      className="text-amber-400 shrink-0"
                                      title="Terverifikasi"
                                    />
                                  )}
                                </div>
                                <div className="font-bold text-white text-xs mt-1 truncate">
                                  {lt.profile.name}
                                </div>
                                {lt.profile.tagline && (
                                  <div className="text-[11px] text-gray-400 truncate">
                                    {lt.profile.tagline}
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5 mt-1.5">
                                  <a
                                    href={publicUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[10px] text-gray-400 hover:text-gold flex items-center gap-1 hover:underline"
                                  >
                                    <span>narasumberhukum.com/@{lt.slug}</span>
                                    <ExternalLink size={10} />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyUrl(lt.slug)}
                                    title="Salin Link"
                                    className="text-gray-400 hover:text-white p-0.5 rounded cursor-pointer"
                                  >
                                    {copiedSlug === lt.slug ? (
                                      <Check size={11} className="text-emerald-400" />
                                    ) : (
                                      <Copy size={11} />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Tautan Column */}
                          <td className="py-4 px-4 hidden md:table-cell">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-semibold">
                              <Layers size={12} className="text-gold" />
                              <span>{lt.links.length} Tautan</span>
                            </span>
                            <div className="text-[10px] text-gray-500 mt-1 capitalize">
                              Tema: {lt.theme?.replace('_', ' ') || 'Gold Luxury'}
                            </div>
                          </td>

                          {/* Status Column */}
                          <td className="py-4 px-4">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(lt.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] transition cursor-pointer border ${
                                lt.active
                                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
                                  : 'bg-gray-500/15 border-gray-500/30 text-gray-400 hover:bg-gray-500/25'
                              }`}
                              title="Klik untuk mengubah status aktif/nonaktif"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  lt.active ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'
                                }`}
                              />
                              <span>{lt.active ? 'Aktif' : 'Nonaktif'}</span>
                            </button>
                          </td>

                          {/* Aksi Column */}
                          <td className="py-4 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(lt)}
                                className="px-2.5 py-1.5 rounded-lg bg-gold/15 hover:bg-gold text-gold hover:text-navy border border-gold/30 font-bold transition flex items-center gap-1 cursor-pointer"
                                title="Edit Link Tree"
                              >
                                <Edit3 size={13} />
                                <span>Edit</span>
                              </button>

                              {/* Buka Live */}
                              <a
                                href={publicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition cursor-pointer"
                                title="Buka Halaman Live"
                              >
                                <ExternalLink size={13} />
                              </a>

                              {/* Download HTML */}
                              <button
                                type="button"
                                onClick={() => handleDownloadHtml(lt)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition cursor-pointer"
                                title="Download Standalone HTML"
                              >
                                <Download size={13} />
                              </button>

                              {/* Hapus */}
                              <button
                                type="button"
                                onClick={() => setDeleteModalId(lt.id)}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 transition cursor-pointer"
                                title="Hapus Link Tree"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW 2: VISUAL EDITOR LINK TREE (RESPONSIVE & NYAMAN)
      ====================================================================== */}
      {viewMode === 'editor' && editingItem && (
        <div className="space-y-6">
          {/* Header Editor Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#15151D] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setViewMode('list');
                  setEditingItem(null);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition cursor-pointer"
                title="Kembali ke Daftar Link Tree"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Editor Link Tree:{' '}
                    <span className="font-mono text-gold">@{editingItem.slug}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingItem({ ...editingItem, active: !editingItem.active })
                    }
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer ${
                      editingItem.active
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/40'
                    }`}
                  >
                    {editingItem.active ? '● Aktif' : '○ Nonaktif'}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  URL Live:{' '}
                  <span className="font-mono text-gray-300">
                    narasumberhukum.com/@{editingItem.slug}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopyUrl(editingItem.slug)}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Copy size={13} className="text-gold" />
                <span>Salin URL</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownloadHtml(editingItem)}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="Download index.html standalone"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Export HTML</span>
              </button>

              <button
                type="button"
                onClick={handleSaveEditor}
                disabled={savingDb}
                className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-navy text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shadow-lg hover:shadow-gold/20 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle size={15} />
                <span>{savingDb ? 'Menyimpan...' : 'Simpan Link Tree'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Tab Switcher (Form vs Pratinjau HP) */}
          <div className="lg:hidden flex bg-[#161622] p-1.5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setMobileTab('form')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mobileTab === 'form'
                  ? 'bg-gold text-navy shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ✏️ Form Editor
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mobileTab === 'preview'
                  ? 'bg-gold text-navy shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱 Pratinjau HP Live
            </button>
          </div>

          {/* Grid Layout: Editor (Left) & Smartphone Preview (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: FORM EDITOR */}
            <div
              className={`lg:col-span-7 space-y-6 ${
                mobileTab === 'preview' ? 'hidden lg:block' : 'block'
              }`}
            >
              {/* Internal Editor Tabs */}
              <div className="bg-[#15151D] p-1.5 rounded-2xl border border-white/10 flex gap-1 overflow-x-auto shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('profile')}
                  className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    activeEditorTab === 'profile'
                      ? 'bg-gold text-navy shadow-md'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <User size={15} />
                  <span>Profil & Identitas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('links')}
                  className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    activeEditorTab === 'links'
                      ? 'bg-gold text-navy shadow-md'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Link2 size={15} />
                  <span>Daftar Tautan ({editingItem.links.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveEditorTab('info')}
                  className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                    activeEditorTab === 'info'
                      ? 'bg-gold text-navy shadow-md'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Building size={15} />
                  <span>Kontak & Footer</span>
                </button>
              </div>

              {/* TAB 1: PROFIL & IDENTITAS */}
              {activeEditorTab === 'profile' && (
                <div className="bg-[#15151D] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-5 shadow-xl">
                  <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <User size={16} className="text-gold" />
                      <span>Identitas & Tampilan Profil</span>
                    </h4>
                    <span className="text-[11px] text-gray-400">
                      Format URL: narasumberhukum.com/@slug
                    </span>
                  </div>

                  {/* Slug Input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Username / Slug Tautan (@handle)
                    </label>
                    <div className="flex items-center rounded-xl bg-black/40 border border-white/10 overflow-hidden focus-within:border-gold">
                      <span className="px-3.5 py-2.5 text-gold font-mono font-bold text-sm bg-white/5 border-r border-white/10">
                        @
                      </span>
                      <input
                        type="text"
                        value={editingItem.slug}
                        onChange={(e) => {
                          const val = e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9_-]/g, '');
                          setEditingItem({ ...editingItem, slug: val });
                        }}
                        placeholder="contoh: deborajalessveva"
                        className="flex-1 px-3.5 py-2.5 bg-transparent text-xs text-white outline-none font-mono font-semibold"
                      />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Hanya gunakan huruf kecil, angka, tanda minus (-), atau underscore (_).
                    </p>
                  </div>

                  {/* Theme Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Pilihan Tema Visual
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          id: 'gold_luxury',
                          title: 'Gold & White Luxury',
                          desc: 'Tema emas mewah dan putih elegan korporat'
                        },
                        {
                          id: 'navy_gold',
                          title: 'Dark Navy & Gold',
                          desc: 'Tema navy prestisius khas Narasumber Hukum'
                        },
                        {
                          id: 'minimal_white',
                          title: 'Minimalist Light',
                          desc: 'Tema minimalis modern bersih & monokrom'
                        }
                      ].map((th) => (
                        <button
                          key={th.id}
                          type="button"
                          onClick={() =>
                            setEditingItem({
                              ...editingItem,
                              theme: th.id as any
                            })
                          }
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            (editingItem.theme || 'gold_luxury') === th.id
                              ? 'border-gold bg-gold/10 text-white ring-1 ring-gold'
                              : 'border-white/10 bg-black/20 text-gray-300 hover:bg-white/5'
                          }`}
                        >
                          <div className="font-bold text-xs text-gold">{th.title}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{th.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Banner Header */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Banner Header (Latar Belakang Atas)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingItem.profile.bannerUrl || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            profile: { ...editingItem.profile, bannerUrl: e.target.value }
                          })
                        }
                        placeholder="URL Gambar Banner (https://...)"
                        className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                      />
                      <label className="px-3.5 py-2.5 bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 rounded-xl text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1.5 transition">
                        <Upload size={14} />
                        <span>Upload Banner</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              resizeImageToDataUrl(file, 1200, (dataUrl) => {
                                setEditingItem({
                                  ...editingItem,
                                  profile: { ...editingItem.profile, bannerUrl: dataUrl }
                                });
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Foto Profil / Logo */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Foto Profil / Logo Brand
                    </label>
                    <div className="flex gap-3 items-center">
                      <img
                        src={editingItem.profile.avatarUrl || '/logo.png'}
                        alt=""
                        className="w-14 h-14 rounded-2xl border-2 border-gold object-cover bg-navy shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/logo.png';
                        }}
                      />
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={editingItem.profile.avatarUrl || ''}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              profile: { ...editingItem.profile, avatarUrl: e.target.value }
                            })
                          }
                          placeholder="URL Foto Profil (https://... atau /logo.png)"
                          className="w-full text-xs px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition">
                            <Upload size={12} />
                            <span>Upload Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  resizeImageToDataUrl(file, 400, (dataUrl) => {
                                    setEditingItem({
                                      ...editingItem,
                                      profile: { ...editingItem.profile, avatarUrl: dataUrl }
                                    });
                                  });
                                }
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setEditingItem({
                                ...editingItem,
                                profile: { ...editingItem.profile, avatarUrl: '/logo.png' }
                              })
                            }
                            className="text-[11px] text-gray-400 hover:text-gold underline"
                          >
                            Gunakan Logo Default
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Nama & Tagline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Nama Lengkap / Brand
                      </label>
                      <input
                        type="text"
                        value={editingItem.profile.name}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            profile: { ...editingItem.profile, name: e.target.value }
                          })
                        }
                        placeholder="Debora Jalessveva, S.H., M.H."
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Tagline / Jabatan
                      </label>
                      <input
                        type="text"
                        value={editingItem.profile.tagline || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            profile: { ...editingItem.profile, tagline: e.target.value }
                          })
                        }
                        placeholder="Managing Partner & Konsultan Hukum"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  {/* Bio Singkat */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Deskripsi Singkat / Bio
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.profile.bio || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          profile: { ...editingItem.profile, bio: e.target.value }
                        })
                      }
                      placeholder="Uraian singkat tentang layanan, bidang keahlian, atau profil..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                    />
                  </div>

                  {/* Verified Badge Switch */}
                  <div className="flex items-center justify-between p-3.5 bg-black/30 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck size={18} className="text-gold" />
                      <div>
                        <div className="text-xs font-semibold text-white">
                          Tampilkan Lencana Resmi / Verified Badge
                        </div>
                        <div className="text-[10px] text-gray-400">
                          Menampilkan centang verifikasi resmi di samping nama
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(editingItem.profile.isVerified)}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            profile: { ...editingItem.profile, isVerified: e.target.checked }
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: DAFTAR TAUTAN (LINKS) */}
              {activeEditorTab === 'links' && (
                <div className="bg-[#15151D] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-5 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Link2 size={16} className="text-gold" />
                        <span>Kelola Daftar Tautan & Medsos</span>
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Susun urutan dan tautan layanan, WhatsApp hotline, katalog PDF, dan media sosial.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gold text-navy hover:bg-gold-light flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Tambah Tautan</span>
                    </button>
                  </div>

                  {editingItem.links.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-white/10 rounded-xl">
                      <p className="text-xs text-gray-400 mb-3">Belum ada tautan ditambahkan.</p>
                      <button
                        type="button"
                        onClick={handleAddLink}
                        className="text-xs text-gold font-bold hover:underline"
                      >
                        + Tambah Tautan Pertama
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {editingItem.links.map((link, idx) => {
                        const autoKey = getAutoSocialKey(link.url);
                        const isPdf = link.url && (link.url.endsWith('.pdf') || link.url.startsWith('data:application/pdf'));

                        return (
                          <div
                            key={link.id || idx}
                            className="p-4 rounded-xl border border-white/10 bg-black/25 space-y-3 hover:border-gold/30 transition-all"
                          >
                            {/* Card Top: Number, Badges, Reorder, Delete */}
                            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-gold/15 text-gold font-bold text-[10px] flex items-center justify-center border border-gold/30">
                                  {idx + 1}
                                </span>
                                <span className="text-xs font-bold text-gray-200">
                                  Kartu Tautan
                                </span>
                                {autoKey && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 capitalize">
                                    {autoKey} terdeteksi
                                  </span>
                                )}
                                {isPdf && (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                                    Dokumen PDF
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleMoveLink(idx, 'up')}
                                  disabled={idx === 0}
                                  className="p-1 rounded text-gray-400 hover:text-gold disabled:opacity-20 cursor-pointer"
                                  title="Pindah ke Atas"
                                >
                                  <ArrowUp size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveLink(idx, 'down')}
                                  disabled={idx === editingItem.links.length - 1}
                                  className="p-1 rounded text-gray-400 hover:text-gold disabled:opacity-20 cursor-pointer"
                                  title="Pindah ke Bawah"
                                >
                                  <ArrowDown size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteLink(link.id)}
                                  className="p-1 rounded text-rose-400 hover:text-rose-300 ml-1 cursor-pointer"
                                  title="Hapus Tautan"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>

                            {/* Inputs: Judul & Subtitle */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                                  Judul Tautan / Layanan
                                </label>
                                <input
                                  type="text"
                                  value={link.title}
                                  onChange={(e) =>
                                    handleUpdateLink(link.id, 'title', e.target.value)
                                  }
                                  placeholder="Contoh: Konsultasi WhatsApp Hotline"
                                  className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                                  Subtitle / Keterangan Singkat
                                </label>
                                <input
                                  type="text"
                                  value={link.subtitle || ''}
                                  onChange={(e) =>
                                    handleUpdateLink(link.id, 'subtitle', e.target.value)
                                  }
                                  placeholder="Contoh: Respon Cepat Tim Legal"
                                  className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                                />
                              </div>
                            </div>

                            {/* Input: URL & PDF Upload */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block text-[11px] font-semibold text-gray-300">
                                  URL Tujuan
                                </label>
                                <label className="text-[10px] text-gold bg-gold/15 hover:bg-gold/25 border border-gold/30 px-2 py-0.5 rounded cursor-pointer flex items-center gap-1 font-semibold transition">
                                  <FileText size={11} />
                                  <span>Upload PDF</span>
                                  <input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (evt) => {
                                          handleUpdateLink(link.id, 'url', evt.target?.result as string);
                                          handleUpdateLink(link.id, 'subtitle', `${file.name} (Dokumen PDF)`);
                                          handleUpdateLink(link.id, 'icon', 'file-text');
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                              <input
                                type="text"
                                value={link.url}
                                onChange={(e) =>
                                  handleUpdateLink(link.id, 'url', e.target.value)
                                }
                                placeholder="https://... atau wa.me/..."
                                className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none font-mono"
                              />
                            </div>

                            {/* Dropdown Icon & Custom Icon */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                              <div>
                                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                                  Ikon Bawaan
                                </label>
                                <select
                                  value={link.icon || 'auto'}
                                  onChange={(e) =>
                                    handleUpdateLink(link.id, 'icon', e.target.value)
                                  }
                                  className="w-full text-xs px-3 py-2 rounded-xl bg-[#1A1A26] border border-white/10 text-white focus:border-gold outline-none"
                                >
                                  {ICON_OPTIONS.map(([val, label]) => (
                                    <option key={val} value={val} className="bg-[#1A1A26] text-white">
                                      {label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                                  Ikon Kustom / Logo Spesifik (Opsional)
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={link.customIconUrl || ''}
                                    onChange={(e) =>
                                      handleUpdateLink(link.id, 'customIconUrl', e.target.value)
                                    }
                                    placeholder="URL ikon gambar..."
                                    className="flex-1 text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                                  />
                                  <label className="px-2.5 py-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl text-xs font-semibold cursor-pointer shrink-0 flex items-center gap-1 transition">
                                    <Upload size={12} />
                                    <span>Upload</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          resizeImageToDataUrl(file, 160, (dataUrl) => {
                                            handleUpdateLink(link.id, 'customIconUrl', dataUrl);
                                          });
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INFORMASI KONTAK & FOOTER */}
              {activeEditorTab === 'info' && (
                <div className="bg-[#15151D] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-5 shadow-xl">
                  <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Building size={16} className="text-gold" />
                      <span>Informasi Kontak Kantor & Jam Layanan</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Alamat Kantor Utama
                      </label>
                      <input
                        type="text"
                        value={editingItem.companyInfo?.address || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            companyInfo: {
                              ...editingItem.companyInfo,
                              address: e.target.value
                            }
                          })
                        }
                        placeholder="Jl. M.H Thamrin No. 9 Lt 12, DKI Jakarta"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Jam Layanan / Operasional
                      </label>
                      <input
                        type="text"
                        value={editingItem.companyInfo?.hours || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            companyInfo: {
                              ...editingItem.companyInfo,
                              hours: e.target.value
                            }
                          })
                        }
                        placeholder="Senin - Jumat: 08:30 - 17:30 WIB"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Email Resmi Hotline
                      </label>
                      <input
                        type="email"
                        value={editingItem.companyInfo?.email || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            companyInfo: {
                              ...editingItem.companyInfo,
                              email: e.target.value
                            }
                          })
                        }
                        placeholder="hello@narasumberhukum.com"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Telepon Hotline / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={editingItem.companyInfo?.phone || ''}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            companyInfo: {
                              ...editingItem.companyInfo,
                              phone: e.target.value
                            }
                          })
                        }
                        placeholder="+62 822-1102-0022"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Teks Hak Cipta (Footer)
                    </label>
                    <input
                      type="text"
                      value={editingItem.companyInfo?.copyright || ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          companyInfo: {
                            ...editingItem.companyInfo,
                            copyright: e.target.value
                          }
                        })
                      }
                      placeholder="© 2026 Kantor Narasumber Hukum. All rights reserved."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: SMARTPHONE PREVIEW PANEL */}
            <div
              className={`lg:col-span-5 sticky top-20 ${
                mobileTab === 'form' ? 'hidden lg:block' : 'block'
              }`}
            >
              <div className="bg-[#0D0E15] p-3 sm:p-4 rounded-[42px] border-4 border-slate-800 shadow-2xl max-w-[360px] mx-auto min-h-[640px] flex flex-col relative overflow-hidden">
                {/* Phone Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                </div>

                {/* Smartphone Screen Canvas */}
                <div className="flex-1 rounded-[30px] overflow-hidden overflow-y-auto relative pt-2 flex flex-col bg-[#FAFAFA] text-slate-800 max-h-[680px]">
                  <LinkTreePublicView item={editingItem} />
                </div>
              </div>

              {/* Quick Actions under Smartphone */}
              <div className="mt-4 flex items-center justify-center gap-2 max-w-[360px] mx-auto">
                <button
                  type="button"
                  onClick={() => handleCopyHtml(editingItem)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Code size={13} className="text-gold" />
                  <span>Salin HTML</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadHtml(editingItem)}
                  className="px-3 py-1.5 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Download size={13} />
                  <span>Unduh File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#171722] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Hapus Link Tree Ini?</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Halaman link tree yang dihapus tidak akan dapat diakses lagi oleh pengunjung.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-lg"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
