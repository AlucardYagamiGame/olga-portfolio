import { useTranslation } from '@/hooks';

import styles from './LanguageSwitch.module.scss';

import type { Language } from '@/i18n';

const LANGUAGES: readonly { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ua', label: 'UA' },
];

export const LanguageSwitch = () => {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div
      className={styles.switch}
      role="group"
      aria-label={t.header.languageLabel}
    >
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`${styles.option} ${language === code ? styles.active : ''}`}
          aria-pressed={language === code}
          lang={code === 'ua' ? 'uk' : 'en'}
          onClick={() => setLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
