"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, Calendar, Tag, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translateArticle } from '@/lib/translationService';
import ConsultationCTA from '@/components/ConsultationCTA';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

// Strip HTML tags to get plain text excerpt
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

const readTime = (html: string) => {
  const words = stripHtml(html).split(' ').length;
  return Math.max(1, Math.round(words / 200));
};

const ArticlesClient = () => {
  const { locale, t } = useLanguage();
  const [originalArticles, setOriginalArticles] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('all');

  /* ── Fetch ── */
  const fetchArticles = async (page = 1) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?page=${page}`);
      const data = await res.json();
      const fetched = data.data || [];
      
      // Ensure articles are sorted by newest first
      fetched.sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

      if (page === 1) {
        setOriginalArticles(fetched);
      } else {
        setOriginalArticles(prev => {
          const combined = [...prev, ...fetched];
          return combined.sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        });
      }
      
      setCurrentPage(data.current_page || 1);
      setLastPage(data.last_page || 1);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
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

  const handleLoadMore = () => {
    if (currentPage < lastPage) {
      setIsLoadingMore(true);
      fetchArticles(currentPage + 1);
    }
  };

  /* ── Helpers ── */
  const getImageUrl = (art: any) => {
    if (art.image_url) return art.image_url;
    const path = art.image;
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
      day: 'numeric', month: 'short', year: 'numeric'
    });

  /* ── Categories computed from ORIGINAL articles ── */
  const uniqueCategories: string[] = Array.from(
    new Set(originalArticles.map((a) => a.category?.name).filter(Boolean))
  );

  /* ── Filter ── */
  const processedArticles = (() => {
    let result = [...articles];
    if (selectedCategory !== 'all') {
      result = result.filter((a) => (a.category?.name || '') === selectedCategory);
    }
    return result;
  })();

  const featuredArticle = processedArticles.length > 0 ? processedArticles[0] : null;
  const gridArticles = processedArticles.slice(1, 4);
  const listArticles = processedArticles.slice(4);

  /* ── Loading ── */
  if (loading && currentPage === 1) {
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
    <div className="pt-24 bg-white min-h-screen pb-24 font-sans text-gray-800">
      
      {/* 1. TOP SECTION (Hero & Featured) */}
      <section className="container mx-auto px-4 max-w-7xl mb-16">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          
          {/* Left: Titles & Info */}
          <div className="lg:w-1/3 flex flex-col justify-center py-8">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h4 className="text-gold font-black tracking-[0.2em] uppercase text-xs mb-4">
                {locale === 'id' ? 'Sentral Edukasi Hukum' : 'Legal Education Center'}
              </h4>
              <h1 className="text-5xl lg:text-6xl font-black mb-6 text-navy leading-tight uppercase font-sans">
                {t('articles_page.title') || "Artikel Kami"}
              </h1>
              <p className="text-gray-500 mb-8 leading-relaxed max-w-md text-lg">
                {t('articles_page.subtitle')}
              </p>
              {featuredArticle && (
                <Link 
                  href={`/artikel/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-3 bg-navy hover:bg-gold text-white px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors rounded-sm w-fit shadow-lg shadow-navy/20"
                >
                  {t('articles_page.read_more')}
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right: Featured Article Image */}
          <div className="lg:w-2/3">
            {featuredArticle ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                className="w-full h-full min-h-[300px] lg:min-h-[450px] bg-gray-100 rounded-sm overflow-hidden relative group cursor-pointer shadow-xl border border-gray-100"
              >
                <Link href={`/artikel/${featuredArticle.slug}`}>
                  <img src={getImageUrl(featuredArticle)} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 absolute inset-0" />
                  <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors"></div>
                  
                  {/* Floating badge for Featured */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 border border-gold/30 backdrop-blur-sm p-6 rounded-sm shadow-xl transform group-hover:-translate-y-2 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-gold text-xs font-black tracking-widest uppercase">
                          {featuredArticle.category?.name || "Featured"}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-3xl font-bold text-navy line-clamp-2 leading-tight font-sans mb-4">
                        {featuredArticle.title}
                      </h3>
                      <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                        {featuredArticle.author?.profile_photo_url ? (
                          <img src={featuredArticle.author.profile_photo_url} alt={featuredArticle.author.name} className="w-8 h-8 rounded-full object-cover border border-gold/30 shadow-sm" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><User size={14}/></div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-navy">{featuredArticle.author?.name || (locale === 'id' ? 'Admin NH' : 'NH Admin')}</span>
                          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{formatDate(featuredArticle.published_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ) : (
              <div className="w-full h-full min-h-[400px] bg-gray-50 flex items-center justify-center rounded-sm border border-gray-100">
                <span className="text-gray-400">Tidak ada artikel tersedia.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. MIDDLE SECTION (3-Column Grid) */}
      <section className="container mx-auto px-4 max-w-7xl mb-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          {gridArticles.map((article: any) => (
            <motion.div key={article.id} variants={fadeInUp} className="flex flex-col group h-full">
              <Link href={`/artikel/${article.slug}`} className="flex flex-col h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gold/30 rounded-sm p-5 transition-all duration-300">
                {/* Image Box */}
                <div className="w-full h-56 bg-gray-50 mb-6 overflow-hidden rounded-sm relative shadow-sm">
                  <img src={getImageUrl(article)} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                </div>
                
                {/* Category/Tag */}
                <div className="text-gold text-xs font-black tracking-widest uppercase mb-3 line-clamp-1">
                  {article.category?.name || "Article"}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2 uppercase font-sans group-hover:text-gold transition-colors leading-snug">
                  {article.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {stripHtml(article.content)}
                </p>
                
                {/* Meta / Author */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {article.author?.profile_photo_url ? (
                      <img src={article.author.profile_photo_url} alt={article.author.name} className="w-8 h-8 rounded-full object-cover border border-gold/30 shadow-sm" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"><User size={14}/></div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-navy">{article.author?.name || (locale === 'id' ? 'Admin NH' : 'NH Admin')}</span>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{formatDate(article.published_at)}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold"><Clock size={12}/> {readTime(article.content)} min</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4 max-w-7xl mb-16">
        <div className="w-full border-t border-gray-100"></div>
      </div>

      {/* 3. BOTTOM SECTION */}
      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Article List */}
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-black text-navy uppercase font-sans mb-10 tracking-wide flex items-center gap-4">
                {locale === 'id' ? 'Artikel Lainnya' : 'More Articles'}
                <div className="h-0.5 bg-gray-200 flex-1"></div>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                {listArticles.map((article: any) => (
                  <Link href={`/artikel/${article.slug}`} key={article.id} className="flex gap-5 group items-start bg-white p-4 rounded-sm border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300">
                    {/* Small Square Image */}
                    <div className="w-24 h-24 shrink-0 bg-gray-50 border border-gray-100 rounded-sm overflow-hidden shadow-sm relative">
                      <img src={getImageUrl(article)} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col justify-start flex-1">
                      <div className="text-gold text-[10px] font-black tracking-widest uppercase mb-1">
                        {article.category?.name || "Article"}
                      </div>
                      <h4 className="text-sm font-bold text-navy uppercase mb-2 group-hover:text-gold transition-colors line-clamp-2 leading-relaxed">
                        {article.title}
                      </h4>
                      
                      <div className="mt-auto flex items-center gap-2 pt-2 border-t border-gray-50">
                        {article.author?.profile_photo_url ? (
                          <img src={article.author.profile_photo_url} alt={article.author.name} className="w-5 h-5 rounded-full object-cover shadow-sm border border-gold/30" />
                        ) : (
                          <User size={14} className="text-gray-400" />
                        )}
                        <span className="text-[10px] font-bold text-navy truncate">{article.author?.name || (locale === 'id' ? 'Admin' : 'Admin')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {listArticles.length === 0 && (
                  <div className="col-span-full text-gray-400 italic text-sm">
                    {locale === 'id' ? 'Belum ada artikel lainnya.' : 'No more articles.'}
                  </div>
                )}
              </div>

              {/* Load More Button */}
              {currentPage < lastPage && (
                <div className="mt-14 text-center md:text-left">
                  <button 
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="bg-navy hover:bg-gold text-white px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-colors disabled:opacity-50 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
                  >
                    {isLoadingMore && <Loader2 size={16} className="animate-spin" />}
                    {locale === 'id' ? 'Muat Lebih Banyak' : 'Load More'}
                  </button>
                </div>
              )}
            </div>

            {/* Right: Categories Block */}
            <div className="lg:w-1/3">
              <div className="bg-navy border border-navy p-10 rounded-sm h-full relative overflow-hidden min-h-[300px] flex flex-col shadow-xl">
                {/* Subtle pattern background for the category block */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-screen"></div>
                
                <h3 className="text-gold font-black uppercase tracking-widest text-lg mb-8 relative z-10 border-b border-white/10 pb-4">
                  {locale === 'id' ? 'Kategori' : 'Categories'}
                </h3>

                <div className="relative z-10 flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-sm transition-all shadow-md border ${
                      selectedCategory === 'all' 
                        ? 'bg-gold border-gold text-navy scale-105' 
                        : 'bg-transparent border-white/20 text-gray-300 hover:border-gold hover:text-gold hover:scale-105'
                    }`}
                  >
                    ALL
                  </button>
                  {uniqueCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-sm transition-all shadow-md border ${
                        selectedCategory === cat 
                          ? 'bg-gold border-gold text-navy scale-105' 
                          : 'bg-white/5 border-white/10 text-gray-300 hover:border-gold hover:text-gold hover:scale-105'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <div className="container mx-auto px-4 max-w-7xl mt-20">
        <ConsultationCTA />
      </div>

    </div>
  );
};

export default ArticlesClient;
