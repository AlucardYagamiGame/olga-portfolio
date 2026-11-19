import { useEffect, useRef } from 'react';

import { useTheme } from '@/hooks';

import { makeLightImage } from './lightPortrait';
import styles from './ParticlePortrait.module.scss';
import { loadSilhouette } from './silhouette';

/** Soft violet (#7c3aed), the colour of the shadow. */
const SHADOW = [124, 58, 237] as const;

/**
 * The shadow under the portrait on the light page: the portrait's outline
 * filled with violet and blurred by CSS. It sits below the particles, so
 * they stay bright. The dark theme has no shadow and renders nothing.
 */
export const ShadowLayer = () => {
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

        const light = makeLightImage(image);
        const shadow = new ImageData(light.width, light.height);

        for (let i = 0; i < light.data.length; i += 4) {
          shadow.data[i] = SHADOW[0];
          shadow.data[i + 1] = SHADOW[1];
          shadow.data[i + 2] = SHADOW[2];
          shadow.data[i + 3] = light.data[i + 3];
        }

        canvas.width = shadow.width;
        canvas.height = shadow.height;
        ctx.putImageData(shadow, 0, 0);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [theme]);

  if (theme !== 'light') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.layer} ${styles.shadow}`}
      aria-hidden="true"
    />
  );
};
