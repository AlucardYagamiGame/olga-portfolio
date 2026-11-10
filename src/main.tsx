import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { LanguageProvider } from '@/i18n';
import { ThemeProvider } from '@/theme';

import { App } from './App';

import '@/styles/global.scss';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
