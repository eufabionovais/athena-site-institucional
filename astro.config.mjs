// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://eufabionovais.github.io/',
  base: process.env.NODE_ENV === "production" ? '/janus-site-institucional' : '/',
  output: 'static',
  compressHTML: false,   
  build: {
    format: "file",
    assets: "assets",
    inlineStylesheets: "never"
  },  
  devToolbar: {
    enabled: false
  },  
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,      
    }
  }
});