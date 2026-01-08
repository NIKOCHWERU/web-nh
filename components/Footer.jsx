import React from 'react';
import { Instagram, Facebook, Linkedin, Phone, Youtube, Music } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-12 mb-12">
            {/* Brand Check */}
            <div className="flex flex-col">
                 <div className="flex items-center gap-4 mb-8">
                    <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain filter drop-shadow-lg" />
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold tracking-wider font-serif text-gold">NARASUMBER HUKUM</h3>
                        <p className="text-white text-[10px] tracking-[0.2em] uppercase mt-1">Sentral Edukasi & Solusi</p>
                    </div>
                 </div>
                 <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-sm">
                   Merupakan tempat berkumpulnya para Aktivis Handal dibidang Hukum, Perizinan, Legalitas, Pengembangan dan Pelatihan SDM yang telah terkoneksi dalam satu pintu untuk dapat melayani kebutuhan Klien kami di Seluruh Indonesia.
                 </p>
                 
                 <div className="flex flex-wrap gap-3">
                   {[
                     { name: 'Instagram', icon: <Instagram size={20} />, url: '#' },
                     { name: 'Facebook', icon: <Facebook size={20} />, url: '#' },
                     { name: 'LinkedIn', icon: <Linkedin size={20} />, url: '#' },
                     { name: 'Youtube', icon: <Youtube size={20} />, url: '#' },
                     { 
                        name: 'Whatsapp', 
                        icon: <FaWhatsapp size={20} />, 
                        url: `https://wa.me/6281252992361?text=${encodeURIComponent("Halo Kantor Narasumber Hukum, saya ingin berkonsultasi mengenai layanan Anda.")}` 
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

            {/* Offices */}
            <div>
                <h4 className="text-xl font-bold mb-6 text-gold">Kantor Kami</h4>
                <div className="space-y-4 text-sm text-gray-300">
                    <div>
                        <p className="font-bold text-white mb-1">Kantor Pusat</p>
                        <p>Jl. Jendral Sudirman No. 45, Jakarta Selatan</p>
                    </div>
                    <div>
                         <p className="font-bold text-white mb-1">Kantor Cabang 1</p>
                        <p>Jl. Diponegoro No. 88, Surabaya, Jawa Timur</p>
                    </div>
                     <div>
                         <p className="font-bold text-white mb-1">Kantor Cabang 2</p>
                        <p>Jl. Asia Afrika No. 12, Bandung, Jawa Barat</p>
                    </div>
                </div>
            </div>

            {/* Contacts */}
             <div>
                <h4 className="text-xl font-bold mb-6 text-gold">Hubungi Kami</h4>
                <div className="space-y-4 text-sm text-gray-300">
                    <div className="group">
                        <p className="font-bold text-white mb-1">Admin 1</p>
                        <a 
                          href={`https://wa.me/6281252992361?text=${encodeURIComponent("Halo Admin Narasumber Hukum, saya ingin berkonsultasi.")}`} 
                          className="flex items-center gap-2 hover:text-gold transition"
                        >
                            <Phone size={16} /> 0812-5299-2361
                        </a>
                    </div>
                    <div className="group">
                         <p className="font-bold text-white mb-1">Admin 2</p>
                        <a 
                          href={`https://wa.me/6287712345678?text=${encodeURIComponent("Halo Admin Narasumber Hukum, saya ingin berkonsultasi.")}`} 
                          className="flex items-center gap-2 hover:text-gold transition"
                        >
                             <Phone size={16} /> 0877-1234-5678 (Contoh)
                        </a>
                    </div>
                     <div className="mt-6">
                        <p className="text-xs text-gray-500 italic">Melayani konsultasi Senin - Jumat (09.00 - 17.00 WIB)</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-800 py-8 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Narasumber Hukum. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
