import { Moon, Sun } from 'lucide-react';

import { useTheme, useTranslation } from '@/hooks';

import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={isDark ? t.header.themeToLight : t.header.themeToDark}
      title={isDark ? t.header.themeToLight : t.header.themeToDark}
      onClick={toggleTheme}
    >
      {isDark ?
        <Sun
          size={20}
          aria-hidden="true"
        />
      : <Moon
          size={20}
          aria-hidden="true"
        />
      }
    </button>
  );
};
