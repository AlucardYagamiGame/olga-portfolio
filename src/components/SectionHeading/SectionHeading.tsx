import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';

import styles from './SectionHeading.module.scss';

import type { ReactNode } from 'react';

interface SectionHeadingProps {
  id: string;
  kicker: string;
  title: string;
  description?: string;
  centered?: boolean;
  children?: ReactNode;
}

export const SectionHeading = ({
  id,
  kicker,
  title,
  description,
  centered,
  children,
}: SectionHeadingProps) => (
  <Reveal className={`${styles.heading} ${centered ? styles.centered : ''}`}>
    <p className={styles.kicker}>{kicker}</p>
    <h2
      id={id}
      className={styles.title}
    >
      <span className={styles.titleText}>{title}</span>
      {children}
    </h2>
    {description && (
      <p className={styles.description}>
        <RichText text={description} />
      </p>
    )}
  </Reveal>
);
