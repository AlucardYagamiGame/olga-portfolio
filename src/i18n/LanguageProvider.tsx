import { useEffect, useMemo, useState } from 'react';

import { en } from './en';
import { LanguageContext } from './LanguageContext';
import { ua } from './ua';

import type { Dictionary, Language } from './types';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'olga-portfolio-language';

const DICTIONARIES: Record<Language, Dictionary> = { en, ua };

const HTML_LANG: Record<Language, string> = { en: 'en', ua: 'uk' };

const isLanguage = (value: unknown): value is Language =>
  value === 'en' || value === 'ua';

const readSavedLanguage = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const getInitialLanguage = (): Language => {
  const saved = readSavedLanguage();

  if (isLanguage(saved)) {
    return saved;
  }

  return navigator.language.toLowerCase().startsWith('uk') ? 'ua' : 'en';
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language];
    document.title = DICTIONARIES[language].meta.title;

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      return;
    }
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t: DICTIONARIES[language] }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
