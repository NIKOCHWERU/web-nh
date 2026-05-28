"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Search, Calendar, Tag, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translateArticle } from '@/lib/translationService';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ArticlesClient = () => {
  const { locale, t } = useLanguage();
  const [originalArticles, setOriginalArticles] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);

  // Filter and sort states
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

  // Image URL Helper
  const getImageUrl = (path: any) => {
    if (!path) return 'https://via.placeholder.com/800x600?text=No+Image';
    if (typeof path !== 'string') return 'https://via.placeholder.com/800x600?text=Invalid+Image';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    if (cleanPath.startsWith('storage/')) {
        return `${process.env.NEXT_PUBLIC_API_URL}/${cleanPath}`;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${cleanPath}`;
  };

  // Dynamic Category Extraction
  const uniqueCategories = Array.from(
    new Set(articles.map(art => art.category?.name).filter(Boolean))
  );

  // Dynamic Category Article Counts
  const categoryCounts = articles.reduce((acc: any, art: any) => {
    const catName = art.category?.name || t('articles_page.category_default');
    acc[catName] = (acc[catName] || 0) + 1;
    return acc;
  }, {});

  // Processing Articles (Filter + Sort)
  const getFilteredAndSortedArticles = () => {
    let result = [...articles];

    // 1. Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(art => (art.category?.name || '') === selectedCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(art => 
        art.title.toLowerCase().includes(query) || 
        (art.content || '').toLowerCase().includes(query)
      );
    }

    // 3. Sort
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

  // Layout Division: Featured vs Grid List
  const isFiltering = selectedCategory !== 'all' || searchQuery !== '';
  const featuredArticle = !isFiltering && processedArticles.length > 0 ? processedArticles[0] : null;
  const gridArticles = !isFiltering && processedArticles.length > 1 ? processedArticles.slice(1) : processedArticles;

  // Sidebar widget: Recent Posts
  const recentPosts = articles
    .filter(art => art.id !== featuredArticle?.id)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 3);

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
    <div className="pt-20 bg-gray-50/50 min-h-screen pb-24">
      {/* Premium Hero Header */}
      <section className="bg-navy text-white py-20 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] block mb-3">
              {locale === 'id' ? 'Sentral Hukum & Edukasi' : 'Legal & Education Center'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.2em] mb-6 px-4 font-serif">
              {t('articles_page.title')}
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
              {t('articles_page.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredArticle && (
        <section className="container mx-auto px-4 -mt-10 relative z-20 mb-16">
          <Link href={`/artikel/${featuredArticle.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-gold/10 transition-all duration-500 group border border-gray-100 flex flex-col lg:flex-row cursor-pointer"
            >
              {/* Image side */}
              <div className="relative overflow-hidden lg:w-7/12 aspect-video lg:aspect-auto min-h-[300px] lg:min-h-[450px]">
                <img
                  src={getImageUrl(featuredArticle.image)}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transform group-hover:scale-102 transition duration-700"
                />
                <div className="absolute top-6 left-6 bg-gold text-navy text-xs font-bold px-4 py-2 uppercase tracking-widest rounded-full shadow-lg">
                  {t('articles_page.featured_label')}
                </div>
              </div>
              
              {/* Text side */}
              <div className="p-8 md:p-12 lg:w-5/12 flex flex-col justify-center">
                <span className="text-gold font-bold text-xs uppercase tracking-widest mb-4 block">
                  {featuredArticle.category?.name || t('articles_page.category_default')}
                </span>
                
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-4 leading-tight group-hover:text-gold transition duration-300">
                  {featuredArticle.title}
                </h2>
                
                <div 
                  className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-4" 
                  dangerouslySetInnerHTML={{ __html: featuredArticle.content }}
                ></div>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                  <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                    {new Date(featuredArticle.published_at).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="flex items-center text-navy group-hover:text-gold font-bold text-xs uppercase tracking-[0.2em] transition duration-300">
                    {t('articles_page.read_more')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Main Content Area */}
      <section className="container mx-auto px-4">
        {/* Search, Filter Category and Sort Controls */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-12 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* Categories Pill Filter */}
          <div className="flex flex-wrap items-center gap-2 max-w-full overflow-x-auto pb-2 xl:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-navy text-white shadow-lg shadow-navy/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('articles_page.all_categories')}
            </button>
            {uniqueCategories.map((category: any) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-navy text-white shadow-lg shadow-navy/20'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input and Sort Selection */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:w-full xl:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1 xl:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('articles_page.search_placeholder')}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-full text-sm border border-gray-200 outline-none focus:border-gold focus:bg-white transition-all duration-300 placeholder-gray-400"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="text-gray-400 shrink-0" size={16} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto bg-gray-50 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-navy border border-gray-200 outline-none focus:border-gold focus:bg-white cursor-pointer transition-all duration-300"
              >
                <option value="newest">{t('articles_page.sort_newest')}</option>
                <option value="oldest">{t('articles_page.sort_oldest')}</option>
                <option value="az">{t('articles_page.sort_az')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Newspaper Layout Grid & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Grid Articles */}
          <div className="lg:col-span-8">
            {isFiltering && searchQuery && (
              <div className="mb-8 text-sm text-gray-500">
                {t('articles_page.search_results')}: <span className="font-bold text-navy italic">"{searchQuery}"</span>
              </div>
            )}

            {gridArticles.length > 0 ? (
              <motion.div 
                className="grid md:grid-cols-2 gap-8"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {gridArticles.map((article) => (
                  <Link href={`/artikel/${article.slug}`} key={article.id}>
                    <motion.article 
                      variants={fadeInUp} 
                      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group flex flex-col h-full border border-gray-100 cursor-pointer"
                    >
                      {/* Card Image */}
                      <div className="relative overflow-hidden aspect-video">
                        <img 
                           src={getImageUrl(article.image)} 
                           alt={article.title} 
                           className="w-full h-full object-cover transform group-hover:scale-103 transition duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-gold text-navy text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-full shadow-md">
                          {article.category?.name || t('articles_page.category_default')}
                        </div>
                      </div>
                      
                      {/* Card Body */}
                      <div className="p-6 md:p-8 flex flex-col flex-grow">
                        <div className="mb-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {new Date(article.published_at).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        
                        <h3 className="font-bold text-lg md:text-xl mb-3 text-navy group-hover:text-gold transition leading-tight font-serif min-h-[3rem] line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <div 
                          className="text-gray-500 text-xs mb-6 flex-grow leading-relaxed line-clamp-3" 
                          dangerouslySetInnerHTML={{ __html: article.content }}
                        ></div>
                        
                        <div className="flex items-center text-gold font-bold text-[10px] uppercase tracking-[0.2em] mt-auto">
                          {t('articles_page.read_more')} <ArrowRight size={14} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
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
                className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <Search className="text-gray-300" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 font-serif">{t('articles_page.no_results_title')}</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  {t('articles_page.no_results_desc')}
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Column: Premium Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Sidebar Widget 1: Categories Counts */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
              <h4 className="text-sm font-bold text-navy uppercase tracking-[0.2em] mb-6 relative">
                {t('articles_page.categories_label')}
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gold mt-2"></span>
              </h4>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`flex items-center justify-between text-xs py-2 border-b border-gray-50 hover:text-gold transition-colors font-semibold uppercase tracking-wider ${
                    selectedCategory === 'all' ? 'text-gold' : 'text-gray-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight size={14} />
                    {t('articles_page.all_categories')}
                  </span>
                  <span className="bg-navy/5 text-navy px-2 py-0.5 rounded-full text-[10px]">
                    {articles.length}
                  </span>
                </button>
                {uniqueCategories.map((category: any) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center justify-between text-xs py-2 border-b border-gray-50 hover:text-gold transition-colors font-semibold uppercase tracking-wider ${
                      selectedCategory === category ? 'text-gold' : 'text-gray-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ChevronRight size={14} />
                      {category}
                    </span>
                    <span className="bg-navy/5 text-navy px-2 py-0.5 rounded-full text-[10px]">
                      {categoryCounts[category] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Widget 2: Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
                <h4 className="text-sm font-bold text-navy uppercase tracking-[0.2em] mb-6 relative">
                  {t('articles_page.recent_posts')}
                  <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gold mt-2"></span>
                </h4>
                <div className="flex flex-col gap-6">
                  {recentPosts.map((post) => (
                    <Link href={`/artikel/${post.slug}`} key={post.id} className="flex gap-4 group cursor-pointer">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                        <img
                          src={getImageUrl(post.image)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[9px] text-gold font-bold uppercase tracking-wider mb-1 block">
                          {post.category?.name || t('articles_page.category_default')}
                        </span>
                        <h5 className="font-bold text-sm text-navy line-clamp-2 leading-snug group-hover:text-gold transition-colors duration-300">
                          {post.title}
                        </h5>
                        <span className="text-[10px] text-gray-400 mt-2 block">
                          {new Date(post.published_at).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default ArticlesClient;
