import bikeLanding from '@/assets/projects/bike-landing.webp';
import niceGadgets from '@/assets/projects/nice-gadgets.webp';
import todoAppLight from '@/assets/projects/todo-app-light.webp';
import todoApp from '@/assets/projects/todo-app.svg';

import type { ProjectId } from '@/i18n';

export interface Project {
  id: ProjectId;
  image: string;
  imageLight?: string;
  imageWidth: number;
  imageHeight: number;
  tags: readonly string[];
  code: string;
  demo: string;
  featured?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'niceGadgets',
    image: niceGadgets,
    imageWidth: 1200,
    imageHeight: 578,
    tags: [
      'React',
      'TypeScript',
      'Zustand',
      'React Router',
      'Supabase',
      'Vercel Functions',
      'SCSS Modules',
      'motion',
    ],
    code: 'https://github.com/AlucardYagamiGame/gadgets-catalog',
    demo: 'https://gadgets-catalog-swart.vercel.app',
    featured: true,
  },
  {
    id: 'todoApp',
    image: todoApp,
    imageLight: todoAppLight,
    imageWidth: 1200,
    imageHeight: 675,
    tags: ['React', 'TypeScript', 'REST API', 'Bulma', 'Cypress'],
    code: 'https://github.com/AlucardYagamiGame/todo-app-with-api',
    demo: 'https://alucardyagamigame.github.io/todo-app-with-api/',
  },
  {
    id: 'bikeLanding',
    image: bikeLanding,
    imageWidth: 1200,
    imageHeight: 582,
    tags: ['HTML5', 'SCSS', 'BEM', 'Figma'],
    code: 'https://github.com/AlucardYagamiGame/bike-landing-page',
    demo: 'https://alucardyagamigame.github.io/bike-landing-page/',
  },
];
