"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'id' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('id');

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('nh-locale') as Locale;
    if (savedLocale && (savedLocale === 'id' || savedLocale === 'en')) {
      setLocale(savedLocale);
    }
  }, []);

  // Save locale to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('nh-locale', locale);
    // Update HTML lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = require('@/lib/translations').translations[locale];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
