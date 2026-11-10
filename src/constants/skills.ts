import {
  Atom,
  Boxes,
  Braces,
  CodeXml,
  Database,
  FileCode,
  FlaskConical,
  GitBranch,
  Palette,
  PenTool,
  Plug,
  Route,
  Sparkles,
  Zap,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
}

export const SKILLS: readonly Skill[] = [
  { name: 'TypeScript', icon: FileCode, color: '#3178c6' },
  { name: 'JavaScript', icon: Braces, color: '#f7df1e' },
  { name: 'React', icon: Atom, color: '#61dafb' },
  { name: 'React Router', icon: Route, color: '#f44250' },
  { name: 'Zustand', icon: Boxes, color: '#e2b57a' },
  { name: 'HTML5', icon: CodeXml, color: '#e34f26' },
  { name: 'SCSS Modules', icon: Palette, color: '#cc6699' },
  { name: 'Vite', icon: Zap, color: '#9d7bff' },
  { name: 'Supabase', icon: Database, color: '#3ecf8e' },
  { name: 'REST API', icon: Plug, color: '#f0abfc' },
  { name: 'Vitest', icon: FlaskConical, color: '#fcc72b' },
  { name: 'Git & CI/CD', icon: GitBranch, color: '#f05032' },
  { name: 'Figma', icon: PenTool, color: '#ff7262' },
  { name: 'AI Tooling', icon: Sparkles, color: '#d97757' },
];
