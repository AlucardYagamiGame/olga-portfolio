import { useEffect, useRef, useState } from 'react';

import { LanguageSwitch } from '@/components/LanguageSwitch';
import { Logo } from '@/components/Logo';
import { PillLink } from '@/components/PillLink';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SECTION_IDS } from '@/constants';
import { useActiveSection, useTranslation } from '@/hooks';

import styles from './Header.module.scss';

import type { CSSProperties } from 'react';

const DESKTOP_QUERY = '(min-width: 960px)';

const order = (index: number) => ({ '--i': index }) as CSSProperties;

export const Header = () => {
  const { t } = useTranslation();
  const active = useActiveSection(SECTION_IDS);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const media = window.matchMedia(DESKTOP_QUERY);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleMedia = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);
    media.addEventListener('change', handleMedia);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
      media.removeEventListener('change', handleMedia);
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header
      ref={headerRef}
      className={styles.header}
    >
      <div className={styles.bar}>
        <div
          className={styles.enter}
          style={order(0)}
        >
          <Logo label={t.header.homeLabel} />
        </div>

        <nav
          id="main-nav"
          className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
          aria-label={t.header.navLabel}
        >
          <ul className={styles.list}>
            {SECTION_IDS.map((id, index) => (
              <li
                key={id}
                className={styles.enter}
                style={order(index + 1)}
              >
                <a
                  className={`${styles.link} ${active === id ? styles.active : ''}`}
                  href={`#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={close}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`${styles.actions} ${styles.enter}`}
          style={order(SECTION_IDS.length + 1)}
        >
          <LanguageSwitch />
          <ThemeToggle />
          <PillLink
            className={styles.cta}
            href="#contacts"
            size="sm"
            withArrow
          >
            {t.header.cta}
          </PillLink>
          <button
            type="button"
            className={`${styles.burger} ${isOpen ? styles.burgerOpen : ''}`}
            aria-expanded={isOpen}
            aria-controls="main-nav"
            aria-label={isOpen ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};
