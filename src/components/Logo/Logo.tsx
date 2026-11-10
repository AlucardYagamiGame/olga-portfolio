import { DollarSign } from 'lucide-react';

import styles from './Logo.module.scss';

interface LogoProps {
  label: string;
  className?: string;
}

export const Logo = ({ label, className }: LogoProps) => (
  <a
    className={`${styles.logo} ${className ?? ''}`}
    href="#home"
    aria-label={label}
  >
    <span
      className={styles.mark}
      aria-hidden="true"
    >
      <DollarSign
        size={24}
        strokeWidth={1.5}
      />
    </span>
    <span
      className={styles.wordmark}
      aria-hidden="true"
    >
      Olga
      <sup className={styles.sup}>dev</sup>
    </span>
  </a>
);
