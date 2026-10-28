"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Target, Lightbulb, Shield, Heart, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import CustomBlocksRenderer from '@/components/CustomBlocksRenderer';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const AboutClient = () => {
  const { t } = useLanguage();
  const missions = (t('about_page.mission.items') as any).map((item: any, idx: number) => {
    const icons = [<Heart size={28} />, <Scale size={28} />, <TrendingUp size={28} />, <Lightbulb size={28} />, <Shield size={28} />, <Target size={28} />];
    return {
      ...item,
      icon: icons[idx]
    };
  });

  const legalScopes = t('about_page.legal_scope.items') as unknown as string[];

  return (
    <div className="pt-20">
      {/* HERO SECTION */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-navy">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80"
            alt="Legal Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-white"
          >
            {t('about_page.title')} <span className="text-gold">{t('about_page.title_gold')}</span>
          </motion.h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed italic font-sans"
          >
            "{t('about_page.tagline')}"
          </motion.p>

          {/* Decorative Scale Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-xl border border-gold/30">
              <Scale className="text-gold" size={32} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-white">
        <div className="container mx-auto px-4 relative z-10">
          {/* Title Section */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-navy"
            >
              NARASUMBER HUKUM
            </motion.h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-gray-50 p-6 md:p-10 rounded-xl border border-gray-200 border-l-4 border-l-gold"
            >
              {(t('about_page.description') as any).map((p: string, i: number) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-5 last:mb-0 text-justify">
                  {p.includes('NARASUMBER HUKUM') ? (
                    <>
                      <strong className="text-navy">NARASUMBER HUKUM</strong> {p.replace('NARASUMBER HUKUM', '')}
                    </>
                  ) : p}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-navy text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
            alt="Business Vision"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wide">{t('about_page.vision.title')}</h2>
              <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-lg md:text-2xl leading-relaxed text-gray-200 font-sans italic">
                "{t('about_page.vision.desc')}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">{t('about_page.mission.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {missions.map((mission: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 hover:border-gold/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-navy/5 rounded-lg flex items-center justify-center text-gold mb-5 group-hover:bg-navy group-hover:text-gold transition-all duration-300">
                  {mission.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-navy font-sans">{mission.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{mission.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LEGAL SCOPE SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">{t('about_page.legal_scope.title')}</h2>
              <div className="w-20 h-1 bg-gold mx-auto mb-5"></div>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-sm md:text-base">
                {t('about_page.legal_scope.subtitle')}
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-gray-50 p-6 md:p-10 rounded-xl border border-gray-200"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {legalScopes.map((scope, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-gray-700 text-sm leading-snug">{scope}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt="Office Building"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-white">{t('partners.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Narasumber Hukum Logo */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 p-6 rounded-xl border border-white/15 hover:border-gold/50 transition-all duration-300 group flex flex-col items-center"
            >
              <div className="bg-white rounded-lg p-4 mb-5 flex items-center justify-center h-28 w-full border border-gray-100">
                <img
                  src="/logo-narasumber-hukum.png"
                  alt={t('partners.narasumber')}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-center text-white font-sans">{t('partners.narasumber')}</h3>
              <p className="text-gray-400 text-[10px] text-center mt-1.5 uppercase tracking-widest font-medium">Advocate, Intercessor & Legal Consultant</p>
            </motion.div>

            {/* SELECO Project Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 p-6 rounded-xl border border-white/15 hover:border-gold/50 transition-all duration-300 group flex flex-col items-center"
            >
              <div className="bg-white rounded-lg p-4 mb-5 flex items-center justify-center h-28 w-full border border-gray-100">
                <img
                  src="/logo-seleco.png"
                  alt={t('partners.sleco')}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-center text-white font-sans">{t('partners.sleco')}</h3>
              <p className="text-gray-400 text-[10px] text-center mt-1.5 uppercase tracking-widest font-medium">Sustainable Solutions & Project Management</p>
            </motion.div>

            {/* MTI Talenstory Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 p-6 rounded-xl border border-white/15 hover:border-gold/50 transition-all duration-300 group flex flex-col items-center"
            >
              <div className="bg-white rounded-lg p-4 mb-5 flex items-center justify-center h-28 w-full border border-gray-100">
                <img
                  src="/logo-mti-talenstory.jpg"
                  alt={t('partners.mti')}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-center text-white font-sans">{t('partners.mti')}</h3>
              <p className="text-gray-400 text-[10px] text-center mt-1.5 uppercase tracking-widest font-medium">{t('partners.mti_sub')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CustomBlocksRenderer page="tentang" />
    </div>
  );
};

export default AboutClient;
