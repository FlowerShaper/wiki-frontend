// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/icon', '@nuxtjs/mdc'],
    srcDir: 'src',
    components: true,
    app: {
        pageTransition: {
            name: 'page-fade',
        },
    },
    experimental: {
        asyncContext: true,
    }
});
