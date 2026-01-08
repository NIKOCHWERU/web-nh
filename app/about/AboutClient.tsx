"use client";
import React from 'react';
import { Target, Users, Award, Shield, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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

const AboutClient = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-navy text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
             <h1 className="text-5xl font-bold uppercase tracking-[0.2em] mb-6">Tentang Kami</h1>
             <div className="w-24 h-1.5 bg-gold mx-auto mb-8"></div>
             <p className="text-gold italic font-serif text-2xl">"Integritas, Profesionalisme, dan Edukasi"</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 container mx-auto px-4 overflow-hidden bg-white">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="mb-8">
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Siapa Kami</span>
              <h2 className="text-4xl font-bold mt-4 mb-8 text-navy leading-tight">Mitra Hukum Terpercaya <br/> untuk Masa Depan Anda</h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              <strong className="text-navy">Narasumber Hukum</strong> lahir dari semangat untuk menjadi <strong className="text-navy">Sentral Edukasi Dan Solusi</strong>. 
              Kami percaya bahwa setiap masalah hukum dapat diselesaikan dengan lebih baik jika klien memiliki pemahaman yang cukup mengenai posisi hukum mereka.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              Kami tidak hanya bertindak sebagai kuasa hukum, tetapi juga sebagai mitra strategis yang mendampingi Anda dalam setiap langkah pengambilan keputusan. 
              Dengan pendekatan yang humanis namun tegas, kami memastikan hak-hak Anda terjaga dengan baik.
            </p>

            <div className="grid grid-cols-2 gap-10">
              <div className="border-l-4 border-gold pl-8 py-2">
                <h4 className="text-5xl font-bold text-navy mb-2 tracking-tighter">100+</h4>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-medium">Kasus Terverifikasi</p>
              </div>
              <div className="border-l-4 border-gold pl-8 py-2">
                <h4 className="text-5xl font-bold text-navy mb-2 tracking-tighter">50+</h4>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-medium">Mitra Korporasi</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 gap-6 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <div className="absolute -inset-4 border border-gold/10 -z-10 rounded-2xl"></div>
             <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" className="rounded-2xl shadow-2xl mt-12" alt="Meeting" />
             <img src="https://images.unsplash.com/photo-1593115057322-e94b77572f20?auto=format&fit=crop&w=600&q=80" className="rounded-2xl shadow-2xl" alt="Office" />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
           <div className="text-center mb-20 text-white">
            <h2 className="text-4xl font-bold mb-6 uppercase tracking-wider">Nilai-Nilai Kami</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Fokus Solusi", desc: "Berorientasi pada penyelesaian masalah yang efektif and tepat sasaran." },
              { icon: Users, title: "Kemitraan", desc: "Membangun hubungan kepercayaan jangka panjang dengan setiap klien." },
              { icon: Award, title: "Excellence", desc: "Standar kualitas layanan hukum tertinggi dengan ketelitian maksimal." },
              { icon: Shield, title: "Integritas", desc: "Menunjung tinggi kode etik profesi dan kejujuran tanpa kompromi." }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#1f1f23] p-10 rounded-3xl border border-white/5 hover:border-gold/30 transition-all duration-300 group">
                <div className="w-20 h-20 bg-gold/10 text-gold rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-lg">
                  <item.icon size={40} />
                </div>
                <h3 className="font-bold text-2xl mb-4 text-white uppercase tracking-wide leading-tight">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
        {/* Background Detail */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 uppercase tracking-wider font-serif">
              Visi & <span className="text-gold">Misi</span>
            </h2>
            
            <div className="mb-10 md:mb-12">
              <h3 className="text-xl font-bold text-gold mb-4 md:mb-6 flex items-center gap-3">
                <span className="w-10 h-[1.5px] bg-white"></span> Visi
              </h3>
              <p className="text-gray-300 leading-relaxed italic text-lg md:text-2xl font-light">
                "Menjadi mitra hukum terpercaya yang mengedepankan edukasi dan solusi berkeadilan bagi seluruh lapisan masyarakat."
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gold mb-4 md:mb-8 flex items-center gap-3">
                <span className="w-10 h-[1.5px] bg-white"></span> Misi
              </h3>
              <ul className="space-y-4 md:space-y-6 text-gray-300">
                {[
                  "Memberikan layanan hukum yang profesional, transparan, dan akuntabel.",
                  "Meningkatkan kesadaran hukum masyarakat melalui pendekatan edukatif.",
                  "Menyediakan solusi hukum yang praktis, efektif, and berkelanjutan."
                ].map((misi, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-gold font-bold text-lg">0{i+1}.</span>
                    <span className="text-base md:text-lg leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-4 border border-gold/10 rounded-2xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=800&q=80" 
              alt="Law Office" 
              className="rounded-2xl shadow-2xl filter grayscale hover:grayscale-0 transition duration-1000"
            />
            <div className="absolute -bottom-8 -left-8 bg-gold p-10 shadow-2xl hidden lg:block rounded-br-[3rem]">
              <p className="text-navy font-bold text-2xl font-serif leading-tight">"Keadilan Melalui <br/> Edukasi"</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 uppercase text-navy tracking-tight">Tim Profesional Kami</h2>
            <div className="w-24 h-1.5 bg-gold mx-auto"></div>
             <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Didukung oleh para praktisi hukum berpengalaman yang menjunjung tinggi dedikasi dan keahlian di bidangnya.
            </p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { 
                name: "Dr. Bambang Sutrisno, S.H., M.H.", 
                role: "Managing Partner",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
              },
              { 
                name: "Siti Rahmawati, S.H., M.Kn.", 
                role: "Senior Associate",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
              },
              { 
                name: "Rizky Pratama, S.H.", 
                role: "Litigation Specialist",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
              }
            ].map((member, idx) => (
              <motion.div key={idx} className="group text-center" variants={fadeInUp}>
                <div className="relative mb-8 overflow-hidden rounded-[2rem] shadow-2xl mx-auto w-full aspect-[4/5] max-w-sm">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-gold/10 transition duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition duration-500 bg-gradient-to-t from-navy to-transparent">
                     <p className="text-white text-sm font-bold tracking-widest uppercase">Lihat Profil</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-navy group-hover:text-gold transition leading-tight">{member.name}</h3>
                <p className="text-gold/80 font-bold uppercase tracking-[0.2em] text-[10px] mt-3">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
           <div className="text-center mb-20 text-white">
            <h2 className="text-4xl font-bold mb-6 uppercase tracking-wider">Lokasi Kami</h2>
            <div className="w-20 h-1.5 bg-gold mx-auto"></div>
          </div>
          <div className="bg-navy p-2 rounded-3xl shadow-2xl border border-white/5">
             <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5833664639163!2d106.82135347442501!3d-6.1864707606128775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f428abe15763%3A0x7c3a05b23a1bfef!2sMenara%20Cakrawala!5e0!3m2!1sid!2sid!4v1767785231547!5m2!1sid!2sid"
              width="100%" 
              height="500" 
              style={{ border: 0, borderRadius: '1.5rem' }} 
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6 text-white text-lg">
             <div className="flex items-center gap-3 bg-white/5 px-8 py-4 rounded-full border border-white/10">
                <MapPin className="text-gold" />
                <span className="font-light tracking-wide">Menara Cakrawala Lt. 12 Unit 5A, Jl. M.H. Thamrin Kav. 9, Menteng, Jakarta Pusat 10340</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutClient;
