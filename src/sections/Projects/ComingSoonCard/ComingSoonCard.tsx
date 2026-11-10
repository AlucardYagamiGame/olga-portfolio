import { Hammer } from 'lucide-react';

import { Decor } from '@/components/Decor';
import { PillLink } from '@/components/PillLink';
import { DEVELOPER } from '@/constants';
import { useTranslation } from '@/hooks';

import styles from './ComingSoonCard.module.scss';

export const ComingSoonCard = () => {
  const { t } = useTranslation();
  const { badge, title, text, link } = t.projects.comingSoon;

  return (
    <article
      className={styles.card}
      aria-labelledby="coming-soon-title"
    >
      <span className={styles.iconWrap}>
        <span className={styles.icon}>
          <Hammer
            size={24}
            aria-hidden="true"
          />
        </span>
        <Decor
          shape="sparkle"
          size={20}
          className={styles.sparkle}
        />
      </span>
      <span className={styles.badge}>{badge}</span>
      <h3
        id="coming-soon-title"
        className={styles.title}
      >
        {title}
      </h3>
      <p className={styles.text}>{text}</p>
      <PillLink
        href={DEVELOPER.github.url}
        size="sm"
        variant="secondary"
        withArrow
        externalLabel={t.contacts.opensInNewTab}
      >
        {link}
      </PillLink>
    </article>
  );
};
