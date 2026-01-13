"use client";
import React from 'react';
import { Scale, FileCheck, Lightbulb, ArrowRight, Shield, Gavel, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

import { servicesData } from './servicesData';

// ... imports ...

const ServicesClient = () => {
    // detailedServices removed in favor of servicesData

  return (
    <div className="pt-20">
       {/* HEADER SERVICES */}
       <section className="bg-navy text-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-wider"
            >
                Layanan <span className="text-gold">Kami</span>
            </motion.h1>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="w-24 h-1 bg-gold mx-auto mb-8"
            ></motion.div>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
                Kami menyediakan spektrum layanan hukum yang luas untuk memenuhi kebutuhan individu maupun korporasi, mulai dari aspek hukum, perizinan, hingga pengembangan SDM.
            </motion.p>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gold opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold opacity-5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
       </section>

       {/* SERVICES LIST */}
       <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {servicesData.map((service, idx) => (
                    <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-xl shadow-xl overflow-hidden group hover:-translate-y-2 transition duration-300 border border-gray-100 flex flex-col h-full"> 
                        <Link href={`/services/${service.slug}`} className="block h-full">
                            <div className="h-56 overflow-hidden relative">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                />
                                 <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                    <span className="p-3 bg-gold rounded-full text-navy transform scale-0 group-hover:scale-100 transition delay-100 duration-300">
                                       <ArrowRight size={24} />
                                    </span>
                                 </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="mb-4">
                                     <span className="inline-block p-3 bg-navy/5 rounded-lg text-gold mb-4 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                                        {service.icon}
                                     </span>
                                     <h3 className="text-xl md:text-2xl font-bold text-navy group-hover:text-gold transition font-serif leading-tight min-h-[3rem]">{service.title}</h3>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed text-sm flex-grow">
                                    {service.shortDesc}
                                </p>
                                <div className="text-gold font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
                                    Lihat Detail <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
       </section>

        {/* CTA */}
       <section className="py-24 bg-navy text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
           <div className="container mx-auto px-4 text-center relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold mb-8 uppercase tracking-wider">Butuh Layanan Khusus?</h2>
               <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
                   Jika Anda memiliki kebutuhan hukum yang spesifik dan tidak tercantum di atas, hubungi kami untuk mendiskusikan solusi yang tepat.
               </p>
               <Link href="/#contact" className="bg-gold text-navy px-12 py-5 rounded-full font-bold hover:bg-opacity-90 transition duration-300 inline-flex items-center gap-3 uppercase tracking-widest shadow-2xl">
                   Konsultasi Sekarang <ArrowRight size={20} />
               </Link>
           </div>
       </section>
    </div>
  );
};

// Helper icon
const MapPinIcon = ({size}: {size: number}) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export default ServicesClient;
