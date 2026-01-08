"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', isHash: false },
    { name: 'Layanan', path: '/services', isHash: false },
    { name: 'Tentang Kami', path: '/about', isHash: false },
    { name: 'Artikel', path: '/articles', isHash: false },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e, link) => {
    setIsOpen(false);
    
    // Smooth scroll for hash links if on home page
    if (link.isHash && pathname === '/') {
      e.preventDefault();
      const elementId = link.path.split('#')[1];
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = (e) => {
    setIsOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-navbar shadow-2xl py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 lg:gap-4 group">
          <div className="relative">
            <img src="/logo.png" alt="Narasumber Hukum Logo" className="w-10 h-10 md:w-14 lg:w-16 md:h-14 lg:h-16 object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="flex flex-col">
             <span className="text-lg md:text-2xl font-bold tracking-[0.15em] uppercase font-serif text-gold border-b border-gold/40 pb-0.5 leading-tight">
              Narasumber Hukum
            </span>
            <span className="text-[8px] md:text-[9px] lg:text-[10px] text-white tracking-[0.3em] uppercase mt-0.5 font-sans whitespace-nowrap">
              Sentral Edukasi & Solusi
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:space-x-6 lg:space-x-8 items-center text-xs lg:text-sm font-medium uppercase tracking-wide">
          {navLinks.map((link) => (
             link.isHash && location.pathname === '/' ? (
                <a 
                  key={link.name} 
                  href={link.path.split('/')[1]}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`cursor-pointer transition duration-300 hover:text-gold text-white`}
                >
                  {link.name}
                </a>
             ) : (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className={`transition duration-300 hover:text-gold ${pathname === link.path ? 'text-gold' : 'text-white'}`}
                >
                   {link.name}
                </Link>
             )
          ))}
          <a 
            href="/#contact" 
            onClick={handleContactClick}
            className="bg-gold text-navy px-4 lg:px-5 py-2 rounded font-bold hover:bg-opacity-90 transition duration-300 uppercase text-[10px] lg:text-xs tracking-widest cursor-pointer"
          >
            Hubungi
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gold focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-navbar border-t border-white/5">
          <div className="flex flex-col p-3 space-y-3 text-sm font-medium uppercase text-center text-white">
            {navLinks.map((link) => (
              link.isHash && location.pathname === '/' ? (
                <a 
                  key={link.name} 
                  href={link.path.split('/')[1]}
                  onClick={(e) => handleNavClick(e, link)}
                  className="block hover:text-gold transition py-1.5"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.path}
                   onClick={() => setIsOpen(false)}
                  className={`block hover:text-gold transition py-1.5 ${pathname === link.path ? 'text-gold' : ''}`}
                >
                  {link.name}
                </Link>
              )
            ))}
             <a 
              href="/#contact"
              onClick={handleContactClick}
              className="block bg-gold text-navy px-5 py-2.5 rounded font-bold hover:bg-opacity-90 transition uppercase mt-1"
            >
              Hubungi
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
