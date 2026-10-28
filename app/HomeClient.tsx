"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Scale, FileText, ShieldCheck, Lightbulb, Phone, Mail, MapPin, CheckCircle, ChevronDown, ChevronUp, Heart, Zap, MessageCircle, Rocket, Target, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import CustomBlocksRenderer from '@/components/CustomBlocksRenderer';
import { useLanguage } from '@/context/LanguageContext';

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const HomeClient = () => {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [homeServiceQuery, setHomeServiceQuery] = useState('');
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/cms', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.siteSettings) {
          setSiteSettings(data.siteSettings);
        }
      })
      .catch(() => {});
  }, []);

  const handleHomeServiceSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeServiceQuery.trim()) {
      router.push(`/services?q=${encodeURIComponent(homeServiceQuery.trim())}#direktori`);
    } else {
      router.push('/services#direktori');
    }
  };

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
            <source src={siteSettings?.heroVideoUrl || "https://res.cloudinary.com/dysw7tjks/video/upload/v1756377208/Desain_tanpa_judul_oeaojq.mp4"} type="video/mp4" />
          </video>
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight uppercase">
              {locale === 'id' && siteSettings?.heroTitle
                ? siteSettings.heroTitle
                : t('hero.title').split(' ').slice(0, 2).join(' ')}{' '}
              <br />
              <span className="text-gold">
                {locale === 'id' && siteSettings?.heroHighlight
                  ? siteSettings.heroHighlight
                  : t('hero.title').split(' ').slice(2).join(' ')}
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 text-gray-300 leading-relaxed border-l-4 border-gold pl-4 md:pl-6 font-light">
              {locale === 'id' && siteSettings?.heroSubtitle ? siteSettings.heroSubtitle : t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="bg-gold text-navy px-8 py-4 rounded font-bold transition duration-300 hover:bg-white hover:text-navy uppercase text-sm tracking-widest flex items-center justify-center gap-2 group">
                {t('hero.cta_services')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/kontak" className="px-8 py-4 rounded font-bold border border-white/80 text-white hover:bg-white hover:text-navy transition duration-300 uppercase text-sm tracking-widest flex items-center justify-center">
                {t('hero.cta_consult')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DYNAMIC ELEMENTOR-STYLE BLOCKS FOR HOME PAGE */}
      <CustomBlocksRenderer page="home" />

      {/* SERVICES PREVIEW SECTION */}
      <section id="services-preview" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wider text-navy">{t('services.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-5"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10 max-w-6xl mx-auto">
            {[
              {
                icon: <Scale className="text-gold" size={32} />,
                title: t('services.legal.title'),
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
                desc: t('services.legal.desc'),
                href: "/services/hukum",
                badge: "34 Cakupan Perkara"
              },
              {
                icon: <FileText className="text-gold" size={32} />,
                title: t('services.licensing.title'),
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
                desc: t('services.licensing.desc'),
                href: "/services/perizinan",
                badge: "411 Layanan Izin & Pajak"
              },
              {
                icon: <ShieldCheck className="text-gold" size={32} />,
                title: t('services.hr.title'),
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
                desc: t('services.hr.desc'),
                href: "/services/pelatihan-sdm",
                badge: "3 Program Utama"
              }
            ].map((service, idx) => (
              <Link
                href={service.href}
                key={idx}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 h-[340px] md:h-[400px] border border-gray-200 block"
              >
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/30"></div>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-navy/85 border border-gold/40 text-gold text-[11px] font-bold tracking-wider uppercase">
                    {service.badge}
                  </span>
                </div>

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-left">
                  <div className="mb-3 text-gold">
                    {service.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2.5 text-white leading-snug group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="w-12 h-0.5 bg-gold mt-4 group-hover:w-20 transition-all duration-300"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Interactive Directory Banner modeled after SELECO WEB ServicesSection */}
          <div className="max-w-6xl mx-auto bg-navy text-white rounded-2xl p-6 md:p-8 border border-gold/25 shadow-xl text-left mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                  <Search size={13} />
                  {locale === 'en' ? 'Interactive Service Directory' : 'Direktori Lengkap & Pencarian Terpadu'}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {locale === 'en'
                    ? 'Explore All 448 Legal, Licensing, Tax, Immigration & Land Services'
                    : 'Telusuri 448 Layanan Hukum, Perizinan, Pajak, Imigrasi & Pertanahan'}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {locale === 'en'
                    ? 'Find specific litigation/non-litigation scopes, OSS permits, tax filings, KITAS/KITAP, or BPN land certificates using our interactive search.'
                    : 'Cari cepat layanan spesifik mulai dari perkara perdata/pidana, izin OSS, HAKI, BPOM, SPT pajak, paspor/KITAS, hingga sertipikat tanah BPN.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto lg:min-w-[430px]">
                <form onSubmit={handleHomeServiceSearch} className="flex flex-col sm:flex-row gap-2.5 w-full">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={homeServiceQuery}
                      onChange={(e) => setHomeServiceQuery(e.target.value)}
                      placeholder={locale === 'en' ? 'Search 448 services (e.g. OSS, Tax, HAKI)...' : 'Cari layanan (misal: Wanprestasi, PBG, Pajak, KITAS)...'}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#141418] border border-white/15 focus:border-gold text-white placeholder-gray-400 focus:outline-none text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-gold text-navy hover:bg-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shrink-0 shadow-md"
                  >
                    <Search size={15} />
                    {locale === 'en' ? 'Search' : 'Cari Layanan'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <Link href="/services#direktori" className="inline-flex items-center gap-2 text-navy hover:text-gold font-bold uppercase tracking-widest border-b-2 border-gold pb-1 transition-colors text-xs md:text-sm">
            {t('services.view_all')} (448 Layanan) <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-16 md:py-20 bg-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wider">{t('why_us.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-5"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t('why_us.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {(t('why_us.items') as any).map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl border-t-4 border-t-gold border-x border-b border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 text-gold">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2.5 uppercase tracking-wide font-sans text-navy">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VALUES SECTION - COMPACT & FORMAL CORPORATE GRID */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-[#111114] text-white border-t border-white/10">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wider text-white">{t('values.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t('values.subtitle')}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {(t('values.items') as any).map((value: any, idx: number) => {
              const titleParts = value.title.split(' - ');
              const initial = titleParts[0];
              const name = titleParts.length > 1 ? titleParts[1] : value.title;

              let IconComponent = Zap;
              if (initial === 'R') IconComponent = Zap;
              if (initial === 'I' && idx === 1) IconComponent = FileText;
              if (initial === 'C' && idx === 2) IconComponent = MessageCircle;
              if (initial === 'C' && idx === 3) IconComponent = Lightbulb;
              if (initial === 'I' && idx === 4) IconComponent = Rocket;
              if (initial === 'E') IconComponent = Target;
              if (initial === 'P') IconComponent = Heart;

              const colSpanClass = idx < 4 ? 'lg:col-span-3' : 'lg:col-span-4';

              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className={`${colSpanClass} bg-[#18181c] border border-white/10 hover:border-gold/50 rounded-xl p-5 transition-all duration-300 flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-white/10">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/40 text-gold font-bold text-base flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                          {initial}
                        </span>
                        <h3 className="text-sm md:text-base font-bold text-white font-sans group-hover:text-gold transition-colors leading-snug truncate">
                          {name}
                        </h3>
                      </div>
                      <IconComponent size={18} className="text-gold/60 group-hover:text-gold transition-colors shrink-0" />
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="reviews" className="py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-12 text-navy">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wider">{t('testimonials.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-5"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {(t('testimonials.items') as any).map((review: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-gold flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div>
                  <p className="text-gray-700 italic text-sm md:text-base leading-relaxed mb-6 font-sans">
                    "{review.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                  <div>
                    <h4 className="font-bold text-navy text-base">{review.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mt-0.5">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LEGAL PROCESS SECTION */}
      <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wider text-navy">{t('process.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-5"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {t('process.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {(t('process.items') as any).map((item: any, idx: number) => (
              <div key={idx} className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-gold/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded bg-navy text-gold font-bold text-xs tracking-widest">
                    {item.step}
                  </span>
                  {idx < 3 && (
                    <ArrowRight size={18} className="hidden lg:block text-gold/50" />
                  )}
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2.5 text-navy font-sans">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">{t('faq.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto text-left">
            {(t('faq.items') as any).map((faq: any, idx: number) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-16 bg-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-8 uppercase tracking-wider leading-tight font-sans">
              "{locale === 'id' && siteSettings?.ctaQuote ? siteSettings.ctaQuote : t('cta_contact.title_quote')} <br /> <span className="text-gold">{locale === 'id' && siteSettings?.ctaGold ? siteSettings.ctaGold : t('cta_contact.title_gold')}</span>"
            </h2>
            <Link
              href={`https://wa.me/${siteSettings?.whatsapp || '6282211020022'}`}
              target="_blank"
              className="inline-flex items-center gap-3 bg-gold text-navy px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-navy transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center justify-center w-6 h-6 bg-navy text-gold rounded-full">
                <Phone size={14} />
              </span>
              {t('cta_contact.free_consult')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wide text-navy">{t('contact_page.title')}</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed italic">
              {t('contact_page.description')}
            </p>
            <div className="mt-6">
              <Link href="/tentang" className="text-navy font-bold hover:text-gold transition-colors underline decoration-gold underline-offset-4 text-sm uppercase tracking-wider">
                {t('contact_page.profile_link')}
              </Link>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                {
                  icon: <Phone size={22} />,
                  label: t('footer.contact_title'),
                  value: "+62-822-1102-0022",
                  href: `https://wa.me/${siteSettings?.whatsapp || '6282211020022'}?text=${encodeURIComponent("Halo Kantor Narasumber Hukum, saya ingin berkonsultasi mengenai layanan Anda.")}`
                },
                {
                  icon: <MapPin size={22} />,
                  label: t('footer.office_title'),
                  value: siteSettings?.address || "Jakarta Pusat, Indonesia",
                  href: "https://maps.app.goo.gl/Z77ydQisZAQ6d1aQ9"
                },
                {
                  icon: <Mail size={22} />,
                  label: t('contact_page.email_label'),
                  value: siteSettings?.email || "hello@narasumberhukum.com",
                  href: `mailto:${siteSettings?.email || "hello@narasumberhukum.com"}`
                }
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center group hover:border-gold transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-navy text-gold rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                    {item.icon}
                  </div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-1">{item.label}</p>
                  <p className="font-bold text-navy text-xs md:text-sm">
                    {item.value}
                  </p>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
    <div className="border-b border-gray-200 mb-3">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`font-bold text-base md:text-lg text-navy group-hover:text-gold transition ${isOpen ? 'text-gold' : ''}`}>{question}</span>
        {isOpen ? <ChevronUp className="text-gold shrink-0 ml-4" /> : <ChevronDown className="text-gray-400 group-hover:text-gold shrink-0 ml-4" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-gray-600 text-sm md:text-base leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

export default HomeClient;
