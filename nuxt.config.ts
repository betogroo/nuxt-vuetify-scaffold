// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  supabase: {
    redirectOptions: {
      exclude: ['/about', '/signup'],
      cookieRedirect: true,
      callback: '/confirm',
    },

    redirect: true,
  },

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'vuetify-nuxt-module',
  ],

  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  vuetify: {
    vuetifyOptions: {
      defaults: {
        VTextField: {
          variant: 'outlined',
          density: 'compact',
        },
      },
    },
  },
})
