import { defineNuxtConfig } from 'nuxt/config'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'


export default defineNuxtConfig({
  app: {
    head: {
      title: 'A Nuxt 3 WebSiteNav',
      link: [{ rel: 'icon', type: 'image/*', href: '/favicon.svg' }]
    }
  },
  ssr:true,
  modules: [
    'nuxt-windicss',
    '@pinia/nuxt',
    "@pinia-plugin-persistedstate/nuxt",
    'unplugin-icons/nuxt',
    '@vueuse/nuxt',
    [
      '@intlify/nuxt3',
      {
        localeDir: 'locales',
        vueI18n: {
          locale: 'en'
        }
      }
    ]
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer'],
  },
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false,
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
    plugins: [
      Components({
        resolvers: [
          NaiveUiResolver(),
          IconsResolver({
            componentPrefix: ''
          }),
        ], // Automatically register all components in the `components` directory
      }),
    ],
    ssr: { noExternal: ['@nuxtjs/vite'] }
  }
})
