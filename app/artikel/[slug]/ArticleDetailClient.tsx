"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ConsultationCTA from '@/components/ConsultationCTA';
import { useLanguage } from '@/context/LanguageContext';
import { translateArticle } from '@/lib/translationService';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const ArticleDetailClient = ({ article }: { article: any }) => {
  const { locale, t } = useLanguage();
  const [displayArticle, setDisplayArticle] = useState<any>(article);
  const [translating, setTranslating] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    const handleTranslation = async () => {
      if (!article) return;
      
      if (locale === 'en') {
        setTranslating(true);
        try {
          const translated = await translateArticle(article, 'en', 'id');
          setDisplayArticle(translated);
        } catch (error) {
          console.error('Error auto-translating article details:', error);
          setDisplayArticle(article);
        } finally {
          setTranslating(false);
        }
      } else {
        setDisplayArticle(article);
      }
    };

    handleTranslation();
  }, [locale, article]);

  // Fetch related/top articles
  useEffect(() => {
    const fetchRelated = async () => {
      if (!article) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
        const data = await res.json();
        let fetched = data.data || [];
        fetched = fetched.filter((a: any) => a.id !== article.id);
        // Sort by newest first
        fetched.sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        setRelatedArticles(fetched.slice(0, 3));
      } catch (e) {
        console.error('Failed to fetch related articles:', e);
      }
    };
    fetchRelated();
  }, [article]);

  // Helper to construct image URL
  const getImageUrl = (path: any) => {
    if (!path) return 'https://via.placeholder.com/1200x675?text=No+Image';
    
    if (typeof path !== 'string') {
      console.warn('Invalid image path received:', path);
      return 'https://via.placeholder.com/1200x675?text=Invalid+Image';
    }

    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    if (cleanPath.startsWith('storage/')) {
        return `${process.env.NEXT_PUBLIC_API_URL}/${cleanPath}`;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${cleanPath}`;
  };

  // Process content to fix inline image URLs
  const processContent = (content: string) => {
    if (!content) return '';
    return content.replace(
      /src="(\/?)storage\/([^"]+)"/g, 
      (match, slash, path) => `src="${process.env.NEXT_PUBLIC_API_URL}/storage/${path}"`
    );
  };

  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState('');

  const openLightbox = (imgSrc: string) => {
    setCurrentImage(imgSrc);
    setLightboxOpen(true);
  };

  if (translating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="animate-spin text-navy" size={48} />
        <span className="text-sm font-bold tracking-widest uppercase text-navy/70 animate-pulse">
          Translating Article...
        </span>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-[90%] md:max-w-6xl">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link 
            href="/artikel" 
            className="inline-flex items-center text-navy hover:text-gold transition-colors font-bold uppercase tracking-widest text-xs gap-2"
          >
            <ArrowLeft size={16} /> {t('articles_page.back_to_articles')}
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gold text-navy text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] rounded-full">
              {displayArticle.category?.name || t('articles_page.category_default')}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-navy mb-8 font-sans leading-tight">
            {displayArticle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gold" />
              <span>
                {new Date(displayArticle.published_at).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {displayArticle.author?.profile_photo_url ? (
                <img 
                  src={displayArticle.author.profile_photo_url} 
                  alt={displayArticle.author.name} 
                  className="w-6 h-6 rounded-full object-cover shadow-sm border border-gold/30"
                />
              ) : (
                <User size={16} className="text-gold" />
              )}
              <span>{displayArticle.author?.name || t('articles_page.admin')}</span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-12 rounded-2xl overflow-hidden shadow-xl aspect-video cursor-pointer"
          onClick={() => openLightbox(displayArticle.image_url || getImageUrl(displayArticle.image))}
        >
          <img 
            src={displayArticle.image_url || getImageUrl(displayArticle.image)} 
            alt={displayArticle.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Newspaper Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content */}
          <div className={`${displayArticle.supporting_images && displayArticle.supporting_images.length > 0 ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            <motion.article 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="prose prose-lg md:prose-xl max-w-none text-gray-800 leading-relaxed font-normal mb-16 prose-p:mb-6 prose-p:text-justify prose-headings:font-sans prose-headings:text-navy prose-a:text-gold prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:marker:text-gray-800"
            >
              <div 
                dangerouslySetInnerHTML={{ __html: processContent(displayArticle.content) }} 
                className="article-content"
              />
            </motion.article>
          </div>

          {/* Newspaper Sidebar for Supporting Images */}
          {displayArticle.supporting_images && displayArticle.supporting_images.length > 0 && (
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-8 flex flex-col gap-8">
              {displayArticle.supporting_images.map((item: any, index: number) => {
                const imagePath = typeof item === 'string' ? item : item.image;
                const caption = typeof item === 'string' ? null : item.caption;
                
                return (
                  <div key={index} className="flex flex-col gap-3 group">
                    <div 
                      className="cursor-pointer overflow-hidden rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 relative aspect-video"
                      onClick={() => openLightbox(getImageUrl(imagePath))}
                    >
                      <img 
                        src={getImageUrl(imagePath)}
                        alt={caption || `Supporting image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    {caption && (
                      <p className="text-xs text-gray-500 italic font-sans text-center px-2">
                        {caption}
                      </p>
                    )}
                    <div className="w-full border-b border-gray-100 mt-2" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-8 mb-16 pt-16 border-t border-gray-100">
            <div className="text-center md:text-left mb-10">
              <h4 className="text-gold font-black tracking-[0.2em] uppercase text-xs mb-3">
                {locale === 'id' ? 'Sentral Edukasi Hukum' : 'Legal Education Center'}
              </h4>
              <h2 className="text-3xl font-black text-navy uppercase font-sans mb-4 tracking-wide">
                {locale === 'id' ? 'Artikel & Edukasi' : 'Articles & Education'}
              </h2>
              <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
                {locale === 'id' ? 'Wawasan hukum kontemporer untuk mendampingi setiap keputusan strategis Anda.' : 'Contemporary legal insights to accompany your every strategic decision.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relArt) => (
                <Link href={`/artikel/${relArt.slug}`} key={relArt.id} className="flex flex-col group h-full bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 rounded-xl p-4 transition-all duration-300">
                  <div className="w-full h-40 bg-gray-50 mb-4 overflow-hidden rounded-lg relative">
                    <img src={getImageUrl(relArt.image_url || relArt.image)} alt={relArt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="text-gold text-[10px] font-black tracking-widest uppercase mb-2">
                    {relArt.category?.name || "Article"}
                  </div>
                  <h4 className="text-sm font-bold text-navy mb-3 line-clamp-2 uppercase font-sans group-hover:text-gold transition-colors leading-snug">
                    {relArt.title}
                  </h4>
                  <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-50">
                    <div className="flex items-center gap-2">
                       <Calendar size={12} className="text-gray-400" />
                       <span className="text-[10px] text-gray-400 font-semibold uppercase">{new Date(relArt.published_at).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric'})}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Consultation CTA */}
        <ConsultationCTA />

        {/* Footer info */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-gold" />
            <span className="text-xs text-gray-500">{displayArticle.category?.name || t('articles_page.category_default')}</span>
          </div>
        </motion.footer>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <img 
              src={currentImage} 
              alt="Lightbox view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailClient;
