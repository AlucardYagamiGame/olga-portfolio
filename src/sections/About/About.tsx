import { Accessibility, Cloud, FileCode2, Zap } from 'lucide-react';

import { Decor } from '@/components/Decor';
import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { SectionHeading } from '@/components/SectionHeading';
import { useTranslation } from '@/hooks';

import styles from './About.module.scss';

import type { FactId } from '@/i18n';
import type { LucideIcon } from 'lucide-react';

const FACTS: readonly { id: FactId; icon: LucideIcon }[] = [
  { id: 'conversion', icon: FileCode2 },
  { id: 'speed', icon: Zap },
  { id: 'costs', icon: Cloud },
  { id: 'markets', icon: Accessibility },
];

export const About = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className={styles.about}
      aria-labelledby="about-title"
    >
      <SectionHeading
        id="about-title"
        kicker={t.about.kicker}
        title={t.about.title}
      />

      <div className={styles.grid}>
        <Reveal className={styles.story}>
          <Decor
            shape="sparkle"
            size={26}
            className={styles.sparkle}
          />
          {t.about.paragraphs.map((paragraph, index) => (
            <Reveal
              key={paragraph}
              as="p"
              delay={0.1 + index * 0.1}
            >
              <RichText text={paragraph} />
            </Reveal>
          ))}
        </Reveal>

        <aside
          className={styles.facts}
          aria-labelledby="facts-title"
        >
          <h3
            id="facts-title"
            className="visually-hidden"
          >
            {t.about.factsTitle}
          </h3>
          <ul className={styles.list}>
            {FACTS.map(({ id, icon: Icon }, index) => (
              <Reveal
                key={id}
                as="li"
                className={styles.fact}
                variant="right"
                delay={0.15 + index * 0.1}
              >
                <span className={styles.icon}>
                  <Icon
                    size={20}
                    aria-hidden="true"
                  />
                </span>
                <span>
                  <span className={styles.factTitle}>
                    {t.about.facts[id].title}
                  </span>
                  <span className={styles.factText}>
                    {t.about.facts[id].text}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
};
