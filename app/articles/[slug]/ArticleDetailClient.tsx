"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ConsultationCTA from '@/components/ConsultationCTA';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ArticleDetailClient = ({ article }: { article: any }) => {
  // Helper to construct image URL
  const getImageUrl = (path: any) => {
    if (!path) return 'https://via.placeholder.com/1200x675?text=No+Image';
    
    // Safety check for non-string paths (e.g. if backend returns array or object unexpectedly)
    if (typeof path !== 'string') {
      console.warn('Invalid image path received:', path);
      return 'https://via.placeholder.com/1200x675?text=Invalid+Image';
    }

    if (path.startsWith('http')) return path;
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Check if path already contains 'storage/'
    if (cleanPath.startsWith('storage/')) {
        return `${process.env.NEXT_PUBLIC_API_URL}/${cleanPath}`;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${cleanPath}`;
  };

  // Process content to fix inline image URLs
  const processContent = (content: string) => {
    if (!content) return '';
    // Replace relative paths starting with /storage/ or just storage/
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

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-[90%] md:max-w-6xl">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/articles" 
            className="inline-flex items-center text-navy hover:text-gold transition-colors font-bold uppercase tracking-widest text-xs gap-2"
          >
            <ArrowLeft size={16} /> Kembali ke Artikel
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
              {article.category?.name || 'Hukum'}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-navy mb-8 font-serif leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gold" />
              <span>{new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-gold" />
              <span>Admin</span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 rounded-3xl overflow-hidden shadow-2xl aspect-video cursor-pointer"
          onClick={() => openLightbox(getImageUrl(article.image))}
        >
          <img 
            src={getImageUrl(article.image)} 
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Content Section */}
        <motion.article 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed font-light mb-16 prose-p:mb-6 prose-headings:font-serif prose-headings:text-navy prose-a:text-gold prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 prose-li:marker:text-gold"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: processContent(article.content) }} 
            className="article-content"
          />
        </motion.article>

        {/* Supporting Images Gallery */}
        {article.supporting_images && article.supporting_images.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-navy mb-6 font-serif border-l-4 border-gold pl-4">Galeri Dokumentasi</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {article.supporting_images.map((item: any, index: number) => {
                const imagePath = typeof item === 'string' ? item : item.image;
                const caption = typeof item === 'string' ? null : item.caption;
                
                return (
                  <div key={index} className="group cursor-pointer" onClick={() => openLightbox(getImageUrl(imagePath))}>
                    <div className="rounded-lg overflow-hidden shadow-md aspect-square hover:shadow-xl transition-all duration-300 relative">
                      <img 
                        src={getImageUrl(imagePath)}
                        alt={caption || `Supporting image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Consultation CTA */}
        <ConsultationCTA />

        {/* Footer info */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <Tag size={18} className="text-gold" />
            <span className="text-sm text-gray-500">{article.category?.name || 'Umum'}</span>
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
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailClient;

