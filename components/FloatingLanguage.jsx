"use client";
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FloatingLanguage = () => {
    const { locale, setLocale } = useLanguage();

    const toggleLanguage = () => {
        setLocale(locale === 'id' ? 'en' : 'id');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="fixed bottom-6 left-6 bg-navy text-white p-4 rounded-full shadow-lg hover:bg-gold hover:text-navy transition duration-300 transform hover:scale-110 z-50 flex items-center justify-center gap-2 group border border-white/10"
            aria-label="Switch Language"
        >
            <Globe size={24} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-bold text-sm tracking-widest uppercase">
                {locale === 'id' ? 'ID' : 'EN'}
            </span>
        </button>
    );
};

export default FloatingLanguage;
