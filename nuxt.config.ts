// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/icon', '@nuxtjs/mdc'],
    srcDir: 'src',
    components: true,
    app: {
        head: {
            title: 'Camellia Wiki',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            meta: [{ name: 'darkreader', content: 'meow' }],
        },
        pageTransition: {
            name: 'page-fade',
        },
    },
    experimental: {
        asyncContext: true,
    }
});
