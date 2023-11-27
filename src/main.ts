//import { ViteSSG } from 'vite-ssg'
import viteSSR, { ClientOnly } from 'vite-ssr'
import { createHead } from '@vueuse/head'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
// import generatedRoutes from 'virtual:generated-pages'
// import Previewer from 'virtual:vue-component-preview'
// import { installI18n, extractLocaleFromPath, DEFAULT_LOCALE } from './i18n'
import { createPinia } from 'pinia'
import { routes } from 'vue-router/auto/routes'
import App from './App.vue'
import type { UserModule } from './types'

//const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
  base: import.meta.env.BASE_URL,
})
const pinia = createPinia()

//export default viteSSR(App, { routes }, (context) => {

/*
const app = createApp(App)
app
  .use(router)
  .use(pinia)
  .mount('#app')
*/

// https://github.com/frandiox/vite-ssr
export default viteSSR(
  App,
  {
    routes: setupLayouts(routes),
    base: ({ url }) => {
      //const locale = extractLocaleFromPath(url.pathname)
      //return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
	  return '/'
    },
  },
  async (ctx) => {
    Object.values(import.meta.glob('./modules/*.ts',{ eager: true })).map((i) =>
	  i.install?.(ctx)
	)
  
    //Object.values(import.meta.globEager('./modules/*.ts')).map((i) =>
    //  i.install?.(ctx)
    //)
    const { app, url, router, isClient, initialState, initialRoute } = ctx
    const head = createHead()
    app.use(head)
    app.component(ClientOnly.name, ClientOnly)
    //await installI18n(app, extractLocaleFromPath(initialRoute.href))
    if (import.meta.env.SSR) {
	  // vuex
      initialState.test = 'This should appear in page-view-source'
    } else {
      // In browser, initialState will be hydrated with data from SSR
      console.log('Initial state:', initialState)
    }

    // getPageProps request before each route navigation
    router.beforeEach(async (to, from, next) => {
      if (!!to.meta.state && (!import.meta.env.DEV || import.meta.env.SSR)) {
        return next()
      }

      // runtime variable so it won't be tree-shaked.
      // Use Vite's `import.meta.env.SSR` instead for tree-shaking.
      const baseUrl = isClient ? '' : url.origin

      try {
        // Get our page props from our custom API:
        const res = await fetch(
          `${baseUrl}/api/get-page-props?path=${encodeURIComponent(
            to.path
          )}&name=${to.name}&client=${isClient}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        // During SSR, this is the same as modifying initialState
        to.meta.state = await res.json()
      } catch (error) {
        console.error(error)
        // redirect to error route
      }

      next()
    })

    return { head }
  }
)