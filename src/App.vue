<script setup lang="ts">
import { RouterView, type RouteLocationNormalizedLoadedGeneric } from 'vue-router'

import NavBar from './components/nav/NavBar.vue';
import FooterBar from './components/footer/FooterBar.vue';
import SettingsHandler from './components/SettingsHandler.vue';

import ProfileOverlay from './overlays/profile/ProfileOverlay.vue';

import { settings } from './utils/State';

function StringifyRoute(route: RouteLocationNormalizedLoadedGeneric) {
    if (!route.name)
        return route.path;

    let result = (route.name as string).split(':')[0];

    for (const [key, value] of Object.entries(route.params))
        result += `/${key}:${value}`;

    return result;
}
</script>

<template>
    <SettingsHandler />
    <div :class="{ 'font-system': settings.simpleFont }">
        <div class="overlap-grid w-full 2xl:w-page mx-auto min-h-screen pt-16">
            <RouterView v-slot="{ Component, route }">
                <Transition name="page-fade">
                    <component :is="Component" :key="StringifyRoute(route)" />
                </Transition>
            </RouterView>
        </div>

        <div class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-20">
            <ProfileOverlay />
        </div>

        <NavBar />
		<FooterBar />
    </div>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
    transition: all 300ms;
}

.page-fade-enter-to,
.page-fade-leave-from {
    opacity: 1;
    transition-delay: 100ms;
}

.page-fade-leave-to,
.page-fade-enter-from {
    opacity: 0;
}
</style>