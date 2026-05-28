"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Search, SlidersHorizontal, Calendar, Tag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translateArticle } from '@/lib/translationService';
import ConsultationCTA from '@/components/ConsultationCTA';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Strip HTML tags to get plain text excerpt
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

// Estimate read time
const readTime = (html: string) => {
  const words = stripHtml(html).split(' ').length;
  return Math.max(1, Math.round(words / 200));
};

const ArticlesClient = () => {
  const { locale, t } = useLanguage();
  const [originalArticles, setOriginalArticles] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  /* ── Fetch ── */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
        const data = await res.json();
        const fetched = data.data || [];
        setOriginalArticles(fetched);
        setArticles(fetched);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  /* ── Auto-translate ── */
  useEffect(() => {
    const handleTranslation = async () => {
      if (originalArticles.length === 0) return;
      if (locale === 'en') {
        setTranslating(true);
        try {
          const translated = await Promise.all(
            originalArticles.map((art) => translateArticle(art, 'en', 'id'))
          );
          setArticles(translated);
        } catch {
          setArticles(originalArticles);
        } finally {
          setTranslating(false);
        }
      } else {
        setArticles(originalArticles);
      }
    };
    handleTranslation();
  }, [locale, originalArticles]);

  /* ── Helpers ── */
  const getImageUrl = (path: any) => {
    if (!path) return 'https://placehold.co/800x500/1a2744/c9a96e?text=NH';
    if (typeof path !== 'string') return 'https://placehold.co/800x500/1a2744/c9a96e?text=NH';
    if (path.startsWith('http')) return path;
    const clean = path.startsWith('/') ? path.slice(1) : path;
    return clean.startsWith('storage/')
      ? `${process.env.NEXT_PUBLIC_API_URL}/${clean}`
      : `${process.env.NEXT_PUBLIC_API_URL}/storage/${clean}`;
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

  /* ── Categories computed from ORIGINAL articles (not filtered) ── */
  const uniqueCategories: string[] = Array.from(
    new Set(originalArticles.map((a) => a.category?.name).filter(Boolean))
  );

  const categoryCounts = originalArticles.reduce((acc: any, art: any) => {
    const name = art.category?.name;
    if (name) acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  /* ── Filter + Sort ── */
  const processedArticles = (() => {
    let result = [...articles];
    if (selectedCategory !== 'all') {
      result = result.filter((a) => (a.category?.name || '') === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          stripHtml(a.content || '').toLowerCase().includes(q)
      );
    }
    if (sortBy === 'newest')
      result.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    else if (sortBy === 'oldest')
      result.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
    else if (sortBy === 'az')
      result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  })();

  const isFiltering = selectedCategory !== 'all' || searchQuery !== '';
  const featuredArticle = !isFiltering && processedArticles.length > 0 ? processedArticles[0] : null;
  const listArticles = featuredArticle ? processedArticles.slice(1) : processedArticles;

  /* Recent posts from original (not filtered) */
  const recentPosts = [...originalArticles]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 4);

  /* ── Loading ── */
  if (loading || translating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="animate-spin text-navy" size={44} />
        <span className="text-xs font-black tracking-[0.3em] uppercase text-navy/60 animate-pulse">
          {locale === 'en' ? 'Loading Articles...' : 'Memuat Artikel...'}
        </span>
      </div>
    );
  }

  /* ── Render ── */
  return (
    <div className="pt-20 bg-[#f8f7f4] min-h-screen pb-24">

      {/* ════ HERO ════ */}
      <section className="bg-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          {/* subtle grid lines */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block bg-gold/10 border border-gold/30 text-gold text-[10px] font-black uppercase tracking-[0.35em] px-4 py-2 rounded-full mb-6">
              {locale === 'id' ? 'Sentral Hukum & Edukasi' : 'Legal & Education Center'}
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[0.1em] mb-5 font-serif">
              {t('articles_page.title')}
            </h1>
            <div className="w-16 h-1 bg-gold mx-auto mb-5 rounded-full" />
            <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {t('articles_page.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ FEATURED ARTICLE ════ */}
      {featuredArticle && (
        <section className="container mx-auto px-4 -mt-10 relative z-20 mb-14">
          <Link href={`/artikel/${featuredArticle.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row cursor-pointer hover:shadow-navy/10 transition-shadow duration-500"
            >
              {/* Image */}
              <div className="relative lg:w-[58%] min-h-[260px] lg:min-h-[440px] overflow-hidden">
                <img
                  src={getImageUrl(featuredArticle.image)}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="bg-gold text-navy text-[10px] font-black px-4 py-2 uppercase tracking-[0.2em] rounded-full shadow-lg">
                    ★ {t('articles_page.featured_label')}
                  </span>
                </div>
                {featuredArticle.category?.name && (
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-white/15 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-full border border-white/25">
                      {featuredArticle.category.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="lg:w-[42%] p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    {formatDate(featuredArticle.published_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {readTime(featuredArticle.content)} min read
                  </span>
                </div>
                <h2 className="text-2xl md:text-[1.75rem] font-black font-serif text-navy mb-5 leading-tight group-hover:text-gold transition-colors duration-300">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-4">
                  {stripHtml(featuredArticle.content)}
                </p>
                <div className="flex items-center gap-2 text-navy group-hover:text-gold font-black text-xs uppercase tracking-[0.2em] transition-colors duration-300 mt-auto">
                  {t('articles_page.read_more')}
                  <ArrowRight size={15} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* ════ MAIN CONTENT ════ */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ── LEFT: Blog List ── */}
          <div className="lg:col-span-8">

            {/* Filter bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('articles_page.search_placeholder')}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border border-gray-100 outline-none focus:border-gold focus:bg-white transition-all placeholder-gray-400"
                />
              </div>
              {/* Sort */}
              <div className="flex items-center gap-2 shrink-0">
                <SlidersHorizontal className="text-gray-400" size={14} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-navy border border-gray-100 outline-none focus:border-gold cursor-pointer"
                >
                  <option value="newest">{t('articles_page.sort_newest')}</option>
                  <option value="oldest">{t('articles_page.sort_oldest')}</option>
                  <option value="az">{t('articles_page.sort_az')}</option>
                </select>
              </div>
            </div>

            {/* Search result label */}
            {isFiltering && searchQuery && (
              <p className="text-sm text-gray-500 mb-6">
                {t('articles_page.search_results')}: <span className="font-bold text-navy">"{searchQuery}"</span>
                {' '}—{' '}
                <span className="text-gold font-bold">{processedArticles.length} artikel</span>
              </p>
            )}

            {/* Blog List */}
            {listArticles.length > 0 ? (
              <motion.div
                className="flex flex-col gap-0"
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                {listArticles.map((article, idx) => (
                  <motion.div key={article.id} variants={fadeInUp}>
                    <Link href={`/artikel/${article.slug}`}>
                      <article className={`group flex gap-6 py-7 cursor-pointer ${idx < listArticles.length - 1 ? 'border-b border-gray-200' : ''}`}>
                        {/* Thumbnail */}
                        <div className="shrink-0 w-40 h-28 sm:w-52 sm:h-36 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                          <img
                            src={getImageUrl(article.image)}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          {/* Category + Date */}
                          <div className="flex flex-wrap items-center gap-3 mb-2.5">
                            {article.category?.name && (
                              <span className="inline-flex items-center gap-1.5 text-[10px] text-gold font-black uppercase tracking-widest">
                                <Tag size={9} />
                                {article.category.name}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold">
                              <Calendar size={9} />
                              {formatDate(article.published_at)}
                            </span>
                            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold">
                              <Clock size={9} />
                              {readTime(article.content)} min
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="font-black text-base sm:text-lg text-navy leading-snug mb-2 group-hover:text-gold transition-colors duration-300 font-serif line-clamp-2">
                            {article.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                            {stripHtml(article.content)}
                          </p>

                          {/* Read more */}
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-navy group-hover:text-gold transition-colors duration-300 mt-auto">
                            {t('articles_page.read_more')}
                            <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial="hidden" animate="visible" variants={fadeInUp}
                className="text-center py-20 bg-white rounded-2xl border border-gray-100"
              >
                <Search className="text-gray-200 mx-auto mb-4" size={40} />
                <h3 className="text-xl font-black text-navy mb-2 font-serif">{t('articles_page.no_results_title')}</h3>
                <p className="text-gray-500 text-sm">{t('articles_page.no_results_desc')}</p>
              </motion.div>
            )}

            {/* CTA */}
            <ConsultationCTA />
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="lg:col-span-4 flex flex-col gap-7">

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-[11px] font-black text-navy uppercase tracking-[0.3em] mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-gold rounded-full inline-block" />
                {t('articles_page.categories_label')}
              </h4>
              <div className="flex flex-col gap-1">
                {/* All */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-navy text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                  }`}
                >
                  <span>{t('articles_page.all_categories')}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${selectedCategory === 'all' ? 'bg-white/20' : 'bg-navy/5 text-navy'}`}>
                    {originalArticles.length}
                  </span>
                </button>
                {/* Dynamic categories */}
                {uniqueCategories.length > 0 ? (
                  uniqueCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        selectedCategory === cat
                          ? 'bg-navy text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${selectedCategory === cat ? 'bg-white/20' : 'bg-navy/5 text-navy'}`}>
                        {categoryCounts[cat] || 0}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 px-3 py-2 italic">
                    {locale === 'id' ? 'Belum ada kategori' : 'No categories yet'}
                  </p>
                )}
              </div>
            </div>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-[11px] font-black text-navy uppercase tracking-[0.3em] mb-5 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gold rounded-full inline-block" />
                  {t('articles_page.recent_posts')}
                </h4>
                <div className="flex flex-col gap-5">
                  {recentPosts.map((post) => (
                    <Link href={`/artikel/${post.slug}`} key={post.id} className="flex gap-3 group cursor-pointer">
                      <div className="w-16 h-16 min-w-[64px] rounded-xl overflow-hidden border border-gray-100">
                        <img
                          src={getImageUrl(post.image)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        {post.category?.name && (
                          <span className="text-[9px] text-gold font-black uppercase tracking-widest block mb-0.5">
                            {post.category.name}
                          </span>
                        )}
                        <h5 className="font-bold text-xs text-navy line-clamp-2 leading-snug group-hover:text-gold transition-colors duration-300">
                          {post.title}
                        </h5>
                        <span className="text-[9px] text-gray-400 mt-1">
                          {formatDate(post.published_at)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* About Widget */}
            <div className="bg-navy rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center mb-4 border border-gold/30">
                  <span className="text-gold font-black text-sm">NH</span>
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest mb-2">Narasumber Hukum</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-5">
                  {locale === 'id'
                    ? 'Platform edukasi hukum terpercaya. Artikel informatif dari para ahli hukum berpengalaman.'
                    : 'Trusted legal education platform. Informative articles from experienced legal experts.'}
                </p>
                <Link
                  href="/tentang"
                  className="inline-flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all duration-300"
                >
                  {locale === 'id' ? 'Tentang Kami' : 'About Us'}
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesClient;
