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
            component: () => import("@/views/article/ArticleView.vue"),
        },
    ],
    scrollBehavior: (to, from, ___) => {
        if (to.path == from.path)
            return { el: to.hash }

        return { top: 0 }
    }
});

export default router;
