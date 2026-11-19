import { EmberLayer } from './EmberLayer';
import styles from './ParticlePortrait.module.scss';
import { PortraitLayer } from './PortraitLayer';
import { ShadowLayer } from './ShadowLayer';

/**
 * Stacked layers, back to front: a soft shadow (light theme only), a fine
 * cloud of particles, and the sharp still portrait. Only the particles move,
 * so the face stays perfectly clear.
 */
export const ParticlePortrait = ({ label }: { label: string }) => (
  <div className={styles.stack}>
    <ShadowLayer />
    <EmberLayer />
    <PortraitLayer label={label} />
  </div>
);
