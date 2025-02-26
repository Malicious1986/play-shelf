
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react(),tailwindcss()],
  base: "/",
  build: {
    outDir: "dist",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

const vitestConfig = defineVitestConfig({
  test: { 
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    coverage: {
      include: ["src/components/**", "src/pages/**"],
      exclude: [
        "src/components/ui/**",
        "src/utils/constants.ts",
      ],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
