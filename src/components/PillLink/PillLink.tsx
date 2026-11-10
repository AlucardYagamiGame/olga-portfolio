import { ChevronRight } from 'lucide-react';

import styles from './PillLink.module.scss';

import type { ReactNode } from 'react';

interface PillLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
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
      rel={isExternal ? 'noreferrer' : undefined}
      onClick={onClick}
    >
      {withArrow && (
        <span
          className={styles.arrow}
          aria-hidden="true"
        >
          <ChevronRight
            size={size === 'sm' ? 14 : 16}
            strokeWidth={2.5}
          />
        </span>
      )}
      {icon && (
        <span
          className={styles.icon}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
      {isExternal && <span className="visually-hidden">{externalLabel}</span>}
    </a>
  );
};
