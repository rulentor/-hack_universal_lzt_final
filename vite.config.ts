import path from 'node:path'
//import { defineConfig } from 'vite'
import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin.js'
//import vike from 'vike/plugin'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import {
  PrimeVueResolver,
} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

//import VueMacros from 'unplugin-vue-macros/vite'
//import generateSitemap from 'vite-ssg-sitemap'
//import Markdown from 'unplugin-vue-markdown/vite'
//import VueI18n from '@intlify/unplugin-vue-i18n/vite'
//import VueDevTools from 'vite-plugin-vue-devtools'
//import LinkAttributes from 'markdown-it-link-attributes'
//import Unocss from 'unocss/vite'
//import Shiki from 'markdown-it-shikiji'
//import WebfontDownload from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/

//export default defineConfig({
const config: UserConfig = {
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
	//vike(),
	viteSSR(),
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),	

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        //'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
		//'chart.js',
		{
          from: 'chart.js',
          imports: ['Chart'],
          type: true,
        },
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
      ],
	  resolvers: [
	    PrimeVueResolver(),
	  ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({

      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components
      include: [/\.vue$/, /\.vue\?vue/],
      dts: true, //'src/components.d.ts',
	  //resolvers: [
      //  PrimeVueResolver(),
      //],
      types: [
	    {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
	    {
          from: 'chart.js',
          names: ['Chart'],
        },		
	  ],
	  
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
	
  ],
  
/*
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/],
        }),
      },
    }),

    // https://github.com/antfu/unocss
    Unocss(),
    // https://github.com/unplugin/unplugin-vue-markdown
    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    // https://github.com/feat-agency/vite-plugin-webfont-dl
    //WebfontDownload(),
    // https://github.com/webfansplz/vite-plugin-vue-devtools
    //VueDevTools(),

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/.test.ts'],
    environment: 'jsdom',
  },
  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
	format: 'cjs',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
	  preload: 'media',
    },
    onFinished() {
      generateSitemap()
    },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window'], //, /vue-i18n/
  },  
*/

//})
}

export default config