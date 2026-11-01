import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'
import Vue from '@vitejs/plugin-vue'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [Vue()],
    test: {
      globals: true,
      environment: "jsdom",
    },
    json: {
      stringify: true, // Ensure JSON files, including GeoJSON, are properly handled
    },
    root: ".", // Define the root
  })
)
