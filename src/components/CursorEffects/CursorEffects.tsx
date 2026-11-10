import { useEffect, useRef } from 'react';

import { canUsePointerEffects } from '@/utils/pointer';

import styles from './CursorEffects.module.scss';

const DOTS_COUNT = 12;
const FOLLOW_FACTOR = 0.35;
const HIDE_DELAY = 120;
const DOTS = Array.from({ length: DOTS_COUNT }, (_, index) => index);
const NO_EFFECTS_SELECTOR = 'header';
const OFFSCREEN = '-1000px';

export const CursorEffects = () => {
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trail = trailRef.current;

    if (!trail || !canUsePointerEffects()) {
      return;
    }

    const dots = Array.from(trail.children) as HTMLElement[];
    const positions = dots.map(() => ({ x: -100, y: -100 }));
    const mouse = { x: -100, y: -100 };
    const root = document.documentElement;
    let frame = 0;
    let hideTimer = 0;
    let isSuppressed = false;

    const animate = () => {
      positions.forEach((point, index) => {
        const target = index === 0 ? mouse : positions[index - 1];

        point.x += (target.x - point.x) * FOLLOW_FACTOR;
        point.y += (target.y - point.y) * FOLLOW_FACTOR;

        const scale = 1 - index / (DOTS_COUNT + 4);

        dots[index].style.transform =
          `translate3d(${point.x}px, ${point.y}px, 0) scale(${scale})`;
      });

      frame = requestAnimationFrame(animate);
    };

    const hide = () => {
      window.clearTimeout(hideTimer);
      trail.dataset.visible = 'false';
      root.style.setProperty('--mouse-x', OFFSCREEN);
      root.style.setProperty('--mouse-y', OFFSCREEN);
    };

    const handleMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      if (target?.closest(NO_EFFECTS_SELECTOR)) {
        isSuppressed = true;
        hide();

        return;
      }

      mouse.x = event.clientX;
      mouse.y = event.clientY;

      if (isSuppressed) {
        isSuppressed = false;
        positions.forEach((point) => {
          point.x = mouse.x;
          point.y = mouse.y;
        });
      }

      root.style.setProperty('--mouse-x', `${event.clientX}px`);
      root.style.setProperty('--mouse-y', `${event.clientY}px`);
      trail.dataset.visible = 'true';
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        trail.dataset.visible = 'false';
      }, HIDE_DELAY);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      ref={trailRef}
      className={styles.trail}
      data-visible="false"
      aria-hidden="true"
    >
      {DOTS.map((index) => (
        <span
          key={index}
          className={styles.dot}
          style={{ opacity: 1 - index / DOTS_COUNT }}
        />
      ))}
    </div>
  );
};
