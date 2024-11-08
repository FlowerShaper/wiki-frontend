import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/home/HomeView.vue";
import ArticleView from "@/views/article/ArticleView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/oauth/complete",
            name: "oauth-complete",
            component: () => import('@/views/auth/AuthComplete.vue')
        },
        {
            path: "/user/:id",
            name: "user-profile",
            component: () => import('@/views/user/UserView.vue')
        },
        {
            path: "/:pathMatch(.*)*",
            name: "article-view",
            component: ArticleView,
        },
    ],
    scrollBehavior: (to, from, ___) => {
        if (to.path == from.path)
            return { el: to.hash }

        return { top: 0 }
    }
});

export default router;
