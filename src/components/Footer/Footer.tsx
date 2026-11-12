import { ArrowUp, Heart } from 'lucide-react';

import { BrandIcon } from '@/components/BrandIcon';
import { DEVELOPER } from '@/constants';
import { useTranslation } from '@/hooks';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <a
            className={styles.backToTop}
            href="#home"
          >
            <ArrowUp
              size={18}
              aria-hidden="true"
            />
            {t.footer.backToTop}
          </a>
        </div>

        <div className={styles.connect}>
          <h2 className={styles.heading}>{t.footer.connect}</h2>
          <ul className={styles.socials}>
            <li>
              <a
                className={styles.social}
                href={DEVELOPER.linkedin.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`LinkedIn, ${t.contacts.opensInNewTab}`}
              >
                <BrandIcon
                  brand="linkedin"
                  size={20}
                />
              </a>
            </li>
            <li>
              <a
                className={styles.social}
                href={DEVELOPER.github.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`GitHub, ${t.contacts.opensInNewTab}`}
              >
                <BrandIcon
                  brand="github"
                  size={20}
                />
              </a>
            </li>
            <li>
              <a
                className={styles.social}
                href={DEVELOPER.telegram.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Telegram, ${t.contacts.opensInNewTab}`}
              >
                <BrandIcon
                  brand="telegram"
                  size={20}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>{t.footer.rights(year)}</p>
        <p className={styles.made}>
          {t.footer.madeWith}
          <Heart
            className={styles.heart}
            size={16}
            fill="currentColor"
            aria-hidden="true"
          />
          <span className="visually-hidden">{t.footer.love}</span>
        </p>
      </div>
    </footer>
  );
};
