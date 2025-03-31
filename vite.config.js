import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
      external: [
        '/js/translations.js',
        '/js/main.js',
        '/js/modern.js',
        '/js/one-page-slide.js'
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/js'
    }
  }
}); 