<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavBar from './components/nav/NavBar.vue';
import SettingsHandler from './components/SettingsHandler.vue';

import ProfileOverlay from './overlays/profile/ProfileOverlay.vue';

import { settings } from './utils/State';
</script>

<template>
    <SettingsHandler />
    <div :class="{ 'font-sans': settings.simpleFont }">
        <div class="overlap-grid w-full 2xl:w-page mx-auto min-h-screen px-8 pt-24 pb-16">
            <RouterView v-slot="{ Component, route }">
                <Transition name="page-fade">
                    <div class="w-full max-w-full" :key="route.path">
                        <component :is="Component" />
                    </div>
                </Transition>
            </RouterView>
        </div>

        <div class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-20">
            <ProfileOverlay />
        </div>

        <NavBar />
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