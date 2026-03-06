"use client";
import React from 'react';
import { Instagram, Facebook, Linkedin, Phone, Youtube, Music } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-navy text-white pt-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 mb-12">
          {/* Brand Check */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain filter drop-shadow-lg" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-wider font-serif text-gold">NARASUMBER HUKUM</h3>
                <p className="text-white text-[10px] tracking-[0.2em] uppercase mt-1">{t('nav.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://www.instagram.com/narasumberhukum' },
                { name: 'Facebook', icon: <Facebook size={20} />, url: 'https://facebook.com/kantor.narasumber.hukum' },
                { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/company/kantor-narasumber-hukum' },
                //  { name: 'Youtube', icon: <Youtube size={20} />, url: '' },
                {
                  name: 'Whatsapp',
                  icon: <FaWhatsapp size={20} />,
                  url: `https://wa.me/6282211020022?text=${encodeURIComponent("Halo Kantor Narasumber Hukum, saya ingin berkonsultasi mengenai layanan Anda.")}`
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  title={item.name}
                  className="w-11 h-11 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-gold hover:text-navy transition-all duration-300 group"
                >
                  <span className="text-gold group-hover:text-navy transition-colors">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-gold">{t('footer.services_title')}</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <Link href="/services" className="hover:text-gold transition-colors block leading-relaxed">{t('services.legal.title')}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors block leading-relaxed">{t('services.licensing.title')}</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors block leading-relaxed">{t('services.hr.title')}</Link>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-gold">{t('footer.office_title')}</h4>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <p className="font-bold text-white mb-1">{t('footer.office_1').name}</p>
                <p>{t('footer.office_1').addr}</p>
              </div>
              <div>
                <p className="font-bold text-white mb-1">{t('footer.office_2').name}</p>
                <p>{t('footer.office_2').addr}</p>
              </div>
              <div>
                <p className="font-bold text-white mb-1">{t('footer.office_3').name}</p>
                <p>{t('footer.office_3').addr}</p>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-gold">{t('footer.contact_title')}</h4>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="group">
                <p className="font-bold text-white mb-1">Admin</p>
                <a
                  href={`https://wa.me/6282211020022?text=${encodeURIComponent("Halo Admin Narasumber Hukum, saya ingin berkonsultasi.")}`}
                  className="flex items-center gap-2 hover:text-gold transition"
                >
                  <Phone size={16} /> 0822 1102 0022
                </a>
              </div>
              <div className="group">
                <p className="font-bold text-white mb-1">Advisor</p>
                <a
                  href={`https://wa.me/6282144424311?text=${encodeURIComponent("Halo Admin Narasumber Hukum, saya ingin berkonsultasi.")}`}
                  className="flex items-center gap-2 hover:text-gold transition"
                >
                  <Phone size={16} /> 0821 4442 4311
                </a>
              </div>
              <div className="mt-6">
                <p className="text-xs text-gray-500 italic">{t('footer.monday_friday')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Narasumber Hukum. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
