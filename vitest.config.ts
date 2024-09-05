import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // global variables
    environment: 'jsdom', // use of jsdom for testing React components
    setupFiles: './src/setupTests.ts', //Setup file to connect global matchers
  },
});