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
  const getImageUrl = (path: string | null) => {
    if (!path) return 'https://via.placeholder.com/1200x675?text=No+Image';
    if (path.startsWith('http')) return path;
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Check if path already contains 'storage/'
    if (cleanPath.startsWith('storage/')) {
        return `${process.env.NEXT_PUBLIC_API_URL}/${cleanPath}`;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/storage/${cleanPath}`;
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
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
          className="mb-12 rounded-3xl overflow-hidden shadow-2xl aspect-video"
        >
          <img 
            src={getImageUrl(article.image)} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <motion.article 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed font-light mb-12"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: article.content }} 
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
            <h3 className="text-2xl font-bold text-navy mb-6 font-serif">Galeri Pendukung</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.supporting_images.map((img: string, index: number) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-lg aspect-video hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src={getImageUrl(img)}
                    alt={`Supporting image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
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
      </div>
    </div>
  );
};

export default ArticleDetailClient;

