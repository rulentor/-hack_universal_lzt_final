/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

declare module '*.vue' {
  const Component: any
  export default Component
}

/**
 * @deprecated
 */
 /*
declare module 'layouts-generated' {
  import type { RouteRecordRaw } from 'vue-router'
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}

declare module 'virtual:generated-layouts' {
  import type { RouteRecordRaw } from 'vue-router'
  export function setupLayouts(routes: RouteRecordRaw[]): RouteRecordRaw[]
}
*/