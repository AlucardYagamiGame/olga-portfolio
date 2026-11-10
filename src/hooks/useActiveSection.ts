import { useEffect, useState } from 'react';

export const useActiveSection = <T extends string>(ids: readonly T[]) => {
  const [active, setActive] = useState<T>(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as T);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [ids]);

  return active;
};
