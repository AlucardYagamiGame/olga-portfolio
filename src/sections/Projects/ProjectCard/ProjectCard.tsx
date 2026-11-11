import { Check, UserRound } from 'lucide-react';
import { useRef, useSyncExternalStore } from 'react';

import { BrandIcon } from '@/components/BrandIcon';
import { PillLink } from '@/components/PillLink';
import { useTheme, useTranslation } from '@/hooks';
import { canUsePointerEffects } from '@/utils/pointer';

import styles from './ProjectCard.module.scss';

import type { Project } from '@/constants';
import type { MouseEvent } from 'react';

const MAX_TILT = 6;
const DESKTOP_QUERY = '(min-width: 1100px)';

const subscribeDesktop = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP_QUERY);

  query.addEventListener('change', onChange);

  return () => query.removeEventListener('change', onChange);
};

const getDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;
const getDesktopServer = () => false;

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const cardRef = useRef<HTMLElement>(null);
  const text = t.projects.items[project.id];
  const titleId = `project-${project.id}`;
  const externalLabel = `${text.title}, ${t.contacts.opensInNewTab}`;
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktop,
    getDesktopServer,
  );
  const descriptionInMedia = project.featured && isDesktop;
  const description = (
    <p
      className={`${styles.description} ${descriptionInMedia ? styles.descriptionMedia : ''}`}
    >
      {text.description}
    </p>
  );
  const size = project.featured ? 'md' : 'sm';

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;

    if (!card || !canUsePointerEffects()) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const tilt = project.featured ? MAX_TILT / 2 : MAX_TILT;

    card.style.setProperty('--glare-x', `${x * 100}%`);
    card.style.setProperty('--glare-y', `${y * 100}%`);
    card.style.transform = `rotateX(${(0.5 - y) * tilt}deg) rotateY(${(x - 0.5) * tilt}deg)`;
  };

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${project.featured ? styles.featured : styles.compact}`}
    >
      <article
        ref={cardRef}
        className={styles.card}
        aria-labelledby={titleId}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className={styles.media}>
          <div className={styles.frame}>
            <span
              className={styles.frameBar}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
            <img
              className={styles.image}
              src={
                theme === 'light' && project.imageLight ?
                  project.imageLight
                : project.image
              }
              alt={t.projects.screenshotAlt(text.title)}
              width={project.imageWidth}
              height={project.imageHeight}
              loading="lazy"
            />
          </div>
          {descriptionInMedia && description}
        </div>

        <div className={styles.body}>
          <p className={styles.kicker}>{text.kicker}</p>
          <h3
            id={titleId}
            className={styles.title}
          >
            {text.title}
          </h3>

          {!descriptionInMedia && description}

          {text.highlights.length > 0 && (
            <ul className={styles.highlights}>
              {text.highlights.map((item) => (
                <li key={item}>
                  <span className={styles.check}>
                    <Check
                      size={14}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li
                key={tag}
                className={styles.tag}
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className={styles.links}>
            <PillLink
              href={project.demo}
              size={size}
              withArrow
              externalLabel={externalLabel}
            >
              {t.projects.demo}
            </PillLink>
            <PillLink
              href={project.code}
              size={size}
              variant="secondary"
              icon={
                <BrandIcon
                  brand="github"
                  size={16}
                />
              }
              externalLabel={externalLabel}
            >
              {t.projects.code}
            </PillLink>
            {project.personal && (
              <PillLink
                href={project.personal}
                size={size}
                variant="accent"
                icon={
                  <UserRound
                    size={16}
                    aria-hidden="true"
                  />
                }
                externalLabel={externalLabel}
              >
                {t.projects.personal}
              </PillLink>
            )}
          </div>
        </div>

        <span
          className={styles.glare}
          aria-hidden="true"
        />
      </article>
    </div>
  );
};
