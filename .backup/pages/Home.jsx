import React, { useState } from 'react';
import { ArrowRight, Scale, FileText, ShieldCheck, Lightbulb, Phone, Mail, MapPin, CheckCircle, ChevronDown, ChevronUp, StarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

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

const Home = () => {
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
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight tracking-tight uppercase">
              Sentral Edukasi <br/>
              <span className="text-gold">Dan Solusi Hukum</span>
            </h1>
            <p className="text-base md:text-xl mb-8 md:text-xl mb-10 text-gray-300 leading-relaxed border-l-4 md:border-l-4 border-gold pl-4 md:pl-6 font-light">
              Kami memberikan pendampingan hukum yang profesional dengan pendekatan edukatif 
              untuk solusi yang berkeadilan dan berkelanjutan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services-preview" className="bg-gold text-navy px-8 py-4 rounded font-bold transition duration-300 hover:bg-white hover:text-navy uppercase text-sm tracking-widest flex items-center justify-center gap-2 group">
                Layanan Kami
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/#contact" className="px-8 py-4 rounded font-bold border border-white text-white hover:bg-white hover:text-navy transition duration-300 uppercase text-sm tracking-widest flex items-center justify-center">
                Konsultasi Sekarang
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
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

          {/* Service Cards Preview */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: <Scale className="text-gold" size={40} />, 
                title: "Litigasi Perdata", 
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
                desc: "Pendampingan hukum profesional untuk sengketa bisnis, properti, dan perdata umum." 
              },
              { 
                icon: <FileText className="text-gold" size={40} />, 
                title: "Legalitas Bisnis", 
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
                desc: "Solusi lengkap pendirian badan usaha (PT/CV), perizinan, dan penyusunan kontrak kerja." 
              },
              { 
                icon: <ShieldCheck className="text-gold" size={40} />, 
                title: "Pendapat Hukum", 
                image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80",
                desc: "Analisis hukum mendalam (Legal Opinion) untuk membantu pengambilan keputusan strategis." 
              }
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-[350px] md:h-[450px]"
              >
                {/* Image Background with Overlay */}
                <div className="absolute inset-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent opacity-90"></div>
                </div>
                
                {/* Content Overlay */}
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

          {/* Link to Full Services Page */}
          <a href="/services" className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest hover:underline text-sm">
            Lihat Selengkapnya <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
          {/* Background Detail */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px] transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="container mx-auto px-4">
            <div className="text-center mb-16 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">Mengapa Memilih Kami?</h2>
              <div className="w-24 h-1.5 bg-gold mx-auto"></div>
              <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"> Keunggulan layanan yang membedakan kami dari yang lain </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { title: "Profesional & Berintegritas", desc: "Menjunjung tinggi kode etik profesi dan integritas dalam setiap penanganan perkara." },
                { title: "Solusi Komprehensif", desc: "Pendekatan menyeluruh untuk menyelesaikan masalah hukum dari akar hingga tuntas." },
                { title: "Transparan", desc: "Setiap langkah dan biaya dikomunikasikan secara jelas sejak awal tanpa ada yang ditutupi." },
                { title: "Responsif", desc: "Tim kami selalu siap mendengarkan dan merespon kebutuhan hukum Anda dengan cepat." }
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

      {/* TESTIMONIALS SECTION */}
      <section id="reviews" className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Background Decorative Blur */}
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
            className="grid lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Bpk. Heru Prasetyo",
                role: "Direktur Utama PT. Maju Sentosa",
                text: "Tim Narasumber Hukum sangat profesional dan responsif dalam menangani legalitas bisnis kami. Penjelasan hukum yang diberikan sangat mudah dipahami dan edukatif.",
                rating: 5
              },
              {
                name: "Ibu Siti Aminah",
                role: "Pemilik UMKM Kuliner",
                text: "Sangat terbantu dalam pengurusan izin usaha dan kontrak kerjasama. Harganya transparan dan pelayanannya sangat ramah. Rekomendasi utama untuk solusi hukum!",
                rating: 5
              },
              {
                name: "Bpk. Ahmad Fauzi",
                role: "Klien Kasus Perdata",
                text: "Pendampingan yang luar biasa dari awal hingga akhir perkara. Saya merasa sangat tenang karena tim selalu memberikan update rutin dan strategi yang matang.",
                rating: 5
              }
            ].map((review, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="bg-gray-50 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl hover:border-gold/30 transition-all duration-500 transform hover:-translate-y-3 group"
              >
                <div>
                  <div className="flex text-gold mb-4 md:mb-8 gap-1.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} size={16} md:size={20} fill="currentColor" stroke="none" />
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
                  "Menyediakan solusi hukum yang praktis, efektif, dan berkelanjutan."
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

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Decorative Blur */}
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
            {/* Contact Info Cards */}
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { icon: <Phone size={24} />, label: "Telepon & WA", value: "+62 812-5299-2361" },
                { icon: <MapPin size={24} />, label: "Lokasi Kantor", value: "Jakarta Pusat, Indonesia" },
                { icon: <Mail size={24} />, label: "Email Resmi", value: "niko.narasumberhukum@gmail.com" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center group hover:border-gold/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-navy text-gold rounded-2xl flex items-center justify-center mb-5 md:mb-6 group-hover:bg-gold group-hover:text-navy transition-all duration-500 shadow-lg">
                    {item.icon}
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">{item.label}</p>
                  <p className="font-bold text-navy text-[11px] sm:text-xs md:text-sm">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Form Container */}
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

// FAQ Component Helper
const FAQItem = ({ question, answer }) => {
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

export default Home;
