<script setup lang="ts">
import { settings } from '~/utils/state';
import API from './utils/api';

LoadSettings();
// API.Setup(import.meta.dev);
API.Setup(false); // use this if you dont have your own backend running

if (API.TokenCookie.value) await API.RefreshInfo();
else API.Logout(); // clean up regardless
</script>

<template>
    <NuxtLoadingIndicator color="#a3a2d8" />
    <ClientOnly>
        <SettingsHandler />
    </ClientOnly>

    <div :class="{ 'font-simple': settings.simpleFont }">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>

    <Transition name="image">
        <div
            class="fixed left-0 top-0 z-50 grid h-screen max-h-screen w-screen grid-rows-[calc(100vh-64px),64px] bg-1/75"
            v-if="state.image_showing && state.image"
        >
            <div class="flex items-center justify-center p-32" @click="state.image = undefined">
                <img class="size-full max-h-full max-w-full object-contain" :src="API.ResolveAsset(state.image.url)" />
            </div>
            <div class="flex flex-col items-center justify-center bg-2 text-lg">{{ state.image.name }}</div>
        </div>
    </Transition>
</template>

<style lang="scss">
html {
    @apply scroll-m-16 scroll-smooth;
}

body {
    @apply overflow-x-hidden bg-1 font-mono text-text;
}

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

.image-enter-active,
.image-leave-active {
    transition: all 200ms;

    img {
        transition: all 400ms cubic-bezier(0.22, 1, 0.36, 1);
    }
}

.image-enter-to,
.image-leave-from {
    opacity: 1;

    img {
        scale: 1;
    }
}

.image-leave-to,
.image-enter-from {
    opacity: 0;

    img {
        scale: 0.95;
    }
}
</style>
