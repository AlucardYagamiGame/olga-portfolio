import { Mail } from 'lucide-react';

import { BrandIcon } from '@/components/BrandIcon';
import { Decor } from '@/components/Decor';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { DEVELOPER } from '@/constants';
import { useTranslation } from '@/hooks';

import styles from './Contacts.module.scss';

import type { ContactId } from '@/i18n';
import type { ReactNode } from 'react';

interface ContactLink {
  id: ContactId;
  href: string;
  external: boolean;
  icon: ReactNode;
}

const ICON_SIZE = 22;

const CONTACTS: readonly ContactLink[] = [
  {
    id: 'linkedin',
    href: DEVELOPER.linkedin.url,
    external: true,
    icon: (
      <BrandIcon
        brand="linkedin"
        size={ICON_SIZE}
      />
    ),
  },
  {
    id: 'github',
    href: DEVELOPER.github.url,
    external: true,
    icon: (
      <BrandIcon
        brand="github"
        size={ICON_SIZE}
      />
    ),
  },
  {
    id: 'telegram',
    href: DEVELOPER.telegram.url,
    external: true,
    icon: (
      <BrandIcon
        brand="telegram"
        size={ICON_SIZE}
      />
    ),
  },
  {
    id: 'email',
    href: `mailto:${DEVELOPER.email}`,
    external: false,
    icon: (
      <Mail
        size={ICON_SIZE}
        aria-hidden="true"
      />
    ),
  },
];

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
        {CONTACTS.map(({ id, href, external, icon }, index) => (
          <Reveal
            key={id}
            as="li"
            delay={Number((0.1 + index * 0.1).toFixed(2))}
          >
            <a
              className={styles.card}
              href={href}
              {...(external && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.text}>
                <span className={styles.title}>
                  {t.contacts.items[id].title}
                </span>
              </span>
              <span
                className={styles.chevron}
                aria-hidden="true"
              >
                ›
              </span>
              {external && (
                <span className="visually-hidden">
                  {t.contacts.opensInNewTab}
                </span>
              )}
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};
