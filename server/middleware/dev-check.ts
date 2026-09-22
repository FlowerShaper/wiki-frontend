export default defineEventHandler((event) => {
    if (event.path.toLowerCase().startsWith('/api')) {
        if (!import.meta.dev) throw new Error('Tried accessing editor API in non-dev.');
    }
});
