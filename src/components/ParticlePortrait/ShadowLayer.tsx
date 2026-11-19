import { useTheme } from '@/hooks';

import { PORTRAIT } from './images';
import styles from './ParticlePortrait.module.scss';

import type { CSSProperties } from 'react';

/**
 * The shadow under the portrait on the light page: the portrait's outline
 * filled with violet (a CSS mask of the light image) and blurred by CSS. It
 * sits below the particles, so they stay bright. The dark theme has no
 * shadow and renders nothing.
 */
export const ShadowLayer = () => {
  const { theme } = useTheme();

  if (theme !== 'light') {
    return null;
  }

  return (
    <div
      className={`${styles.layer} ${styles.shadow}`}
      style={
        { '--shadow-shape': `url(${PORTRAIT.light.small})` } as CSSProperties
      }
      aria-hidden="true"
    />
  );
};
