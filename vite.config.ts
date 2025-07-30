/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Makes Vitest APIs like describe, it, expect globally available
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['node_modules', '**/*.d.ts'],
    environment: 'jsdom', // Specifies the JSDOM environment for browser-like testing
    setupFiles: ['./src/setupTests.ts'], // Path to your test setup file
  },
});
