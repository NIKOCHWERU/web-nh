"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ConsultationCTA = () => {
  const { locale } = useLanguage();

  const whatsappText = locale === 'en'
    ? "Hello Narasumber Hukum Office, I would like to consult about my legal matter after reading an article on the website."
    : "Halo Office Narasumber Hukum, saya ingin berkonsultasi mengenai permasalahan hukum saya setelah membaca artikel di website.";

  const whatsappUrl = `https://wa.me/6281252992361?text=${encodeURIComponent(whatsappText)}`;

  const content = {
    id: {
      title: "Butuh Konsultasi Hukum?",
      desc: "Jangan biarkan permasalahan hukum Anda menjadi beban. Tim ahli kami siap membantu memberikan solusi edukatif dan strategis untuk Anda.",
      button: "Konsultasi Sekarang",
      available: "Tersedia untuk Konsultasi Online",
    },
    en: {
      title: "Need Legal Consultation?",
      desc: "Don't let legal problems become a burden. Our expert team is ready to provide educational and strategic solutions for you.",
      button: "Consult Now",
      available: "Available for Online Consultation",
    },
  };

  const c = content[locale] || content.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-12 mb-12 relative overflow-hidden rounded-2xl max-w-4xl mx-auto shadow-xl"
    >
      <div className="absolute inset-0 bg-navy"></div>

      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="relative z-10 p-6 md:p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gold/20 rounded-xl mb-4">
          <MessageCircle className="text-gold w-6 h-6" />
        </div>

        <h2 className="text-lg md:text-xl font-bold text-white mb-3 uppercase tracking-widest font-sans">
          {c.title}
        </h2>

        <p className="text-gray-300 text-xs md:text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
          {c.desc}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gold hover:bg-white text-navy font-bold py-3 px-6 text-sm rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md group"
        >
          {c.button}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          {c.available}
        </div>
      </div>
    </motion.div>
  );
};

export default ConsultationCTA;
