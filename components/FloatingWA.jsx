import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWA = () => {
  const waMessage = encodeURIComponent("Halo Kantor Narasumber Hukum, saya ingin berkonsultasi. Mohon info jadwalnya.");
  
  return (
    <a 
      href={`https://wa.me/6281252992361?text=${waMessage}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-110 z-50 flex items-center gap-2 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
      <span className="hidden group-hover:block whitespace-nowrap font-bold text-sm">
        Hubungi Kami
      </span>
    </a>
  );
};

export default FloatingWA;
