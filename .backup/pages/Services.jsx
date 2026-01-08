import React from 'react';
import { Scale, FileCheck, Lightbulb, ArrowRight, Shield, Gavel, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

const Services = () => {
    const detailedServices = [
        {
            title: "Litigasi & Non-Litigasi",
            icon: <Scale size={40} />,
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
            description: "Pendampingan hukum profesional di dalam kepolisian, kejaksaan, dan pengadilan (Litigasi) maupun penyelesaian sengketa di luar pengadilan (Non-Litigasi).",
            features: ["Pendampingan Sidang", "Mediasi Sengketa", "Negosiasi Hukum", "Arbitrase"]
        },
        {
            title: "Legalitas Bisnis",
            icon: <FileCheck size={40} />,
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
            description: "Layanan lengkap untuk kebutuhan legalitas perusahaan Anda, mulai dari pendirian badan usaha hingga perizinan operasional.",
            features: ["Pendirian PT/CV", "Perizinan OSS", "Drafting Kontrak", "Review Perjanjian"]
        },
        {
            title: "Konsultasi Edukatif",
            icon: <Lightbulb size={40} />,
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
            description: "Memberikan pemahaman hukum yang mendalam agar klien tidak hanya mendapatkan solusi, tetapi juga memahami posisi hukumnya.",
            features: ["Konsultasi Privat", "Workshop Hukum", "Legal Opinion", "Training Karyawan"]
        },
        {
            title: "Hukum Keluarga",
            icon: <Users size={40} />,
            image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
            description: "Solusi bijak untuk permasalahan keluarga termasuk waris, perkawinan, dan hak asuh dengan pendekatan kekeluargaan.",
            features: ["Pembagian Waris", "Sengketa Harta", "Perkawinan", "Adopsi"]
        },
        {
            title: "Hukum Pertanahan",
            icon: <MapPinIcon size={40} />,
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
            description: "Penyelesaian sengketa tanah, pengurusan sertifikat, dan legalitas properti dengan aman dan tuntas.",
            features: ["Sengketa Lahan", "Balik Nama", "Sertifikasi", "Due Diligence"]
        },
        {
            title: "Pidana & Perdata",
            icon: <Gavel size={40} />,
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80",
            description: "Menangani berbagai kasus pidana umum/khusus dan perdata dengan strategi pembelaan yang maksimal.",
            features: ["Kasus Penipuan", "Wanprestasi", "Pencemaran Nama Baik", "Utang Piutang"]
        }
    ];

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
                Kami menyediakan spektrum layanan hukum yang luas untuk memenuhi kebutuhan individu maupun korporasi dengan standar profesionalisme tinggi.
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
                {detailedServices.map((service, idx) => (
                    <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-xl shadow-xl overflow-hidden group hover:-translate-y-2 transition duration-300 border border-gray-100">
                        <div className="h-56 overflow-hidden relative">
                            <img 
                                src={service.image} 
                                alt={service.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                            />
                             <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                <span className="p-3 bg-gold rounded-full text-navy transform scale-0 group-hover:scale-100 transition delay-100 duration-300">
                                   {service.icon}
                                </span>
                             </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-4 text-navy group-hover:text-gold transition">{service.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                                {service.description}
                            </p>
                            <div className="space-y-2">
                                {service.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
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
               <Link to="/#contact" className="bg-gold text-navy px-12 py-5 rounded-full font-bold hover:bg-opacity-90 transition duration-300 inline-flex items-center gap-3 uppercase tracking-widest shadow-2xl">
                   Konsultasi Sekarang <ArrowRight size={20} />
               </Link>
           </div>
       </section>
    </div>
  );
};

// Helper icon
const MapPinIcon = ({size}) => (
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

export default Services;
