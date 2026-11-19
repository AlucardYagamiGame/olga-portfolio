import { useTheme } from '@/hooks';

import { PORTRAIT, PORTRAIT_SIZES } from './images';
import styles from './ParticlePortrait.module.scss';

/**
 * The still, sharp portrait: a plain image with a transparent backdrop, so
 * the browser can fetch and decode it right away. The light theme has its
 * own recoloured copy.
 */
export const PortraitLayer = ({ label }: { label: string }) => {
  const { theme } = useTheme();
  const { large, srcSet } = PORTRAIT[theme];

  return (
    <img
      className={`${styles.layer} ${styles.portrait}`}
      src={large}
      srcSet={srcSet}
      sizes={PORTRAIT_SIZES}
      width={800}
      height={800}
      alt={label}
      decoding="async"
    />
  );
};
