import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

const ConsultationCTA = () => {
  const whatsappUrl = `https://wa.me/6281252992361?text=${encodeURIComponent("Halo Office Narasumber Hukum, saya ingin berkonsultasi mengenai permasalahan hukum saya setelah membaca artikel di website.")}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-16 relative overflow-hidden rounded-3xl"
    >
      <div className="absolute inset-0 bg-navy"></div>
      
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="relative z-10 p-8 md:p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
          <MessageCircle className="text-gold w-8 h-8" />
        </div>
        
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-serif">
          Butuh Konsultasi Hukum?
        </h2>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Jangan biarkan permasalahan hukum Anda menjadi beban. Tim ahli kami siap membantu memberikan solusi edukatif dan strategis untuk Anda.
        </p>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gold hover:bg-white text-navy font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl group"
        >
          Konsultasi Sekarang
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Tersedia untuk Konsultasi Online
        </div>
      </div>
    </motion.div>
  );
};

export default ConsultationCTA;
