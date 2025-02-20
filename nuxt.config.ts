// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ... your other config

  build: {
    transpile: ['vuedraggable']
  },

  runtimeConfig: {
    public: {
      dev: process.env.NODE_ENV !== 'production'
    }
  }
}) 