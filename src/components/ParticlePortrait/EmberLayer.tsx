import { useEffect, useRef } from 'react';

import { useTheme } from '@/hooks';

import { PORTRAIT, SIZE, preloadPortrait } from './images';
import styles from './ParticlePortrait.module.scss';
import { SPAWN } from './spawn';

/** Many small particles give the fine, detailed grain of the reference. */
const COUNT = 420;

/** Phones get fewer particles and a lower canvas resolution. */
const COUNT_PHONE = 200;
const PHONE_QUERY = '(max-width: 639px)';

/**
 * The particle canvas is larger than the portrait, so particles can rise
 * above and beyond it without being cut off. These are fractions of SIZE.
 */
const REACH = 1.4;
const PAD_X = 0.1;
const PAD_Y = 0.3;

/** Particles never wander left of this x, so the left side stays clean. */
const MIN_X = 320;

/** Spark zone on the photo (px): colours run along its height. */
const TOP = 60;
const BOTTOM = 500;

/** Set once the particles have run, so a theme switch restarts them at once. */
let warmedUp = false;

type Rgb = readonly [number, number, number];

/**
 * Colours of the reference, from the top of the figure to the bottom: warm
 * orange and red, hot pink, violet, electric blue, cyan. Both themes use the
 * same colours, so the animation looks the same everywhere.
 */
const SPECTRUM: readonly Rgb[] = [
  [255, 122, 40],
  [255, 56, 72],
  [255, 70, 180],
  [160, 96, 255],
  [64, 124, 255],
  [56, 224, 255],
];

/**
 * The rare white-hot particle, like the bright strands in the reference. On
 * the white page white would vanish, so it turns pale orange there.
 */
const HOT: Record<'dark' | 'light', Rgb> = {
  dark: [255, 244, 236],
  light: [255, 170, 70],
};

const lerp = (a: Rgb, b: Rgb, k: number): Rgb => [
  a[0] + (b[0] - a[0]) * k,
  a[1] + (b[1] - a[1]) * k,
  a[2] + (b[2] - a[2]) * k,
];

