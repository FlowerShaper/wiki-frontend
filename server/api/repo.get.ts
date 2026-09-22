export default defineEventHandler(async (ev) => {
    const repo = await LocalRepo.Load();
    return repo;
});
