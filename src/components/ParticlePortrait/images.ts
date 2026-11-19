import type { Theme } from '@/theme/ThemeContext';

/** Sparks live in this coordinate space (px), whatever the image size is. */
export const SIZE = 640;

/**
 * The portrait is prepared ahead of time: a transparent backdrop, and for
 * the light theme a recoloured, filled and smoothed copy. Nothing is
 * computed in the browser. The files live in public/ so index.html can
 * preload the right one. If you regenerate them, rename them (cache).
 */
const build = (theme: Theme) => {
  const small = `/portrait/${theme}-480.webp`;
  const large = `/portrait/${theme}-800.webp`;

  return { small, large, srcSet: `${small} 480w, ${large} 800w` };
};

export const PORTRAIT: Record<
  Theme,
  { small: string; large: string; srcSet: string }
> = {
  dark: build('dark'),
  light: build('light'),
};

/** Keep in sync with the preload link in index.html. */
export const PORTRAIT_SIZES = '(max-width: 639px) 80vw, 640px';
