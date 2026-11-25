import { useEffect, useRef } from 'react';

import { PillLink } from '@/components/PillLink';
import { canUsePointerEffects } from '@/utils/pointer';

import styles from './FlameLink.module.scss';

import type { ReactNode } from 'react';

const FOLLOW = 0.25;
const HEAT_EASE = 0.15;
const SETTLE_DISTANCE = 0.3;
const SETTLE_HEAT = 0.002;
const HEAT_BOOST = 1.12;
// The arrow turns dark once the flame is within this distance of it.
const ARROW_NEAR = 72;
const ARROW_FAR = 84;

interface FlameLinkProps {
  href: string;
  children: ReactNode;
  withArrow?: boolean;
}

// A PillLink whose hover is a flame: a hot spot follows the cursor inside the
// pill, and an aura flares outside it on the side the cursor is closer to.
export const FlameLink = ({ href, children, withArrow }: FlameLinkProps) => {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;

    if (!wrap || !canUsePointerEffects()) {
      return;
    }

    const label = wrap.querySelector<HTMLElement>('[data-flame-label]');
    const arrow = wrap.querySelector<SVGElement>('svg');
    let labelLeft = 0;
    let arrowCenter = Infinity;
    let isMeasured = false;
    let x = 0;
    let targetX = 0;
    let heat = 0;
    let targetHeat = 0;
    let frame = 0;

    const paint = () => {
      wrap.style.setProperty('--flame-x', `${x.toFixed(1)}px`);
      wrap.style.setProperty(
        '--flame-text-x',
        `${(x - labelLeft).toFixed(1)}px`,
      );
      wrap.style.setProperty('--flame-heat', heat.toFixed(3));
      wrap.style.setProperty(
        '--flame-arrow-heat',
        Math.min(
          1,
          Math.max(
            0,
            (ARROW_FAR - Math.abs(x - arrowCenter)) / (ARROW_FAR - ARROW_NEAR),
          ),
        ).toFixed(3),
      );
    };

    const tick = () => {
      x += (targetX - x) * FOLLOW;
      heat += (targetHeat - heat) * HEAT_EASE;

      // Stops once it has caught up; the next pointer move restarts it.
      if (
        Math.abs(targetX - x) < SETTLE_DISTANCE &&
        Math.abs(targetHeat - heat) < SETTLE_HEAT
      ) {
        x = targetX;
        heat = targetHeat;
        paint();
        frame = 0;

        return;
      }

      paint();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    // Where the label and the arrow sit inside the pill, so they can react to
    // the flame. Measured on hover, and on the first move if that was missed.
    const measure = (rect: DOMRect) => {
      labelLeft = label ? label.getBoundingClientRect().left - rect.left : 0;

      if (arrow) {
        const box = arrow.getBoundingClientRect();

        arrowCenter = box.left + box.width / 2 - rect.left;
      }

      isMeasured = true;
    };

    const track = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();

      if (!isMeasured) {
        measure(rect);
      }
      const ratio = (event.clientX - rect.left) / rect.width;

      targetX = event.clientX - rect.left;
      // The aura only flares towards the ends, never in the middle.
      targetHeat = Math.min(1, Math.abs(ratio - 0.5) * 2 * HEAT_BOOST) ** 1.25;
      wrap.style.setProperty('--flame-side', ratio >= 0.5 ? '88%' : '12%');
      start();
    };

    const handleEnter = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();

      x = event.clientX - rect.left;
      measure(rect);
      heat = 0;
      wrap.dataset.hot = 'true';
      track(event);
    };

    const handleLeave = () => {
      delete wrap.dataset.hot;
      targetHeat = 0;
      start();
    };

    wrap.addEventListener('pointerenter', handleEnter);
    wrap.addEventListener('pointermove', track, { passive: true });
    wrap.addEventListener('pointerleave', handleLeave);

    return () => {
      wrap.removeEventListener('pointerenter', handleEnter);
      wrap.removeEventListener('pointermove', track);
      wrap.removeEventListener('pointerleave', handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span
      ref={wrapRef}
      className={styles.wrap}
      data-cursor-effects="off"
    >
      <span
        className={styles.aura}
        aria-hidden="true"
      />
      <PillLink
        href={href}
        withArrow={withArrow}
        className={styles.link}
      >
        <span
          className={styles.core}
          aria-hidden="true"
        >
          {/* Order matters: halo, then ember, then the cream glow over both. */}
          <span className={styles.halo} />
          <span className={styles.ember} />
          <span className={styles.glow} />
        </span>
        <span
          className={styles.label}
          data-flame-label=""
        >
          {children}
        </span>
      </PillLink>
    </span>
  );
};
