export type Language = 'en' | 'ua';

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'contacts';

export type ProjectId = 'niceGadgets' | 'todoApp' | 'bikeLanding';

export type FactId = 'conversion' | 'speed' | 'costs' | 'markets';

export type HeroCardId = 'speed' | 'costs';

export type ContactId = 'linkedin' | 'github';

export interface QuickFact {
  title: string;
  text: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroCard {
  kicker: string;
  title: string;
}

export interface ProjectText {
  title: string;
  kicker: string;
  description: string;
  highlights: readonly string[];
}

export interface Dictionary {
  meta: {
    title: string;
  };
  header: {
    homeLabel: string;
    openMenu: string;
    closeMenu: string;
    navLabel: string;
    languageLabel: string;
    themeToLight: string;
    themeToDark: string;
    cta: string;
  };
  nav: Record<SectionId, string>;
  hero: {
    greeting: string;
    name: string;
    roles: readonly string[];
    headline: readonly string[];
    description: string;
    viewProjects: string;
    contactMe: string;
    photoAlt: string;
    stats: readonly StatItem[];
    cards: Record<HeroCardId, HeroCard>;
    techLabel: string;
  };
  about: {
    kicker: string;
    title: string;
    paragraphs: readonly string[];
    factsTitle: string;
    facts: Record<FactId, QuickFact>;
  };
  skills: {
    kicker: string;
    title: string;
    description: string;
  };
  projects: {
    kicker: string;
    title: string;
    description: string;
    code: string;
    demo: string;
    screenshotAlt: (title: string) => string;
    items: Record<ProjectId, ProjectText>;
    comingSoon: {
      badge: string;
      title: string;
      text: string;
      link: string;
    };
  };
  contacts: {
    kicker: string;
    title: string;
    description: string;
    items: Record<ContactId, QuickFact>;
    opensInNewTab: string;
  };
  footer: {
    tagline: string;
    backToTop: string;
    connect: string;
    rights: (year: number) => string;
    madeWith: string;
    love: string;
  };
}
