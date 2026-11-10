import { BrandIcon } from '@/components/BrandIcon';
import { Decor } from '@/components/Decor';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { DEVELOPER } from '@/constants';
import { useTranslation } from '@/hooks';

import styles from './Contacts.module.scss';

import type { ContactId } from '@/i18n';

const CONTACTS: readonly ContactId[] = ['linkedin', 'github'];

export const Contacts = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contacts"
      className={styles.contacts}
      aria-labelledby="contacts-title"
    >
      <SectionHeading
        id="contacts-title"
        kicker={t.contacts.kicker}
        title={t.contacts.title}
        description={t.contacts.description}
        centered
      >
        <Decor
          shape="cloud"
          size={42}
          className={styles.cloud}
        />
        <Decor
          shape="heart"
          size={30}
          className={styles.heart}
        />
      </SectionHeading>

      <ul className={styles.list}>
        {CONTACTS.map((id, index) => (
          <Reveal
            key={id}
            as="li"
            delay={0.1 + index * 0.1}
          >
            <a
              className={styles.card}
              href={DEVELOPER[id].url}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.icon}>
                <BrandIcon
                  brand={id}
                  size={22}
                />
              </span>
              <span className={styles.text}>
                <span className={styles.title}>
                  {t.contacts.items[id].title}
                </span>
                <span className={styles.subtitle}>
                  {t.contacts.items[id].text}
                </span>
                <span className={styles.handle}>{DEVELOPER[id].handle}</span>
              </span>
              <span
                className={styles.chevron}
                aria-hidden="true"
              >
                ›
              </span>
              <span className="visually-hidden">
                {t.contacts.opensInNewTab}
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};
