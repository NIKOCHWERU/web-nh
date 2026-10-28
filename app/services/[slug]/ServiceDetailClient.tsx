"use client";
import React, { useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Phone,
    Search,
    X,
    Grid,
    List,
    ChevronRight,
    ArrowRight,
    Filter
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
    servicesData,
    ALL_DIRECTORY_SERVICES,
    DirectoryServiceItem,
    DirectoryCategoryType
} from '../servicesData';

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

const ServiceDetailClient = ({ slug }: { slug: string }) => {
    const { t, locale } = useLanguage();
    const router = useRouter();
    const service = servicesData.find((s: any) => s.path.split('/').pop() === slug);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeSubType, setActiveSubType] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [globalSearchQuery, setGlobalSearchQuery] = useState('');

    const pillarServices = useMemo(() => {
        if (!service) return [];
        const allowedTypes: DirectoryCategoryType[] = (service as any).directoryTypes || [];
        return ALL_DIRECTORY_SERVICES.filter((item) => allowedTypes.includes(item.type));
    }, [service]);

    const filteredServices = useMemo(() => {
        return pillarServices.filter((item) => {
            const matchesSubType = activeSubType === 'all' || item.type === activeSubType;
            if (!matchesSubType) return false;

            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                item.title.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q) ||
                item.subcategory.toLowerCase().includes(q) ||
                item.code.toLowerCase().includes(q)
            );
        });
    }, [pillarServices, activeSubType, searchQuery]);

    const otherServices = useMemo(() => {
        return servicesData.filter((s: any) => s.path.split('/').pop() !== slug);
    }, [slug]);

    if (!service) {
        return (
            <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold text-navy mb-4">{t('services.not_found')}</h1>
                <Link href="/services" className="text-gold hover:underline">{t('services.back_to_services')}</Link>
            </div>
        );
    }

    const handleGlobalSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (globalSearchQuery.trim()) {
            router.push(`/services?q=${encodeURIComponent(globalSearchQuery.trim())}#direktori`);
        } else {
            router.push('/services#direktori');
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <div className="relative pt-32 pb-28 overflow-hidden bg-navy">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/95 to-navy"></div>
                </motion.div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <Link href="/services" className="inline-flex items-center gap-2 text-white/75 hover:text-gold transition-colors group text-sm font-medium">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> {t('services.back_to_services')}
                        </Link>
                        <Link
                            href="/services#direktori"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider transition-all"
                        >
                            <Search size={14} />
                            {locale === 'en' ? `Search All ${ALL_DIRECTORY_SERVICES.length} Services` : `Cari Layanan Lain (${ALL_DIRECTORY_SERVICES.length} Layanan)`}
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="w-14 h-14 bg-gold/10 backdrop-blur-md rounded-xl flex items-center justify-center text-gold mb-5 border border-gold/25">
                            {React.cloneElement(service.icon as any, { size: 28 })}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-sans max-w-4xl leading-tight">
                            {t(service.titleKey)}
                        </h1>
                        <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed">
                            {t(service.shortDescKey)}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* OVERVIEW CARD */}
            <div className="container mx-auto px-4 max-w-6xl relative z-20 -mt-14 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-200"
                >
                    <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-navy prose-headings:font-sans prose-headings:font-bold prose-a:text-gold hover:prose-a:text-navy leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: service.content[locale as keyof typeof service.content] || service.content.id }} />
                    </div>
                </motion.div>
            </div>

            {/* COMPLETE INTERACTIVE DIRECTORY FOR THIS PILLAR */}
            <section className="py-12 md:py-16 bg-[#0a0a0b] text-white border-y border-white/10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                                <Filter size={13} />
                                {locale === 'en' ? 'Complete Service List' : 'Daftar Layanan Lengkap'}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                {locale === 'en'
                                    ? `Complete Scope of ${t(service.titleKey)} (${pillarServices.length} Items)`
                                    : `Daftar Lengkap ${t(service.titleKey)} (${pillarServices.length} Layanan)`}
                            </h2>
                        </div>

                        {/* Sub-category filter tabs for Perizinan & Legalitas (411 items) */}
                        {slug === 'perizinan' && (
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { id: 'all', label: `Semua (${pillarServices.length})` },
                                    { id: 'perizinan', label: `Perizinan Usaha (${pillarServices.filter(i => i.type === 'perizinan').length})` },
                                    { id: 'pajak', label: `Perpajakan (${pillarServices.filter(i => i.type === 'pajak').length})` },
                                    { id: 'imigrasi', label: `Keimigrasian (${pillarServices.filter(i => i.type === 'imigrasi').length})` },
                                    { id: 'pertanahan', label: `Pertanahan (${pillarServices.filter(i => i.type === 'pertanahan').length})` }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveSubType(tab.id)}
                                        className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border ${
                                            activeSubType === tab.id
                                                ? 'bg-gold text-navy border-gold shadow-md'
                                                : 'bg-[#141418] text-gray-300 border-white/10 hover:border-gold/40 hover:text-white'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Bar & View Mode Toggle */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder={
                                    locale === 'en'
                                        ? `Search within ${pillarServices.length} services in ${t(service.titleKey)}...`
                                        : `Cari di dalam ${pillarServices.length} daftar ${t(service.titleKey)}...`
                                }
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-10 py-3.5 bg-[#141418] border border-white/15 focus:border-gold rounded-xl text-white placeholder-gray-500 focus:outline-none transition-colors text-sm"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="text-xs text-gray-400 px-3 py-2 bg-[#141418] border border-white/10 rounded-xl">
                                Menampilkan <strong className="text-gold">{filteredServices.length}</strong> dari {pillarServices.length}
                            </div>
                            <div className="flex items-center gap-1 bg-[#141418] p-1.5 rounded-xl border border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gold/20 text-gold' : 'text-gray-500 hover:text-gray-300'}`}
                                    title="Tampilan Grid"
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gold/20 text-gold' : 'text-gray-500 hover:text-gray-300'}`}
                                    title="Tampilan Daftar"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Items Grid / List */}
                    {filteredServices.length > 0 ? (
                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2.5'}>
                            {filteredServices.map((item: DirectoryServiceItem, idx: number) => {
                                const badge = getBadgeStyle(item.type);
                                const waUrl = `https://wa.me/6282211020022?text=${encodeURIComponent(
                                    `Halo Narasumber Hukum, saya ingin berkonsultasi mengenai layanan: ${item.title} (${item.code})`
                                )}`;

                                return viewMode === 'grid' ? (
                                    <div
                                        key={item.id}
                                        className="bg-[#141418] border border-white/10 hover:border-gold/40 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between group hover:bg-[#18181f]"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badge.badgeClass}`}>
                                                    {badge.label}
                                                </span>
                                                <span className="text-xs text-gray-500 font-mono">#{idx + 1}</span>
                                            </div>
                                            <h3 className="text-white font-semibold text-sm leading-snug mb-3 group-hover:text-gold transition-colors">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-1">
                                            <span className="text-[11px] text-gray-400 truncate max-w-[180px]" title={item.subcategory}>
                                                {item.subcategory}
                                            </span>
                                            <a
                                                href={waUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-gold hover:text-white font-bold flex items-center gap-1 shrink-0 transition-colors"
                                            >
                                                {locale === 'en' ? 'Consult' : 'Konsultasikan'}
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key={item.id}
                                        className="bg-[#141418] border border-white/10 hover:border-gold/40 rounded-xl px-4 py-3.5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#18181f]"
                                    >
                                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                                            <span className="text-xs text-gray-500 font-mono w-10 shrink-0">#{idx + 1}</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0 ${badge.badgeClass}`}>
                                                {badge.label}
                                            </span>
                                            <h3 className="text-white font-medium text-sm group-hover:text-gold transition-colors leading-snug">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-12 sm:pl-0">
                                            <span className="text-xs text-gray-400 hidden xl:inline-block">{item.subcategory}</span>
                                            <a
                                                href={waUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-gold hover:text-white font-bold flex items-center gap-1 whitespace-nowrap"
                                            >
                                                {locale === 'en' ? 'Consult' : 'Konsultasikan'}
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-[#141418] border border-white/10 rounded-2xl p-10 text-center">
                            <p className="text-gray-300 font-semibold mb-2">
                                {locale === 'en'
                                    ? `No service matching "${searchQuery}" in this category.`
                                    : `Tidak ditemukan layanan dengan kata kunci "${searchQuery}" pada kategori ini.`}
                            </p>
                            <div className="flex flex-wrap justify-center gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveSubType('all');
                                    }}
                                    className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-bold transition-colors"
                                >
                                    Reset Filter
                                </button>
                                <Link
                                    href={`/services?q=${encodeURIComponent(searchQuery)}#direktori`}
                                    className="px-4 py-2 rounded-lg bg-gold text-navy hover:bg-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                                >
                                    <Search size={14} />
                                    Cari "{searchQuery}" di Seluruh 448 Layanan
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* INTERACTIVE SEARCH OTHER SERVICES SECTION */}
            <section className="py-14 bg-gray-50 border-b border-gray-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm mb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-navy mb-2">
                                    {locale === 'en' ? 'Looking for Another Legal or Permit Service?' : 'Cari Layanan Hukum, Perizinan, atau Pajak Lainnya?'}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {locale === 'en'
                                        ? `Use our interactive search across all ${ALL_DIRECTORY_SERVICES.length} services or explore other service pillars below.`
                                        : `Gunakan fitur pencarian interaktif untuk menelusuri seluruh ${ALL_DIRECTORY_SERVICES.length} layanan kami di berbagai kementerian dan pengadilan.`}
                                </p>
                            </div>
                            <form onSubmit={handleGlobalSearchSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto lg:min-w-[420px]">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={globalSearchQuery}
                                        onChange={(e) => setGlobalSearchQuery(e.target.value)}
                                        placeholder={locale === 'en' ? 'Search across all 448 services...' : 'Ketik layanan lain (misal: HAKI, SPT, Paspor, SHM)...'}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-gold focus:outline-none text-sm text-navy"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-navy text-gold hover:bg-gold hover:text-navy font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0"
                                >
                                    <Search size={15} />
                                    {locale === 'en' ? 'Search Directory' : 'Cari Layanan'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {otherServices.map((other: any) => (
                            <Link
                                key={other.slug}
                                href={other.path}
                                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-gold shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-navy text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                                        {React.cloneElement(other.icon as any, { size: 22 })}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-navy group-hover:text-gold transition-colors text-base mb-1">
                                            {t(other.titleKey)}
                                        </h4>
                                        <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                                            {t(other.shortDescKey)}
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-gray-400 group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <div className="container mx-auto px-4 py-14 md:py-20 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-navy text-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-gold/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold mb-5 border border-gold/20 mx-auto">
                            <Phone size={28} />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-bold mb-4 font-sans">{t('services.cta_title')}</h3>
                        <p className="text-gray-300 mb-8 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                            {t('services.cta_desc')}
                        </p>
                        <a
                            href={`https://wa.me/6282211020022?text=${encodeURIComponent(`Halo, saya ingin berkonsultasi mengenai ${t(service.titleKey)}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 rounded-xl font-bold hover:bg-white transition-all duration-300 shadow-lg text-sm uppercase tracking-wider"
                        >
                            <Phone size={18} /> {t('cta_contact.button')}
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetailClient;
