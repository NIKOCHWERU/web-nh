"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Search, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translateArticle } from '@/lib/translationService';
import ConsultationCTA from '@/components/ConsultationCTA';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
        const data = await res.json();
        const fetched = data.data || [];
        setOriginalArticles(fetched);
        setArticles(fetched);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const handleTranslation = async () => {
      if (originalArticles.length === 0) return;
      if (locale === 'en') {
        setTranslating(true);
        try {
          const translated = await Promise.all(
            originalArticles.map(async (art) => await translateArticle(art, 'en', 'id'))
          );
          setArticles(translated);
        } catch (error) {
          console.error('Error auto-translating articles:', error);
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

  const getImageUrl = (path: any) => {
    if (!path) return 'https://via.placeholder.com/800x600?text=No+Image';
    if (typeof path !== 'string') return 'https://via.placeholder.com/800x600?text=Invalid+Image';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    if (cleanPath.startsWith('storage/')) return `${process.env.NEXT_PUBLIC_API_URL}/${cleanPath}`;
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${cleanPath}`;
  };

  const uniqueCategories = Array.from(
    new Set(articles.map(art => art.category?.name).filter(Boolean))
  );

  const categoryCounts = articles.reduce((acc: any, art: any) => {
    const catName = art.category?.name || t('articles_page.category_default');
    acc[catName] = (acc[catName] || 0) + 1;
    return acc;
  }, {});

  const getFilteredAndSortedArticles = () => {
    let result = [...articles];
    if (selectedCategory !== 'all') {
      result = result.filter(art => (art.category?.name || '') === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(art =>
        art.title.toLowerCase().includes(query) ||
        (art.content || '').toLowerCase().includes(query)
      );
    }
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
    } else if (sortBy === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  };

  const processedArticles = getFilteredAndSortedArticles();
  const isFiltering = selectedCategory !== 'all' || searchQuery !== '';
  const featuredArticle = !isFiltering && processedArticles.length > 0 ? processedArticles[0] : null;
  const gridArticles = !isFiltering && processedArticles.length > 1 ? processedArticles.slice(1) : processedArticles;

  const recentPosts = articles
    .filter(art => art.id !== featuredArticle?.id)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 4);

  if (loading || translating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="animate-spin text-navy" size={48} />
        <span className="text-sm font-bold tracking-widest uppercase text-navy/70 animate-pulse">
          {locale === 'en' ? 'Translating Articles...' : 'Memuat Artikel...'}
        </span>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen pb-24">

      {/* ── HERO ── */}
      <section className="bg-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -ml-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-32 -mb-32" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="text-gold text-xs font-bold uppercase tracking-[0.35em] block mb-4">
              {locale === 'id' ? 'Sentral Hukum & Edukasi' : 'Legal & Education Center'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.15em] mb-6 font-serif">
              {t('articles_page.title')}
            </h1>
            <div className="w-20 h-1 bg-gold mx-auto mb-6" />
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {t('articles_page.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ── */}
      {featuredArticle && (
        <section className="container mx-auto px-4 -mt-10 relative z-20 mb-14">
          <Link href={`/artikel/${featuredArticle.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-gold/10 transition-all duration-500 group border border-gray-100 flex flex-col lg:flex-row cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden lg:w-7/12 min-h-[280px] lg:min-h-[440px]">
                <img
                  src={getImageUrl(featuredArticle.image)}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 bg-gold text-navy text-[10px] font-black px-4 py-2 uppercase tracking-[0.2em] rounded-full shadow-lg">
                  {t('articles_page.featured_label')}
                </div>
                <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-full border border-white/20">
                  {featuredArticle.category?.name || t('articles_page.category_default')}
                </div>
              </div>

              {/* Text */}
              <div className="p-8 md:p-12 lg:w-5/12 flex flex-col justify-center">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                  {new Date(featuredArticle.published_at).toLocaleDateString(
                    locale === 'id' ? 'id-ID' : 'en-US',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-5 leading-tight group-hover:text-gold transition duration-300">
                  {featuredArticle.title}
                </h2>
                <div
                  className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: featuredArticle.content }}
                />
                <div className="flex items-center gap-2 text-navy group-hover:text-gold font-bold text-xs uppercase tracking-[0.2em] transition duration-300 mt-auto">
                  {t('articles_page.read_more')}
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* ── FILTER BAR ── */}
      <section className="container mx-auto px-4 mb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col xl:flex-row xl:items-center gap-5">
          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-navy text-white shadow-md shadow-navy/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t('articles_page.all_categories')}
            </button>
            {uniqueCategories.map((category: any) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-navy text-white shadow-md shadow-navy/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 xl:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('articles_page.search_placeholder')}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50 rounded-full text-sm border border-gray-200 outline-none focus:border-gold focus:bg-white transition-all duration-300 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="text-gray-400 shrink-0" size={15} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none bg-gray-50 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-navy border border-gray-200 outline-none focus:border-gold focus:bg-white cursor-pointer transition-all duration-300"
              >
                <option value="newest">{t('articles_page.sort_newest')}</option>
                <option value="oldest">{t('articles_page.sort_oldest')}</option>
                <option value="az">{t('articles_page.sort_az')}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Articles Grid */}
          <div className="lg:col-span-8">
            {isFiltering && searchQuery && (
              <div className="mb-6 text-sm text-gray-500">
                {t('articles_page.search_results')}: <span className="font-bold text-navy italic">"{searchQuery}"</span>
              </div>
            )}

            {gridArticles.length > 0 ? (
              <motion.div
                className="grid sm:grid-cols-2 gap-7"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {gridArticles.map((article) => (
                  <Link href={`/artikel/${article.slug}`} key={article.id}>
                    <motion.article
                      variants={fadeInUp}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full border border-gray-100 cursor-pointer hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <img
                          src={getImageUrl(article.image)}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-4 left-4 bg-gold text-navy text-[9px] font-black px-3 py-1.5 uppercase tracking-widest rounded-full shadow-md">
                          {article.category?.name || t('articles_page.category_default')}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {new Date(article.published_at).toLocaleDateString(
                            locale === 'id' ? 'id-ID' : 'en-US',
                            { day: 'numeric', month: 'long', year: 'numeric' }
                          )}
                        </div>
                        <h3 className="font-bold text-base md:text-lg mb-3 text-navy group-hover:text-gold transition-colors leading-snug font-serif line-clamp-2">
                          {article.title}
                        </h3>
                        <div
                          className="text-gray-500 text-xs mb-5 flex-grow leading-relaxed line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                        <div className="flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-[0.2em] mt-auto pt-4 border-t border-gray-50">
                          {t('articles_page.read_more')}
                          <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="mb-5 flex justify-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <Search className="text-gray-300" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 font-serif">{t('articles_page.no_results_title')}</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">{t('articles_page.no_results_desc')}</p>
              </motion.div>
            )}

            {/* Consultation CTA — below article grid */}
            <ConsultationCTA />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            {/* Widget: Categories */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h4 className="text-xs font-black text-navy uppercase tracking-[0.25em] mb-5 pb-3 border-b border-gray-100">
                {t('articles_page.categories_label')}
              </h4>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-navy text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight size={13} />
                    {t('articles_page.all_categories')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-navy/5 text-navy'}`}>
                    {articles.length}
                  </span>
                </button>
                {uniqueCategories.map((category: any) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-navy text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ChevronRight size={13} />
                      {category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${selectedCategory === category ? 'bg-white/20 text-white' : 'bg-navy/5 text-navy'}`}>
                      {categoryCounts[category] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Widget: Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h4 className="text-xs font-black text-navy uppercase tracking-[0.25em] mb-5 pb-3 border-b border-gray-100">
                  {t('articles_page.recent_posts')}
                </h4>
                <div className="flex flex-col gap-5">
                  {recentPosts.map((post) => (
                    <Link href={`/artikel/${post.slug}`} key={post.id} className="flex gap-4 group cursor-pointer">
                      <div className="w-18 h-18 min-w-[72px] min-h-[72px] rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <img
                          src={getImageUrl(post.image)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[9px] text-gold font-black uppercase tracking-widest mb-1 block">
                          {post.category?.name || t('articles_page.category_default')}
                        </span>
                        <h5 className="font-bold text-sm text-navy line-clamp-2 leading-snug group-hover:text-gold transition-colors duration-300">
                          {post.title}
                        </h5>
                        <span className="text-[10px] text-gray-400 mt-1.5 block">
                          {new Date(post.published_at).toLocaleDateString(
                            locale === 'id' ? 'id-ID' : 'en-US',
                            { day: 'numeric', month: 'short', year: 'numeric' }
                          )}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Widget: About (sticky info) */}
            <div className="bg-navy rounded-2xl p-7 shadow-sm border border-navy/80 text-white">
              <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-gold font-black text-lg">NH</span>
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-3">
                Narasumber Hukum
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-5">
                {locale === 'id'
                  ? 'Platform edukasi hukum terpercaya dengan artikel informatif dan konsultasi profesional.'
                  : 'Trusted legal education platform with informative articles and professional consultations.'}
              </p>
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300"
              >
                {locale === 'id' ? 'Tentang Kami' : 'About Us'}
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ArticlesClient;
