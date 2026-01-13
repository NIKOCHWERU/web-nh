"use client";
import React from 'react';
import { servicesData } from '../servicesData';
import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Phone } from 'lucide-react';

const ServiceDetailClient = ({ slug }: { slug: string }) => {
  const service = servicesData.find(s => s.slug === slug);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  if (!service) {
      return (
        <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-bold text-navy mb-4">Layanan Tidak Ditemukan</h1>
            <Link href="/services" className="text-gold hover:underline">Kembali ke Layanan</Link>
        </div>
      );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <div className="relative h-[60vh] overflow-hidden">
         <motion.div style={{ y }} className="absolute inset-0">
            <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/80"></div>
         </motion.div>
         
         <div className="absolute inset-0 flex items-center">
             <div className="container mx-auto px-4 relative z-10">
                <Link href="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-gold mb-6 transition-colors group mt-10">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Layanan
                </Link>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-16 h-16 bg-gold/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold mb-6 border border-gold/20">
                        {service.icon}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif max-w-4xl leading-tight">
                        {service.title}
                    </h1>
                </motion.div>
             </div>
         </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="container mx-auto px-4 py-16 md:py-24 -mt-20 relative z-20">
            {/* Main Content - Full Width */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-5xl mx-auto"
            >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                    <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-navy prose-headings:font-serif prose-a:text-gold hover:prose-a:text-navy">
                         {/* Render HTML content safely */}
                         <div dangerouslySetInnerHTML={{ __html: service.content }} />
                    </div>
                </div>
            </motion.div>
      </div>

      {/* CTA SECTION */}
      <div className="container mx-auto px-4 pb-16 md:pb-24 relative z-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
            >
                <div className="bg-navy text-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center">
                    <div className="w-20 h-20 bg-gold/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold mb-6 border border-gold/20 mx-auto">
                        <Phone size={32} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Butuh Bantuan Hukum?</h3>
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                        Jangan ragu untuk mendiskusikan masalah Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik.
                    </p>
                    <a 
                        href={`https://wa.me/6281252992361?text=${encodeURIComponent(`Halo, saya ingin berkonsultasi mengenai ${service.title}`)}`}
                        target="_blank"
                        className="inline-flex items-center gap-3 bg-gold text-navy px-10 py-5 rounded-full font-bold hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 text-lg"
                    >
                        <Phone size={20} /> Hubungi Kami
                    </a>
                </div>
            </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetailClient;
