import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/',
  server: {
    open: true,
  },
  css: {
    modules: {
      generateScopedName:
        mode === 'development' ? '[name]__[local]' : '[hash:base64:6]',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
