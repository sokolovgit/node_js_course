export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      }
  }
})