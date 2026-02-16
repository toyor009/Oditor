// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2026-02-01',

  ssr: false,

  devtools: { enabled: true },

  ui: {
    colorMode: false,
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
  },

  router: {
    options: {
      strict: false,
    },
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
  },

  typescript: {
    typeCheck: false,
    strict: true,
  },

  runtimeConfig: {
    public: {
      app_name: import.meta.env.NUXT_APP_NAME,
      app_full_name: import.meta.env.NUXT_APP_FULL_NAME,
      app_env: import.meta.env.NUXT_APP_ENV || 'development',
      api_base_url: import.meta.env.NUXT_API_BASE_URL,
    },
  },
});
