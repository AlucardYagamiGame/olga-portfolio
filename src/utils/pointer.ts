export const FINE_POINTER_QUERY =
  '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export const canUsePointerEffects = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(FINE_POINTER_QUERY).matches;

export const subscribePointerEffects = (onChange: () => void) => {
  const query = window.matchMedia(FINE_POINTER_QUERY);

  query.addEventListener('change', onChange);

  return () => query.removeEventListener('change', onChange);
};
