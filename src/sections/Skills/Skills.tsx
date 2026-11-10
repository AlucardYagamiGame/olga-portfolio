import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { SKILLS } from '@/constants';
import { useTranslation } from '@/hooks';

import styles from './Skills.module.scss';

import type { CSSProperties } from 'react';

const STAGGER = 0.05;

export const Skills = () => {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className={styles.skills}
      aria-labelledby="skills-title"
    >
      <SectionHeading
        id="skills-title"
        kicker={t.skills.kicker}
        title={t.skills.title}
        description={t.skills.description}
        centered
      />

      <ul className={styles.grid}>
        {SKILLS.map(({ name, icon: Icon, color }, index) => (
          <Reveal
            key={name}
            as="li"
            variant="scale"
            delay={index * STAGGER}
          >
            <div
              className={styles.card}
              style={{ '--brand': color } as CSSProperties}
            >
              <span className={styles.icon}>
                <Icon
                  size={24}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <span className={styles.name}>{name}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
};