const spectrumColor = (
  theme: 'dark' | 'light',
  y: number,
  hot: boolean,
): string => {
  const [r, g, b] =
    hot ?
      HOT[theme]
    : (() => {
        const stops = SPECTRUM;
        const k = Math.min(
          1,
          Math.max(0, (y - TOP) / (BOTTOM - TOP) + (Math.random() - 0.5) * 0.3),
        );
        const position = k * (stops.length - 1);
        const index = Math.min(stops.length - 2, Math.floor(position));

        return lerp(stops[index], stops[index + 1], position - index);
      })();

  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, `;
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rise: number;
  drift: number;
  phase: number;
  life: number;
  age: number;
  size: number;
  /** Colour up to the alpha channel: `rgba(r, g, b, `. */
  color: string;
}

/**
 * A fine cloud of small particles behind the portrait. They leave the
 * outline of the hair on the right and at the top, drift upwards with a sway,
 * drag a hair-thin tail and fade out. Their colour follows the height they
 * were born at, warm at the top and cold at the bottom.
 */
export const EmberLayer = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const additive = theme === 'dark';
    const spawn = SPAWN;
    const phone = window.matchMedia(PHONE_QUERY).matches;
    let particles: Particle[] = [];
    let body: HTMLImageElement | null = null;
    let scale = 1;
    let last = 0;
    let frameId = 0;
    let running = false;
    let visible = false;
    let cancelled = false;

    const reset = (p: Particle, scatter: boolean) => {
      const pick = Math.floor(Math.random() * (spawn.length / 2)) * 2;
      const outward = Math.random() * 7;

      p.x = spawn[pick] + outward + (Math.random() - 0.5) * 5;
      p.y = spawn[pick + 1] - outward + (Math.random() - 0.5) * 5;
      p.phase = Math.random() * Math.PI * 2;
      p.rise = 14 + Math.random() * 52;
      p.drift = -3 + Math.random() * 18;
      p.life = 2.2 + Math.random() * 3.4;
      p.age = 0;
      p.vx = 0;
      p.vy = -1;
      // Mostly specks, a few bigger grains.
      p.size =
        Math.random() < 0.85 ?
          0.9 + Math.random() * 1.3
        : 2.2 + Math.random() * 1.6;
      p.color = spectrumColor(theme, spawn[pick + 1], Math.random() < 0.1);

      if (scatter) {
        // Start mid-flight: place the particle where it would have risen to.
        p.age = Math.random() * p.life;
        p.y -= p.rise * p.age * 0.85;
        p.x += p.drift * p.age;
      }
    };

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);

      last = now;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(
        scale,
        0,
        0,
        scale,
        scale * SIZE * PAD_X,
        scale * SIZE * PAD_Y,
      );
      ctx.globalCompositeOperation = additive ? 'lighter' : 'source-over';
      ctx.lineCap = 'round';

      for (const p of particles) {
        p.age += dt;

        if (p.age >= p.life) {
          reset(p, false);
        }

        const k = p.age / p.life;

        // The sway grows as the particle rises and cools.
        p.vx = p.drift + Math.cos(p.age * 2.4 + p.phase) * (6 + 34 * k);
        p.vy = -p.rise * (1 - 0.35 * k);
        p.x = Math.max(MIN_X, p.x + p.vx * dt);
        p.y += p.vy * dt;

        const alpha = Math.min(1, k * 8) * (1 - k) ** 0.9;
        const fill = `${p.color}${(alpha * 0.95).toFixed(2)})`;
        const radius = p.size * (1 - 0.45 * k);

        // A hair-thin tail along the path gives the strand-like grain.
        ctx.strokeStyle = `${p.color}${(alpha * 0.45).toFixed(2)})`;
        ctx.lineWidth = radius * 0.9;
        ctx.beginPath();
        ctx.moveTo(p.x - p.vx * 0.11, p.y - p.vy * 0.11);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (body) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(body, 0, 0, SIZE, SIZE);
      }
    };

    const loop = (now: number) => {
      render(now);
      frameId = requestAnimationFrame(loop);
    };

    const sync = () => {
      const shouldRun = visible && !reduced.matches && particles.length > 0;

      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        frameId = requestAnimationFrame(loop);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frameId);
      }
    };

    const resize = () => {
      const { width } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 2);

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = canvas.width;
      scale = canvas.width / (SIZE * REACH);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });

    resizeObserver.observe(canvas);
    visibility.observe(canvas);
    resize();

    let wanted = false;

    const begin = () => {
      // Light theme: wait for the mask, or particles would flash over the face.
      if (cancelled || !wanted || (!additive && !body)) {
        return;
      }

      wanted = false;
      warmedUp = true;
      particles = Array.from({ length: phone ? COUNT_PHONE : COUNT }, () => {
        const particle = {} as Particle;

        reset(particle, true);

        return particle;
      });
      sync();
    };

    const start = () => {
      wanted = true;
      begin();
      // Fetch the other theme's portrait now, so a later switch is instant.
      preloadPortrait(additive ? 'light' : 'dark');
    };

    // The particles are decoration: on the first run start them only once the
    // page has loaded and the browser is idle, so they never compete with
    // first paint. After that (a theme switch) start without any wait.
    let cancelIdle = () => {};

    const whenIdle = () => {
      if (typeof window.requestIdleCallback === 'function') {
        const id = window.requestIdleCallback(start, { timeout: 2000 });

        cancelIdle = () => window.cancelIdleCallback(id);
      } else {
        const id = window.setTimeout(start, 400);

        cancelIdle = () => window.clearTimeout(id);
      }
    };

    const onLoad = () => whenIdle();

    if (!additive) {
      // Light theme: the portrait fades out at the bottom, so particles
      // behind it would show through. Hide everything behind the figure by
      // drawing the prepared light portrait over them (destination-out).
      const mask = new Image();

      mask.onload = () => {
        body = mask;
        begin();
      };
      mask.src = PORTRAIT.light.small;
    }

    if (warmedUp) {
      start();
    } else if (document.readyState === 'complete') {
      whenIdle();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    return () => {
      cancelled = true;
      running = false;
      cancelIdle();
      window.removeEventListener('load', onLoad);
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.layer} ${styles.ember}`}
      aria-hidden="true"
    />
  );
};
