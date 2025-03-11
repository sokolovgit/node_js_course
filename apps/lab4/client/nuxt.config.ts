export default defineNuxtConfig({

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },

  compatibilityDate: '2025-03-11',

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
