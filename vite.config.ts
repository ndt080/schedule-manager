import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [vue(), VitePWA({
      base: '/',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      srcDir: "src",
      filename: "sw.ts",
      strategies: "injectManifest",
      manifest: {
        start_url: ".",
        name: 'schedule.manager',
        short_name: 'schedule.manager',
        display: 'standalone',
        prefer_related_applications: true,
        theme_color: '#4DBA87',
        background_color: '#161719',
        icons: [
          {
            src: './img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: './img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './img/icons/android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: './img/icons/android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: './img/icons/apple-touch-icon-60x60.png',
            sizes: '60x60',
            type: 'image/png',
          },
          {
            src: './img/icons/apple-touch-icon-76x76.png',
            sizes: '76x76',
            type: 'image/png',
          },
          {
            src: './img/icons/apple-touch-icon-120x120.png',
            sizes: '120x120',
            type: 'image/png',
          },
          {
            src: './img/icons/apple-touch-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: './img/icons/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: './img/icons/msapplication-icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: './img/icons/mstile-150x150.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: './img/icons/safari-pinned-tab.svg',
            sizes: '16x16',
            type: 'image/png',
            purpose: 'maskable',
          },
        ]
      },
      workbox: {
        globPatterns: [],
      }
    })],
    build: {
      sourcemap: process.env.SOURCE_MAP === 'true',
      rollupOptions: {
        plugins: [],
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/_buttons.scss";
            @import "@/assets/styles/_scroll.scss";
            @import "@/assets/styles/_workspace.scss";
            @import "@/assets/styles/_form.scss";
            @import "@/assets/styles/_vars.scss";
            @import "@/assets/styles/_fonts.scss";
            @import "@/assets/styles/main.scss";
        `,
        },
      },
    },
  };
});
