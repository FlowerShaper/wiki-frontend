import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/home/HomeView.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "article-view",
            component: () => import("@/views/article/ArticleView.vue"),
        },
    ],
});

export default router;
