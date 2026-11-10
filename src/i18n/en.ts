import type { Dictionary } from './types';

export const en: Dictionary = {
  meta: {
    title: 'Olga Shcherbatiuk | Full Stack Developer',
  },
  header: {
    homeLabel: 'Olga Shcherbatiuk, back to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    navLabel: 'Main navigation',
    languageLabel: 'Site language',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    cta: 'Let’s connect',
  },
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contacts: 'Contact',
  },
  hero: {
    greeting: 'Hi, I’m Olga ·',
    name: 'Olga Shcherbatiuk',
    roles: [
      'Full Stack Developer',
      'React & TypeScript Developer',
      'Serverless with Supabase',
    ],
    headline: ['Scalable web apps', 'built with React', 'and TypeScript.'],
    description:
      'Full stack developer. I help engineering teams with {strict typing}, {clean architecture}, {WCAG} accessibility and a {serverless} backend that goes live without running servers.',
    viewProjects: 'See the projects',
    contactMe: 'Discuss your project',
    photoAlt: 'Photo of Olga Shcherbatiuk',
    stats: [
      { value: '100%', label: 'Strict TypeScript' },
      { value: 'FID < 1s', label: 'interaction delay target' },
      { value: 'Mobile-First', label: 'responsive layouts from 320px' },
    ],
    cards: {
      speed: {
        kicker: 'Core Web Vitals',
        title: 'Lazy loading and optimized images keep the first load light',
      },
      costs: {
        kicker: 'Serverless',
        title: 'Supabase backend: no servers to provision or maintain',
      },
    },
    techLabel: 'Tools I ship with',
  },
  about: {
    kicker: 'Engineering approach',
    title: 'Maintainable code, measurable performance',
    paragraphs: [
      'I build web products with {TypeScript} and {React}. Strict types document the data flow, catch errors at build time and make refactoring and onboarding faster. State lives in Zustand, styles in SCSS Modules.',
      'In Nice Gadgets, an e-commerce app, I built the product catalog with filters, a cart synced to the account, checkout with Nova Poshta branch search and an {AI search}. The backend runs on serverless functions and Supabase, so there is no own server infrastructure to pay for or maintain.',
      'Performance, {accessibility} and localization are part of the definition of done. Lazy loading and image optimization target Core Web Vitals, semantic markup follows WCAG, and the EN/UA interface runs from one codebase.',
    ],
    factsTitle: 'What you get',
    facts: {
      conversion: {
        title: 'Strict TypeScript',
        text: '→ Fewer runtime errors, faster refactoring and onboarding',
      },
      speed: {
        title: 'Lazy loading & image optimization',
        text: '→ Better Core Web Vitals and a quick first load',
      },
      costs: {
        title: 'Serverless & Supabase',
        text: '→ No servers to maintain and a quick start',
      },
      markets: {
        title: 'WCAG & EN/UA i18n',
        text: '→ Accessible interface, two languages from one codebase',
      },
    },
  },
  skills: {
    kicker: 'Skills & expertise',
    title: 'My tech stack',
    description:
      'A typed React stack with a serverless backend: quick to start, cheap to run and easy to maintain.',
  },
  projects: {
    kicker: 'Portfolio',
    title: 'Featured projects',
    description:
      'Real products with real user flows, from a full online store to a landing page.',
    code: 'Code',
    demo: 'Live demo',
    screenshotAlt: (title) => `Screenshot of ${title}`,
    items: {
      niceGadgets: {
        title: 'Nice Gadgets',
        kicker: 'E-commerce · Team lead & Tech lead',
        description:
          'An online gadget store with the whole path to a purchase: catalog filters and search, a cart and favourites synced to the account, checkout with Nova Poshta branch search and an AI assistant that helps customers find and compare products.',
        highlights: [
          'Secure by design: API keys stay on the server, so no leaked keys or surprise bills',
          'Keeps the catalog online even without the database: falls back to bundled data',
          'Two languages and two themes from one codebase',
        ],
      },
      todoApp: {
        title: 'Todo App with API',
        kicker: 'REST API',
        description:
          'A task manager synced with a REST API. Users always see what is happening: loaders on every action and clear error messages.',
        highlights: [],
      },
      bikeLanding: {
        title: 'Bike Landing Page',
        kicker: 'Landing page',
        description:
          'A bike shop landing page built closely to a Figma design, so the brand looks the same on every screen.',
        highlights: [],
      },
    },
    comingSoon: {
      badge: 'Coming soon',
      title: 'More projects in progress',
      text: 'I am building new projects right now. Follow me on GitHub to see them first.',
      link: 'Follow on GitHub',
    },
  },
  contacts: {
    kicker: 'Contact',
    title: 'Let’s connect',
    description:
      'Looking for a developer for your team or product? Message me on LinkedIn or Telegram, or {explore} my code on GitHub.',
    items: {
      linkedin: { title: 'LinkedIn', text: 'Message me directly' },
      github: { title: 'GitHub', text: 'The code of all my projects' },
      telegram: { title: 'Telegram', text: 'Write me a message' },
    },
    opensInNewTab: 'opens in a new tab',
  },
  footer: {
    tagline:
      'Typed, accessible and fast web apps on React, TypeScript and Supabase.',
    backToTop: 'Back to top',
    connect: 'Connect',
    rights: (year) => `© ${year} Olga Shcherbatiuk. All rights reserved.`,
    madeWith: 'Made with React, TypeScript and',
    love: 'love',
  },
};
