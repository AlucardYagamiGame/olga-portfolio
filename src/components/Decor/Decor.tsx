import { useId } from 'react';

import styles from './Decor.module.scss';

export type DecorShape = 'heart' | 'cloud' | 'sparkle';

const PATHS: Record<DecorShape, string> = {
  heart:
    'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  cloud:
    'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
  sparkle:
    'M12 1c.7 5.3 3.1 8.6 11 11-7.9 2.4-10.3 5.7-11 11-.7-5.3-3.1-8.6-11-11 7.9-2.4 10.3-5.7 11-11z',
};

interface DecorProps {
  shape: DecorShape;
  size?: number;
  className?: string;
}

export const Decor = ({ shape, size = 40, className }: DecorProps) => {
  const gradientId = useId();

  return (
    <svg
      className={`${styles.decor} ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            className={styles.stop1}
            offset="0.5"
          />
          <stop
            className={styles.stop2}
            offset="0.8"
          />
          <stop
            className={styles.stop3}
            offset="1"
          />
        </linearGradient>
      </defs>
      <path
        d={PATHS[shape]}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};
