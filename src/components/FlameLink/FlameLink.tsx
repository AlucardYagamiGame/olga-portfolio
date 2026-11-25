import { useEffect, useRef } from 'react';

import { PillLink } from '@/components/PillLink';
import { canUsePointerEffects } from '@/utils/pointer';

import styles from './FlameLink.module.scss';

import type { ReactNode } from 'react';

const FOLLOW = 0.25;
const HEAT_EASE = 0.15;
const GLOW_EASE = 0.2;
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
    let glow = 0;
    let targetGlow = 0;
    let frame = 0;

    const paint = () => {
      wrap.style.setProperty('--flame-x', `${x.toFixed(1)}px`);
      wrap.style.setProperty(
        '--flame-text-x',
        `${(x - labelLeft).toFixed(1)}px`,
      );
      wrap.style.setProperty('--flame-heat', heat.toFixed(3));
      wrap.style.setProperty('--flame-glow', glow.toFixed(3));
      wrap.style.setProperty(
        '--flame-arrow-heat',
        (
          Math.min(
            1,
            Math.max(
              0,
              (ARROW_FAR - Math.abs(x - arrowCenter)) /
                (ARROW_FAR - ARROW_NEAR),
            ),
          ) * glow
        ).toFixed(3),
      );
    };

    const tick = () => {
      x += (targetX - x) * FOLLOW;
      heat += (targetHeat - heat) * HEAT_EASE;
      glow += (targetGlow - glow) * GLOW_EASE;

      // Stops once it has caught up; the next pointer move restarts it.
      if (
        Math.abs(targetX - x) < SETTLE_DISTANCE &&
        Math.abs(targetHeat - heat) < SETTLE_HEAT &&
        Math.abs(targetGlow - glow) < SETTLE_HEAT
      ) {
        x = targetX;
        heat = targetHeat;
        glow = targetGlow;
        paint();
        frame = 0;

        // The flame has fully faded out, so the label's flame styling can go.
        if (targetGlow === 0) {
          delete wrap.dataset.hot;
        }

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

      // Entering again while the flame is still fading keeps it, no pop.
      if (!wrap.dataset.hot) {
        heat = 0;
        glow = 0;
      }
      wrap.dataset.hot = 'true';
      targetGlow = 1;
      track(event);
    };

    // data-hot stays until the flame has faded out, so the label does not
    // snap back to white while the glow is still behind it.
    const handleLeave = () => {
      targetHeat = 0;
      targetGlow = 0;
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
