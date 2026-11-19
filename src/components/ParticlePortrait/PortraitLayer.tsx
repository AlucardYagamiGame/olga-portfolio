import { useEffect, useRef } from 'react';

import { useTheme } from '@/hooks';

import { makeLightImage } from './lightPortrait';
import styles from './ParticlePortrait.module.scss';
import { loadSilhouette } from './silhouette';

/**
 * The still, sharp portrait. It is painted once per theme and never
 * animated. The backdrop around the figure is transparent, so it sits right
 * on the page. The light theme gets its own recoloured, filled and smoothed
 * copy; the dark theme uses the poster as it is.
 */
export const PortraitLayer = ({ label }: { label: string }) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let cancelled = false;

    if (!canvas || !ctx) {
      return;
    }

    loadSilhouette()
      .then(({ image }) => {
        if (cancelled) {
          return;
        }

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.putImageData(
          theme === 'light' ? makeLightImage(image) : image,
          0,
          0,
        );
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.layer} ${styles.portrait}`}
      role="img"
      aria-label={label}
    />
  );
};
