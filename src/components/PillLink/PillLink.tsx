import { ArrowRight } from 'lucide-react';

import styles from './PillLink.module.scss';

import type { ReactNode } from 'react';

interface PillLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'md' | 'sm';
  icon?: ReactNode;
  withArrow?: boolean;
  externalLabel?: string;
  className?: string;
  onClick?: () => void;
}

export const PillLink = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  withArrow = false,
  externalLabel,
  className,
  onClick,
}: PillLinkProps) => {
  const isExternal = externalLabel !== undefined;
  const classes = [
    styles.pill,
    styles[variant],
    styles[size],
    withArrow ? styles.withArrow : '',
    className ?? '',
  ].join(' ');

  return (
    <a
      className={classes}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
    >
      {icon && (
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
      {withArrow && (
        <span
          className={styles.arrow}
          aria-hidden="true"
        >
          <ArrowRight
            size={size === 'sm' ? 16 : 18}
            strokeWidth={2.25}
          />
        </span>
      )}
      {isExternal && <span className="visually-hidden">{externalLabel}</span>}
    </a>
  );
};
