import { useCallback, useEffect, useMemo, useState } from 'react';

import { ThemeContext } from './ThemeContext';

import type { Theme } from './ThemeContext';
import type { ReactNode } from 'react';

const STORAGE_KEY = 'olga-portfolio-theme';
const LIGHT_QUERY = '(prefers-color-scheme: light)';

const THEME_COLOR: Record<Theme, string> = {
  dark: '#0d0c11',
  light: '#f5f5f5',
};

const isTheme = (value: unknown): value is Theme =>
  value === 'dark' || value === 'light';

const readSavedTheme = (): Theme | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return isTheme(saved) ? saved : null;
  } catch {
    return null;
  }
};

const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    return;
  }
};

const getInitialTheme = (): Theme => {
  const current = document.documentElement.dataset.theme;

  if (isTheme(current)) {
    return current;
  }

  return (
    readSavedTheme() ??
    (window.matchMedia(LIGHT_QUERY).matches ? 'light' : 'dark')
  );
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia(LIGHT_QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      if (!readSavedTheme()) {
        setTheme(event.matches ? 'light' : 'dark');
      }
    };

    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';

      saveTheme(next);

      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
