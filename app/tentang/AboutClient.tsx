"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Target, Lightbulb, Shield, Heart, TrendingUp, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const AboutClient = () => {
  const { t } = useLanguage();
  const missions = (t('about_page.mission.items') as any).map((item: any, idx: number) => {
    const icons = [<Heart size={32} />, <Scale size={32} />, <TrendingUp size={32} />, <Lightbulb size={32} />, <Shield size={32} />, <Target size={32} />];
    return {
      ...item,
      icon: icons[idx]
    };
  });

  const description = t('about_page.description') as unknown as string[];

  const legalScopes = t('about_page.legal_scope.items') as unknown as string[];

  return (
    <div className="pt-20">
      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-navy">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80"
            alt="Legal Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">


          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide text-white"
          >
            {t('about_page.title')} <span className="text-gold">{t('about_page.title_gold')}</span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed italic font-serif"
          >
            "{t('about_page.tagline')}"
          </motion.p>

          {/* Decorative Scale Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 backdrop-blur-md rounded-2xl border border-gold/20">
              <Scale className="text-gold" size={40} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Large Title Section */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 uppercase tracking-wider text-navy"
            >
              NARASUMBER HUKUM
            </motion.h2>
            <div className="w-32 h-1.5 bg-gold mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="prose prose-lg max-w-none"
            >
              {(t('about_page.description') as any).map((p: string, i: number) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-6">
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
      <section className="relative py-16 md:py-24 overflow-hidden bg-navy text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
            alt="Business Vision"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/90"></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">{t('about_page.vision.title')}</h2>
              <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-200 font-serif italic">
                "{t('about_page.vision.desc')}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">{t('about_page.mission.title')}</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {missions.map((mission: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-gold/30 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-navy/5 rounded-xl flex items-center justify-center text-gold mb-6 group-hover:bg-navy group-hover:text-gold transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-gold/20">
                  {mission.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-navy font-serif">{mission.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{mission.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LEGAL SCOPE SECTION */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white to-gray-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">{t('about_page.legal_scope.title')}</h2>
              <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {t('about_page.legal_scope.subtitle')}
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-gradient-to-br from-navy/5 to-gold/5 p-8 md:p-12 rounded-3xl border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {legalScopes.map((scope, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-gold flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-700 text-sm leading-relaxed">{scope}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-navy">
        {/* Background Image with Overlay */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-white">{t('partners.title')}</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Narasumber Hukum Logo */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-center min-h-[100px] w-full border border-gray-100 group-hover:border-gold/30 transition-all duration-300">
                <img
                  src="/logo-narasumber-hukum.png"
                  alt={t('partners.narasumber')}
                  className="w-full h-auto object-contain transition-all duration-500"
                />
              </div>
              <h3 className="text-lg font-bold text-center text-gold font-serif">{t('partners.narasumber')}</h3>
              <p className="text-gray-300 text-[10px] text-center mt-2 uppercase tracking-widest">Advocate, Intercessor & Legal Consultant</p>
            </motion.div>

            {/* SLECO Project Logo */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center"
            >
              <div className="bg-navy rounded-xl p-4 mb-6 flex items-center justify-center min-h-[100px] w-full border border-gold/20">
                <img
                  src="/logo.png"
                  alt={t('partners.sleco')}
                  className="h-16 w-auto object-contain transition-all duration-500 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
              <h3 className="text-lg font-bold text-center text-gold font-serif">{t('partners.sleco')}</h3>
              <p className="text-gray-300 text-[10px] text-center mt-2 uppercase tracking-widest">Sustainable Solutions & Project Management</p>
            </motion.div>

            {/* MTI Talenstory Logo */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col items-center"
            >
              <div className="bg-white rounded-xl p-4 mb-6 flex items-center justify-center min-h-[100px] w-full">
                <img
                  src="/logo-mti-talenstory.jpg"
                  alt={t('partners.mti')}
                  className="w-full h-auto max-h-16 object-contain transition-all duration-500"
                />
              </div>
              <h3 className="text-lg font-bold text-center text-gold font-serif">{t('partners.mti')}</h3>
              <p className="text-gray-300 text-[10px] text-center mt-2 uppercase tracking-widest">{t('partners.mti_sub')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutClient;
