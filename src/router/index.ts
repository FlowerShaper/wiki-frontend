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
            component: () => import("@/views/auth/AuthComplete.vue"),
        },
        {
            path: "/settings",
            name: "settings",
            component: () => import("@/views/settings/SettingsView.vue"),
            children: [
                {
                    alias: "",
                    path: "account",
                    name: "settings:account",
                    component: () =>
                        import("@/views/settings/subviews/SettingsAccount.vue"),
                },
                {
                    path: "appearance",
                    name: "settings:appearance",
                    component: () =>
                        import("@/views/settings/subviews/SettingsAppearance.vue"),
                },
            ],
        },
        {
            path: "/user/:id",
            name: "user-profile",
            component: () => import("@/views/user/UserView.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "article-view",
            component: ArticleView,
        },
    ],
    scrollBehavior: (to, from, ___) => {
        if (to.path == from.path) return { el: to.hash, top: 80 };

        return { top: 0 };
    },
});

export default router;
