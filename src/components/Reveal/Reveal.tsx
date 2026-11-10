import { useEffect, useState } from 'react';

import type { CSSProperties, ReactNode } from 'react';

export type RevealVariant = 'up' | 'scale' | 'left' | 'right';

type RevealTag = 'div' | 'li' | 'p' | 'span';

interface RevealProps {
  as?: RevealTag;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  children: ReactNode;
}

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -8% 0px',
};

export const Reveal = ({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className,
  children,
}: RevealProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    if (!element || isRevealed) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsRevealed(true);
        observer.disconnect();
      }
    }, OBSERVER_OPTIONS);

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, isRevealed]);

  return (
    <Tag
      ref={setElement}
      className={className}
      data-reveal={variant}
      data-revealed={isRevealed || undefined}
      style={{ '--reveal-delay': `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
};
