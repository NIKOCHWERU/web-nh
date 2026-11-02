"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Loader2,
  Calendar,
  Clock,
  User,
  Search,
  Sparkles,
  Phone,
  BookOpen,
  Filter,
  CheckCircle,
  Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translateArticle } from '@/lib/translationService';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Helper to strip HTML tags for clean excerpt
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

const readTime = (html: string) => {
  const words = stripHtml(html).split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
};

const ArticlesClient = () => {
  const { locale, t } = useLanguage();
  const [originalArticles, setOriginalArticles] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  /* ── Fetch Articles from CMS API ── */
  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles', { cache: 'no-store' });
      const data = res.ok ? await res.json() : { data: [] };
      let fetched: any[] = Array.isArray(data.data) ? data.data : [];

      // Sort newest first
      fetched.sort(
        (a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );

      setOriginalArticles(fetched);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  /* ── Auto-translate if English ── */
  useEffect(() => {
    const handleTranslation = async () => {
      if (originalArticles.length === 0) return;
      if (locale === 'en') {
        try {
          const translated = await Promise.all(
            originalArticles.map((art) => translateArticle(art, 'en', 'id'))
          );
          setArticles(translated);
        } catch {
          setArticles(originalArticles);
        }
      } else {
        setArticles(originalArticles);
      }
    };
    handleTranslation();
  }, [locale, originalArticles]);

  /* ── Image & Date Helpers ── */
  const getImageUrl = (art: any) => {
    if (art.image_url) return art.image_url;
    if (art.image && typeof art.image === 'string') return art.image;
    return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  /* ── Unique Categories with Counts ── */
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      const cat = a.category?.name || 'Umum';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [articles]);

  /* ── Filtered Articles ── */
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesCat =
        selectedCategory === 'all' || (a.category?.name || '') === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (a.title || '').toLowerCase().includes(q) ||
        (a.excerpt || '').toLowerCase().includes(q) ||
        (a.category?.name || '').toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Priority / Featured Headline Article
  const featuredArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null;
    // Prefer article marked as featured, otherwise the newest one
    const explicit = filteredArticles.find((a) => a.featured);
    return explicit || filteredArticles[0];
  }, [filteredArticles]);

  // Other remaining articles
  const otherArticles = useMemo(() => {
    if (!featuredArticle) return [];
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#090a0f] text-white gap-4">
        <Loader2 className="animate-spin text-gold" size={44} />
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-gold/80 animate-pulse">
          {locale === 'en' ? 'Loading Legal Knowledge Base...' : 'Memuat Artikel & Edukasi Hukum...'}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0c12] text-gray-200 min-h-screen font-sans selection:bg-gold selection:text-navy">
      {/* 1. MAJESTIC LUXURY HEADER & SEARCH */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-[#08080c] via-[#0e1019] to-[#0b0c12] border-b border-white/10">
        {/* Ambient Gold Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-5">
              <Sparkles size={14} />
              {locale === 'en' ? 'Official Legal Knowledge Base' : 'Sentral Edukasi & Kajian Hukum'}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-tight text-white font-sans leading-tight">
              Wawasan & Analisis <span className="text-gold">Hukum Terpercaya</span>
            </h1>

            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-8 font-light">
              Kajian mendalam seputar regulasi korporasi, sengketa bisnis, perizinan OSS RBA, kepatuhan pajak, hak atas tanah, hingga manajemen talenta SDM di Indonesia.
            </p>

            {/* Interactive Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/70 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel (misal: Sengketa Kontrak, OSS RBA, HAKI, BPN, PT PMA)..."
                  className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#141622] border border-white/15 focus:border-gold text-white placeholder-gray-400 text-sm focus:outline-none shadow-xl transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs px-2 py-1"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills with Counts */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-gold text-navy shadow-lg font-black'
                    : 'bg-[#151724] border border-white/10 text-gray-300 hover:border-gold/50 hover:text-white'
                }`}
              >
                Semua Topik ({articles.length})
              </button>
              {Object.entries(categoriesWithCounts).map(([catName, count]) => (
                <button
                  key={catName}
                  type="button"
                  onClick={() => setSelectedCategory(catName)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === catName
                      ? 'bg-gold text-navy shadow-lg font-black'
                      : 'bg-[#151724] border border-white/10 text-gray-300 hover:border-gold/50 hover:text-white'
                  }`}
                >
                  {catName} ({count})
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROMINENT HEADLINE / PRIORITY ARTICLE SHOWCASE */}
      {featuredArticle && (
        <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121420] via-[#161928] to-[#0e101a] border border-gold/40 shadow-2xl hover:border-gold transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Big Image Banner */}
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[460px] overflow-hidden">
                <img
                  src={getImageUrl(featuredArticle)}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121420] via-[#121420]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#121420]/30 lg:to-[#121420]"></div>

                {/* Priority Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-gold text-navy text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5 animate-pulse">
                    <Sparkles size={12} />
                    {featuredArticle.featured ? '★ HEADLINE PRIORITAS' : '🔥 ARTIKEL UTAMA TERBARU'}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-navy/90 border border-gold/40 text-gold text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {featuredArticle.category?.name || 'Hukum'}
                  </span>
                </div>
              </div>

              {/* Right Column: Article Details */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-gold" />
                      {formatDate(featuredArticle.published_at)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-gold" />
                      {readTime(featuredArticle.content)} min baca
                    </span>
                  </div>

                  <Link href={`/artikel/${featuredArticle.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-snug group-hover:text-gold transition-colors font-sans">
                      {featuredArticle.title}
                    </h2>
                  </Link>

                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 font-light mb-6">
                    {featuredArticle.excerpt || stripHtml(featuredArticle.content)}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  {/* Author Card */}
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredArticle.author?.profile_photo_url || '/logo.png'}
                      alt={featuredArticle.author?.name || 'Author'}
                      className="w-10 h-10 rounded-full object-cover border border-gold/40 shadow"
                    />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {featuredArticle.author?.name || 'Administrator NH'}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {featuredArticle.author?.title || 'Legal Specialist'}
                      </div>
                    </div>
                  </div>

                  {/* Read Button */}
                  <Link
                    href={`/artikel/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-navy font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                  >
                    Baca Lengkap <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 3. GRID OF ALL OTHER ARTICLES */}
      <section className="container mx-auto px-4 max-w-6xl mb-20">
        <div className="flex items-center justify-between gap-4 mb-8 pb-3 border-b border-white/10">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={20} className="text-gold" />
              Koleksi Artikel & Kajian Hukum
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Menampilkan {otherArticles.length} artikel terverifikasi lainnya
            </p>
          </div>
          {searchQuery && (
            <span className="text-xs text-gold font-bold">
              Hasil untuk "{searchQuery}"
            </span>
          )}
        </div>

        {otherArticles.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {otherArticles.map((art: any) => (
              <motion.div
                key={art.id}
                variants={fadeInUp}
                className="group flex flex-col rounded-2xl bg-[#12141e] border border-white/10 hover:border-gold/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Thumbnail */}
                <Link
                  href={`/artikel/${art.slug}`}
                  className="relative h-48 overflow-hidden bg-black/40 block"
                >
                  <img
                    src={getImageUrl(art)}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141e] via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-navy/90 border border-gold/40 text-gold text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {art.category?.name || 'Hukum'}
                  </span>
                </Link>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2.5">
                      <span>{formatDate(art.published_at)}</span>
                      <span>•</span>
                      <span>{readTime(art.content)} min baca</span>
                    </div>

                    <Link href={`/artikel/${art.slug}`}>
                      <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                        {art.title}
                      </h4>
                    </Link>

                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4 font-light">
                      {art.excerpt || stripHtml(art.content)}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={art.author?.profile_photo_url || '/logo.png'}
                        alt={art.author?.name || 'Author'}
                        className="w-6 h-6 rounded-full object-cover border border-gold/30"
                      />
                      <span className="text-[11px] font-semibold text-gray-300 truncate max-w-[130px]">
                        {art.author?.name || 'Admin NH'}
                      </span>
                    </div>

                    <Link
                      href={`/artikel/${art.slug}`}
                      className="text-gold group-hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                      Baca <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-16 text-center bg-[#12141e] rounded-2xl border border-white/10">
            <BookOpen size={40} className="text-gold/40 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">
              Tidak Ada Artikel yang Cocok
            </h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4">
              Coba gunakan kata kunci pencarian yang berbeda atau pilih kategori topik lainnya.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-lg bg-gold text-navy font-bold text-xs uppercase tracking-wider hover:bg-white transition"
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}
      </section>

      {/* 4. FAST CONSULTATION CTA BANNER */}
      <section className="container mx-auto px-4 max-w-6xl pb-24">
        <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-navy via-[#141626] to-[#0c0d16] border border-gold/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
              Konsultasi Langsung
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
              Punya Masalah Hukum atau Butuh Uji Tuntas Bisnis?
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tim Advokat, Mediator, dan Konsultan Perizinan Narasumber Hukum siap memberikan pendampingan resmi dan solutif untuk perkara Anda.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/6282211020022?text=Halo%20Tim%20Narasumber%20Hukum%2C%20saya%20ingin%20berkonsultasi%20terkait%20kebutuhan%20hukum%2Fperizinan%20usaha."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gold text-navy font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Phone size={15} /> Konsultasi via WhatsApp
            </a>
            <Link
              href="/kontak"
              className="px-6 py-3.5 rounded-xl border border-white/40 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-navy transition-all flex items-center justify-center"
            >
              Kirim Pesan Resmi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesClient;
