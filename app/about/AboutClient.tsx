"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Target, Lightbulb, Shield, Heart, TrendingUp, CheckCircle } from 'lucide-react';

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
  const missions = [
    {
      icon: <Heart size={32} />,
      title: "Pelayanan Terbaik",
      desc: "Menyediakan layanan hukum berkualitas tinggi yang mendahulukan kepentingan klien dengan memberikan solusi tepat, responsif, dan inovatif."
    },
    {
      icon: <Scale size={32} />,
      title: "Keadilan dan Kepastian Hukum",
      desc: "Mengadvokasi keadilan dan kepastian hukum sebagai landasan utama dalam setiap tindakan hukum yang kami ambil, dengan memastikan bahwa hak dan kepentingan klien dijaga dengan cermat."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Kemitraan yang Berkelanjutan",
      desc: "Mengembangkan hubungan jangka panjang yang saling menguntungkan dengan klien kami, dengan fokus pada dukungan berkelanjutan dalam mencapai tujuan hukum dan bisnis mereka."
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Inovasi dan Pengetahuan",
      desc: "Terus mengembangkan pengetahuan dan teknologi dalam hukum untuk memberikan solusi yang paling muktahir dan efektif kepada klien kami."
    },
    {
      icon: <Shield size={32} />,
      title: "Integritas dan Etika",
      desc: "Menegakkan standar tertinggi dalam integritas dan etika hukum, menjadikan kejujuran dan keadilan sebagai prinsip utama dalam setiap tindakan kami."
    },
    {
      icon: <Target size={32} />,
      title: "Dukungan pada Pertumbuhan Bisnis",
      desc: "Membantu klien dalam menghadapi tantangan hukum yang kompleks dan memastikan pertumbuhan berkelanjutan bisnis mereka."
    }
  ];

  const legalScopes = [
    "Perkara Kewarganegaraan",
    "Perkara Perkawinan",
    "Perkara Adopsi atau Hak Asuh Anak",
    "Perkara Kepemilikan Barang atau Aset",
    "Perkara Hak Usaha",
    "Perkara Perikatan-perikatan",
    "Perkara Perkumpulan dan Persekutuan",
    "Perkara Jual-Beli, Tukar-Menukar, Sewa-Menyewa, Pinjam-Meminjam",
    "Perkara Hutang Piutang",
    "Perkara Waris atau Hibah",
    "Perkara Hak Paten atau Hak Kekayaan Intelektual",
    "Perkara Pencemaran Nama Baik",
    "Perkara Perubahan Nama atau Identitas",
    "Perkara Wanprestasi",
    "Perkara Perbuatan Melawan Hukum (PMH)",
    "Perkara Pemisahan Harta",
    "Perkara Perjanjian Bisnis atau Pekerjaan",
    "Perkara Pencurian atau Perampokan",
    "Perkara Pembunuhan",
    "Perkara Penipuan",
    "Perkara Pemerasan",
    "Perkara Penganiayaan",
    "Perkara Pemerkosaan",
    "Perkara Korupsi",
    "Perkara Pengemplangan Pajak",
    "Perkara Pemalsuan Dokumen",
    "Perkara Perzinahan",
    "Perkara Kekerasan Dalam Rumah Tangga",
    "Perkara Narkotika",
    "Perkara Pelanggaran Ketertiban Umum",
    "Perkara Pemalsuan",
    "Perkara Perbuatan Curang",
    "Perkara Pelanggaran Jabatan dan Perkara Pidana Lainnya"
  ];

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
            Tentang <span className="text-gold">Kami</span>
          </motion.h2>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed italic font-serif"
          >
            "Legal Certainty, Constructive Solutions, Empowering Your Legal Journey"
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
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong className="text-navy">NARASUMBER HUKUM</strong> saat ini terdiri dari Narasumber Hukum yang bekerjasama dengan <strong>PT Sedana Legal Consultant (SELECO)</strong> dan <strong>PT Teira Dwan Indonesia (MTI-Talenstory)</strong>. Dengan ini menjadikan kami sebuah kesatuan pelayanan dalam sektor Hukum, Izin, dan Legalitas disertai dengan Pengembangan dan Pelatihan Sumber Daya Manusia.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Kami mengaplikasikan pengetahuan, kemampuan, dan kreativitas yang maksimal untuk mencapai tujuan bersama dengan klien kami. Kami tersedia untuk memberikan layanan hukum, izin, legalitas, pengembangan dan pelatihan SDM yang efektif dan efisien secara tepat.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pendirian <strong className="text-navy">NARASUMBER HUKUM</strong> dilatarbelakangi oleh pemahaman akan pentingnya kualitas pelayanan, dan komitmen terhadap kepuasan klien. Kami percaya bahwa dengan menyediakan layanan yang lengkap serta berkualitas tinggi adalah solusi yang tepat untuk memberikan berbagai kemudahan dan kelegaan bagi klien kami.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Kami yakin bahwa kolaborasi dalam tim kami menghasilkan kinerja maksimal dalam menangani dan menyelesaikan kebutuhan klien kami, karena tim kami berpengalaman dan terlatih serta terbiasa menghadapi berbagai perkara atau proyek dengan tingkat keahliannya yang tinggi.
              </p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">Visi</h2>
              <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-200 font-serif italic">
                "Menjadi mitra terpercaya bagi semua kalangan dalam Keadilan, Kepastian, Keberlanjutan melalui Ilmu, Inovasi dan Integritas yang tinggi"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">Misi</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {missions.map((mission, idx) => (
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">Legal Scope</h2>
              <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Firma Narasumber Hukum memberikan layanan hukum yang komprehensif untuk berbagai jenis perkara dan upaya hukum. Kami siap membantu klien dalam penyelesaian perkara perdata dan pidana di seluruh Indonesia, baik melalui proses <strong>litigasi</strong> (penyelesaian di pengadilan) maupun <strong>non-litigasi</strong> (penyelesaian di luar pengadilan).
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-white">Partner Kami</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {/* Narasumber Hukum Logo */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-white rounded-xl p-6 mb-6 flex items-center justify-center min-h-[120px]">
                <img 
                    src="/logo-narasumber-hukum.png" 
                    alt="Firma Narasumber Hukum" 
                    className="h-16 md:h-20 object-contain transition-all duration-500" 
                  />
              </div>
              <h3 className="text-xl font-bold text-center text-gold font-serif">Firma Narasumber Hukum</h3>
              <p className="text-gray-300 text-sm text-center mt-2 uppercase tracking-widest">Advocate, Intercessor & Legal Consultant</p>
            </motion.div>

            {/* MTI Talenstory Logo */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/20 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-white rounded-xl p-6 mb-6 flex items-center justify-center min-h-[120px]">
                <img 
                  src="/logo-mti-talenstory.jpg" 
                  alt="MTI Talenstory" 
                  className="max-w-full h-auto max-h-24 object-contain transition-all duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-gold font-serif">PT Teira Dwan Indonesia</h3>
              <p className="text-gray-300 text-sm text-center mt-2 uppercase tracking-widest">(MTI-Talenstory)</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutClient;
