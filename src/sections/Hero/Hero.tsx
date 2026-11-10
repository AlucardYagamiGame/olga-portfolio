import { Cloud, Zap } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

import avatar from '@/assets/avatar.webp';
import { Decor } from '@/components/Decor';
import { PillLink } from '@/components/PillLink';
import { RichText } from '@/components/RichText';
import { useTranslation } from '@/hooks';

import styles from './Hero.module.scss';

import type { HeroCardId } from '@/i18n';
import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

const ROLE_DELAY = 2000;

const TECH_ROW: readonly {
  name: string;
  look: 'italic' | 'wide' | 'caps' | 'soft';
}[] = [
  { name: 'React', look: 'italic' },
  { name: 'TypeScript', look: 'italic' },
  { name: 'supabase', look: 'wide' },
  { name: 'Vite', look: 'caps' },
  { name: 'Figma', look: 'italic' },
  { name: 'Claude', look: 'soft' },
];

const CARDS: readonly { id: HeroCardId; icon: LucideIcon }[] = [
  { id: 'speed', icon: Zap },
  { id: 'costs', icon: Cloud },
];

const SLABS = [0, 1, 2];

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;

export const Hero = () => {
  const { language, t } = useTranslation();
  const sequence = t.hero.roles.flatMap((role) => [role, ROLE_DELAY]);

  return (
    <section
      id="home"
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <div className={styles.grid}>
        <div className={styles.content}>
          <p
            className={`${styles.greeting} ${styles.enter}`}
            style={delay(0.15)}
          >
            <span
              className={styles.status}
              aria-hidden="true"
            />
            <span>{t.hero.greeting}</span>
            <span className="visually-hidden">{t.hero.roles.join(', ')}</span>
            <span
              className={styles.role}
              aria-hidden="true"
            >
              <TypeAnimation
                key={language}
                sequence={sequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </p>

          <div className={styles.titleWrap}>
            <Decor
              shape="cloud"
              size={46}
              className={styles.cloud}
            />
            <h1
              id="hero-title"
              className={styles.title}
            >
              <span className="visually-hidden">{`${t.hero.name}. `}</span>
              {t.hero.headline.map((line, index) => (
                <span
                  key={index}
                  className={styles.line}
                >
                  <span
                    className={styles.lineInner}
                    style={delay(0.3 + index * 0.12)}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <Decor
              shape="heart"
              size={34}
              className={styles.heart}
            />
          </div>

          <p
            className={`${styles.description} ${styles.enter}`}
            style={delay(0.75)}
          >
            <RichText text={t.hero.description} />
          </p>

          <div className={styles.actions}>
            <span
              className={styles.settle}
              style={delay(0.9)}
            >
              <PillLink
                href="#contacts"
                withArrow
              >
                {t.hero.contactMe}
              </PillLink>
            </span>
            <span
              className={styles.enter}
              style={delay(1)}
            >
              <PillLink
                href="#projects"
                variant="secondary"
              >
                {t.hero.viewProjects}
              </PillLink>
            </span>
          </div>

          <ul className={styles.stats}>
            {t.hero.stats.map(({ value, label }, index) => (
              <li
                key={label}
                className={`${styles.stat} ${styles.enter}`}
                style={delay(1.1 + index * 0.1)}
              >
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`${styles.artwork} ${styles.fadeIn}`}
          style={delay(0.4)}
        >
          <div
            className={styles.glow}
            aria-hidden="true"
          />
          <div
            className={styles.slabs}
            aria-hidden="true"
          >
            {SLABS.map((index) => (
              <span
                key={index}
                className={styles.slab}
                style={{ '--n': index } as CSSProperties}
              />
            ))}
          </div>
          <div className={styles.photoFrame}>
            <img
              className={styles.photo}
              src={avatar}
              alt={t.hero.photoAlt}
              width={640}
              height={640}
            />
          </div>
          <Decor
            shape="sparkle"
            size={30}
            className={styles.sparkleLarge}
          />
          <Decor
            shape="sparkle"
            size={18}
            className={styles.sparkleSmall}
          />

          {CARDS.map(({ id, icon: Icon }, index) => (
            <div
              key={id}
              className={`${styles.cardSlot} ${styles[`slot-${id}`]}`}
            >
              <article
                className={`${styles.card} ${styles.lift}`}
                style={delay(1.35 + index * 0.15)}
              >
                <span className={styles.cardIcon}>
                  <Icon
                    size={22}
                    aria-hidden="true"
                  />
                </span>
                <span className={styles.cardText}>
                  <span className={styles.cardKicker}>
                    {t.hero.cards[id].kicker}
                  </span>
                  <span className={styles.cardTitle}>
                    {t.hero.cards[id].title}
                  </span>
                </span>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tech}>
        <p
          className={`${styles.techLabel} ${styles.fadeIn}`}
          style={delay(1.6)}
        >
          {t.hero.techLabel}
        </p>
        <ul className={styles.techList}>
          {TECH_ROW.map(({ name, look }, index) => (
            <li
              key={name}
              className={`${styles.techItem} ${styles[look]} ${styles.fadeIn}`}
              style={delay(1.65 + index * 0.08)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
