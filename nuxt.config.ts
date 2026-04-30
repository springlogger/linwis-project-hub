// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vesp/nuxt-fontawesome',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  fontawesome: {
    icons: {
      solid: [],
      regular: []
    }
  },
})
