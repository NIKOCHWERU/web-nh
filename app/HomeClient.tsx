"use client";
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import CustomBlocksRenderer from '@/components/CustomBlocksRenderer';
import { useLanguage } from '@/context/LanguageContext';

const HomeClient = () => {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [homeServiceQuery, setHomeServiceQuery] = useState('');

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
      {/* Dynamic Elementor-style Blocks (Hero, Stats, Features, Values, Testimonials, FAQ, CTA) */}
      <CustomBlocksRenderer page="home" />

      {/* Interactive Directory Banner (448 Services Search) */}
      <section className="py-12 bg-[#0b0c10] border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-navy text-white rounded-2xl p-6 md:p-8 border border-gold/30 shadow-2xl text-left">
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
                    className="px-6 py-3.5 rounded-xl bg-gold text-navy hover:bg-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer"
                  >
                    <Search size={15} />
                    {locale === 'en' ? 'Search' : 'Cari Layanan'}
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-2 text-xs">
              <span className="text-gray-400">Tersedia 34 Kasus Hukum + 411 Izin & Pajak + 6 Program SDM</span>
              <Link href="/services#direktori" className="inline-flex items-center gap-1.5 text-gold hover:text-white font-bold uppercase tracking-wider">
                Buka Direktori Lengkap <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-20 bg-gray-50 relative overflow-hidden border-t border-gray-200">
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
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <Phone size={22} />,
                  label: t('footer.contact_title'),
                  value: "+62-822-1102-0022",
                  href: "https://wa.me/6282211020022?text=" + encodeURIComponent("Halo Kantor Narasumber Hukum, saya ingin berkonsultasi mengenai layanan Anda.")
                },
                {
                  icon: <MapPin size={22} />,
                  label: t('footer.office_title'),
                  value: "Jakarta Pusat, Indonesia",
                  href: "https://maps.app.goo.gl/Z77ydQisZAQ6d1aQ9"
                },
                {
                  icon: <Mail size={22} />,
                  label: t('contact_page.email_label'),
                  value: "hello@narasumberhukum.com",
                  href: "mailto:hello@narasumberhukum.com"
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center group hover:border-gold transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-navy text-gold rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                    {item.icon}
                  </div>
                  <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-1">{item.label}</p>
                  <p className="font-bold text-navy text-xs md:text-sm">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeClient;
