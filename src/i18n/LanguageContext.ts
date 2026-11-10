import { createContext } from 'react';

import type { Dictionary, Language } from './types';

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
