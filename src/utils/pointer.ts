export const FINE_POINTER_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export const canUsePointerEffects = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(FINE_POINTER_QUERY).matches;
