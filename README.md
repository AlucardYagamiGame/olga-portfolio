# Olga Shcherbatiuk · Portfolio

A one-page portfolio: hero, about, tech stack, featured projects and contacts.

## Features

- Sections: hero, about with quick facts, skills grid, projects, contacts, footer
- Hero: headline lines that rise out of clip masks, a typing role, inline highlight chips, a stats row, the photo on floating glass slabs with two cards over it, and a row of tools
- English and Ukrainian interface. The choice is saved in `localStorage` and updates `<html lang>` and the page title
- Two themes with their own look. Dark: near-black, violet and teal accents, glass surfaces. Light: soft grey, white cards, dark pill buttons and pastel gradient decorations. The first visit follows the system setting, the choice is saved, and an inline script in `index.html` applies it before the page paints
- Sticky header with a dashed divider, a "Let's connect" button and the current section highlighted. Below 960px a burger opens a full-screen menu that slides in from the right
- A large featured project card, smaller cards for other projects and a "coming soon" tile, all with a 3D tilt and glare on hover
- A cursor trail and a background grid that lights up around the cursor (desktop with a mouse only, turned off over the header)
- Sections appear on scroll with staggered fade, slide and scale animations (`Reveal` component on `IntersectionObserver`, no animation library)
- Respects `prefers-reduced-motion`: the reveal animations, the tilt, the cursor trail and smooth scrolling turn off
- Responsive from 320px to wide desktop, with semantic markup, visible focus states and accessible labels

## Tech stack

- React 18, TypeScript, Vite
- SCSS Modules with shared variables, mixins and theme tokens (CSS custom properties)
- DM Sans and Inter from Google Fonts
- lucide-react for icons, react-type-animation for the typing effect
- ESLint, Prettier, Husky, lint-staged, GitHub Actions

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command                | What it does                                   |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | dev server                                     |
| `npm run build`        | type check and production build                |
| `npm run preview`      | preview the production build                   |
| `npm run typecheck`    | type check only                                |
| `npm run lint`         | ESLint                                         |
| `npm run format:check` | Prettier check                                 |
| `npm run check`        | types, ESLint, Prettier and build all together |
| `npm run fix-style`    | auto-fix ESLint and Prettier issues            |

## Project structure

```
src/
  assets/        avatar and project screenshots
  components/    Header, Footer, Logo, LanguageSwitch, ThemeToggle, SectionHeading, PillLink,
                 RichText, Decor, Reveal, BrandIcon, CursorEffects
  theme/         ThemeProvider and theme context
  constants/     links, navigation, skills and projects data
  hooks/         useTranslation, useActiveSection
  i18n/          dictionaries (en, ua), types and LanguageProvider
  sections/      Hero, About, Skills, Projects, Contacts
  styles/        global styles, variables and mixins
  utils/         pointer media query helper
```

## Editing content

- Texts: `src/i18n/en.ts` and `src/i18n/ua.ts`. Both follow the `Dictionary` type, so TypeScript reports a missing translation.
- Links, skills and projects: `src/constants/`.
- Colors and fonts: the CSS variables in `src/styles/global.scss`.

## Quality checks

Husky runs lint-staged before each commit. GitHub Actions runs type check, lint, format check and build on every pull request and on pushes to `main`.
