"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ArticleDetailClient = ({ article }: { article: any }) => {
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
            src={article.image ? (article.image.startsWith('http') ? article.image : `${process.env.NEXT_PUBLIC_API_URL}/storage/${article.image}`) : 'https://via.placeholder.com/1200x675?text=No+Image'} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <motion.article 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed font-light"
        >
          <div 
            dangerouslySetInnerHTML={{ __html: article.content }} 
            className="article-content"
          />
        </motion.article>

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
