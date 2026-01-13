"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
        const data = await res.json();
        setArticles(data.data || []); // Laravel pagination wraps in 'data'
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-navy" size={48} />
      </div>
    );
  }

  return (
    <div className="pt-20">
       {/* Header */}
       <section className="bg-navy text-white py-24 relative overflow-hidden text-center">
         <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
         <div className="container mx-auto px-4 relative z-10">
           <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
             <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.2em] mb-6 px-4">Artikel & Edukasi</h1>
             <div className="w-24 h-1.5 bg-gold mx-auto mb-8"></div>
             <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
               Wawasan hukum kontemporer untuk mendampingi setiap keputusan strategis Anda.
             </p>
           </motion.div>
         </div>
       </section>

       <section className="py-24 bg-white container mx-auto px-4">
         <motion.div 
           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
           initial="hidden"
           animate="visible"
           variants={staggerContainer}
         >
           {articles.map((article) => (
             <Link href={`/articles/${article.slug}`} key={article.id}>
               <motion.article 
                 variants={fadeInUp} 
                 className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-gray-100 cursor-pointer"
               >
                 <div className="relative overflow-hidden aspect-video">
                   <img 
                      src={article.image ? (article.image.startsWith('http') ? article.image : `${process.env.NEXT_PUBLIC_API_URL}/storage/${article.image}`) : 'https://via.placeholder.com/800x600?text=No+Image'} 
                      alt={article.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                   />
                   <div className="absolute top-6 left-6 bg-gold text-navy text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg">
                     {article.category?.name || 'Hukum'}
                   </div>
                 </div>
                 <div className="p-8 md:p-10 flex flex-col flex-grow">
                   <div className="mb-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                     {new Date(article.published_at).toLocaleDateString()} | By Admin
                   </div>
                   <h3 className="font-bold text-xl md:text-2xl mb-4 text-navy group-hover:text-gold transition leading-tight font-serif min-h-[3.5rem]">
                     {article.title}
                   </h3>
                   <div className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                   <div className="flex items-center text-gold font-bold text-xs uppercase tracking-[0.2em] mt-auto">
                     Baca Selengkapnya <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
                   </div>
                 </div>
               </motion.article>
             </Link>
           ))}
         </motion.div>
       </section>
    </div>
  );
};

export default ArticlesClient;
