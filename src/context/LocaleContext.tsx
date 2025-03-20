
import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';

type Locale = 'en' | 'de';
type Translations = Record<string, string>;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, variables?: Record<string, string>) => string;
}

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  de: deTranslations,
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    // Check if a locale preference is stored in localStorage
    const savedLocale = localStorage.getItem('homeiq-locale');
    
    // Check if navigator language is available
    const browserLocale = navigator.language.split('-')[0] as Locale;
    
    // Return the saved locale if it exists, otherwise use the browser locale or default to 'en'
    return (savedLocale as Locale) || (browserLocale === 'de' ? 'de' : 'en');
  });

  useEffect(() => {
    localStorage.setItem('homeiq-locale', locale);
  }, [locale]);

  // Enhanced translation function with variable support
  const t = (key: string, variables?: Record<string, string>): string => {
    let text = translations[locale]?.[key] || key;
    
    // Replace variables if provided
    if (variables) {
      Object.entries(variables).forEach(([varName, value]) => {
        text = text.replace(new RegExp(`{${varName}}`, 'g'), value);
      });
    }
    
    return text;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
