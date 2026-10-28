"use client";
import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import {
    ArrowRight,
    Search,
    X,
    Filter,
    Grid,
    List,
    ChevronRight,
    Building2,
    Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import CustomBlocksRenderer from '@/components/CustomBlocksRenderer';
import {
    servicesData,
    ALL_DIRECTORY_SERVICES,
    DIRECTORY_CATEGORIES,
    DirectoryServiceItem,
    DirectoryCategoryType
} from './servicesData';

const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12
        }
    }
};

function getBadgeStyle(type: DirectoryCategoryType) {
    switch (type) {
        case 'hukum':
            return { label: 'Hukum', badgeClass: 'bg-red-500/15 text-red-300 border border-red-500/30' };
        case 'perizinan':
            return { label: 'Perizinan', badgeClass: 'bg-gold/15 text-gold border border-gold/30' };
        case 'pajak':
            return { label: 'Pajak', badgeClass: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' };
        case 'imigrasi':
            return { label: 'Imigrasi', badgeClass: 'bg-blue-500/15 text-blue-300 border border-blue-500/30' };
        case 'pertanahan':
            return { label: 'Pertanahan', badgeClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/30' };
        case 'sdm':
            return { label: 'SDM', badgeClass: 'bg-purple-500/15 text-purple-300 border border-purple-500/30' };
        default:
            return { label: 'Layanan', badgeClass: 'bg-gold/15 text-gold border border-gold/30' };
    }
}

const QUICK_SEARCH_TAGS = [
    'Perdata',
    'Wanprestasi',
    'OSS',
    'PBG / IMB',
    'HAKI',
    'Halal',
    'BPOM',
    'Klinik',
    'SPT Pajak',
    'NPWP / PKP',
    'Restitusi',
    'Paspor',
    'Izin Tinggal',
    'Sertipikat Tanah',
    'Hak Guna Bangunan',
    'AMDAL / UKL-UPL',
    'Pertambangan',
    'Ekspor Impor'
];

const ServicesInner = () => {
    const { t, locale } = useLanguage();
    const searchParams = useSearchParams();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const directorySectionRef = useRef<HTMLDivElement>(null);

    const [activeCat, setActiveCat] = useState<string>(searchParams.get('cat') || 'all');
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const cat = searchParams.get('cat');
        const q = searchParams.get('q');
        if (cat) setActiveCat(cat);
        if (q) setSearchQuery(q);
    }, [searchParams]);

    const filteredItems: DirectoryServiceItem[] = useMemo(() => {
        let items = ALL_DIRECTORY_SERVICES;

        if (activeCat !== 'all') {
            items = items.filter(item => item.type === activeCat);
        }

        if (searchQuery.trim().length > 0) {
            const q = searchQuery.toLowerCase().trim();
            items = items.filter(
                item =>
                    item.title.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q) ||
                    item.subcategory.toLowerCase().includes(q) ||
                    item.code.toLowerCase().includes(q) ||
                    String(item.id) === q
            );
        }

        return items;
    }, [activeCat, searchQuery]);

    const currentCatData = DIRECTORY_CATEGORIES.find(c => c.id === activeCat);

    const handleFocusSearch = (presetCategory?: string) => {
        if (presetCategory) {
            setActiveCat(presetCategory);
        }
        if (directorySectionRef.current) {
            directorySectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 400);
    };

    return (
        <div className="pt-20 bg-navy min-h-screen">
            {/* HEADER SERVICES */}
            <section className="bg-navy text-white py-14 md:py-20 border-b border-white/10 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                        <Link href="/" className="hover:text-gold transition-colors">
                            {locale === 'en' ? 'Home' : 'Beranda'}
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gold font-semibold">
                            {locale === 'en' ? 'Services Directory' : 'Direktori Layanan'}
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/10 border border-gold/30 rounded-full text-gold text-xs font-bold uppercase tracking-widest mb-4">
                                <Building2 className="w-3.5 h-3.5" />
                                {locale === 'en' ? 'INTEGRATED LEGAL, LICENSING & HR SERVICES' : 'SENTRAL EDUKASI & SOLUSI HUKUM TERPADU'}
                            </div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wider leading-tight"
                            >
                                {t('nav.services').split(' ')[0]}{' '}
                                <span className="text-gold">{t('nav.services').split(' ')[1] || t('about_page.title_gold')}</span>
                            </motion.h1>
                            <div className="w-20 h-1 bg-gold mb-5"></div>
                            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-6">
                                {locale === 'en'
                                    ? `Comprehensive directory covering ${ALL_DIRECTORY_SERVICES.length} specialist services: Litigation & Non-Litigation Legal Cases (34 Scopes), Business Licensing, OSS, Taxation, Immigration & Land Affairs (411 Services), and HR Development & Training.`
                                    : `Direktori komprehensif mencakup ${ALL_DIRECTORY_SERVICES.length} layanan spesialis: Penanganan Perkara Hukum Litigasi & Non-Litigasi (34 Cakupan Perkara), Perizinan Usaha, OSS, Perpajakan, Keimigrasian & Pertanahan (411 Layanan), serta Pengembangan & Pelatihan SDM.`}
                            </p>

                            {/* Interactive Search Trigger Button */}
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleFocusSearch()}
                                    className="inline-flex items-center gap-3 bg-gold text-navy px-6 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg cursor-pointer"
                                >
                                    <Search className="w-4 h-4" />
                                    {locale === 'en' ? 'Interactive Service Search' : 'Cari Layanan Interaktif'}
                                </button>
                                <Link
                                    href="/kontak"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/25 text-white hover:border-gold hover:text-gold font-bold text-xs uppercase tracking-wider transition-all"
                                >
                                    {t('hero.cta_consult')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
                            <div className="bg-[#141418] border border-white/10 rounded-xl px-4 sm:px-6 py-4 text-center">
                                <p className="text-2xl sm:text-3xl font-bold text-gold">34</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-1">
                                    {locale === 'en' ? 'Legal Cases' : 'Perkara Hukum'}
                                </p>
                            </div>
                            <div className="bg-[#141418] border border-white/10 rounded-xl px-4 sm:px-6 py-4 text-center">
                                <p className="text-2xl sm:text-3xl font-bold text-gold">411</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-1">
                                    {locale === 'en' ? 'Permits & Tax' : 'Izin & Legalitas'}
                                </p>
                            </div>
                            <div className="bg-[#141418] border border-gold/40 rounded-xl px-4 sm:px-6 py-4 text-center">
                                <p className="text-2xl sm:text-3xl font-bold text-white">{ALL_DIRECTORY_SERVICES.length}</p>
                                <p className="text-[10px] text-gold uppercase tracking-wider font-semibold mt-1">
                                    {locale === 'en' ? 'Total Services' : 'Total Layanan'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 MAIN PILLAR CARDS */}
            <section className="py-14 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-navy uppercase tracking-wider">
                                {locale === 'en' ? '3 Main Service Pillars' : '3 Bidang Layanan Utama'}
                            </h2>
                            <div className="w-16 h-1 bg-gold mt-2"></div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleFocusSearch()}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold transition-colors cursor-pointer"
                        >
                            <Search className="w-4 h-4 text-gold" />
                            {locale === 'en' ? `Search All ${ALL_DIRECTORY_SERVICES.length} Services Below` : `Cari dari ${ALL_DIRECTORY_SERVICES.length} Layanan di Bawah`}
                        </button>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-6 lg:gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {servicesData.map((service, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInUp}
                                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition duration-300 border border-gray-200 flex flex-col h-full"
                            >
                                <div className="h-44 relative overflow-hidden">
                                    <img
                                        src={(service as any).image}
                                        alt={t(service.titleKey)}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-navy/70 group-hover:bg-navy/55 transition-colors duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-white transform group-hover:scale-105 transition duration-500">
                                            {React.cloneElement(service.icon as any, { size: 52, className: "w-13 h-13 text-gold" })}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-3 text-navy group-hover:text-gold transition-colors font-sans leading-snug">
                                        {t(service.titleKey)}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                                        {t(service.shortDescKey)}
                                    </p>
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 mt-auto">
                                        <Link
                                            href={service.path}
                                            className="text-navy hover:text-gold font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                                        >
                                            {t('services.view_detail')} <ArrowRight size={14} />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleFocusSearch(service.directoryTypes[0])}
                                            className="px-3 py-1.5 rounded bg-navy/5 hover:bg-gold text-navy text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                        >
                                            {locale === 'en' ? 'Filter List' : 'Lihat Daftar'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* INTERACTIVE SERVICE DIRECTORY (LIKE SELECO WEB) */}
            <section id="direktori" ref={directorySectionRef} className="py-14 bg-[#0d0d10] text-white scroll-mt-20">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col xl:flex-row gap-8">

                        {/* === LEFT SIDEBAR: Category Filter === */}
                        <aside className="xl:w-80 shrink-0">
                            <div className="bg-[#151519] border border-white/10 rounded-xl sticky top-24 text-white overflow-hidden shadow-lg">
                                <div className="px-5 py-4 border-b border-white/10 bg-[#0a0a0c]">
                                    <p className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                        <Filter className="w-4 h-4 text-gold" />
                                        {locale === 'en' ? 'Category Filter' : 'Filter Kategori Layanan'}
                                    </p>
                                </div>
                                <nav className="divide-y divide-white/10">
                                    {DIRECTORY_CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => {
                                                setActiveCat(cat.id);
                                                setSearchQuery('');
                                            }}
                                            className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left transition-all text-xs cursor-pointer ${
                                                activeCat === cat.id
                                                    ? 'bg-gold/15 border-l-4 border-gold text-gold font-bold'
                                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            <span className="leading-snug font-semibold">
                                                {locale === 'en' ? cat.nameEn : cat.name}
                                            </span>
                                            <span
                                                className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded ${
                                                    activeCat === cat.id
                                                        ? 'bg-gold text-navy'
                                                        : 'bg-white/10 text-gray-300'
                                                }`}
                                            >
                                                {cat.count}
                                            </span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* === MAIN CONTENT: Interactive Search + Items === */}
                        <div className="flex-1 min-w-0">

                            {/* Search Bar & View Mode Toggle */}
                            <div className="bg-[#151519] border border-white/10 rounded-xl p-4 mb-4 shadow-md">
                                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                            placeholder={
                                                locale === 'en'
                                                    ? 'Search legal cases, permits, OSS, tax, immigration, land, or HR services...'
                                                    : 'Ketik untuk mencari perkara hukum, izin usaha, OSS, pajak, imigrasi, pertanahan, atau SDM...'
                                            }
                                            className="w-full pl-10 pr-10 py-3 text-sm bg-[#0a0a0c] border border-white/15 rounded-lg focus:outline-none focus:border-gold text-white placeholder-gray-400 transition-colors"
                                        />
                                        {searchQuery && (
                                            <button
                                                type="button"
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white cursor-pointer"
                                                aria-label="Clear search"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => setViewMode('grid')}
                                            className={`px-3 py-2.5 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                                                viewMode === 'grid'
                                                    ? 'bg-gold text-navy border-gold'
                                                    : 'border-white/15 text-gray-400 hover:border-white/30 hover:text-white'
                                            }`}
                                            title="Grid view"
                                        >
                                            <Grid className="w-4 h-4" />
                                            <span className="hidden sm:inline">Grid</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setViewMode('list')}
                                            className={`px-3 py-2.5 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                                                viewMode === 'list'
                                                    ? 'bg-gold text-navy border-gold'
                                                    : 'border-white/15 text-gray-400 hover:border-white/30 hover:text-white'
                                            }`}
                                            title="List view"
                                        >
                                            <List className="w-4 h-4" />
                                            <span className="hidden sm:inline">List</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Interactive Search Tags */}
                                <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 flex-wrap">
                                    <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mr-1">
                                        {locale === 'en' ? 'Quick Search:' : 'Pencarian Cepat:'}
                                    </span>
                                    {QUICK_SEARCH_TAGS.map(tag => {
                                        const isActive = searchQuery.toLowerCase() === tag.toLowerCase();
                                        return (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => {
                                                    if (isActive) {
                                                        setSearchQuery('');
                                                    } else {
                                                        setActiveCat('all');
                                                        setSearchQuery(tag);
                                                    }
                                                }}
                                                className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                                                    isActive
                                                        ? 'bg-gold text-navy border-gold font-bold'
                                                        : 'bg-white/5 border-white/10 text-gray-300 hover:border-gold/50 hover:text-gold'
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Active Category Info Box */}
                            {currentCatData && (
                                <div className="mb-6 p-5 bg-[#151519] border border-white/10 border-l-4 border-l-gold rounded-xl shadow-md">
                                    <h2 className="text-lg md:text-xl font-bold text-white mb-1">
                                        {locale === 'en' ? currentCatData.nameEn : currentCatData.name}
                                    </h2>
                                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                                        {locale === 'en' ? currentCatData.descriptionEn : currentCatData.description}
                                    </p>
                                    <p className="text-xs text-gold font-bold mt-2.5">
                                        {locale === 'en'
                                            ? `Showing ${filteredItems.length} of ${currentCatData.count} services`
                                            : `Menampilkan ${filteredItems.length} dari ${currentCatData.count} layanan`}
                                        {searchQuery && ` — "${searchQuery}"`}
                                    </p>
                                </div>
                            )}

                            {/* Empty State */}
                            {filteredItems.length === 0 && (
                                <div className="text-center py-16 bg-[#151519] border border-white/10 rounded-xl p-8">
                                    <Search className="w-10 h-10 mx-auto mb-3 text-gold opacity-60" />
                                    <p className="text-xl font-bold mb-1 text-white">
                                        {locale === 'en' ? 'No Matching Services Found' : 'Layanan Tidak Ditemukan'}
                                    </p>
                                    <p className="text-sm text-gray-400 mb-5">
                                        {locale === 'en'
                                            ? 'Try another keyword or reset the category filter.'
                                            : 'Silakan coba kata kunci lain atau pilih kategori Semua Layanan.'}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActiveCat('all');
                                            setSearchQuery('');
                                        }}
                                        className="px-5 py-2.5 bg-gold text-navy font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-colors cursor-pointer"
                                    >
                                        {locale === 'en' ? 'Reset Filter & Search' : 'Tampilkan Semua Layanan'}
                                    </button>
                                </div>
                            )}

                            {/* Directory Items: Grid or List */}
                            <AnimatePresence mode="wait">
                                {viewMode === 'grid' ? (
                                    <motion.div
                                        key="grid"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                                    >
                                        {filteredItems.map(item => {
                                            const badge = getBadgeStyle(item.type);
                                            const waUrl = `https://wa.me/6282211020022?text=${encodeURIComponent(
                                                `Halo Kantor Narasumber Hukum, saya ingin berkonsultasi mengenai layanan: ${item.title} (${item.code}).`
                                            )}`;
                                            return (
                                                <div
                                                    key={item.code}
                                                    className="bg-[#151519] border border-white/10 rounded-xl p-5 hover:border-gold/50 hover:bg-[#1a1a20] transition-all group flex flex-col justify-between shadow-sm"
                                                >
                                                    <div>
                                                        <div className="flex items-center justify-between gap-2 mb-2.5">
                                                            <span
                                                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shrink-0 ${badge.badgeClass}`}
                                                            >
                                                                {badge.label}
                                                            </span>
                                                            <span className="text-[11px] text-gray-400 font-mono font-semibold shrink-0">
                                                                #{item.id}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-sm font-bold text-white leading-snug mb-1.5 group-hover:text-gold transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-[11px] text-gray-400 font-medium">
                                                            {item.subcategory}
                                                        </p>
                                                    </div>
                                                    <a
                                                        href={waUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-4 text-xs font-bold text-gold border-t border-white/10 pt-3 flex items-center justify-between hover:text-white transition-colors"
                                                    >
                                                        <span>{locale === 'en' ? 'Consult Now' : 'Konsultasikan'}</span>
                                                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="list"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-[#151519] border border-white/10 rounded-xl overflow-hidden divide-y divide-white/10 shadow-sm"
                                    >
                                        {filteredItems.map(item => {
                                            const badge = getBadgeStyle(item.type);
                                            const waUrl = `https://wa.me/6282211020022?text=${encodeURIComponent(
                                                `Halo Kantor Narasumber Hukum, saya ingin berkonsultasi mengenai layanan: ${item.title} (${item.code}).`
                                            )}`;
                                            return (
                                                <div
                                                    key={item.code}
                                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 hover:bg-white/5 transition-all group"
                                                >
                                                    <div className="flex items-start gap-3.5 min-w-0">
                                                        <span className="text-xs text-gray-400 font-mono font-bold w-9 shrink-0 pt-0.5">
                                                            {String(item.id).padStart(3, '0')}
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-semibold text-white group-hover:text-gold transition-colors leading-snug">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-[11px] text-gray-400 mt-0.5">
                                                                {item.subcategory}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-end gap-3 shrink-0 pl-12 sm:pl-0">
                                                        <span
                                                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${badge.badgeClass}`}
                                                        >
                                                            {badge.label}
                                                        </span>
                                                        <a
                                                            href={waUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs font-bold text-gold hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
                                                        >
                                                            {locale === 'en' ? 'Consult' : 'Konsultasi'}
                                                            <ChevronRight className="w-3.5 h-3.5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Bottom CTA Banner */}
                            <div className="mt-10 p-6 md:p-8 bg-[#151519] border border-gold/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-white shadow-lg">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white">
                                        {t('services.cta_custom_title')}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-300 mt-1.5 max-w-xl leading-relaxed">
                                        {t('services.cta_custom_desc')}
                                    </p>
                                </div>
                                <Link
                                    href="/kontak"
                                    className="px-7 py-3.5 bg-gold text-navy font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white transition-all whitespace-nowrap flex items-center gap-2 shadow-md shrink-0"
                                >
                                    <Briefcase className="w-4 h-4" />
                                    {t('hero.cta_consult')}
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <CustomBlocksRenderer page="services" />
        </div>
    );
};

const ServicesClient = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-navy text-white flex items-center justify-center pt-20">
                    Memuat Direktori Layanan...
                </div>
            }
        >
            <ServicesInner />
        </Suspense>
    );
};

export default ServicesClient;
