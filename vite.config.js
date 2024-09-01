import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import pluginPurgeCss from "vite-plugin-purgecss-updated-v5";

export default defineConfig({
  plugins: [
    vue(),
    pluginPurgeCss({
      variables: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
