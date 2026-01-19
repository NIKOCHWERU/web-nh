"use client";
import React, { useState } from 'react';
import { ArrowRight, Scale, FileText, ShieldCheck, Lightbulb, Phone, Mail, MapPin, CheckCircle, ChevronDown, ChevronUp, StarIcon, Heart, Search, Zap, Lock } from 'lucide-react';
import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

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

const HomeClient = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center bg-gradient-to-br from-[#0a0a0b] via-[#161618] to-[#0a0a0b] text-white overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video 
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="https://res.cloudinary.com/dysw7tjks/video/upload/v1756377208/Desain_tanpa_judul_oeaojq.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-10">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight uppercase">
              Sentral Edukasi <br/>
              <span className="text-gold">Dan Solusi Hukum</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 text-gray-300 leading-relaxed border-l-4 border-gold pl-4 md:pl-6 font-light">
              Kami memberikan pendampingan hukum yang profesional dengan pendekatan edukatif 
              untuk solusi yang berkeadilan dan berkelanjutan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services-preview" className="bg-gold text-navy px-8 py-4 rounded font-bold transition duration-300 hover:bg-white hover:text-navy uppercase text-sm tracking-widest flex items-center justify-center gap-2 group">
                Layanan Kami
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/#contact" className="px-8 py-4 rounded font-bold border border-white text-white hover:bg-white hover:text-navy transition duration-300 uppercase text-sm tracking-widest flex items-center justify-center">
                Konsultasi Sekarang
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW SECTION */}
      <section id="services-preview" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-wider text-navy">Layanan Unggulan</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto mb-8"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Solusi hukum komprehensif yang disesuaikan dengan kebutuhan Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: <Scale className="text-gold" size={40} />, 
                title: "Bidang Hukum", 
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
                desc: "Kami siap mendampingi, memberikan pertimbangan, serta melakukan segala bentuk upaya hukum di Indonesia, baik pembelaan di dalam maupun di luar Pengadilan (Litigasi & Non-Litigasi)." 
              },
              { 
                icon: <FileText className="text-gold" size={40} />, 
                title: "Bidang Perizinan & Legalitas", 
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
                desc: "Solusi praktis perlindungan aset dan legalitas bisnis. Kami mendampingi dari investasi awal hingga operasional, mencakup pengurusan izin di 18 Kementerian sesuai regulasi terbaru." 
              },
              { 
                icon: <ShieldCheck className="text-gold" size={40} />, 
                title: "Pengembangan SDM", 
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
                desc: "Kami berdedikasi merancang langkah perubahan berdampak bagi individu dan perusahaan melalui metode pelatihan SDM terbaru yang relevan dan inovatif." 
              }
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-[350px] md:h-[450px]"
              >
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent opacity-90"></div>
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                  <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-gold">
                    {service.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">
                    {service.desc}
                  </p>
                  <div className="w-12 h-1 bg-gold mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/services" className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest hover:underline text-sm">
            Lihat Selengkapnya <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px] transform -translate-x-1/2 translate-y-1/2"></div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">Mengapa Memilih Kami?</h2>
              <div className="w-24 h-1.5 bg-gold mx-auto"></div>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                Kami peduli, berpengalaman, dan ahli. Bersama kami, Anda tidak lagi berjalan sendiri menghadapi masalah hukum.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { title: "Komitmen Layanan Terbaik", desc: "Kepercayaan dan kualitas adalah kunci utama. Kami berkomitmen penuh memberikan pelayanan terbaik bagi Anda." },
                { title: "Individu & Perusahaan", desc: "Solusi hukum tanpa batasan. Siap melayani kebutuhan baik untuk perseorangan maupun korporasi." },
                { title: "Tim Berpengalaman", desc: "Tim terampil, tangguh, dan terbiasa menghadapi berbagai tantangan hukum secara maksimal." },
                { title: "Strategi Cekatan", desc: "Strategi terukur, efisien, dan bertanggung jawab demi efektivitas penyelesaian masalah Anda." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="mb-6 text-gold group-hover:scale-110 transition-transform">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-wide font-serif">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
      </section>  

      {/* OUR VALUES SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-wider text-navy">Nilai-nilai Kami</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto mb-8"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Prinsip utama yang menjadi landasan setiap langkah kami dalam melayani Anda.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {[
              { 
                title: "Kepuasan Klien", 
                image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
                desc: "Kepuasan klien adalah prioritas utama kami. Kami berkomitmen untuk memenuhi dan melampaui harapan klien."
              },
              { 
                title: "Ketelitian", 
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
                desc: "Kami menekankan pada ketelitian dalam setiap tindakan, sehingga setiap klien mendapatkan hasil terbaik dalam penyelesaian." 
              },
              { 
                title: "Inovasi", 
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                desc: "Kami selalu mencari solusi inovatif dan kreatif untuk memecahkan setiap tantangan dalam perjalanan menuju tujuan bersama klien." 
              },
              { 
                title: "Komitmen", 
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
                desc: "Kami memiliki komitmen kuat untuk memberikan pelayanan terbaik dan mendukung klien mencapai setiap tujuan yang disepakati." 
              },
              { 
                title: "Integritas", 
                image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
                desc: "Kami menjunjung tinggi integritas dan etika sebagai prinsip utama dalam setiap langkah serta tindakan kami." 
              }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] h-80 flex-shrink-0"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={value.image} 
                    alt={value.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-navy/80 group-hover:bg-navy/70 transition-colors duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full justify-center text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gold font-serif tracking-wide transform group-hover:-translate-y-1 transition-transform">{value.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="reviews" className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-left mb-20 text-navy">
            <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 uppercase tracking-wider">Testimoni Klien</h2>
            <div className="w-16 md:w-24 h-1 md:h-1.5 bg-gold mb-6 md:mb-8"></div>
            <p className="text-gray-500 max-w-2xl text-sm md:text-xl leading-relaxed">
              Dedikasi kami tercermin dalam setiap kesuksesan yang diraih oleh klien kami.
            </p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Anwar Muksin",
                role: "Klien",
                text: "Tim Narasumber Hukum memiliki pemahaman yang mendalam tentang hukum, perizinan dan legalitas yang ada di Indonesia. Kami bersyukur semua permasalahan dalam usaha saya dapat ditangani dengan baik dan efisien oleh tim Narasumber Hukum",
                rating: 5
              },
              {
                name: "Ani Handayani",
                role: "Klien",
                text: "Ibu Debora dan tim melakukan pekerjaan yang sangat baik dan praktis. Mereka memberikan penjelasan yang jelas untuk membantu kami mengambil keputusan. Terimakasih kepada seluruh tim Narasumber Hukum",
                rating: 5
              },
              {
                name: "Ridwan Hanafi",
                role: "Klien",
                text: "Tim ini dapat diandalkan dan responsif. Saya sangat puas dengan kinerja tim, berintegritas dan bersedia mempertimbangkan biaya alternatif untuk menjaga kepuasan klien.",
                rating: 5
              },
              {
                name: "Meliana Iskandar",
                role: "Klien",
                text: "Tim Narasumber Hukum telah mengatur segalanya dengan cermat, dan semuanya terjadi sesuai antisipasi dan penjelasan kepada kami. Sangat sangat membantu dan berguna, terimakasih banyak tim Narasumber Hukum",
                rating: 5
              }
            ].map((review, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="bg-gray-50 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl hover:border-gold/30 transition-all duration-500 transform hover:-translate-y-3 group"
              >
                <div>
                  <div className="flex text-gold mb-4 md:mb-8 gap-1.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} size={20} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-base md:text-xl leading-relaxed mb-6 md:mb-10 font-serif">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 md:gap-6 border-t border-gray-200 pt-6 md:pt-8">
                  <div>
                    <h4 className="font-bold text-navy text-base md:text-xl">{review.name}</h4>
                    <p className="text-[10px] md:text-sm text-gray-400 uppercase tracking-widest font-medium mt-0.5 md:mt-1">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LEGAL PROCESS SECTION */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-wider text-navy">Alur Penanganan Perkara</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto mb-8"></div>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Langkah-langkah strategis kami dalam memastikan setiap perkara ditangani secara profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              { 
                step: "01", 
                title: "Konsultasi & Analisis", 
                desc: "Pendalaman materi perkara and identifikasi posisi hukum klien secara menyeluruh." 
              },
              { 
                step: "02", 
                title: "Strategi Hukum", 
                desc: "Penyusunan langkah-langkah hukum praktis and efektif sesuai dengan target yang ingin dicapai." 
              },
              { 
                step: "03", 
                title: "Eksekusi Tindakan", 
                desc: "Pelaksanaan langkah hukum baik melalui jalur meja hijau maupun negosiasi di luar pengadilan." 
              },
              { 
                step: "04", 
                title: "Evaluasi & Solusi", 
                desc: "Penyelesaian perkara dengan hasil yang optimal and berkeadilan bagi masa depan klien." 
              }
            ].map((item, idx) => (
              <div key={idx} className="relative p-8 bg-white rounded-3xl shadow-lg border border-gray-100 hover:border-gold/30 transition-all duration-300 group">
                <div className="text-6xl font-black text-gray-50 absolute top-4 right-8 group-hover:text-gold/10 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-navy font-serif">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20 text-gold/30">
                    <ArrowRight size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
           <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">Pertanyaan Umum</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto text-left">
            {[
              { q: "Bagaimana cara memulai konsultasi hukum?", a: "Anda dapat menghubungi kami melalui WhatsApp atau telepon untuk menjadwalkan sesi konsultasi awal. Kami akan mendengarkan kasus Anda dan memberikan gambaran langkah hukum yang tepat." },
              { q: "Apakah ada biaya untuk konsultasi awal?", a: "Kami menawarkan sesi konsultasi awal singkat secara gratis untuk memahami duduk perkara. Untuk penanganan perkara lebih lanjut, biaya akan disesuaikan dengan kompleksitas kasus." },
              { q: "Area hukum apa saja yang Anda tangani?", a: "Kami menangani berbagai bidang hukum termasuk hukum pidana, perdata, hukum bisnis/korporasi, sengketa tanah, hingga hukum keluarga." },
              { q: "Berapa lama proses penyelesaian masalah hukum?", a: "Durasi penyelesaian sangat bervariasi tergantung pada jenis kasus dan jalur penyelesaian yang ditempuh (litigasi vs non-litigasi). Kami akan memberikan estimasi waktu yang realistis setelah mempelajari kasus Anda." }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>



      {/* CALL TO ACTION SECTION */}
      <section className="py-20 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-5xl font-bold mb-8 uppercase tracking-widest leading-tight font-serif">
              "Jangan Ditunda Dan Dipendam, <br/> <span className="text-gold">Segera Selesaikan.</span>"
            </h2>
            <Link 
              href="https://wa.me/6282211020022" 
              target="_blank"
              className="inline-flex items-center gap-3 bg-gold text-navy px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-navy transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <span className="flex items-center justify-center w-6 h-6 bg-navy text-gold rounded-full">
                <Phone size={14} />
              </span>
              Konsultasi Gratis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">Hubungi Kami</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto mb-8"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-light italic">
              "Kami siap mendengarkan dan mendampingi setiap perkara Anda dengan profesionalisme tinggi."
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { 
                  icon: <Phone size={24} />, 
                  label: "Telepon & WA", 
                  value: "+62-822-1102-0022",
                  href: "https://wa.me/6282211020022" 
                },
                { 
                  icon: <MapPin size={24} />, 
                  label: "Lokasi Kantor", 
                  value: "Jakarta Pusat, Indonesia",
                  href: "https://www.google.com/maps/search/Jakarta+Pusat,+Indonesia" 
                },
                { 
                  icon: <Mail size={24} />, 
                  label: "Email Resmi", 
                  value: "hello@narasumberhukum.com",
                  href: "mailto:hello@narasumberhukum.com"
                }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center group hover:border-gold/30 transition-all duration-500 cursor-pointer"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-navy text-gold rounded-2xl flex items-center justify-center mb-5 md:mb-6 group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-lg">
                    {item.icon}
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">{item.label}</p>
                  <p className="font-bold text-navy text-[11px] sm:text-xs md:text-sm">
                    {item.value}
                  </p>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 mb-4">
      <button 
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-bold text-lg text-navy group-hover:text-gold transition ${isOpen ? 'text-gold' : ''}`}>{question}</span>
        {isOpen ? <ChevronUp className="text-gold" /> : <ChevronDown className="text-gray-400 group-hover:text-gold" />}
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-600 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export default HomeClient;
