// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2026-02-01",

  ssr: false,

  devtools: { enabled: true },

  ui: {
    colorMode: false,
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/eslint",
    "@nuxt/image",
    "@pinia/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  router: {
    options: {
      strict: false,
    },
  },

  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./app/assets/icons",
      },
    ],
  },

  typescript: {
    typeCheck: false,
    strict: true,
  },

  runtimeConfig: {
    public: {
      app_env: process.env.APP_ENV || "development",
      api_base_url: process.env.API_BASE_URL || "/api",
    },
  },
});
