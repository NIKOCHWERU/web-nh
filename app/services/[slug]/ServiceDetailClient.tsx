"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { servicesData } from '../servicesData';

const ServiceDetailClient = ({ slug }: { slug: string }) => {
    const { t, locale } = useLanguage();
    const service = servicesData.find((s: any) => s.path.split('/').pop() === slug);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    if (!service) {
        return (
            <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold text-navy mb-4">{t('services.not_found')}</h1>
                <Link href="/services" className="text-gold hover:underline">{t('services.back_to_services')}</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <div className="relative pt-32 pb-24 overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <div className={`w-full h-full ${(service as any).color || 'bg-navy'} opacity-90`}></div>
                    <div className="absolute inset-0 bg-navy/80"></div>
                </motion.div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/services" className="inline-flex items-center gap-2 text-white/70 hover:text-gold mb-8 transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> {t('services.back_to_services')}
                    </Link>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 bg-gold/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-gold mb-6 border border-gold/20">
                            {React.cloneElement(service.icon as any, { size: 32 })}
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif max-w-4xl leading-tight">
                            {t(service.titleKey)}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
                {/* Main Content - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 -mt-32">
                        <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-navy prose-headings:font-serif prose-a:text-gold hover:prose-a:text-navy leading-loose">
                            {/* Render translation content safely from servicesData mapping */}
                            <div dangerouslySetInnerHTML={{ __html: service.content[locale as keyof typeof service.content] || service.content.id }} />
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
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif">{t('services.cta_title')}</h3>
                        <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                            {t('services.cta_desc')}
                        </p>
                        <a
                            href={`https://wa.me/6282211020022?text=${encodeURIComponent(`Halo, saya ingin berkonsultasi mengenai ${t(service.titleKey)}`)}`}
                            target="_blank"
                            className="inline-flex items-center gap-3 bg-gold text-navy px-10 py-5 rounded-full font-bold hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 text-lg"
                        >
                            <Phone size={20} /> {t('cta_contact.button')}
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetailClient;
