// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxt/image', '@nuxt/icon'],
    app: {
        pageTransition: {
            name: 'page-fade',
        },
    },
    experimental: {
        asyncContext: true,
    },
});