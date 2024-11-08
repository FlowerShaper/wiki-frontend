<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavBar from './components/nav/NavBar.vue';
</script>

<template>
    <div class="overlap-grid w-full 2xl:w-page mx-auto px-8 pt-24 pb-16">
        <RouterView v-slot="{ Component, route }">
            <Transition name="page-fade">
                <div :key="route.path">
                    <Suspense>
                        <component :is="Component" />
                    </Suspense>
                </div>
            </Transition>
        </RouterView>
    </div>

    <NavBar />
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