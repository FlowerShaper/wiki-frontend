<script setup lang="ts">
import { settings } from '~/utils/state';

LoadSettings();
// api.Setup(import.meta.dev);
api.Setup(false); // use this if you dont have your own backend running

if (api.TokenCookie.value) await api.RefreshInfo();
else api.Logout(); // clean up regardless
</script>

<template>
    <NuxtLoadingIndicator color="#a3a2d8" />
    <NuxtRouteAnnouncer />
    <ClientOnly>
        <SettingsHandler />
    </ClientOnly>

    <UApp>
        <div :class="{ 'font-simple': settings.simpleFont }">
            <NuxtLayout>
                <NuxtPage :transition="{ name: 'fade', mode: 'in-out', type: 'transition' }" />
            </NuxtLayout>
        </div>

        <Transition name="image">
            <div
                class="fixed left-0 top-0 z-50 grid h-screen max-h-screen w-screen grid-rows-[calc(100vh-64px),64px] bg-background-1/75"
                v-if="state.image_showing && state.image"
            >
                <div class="flex items-center justify-center p-32" @click="state.image = undefined">
                    <img class="size-full max-h-full max-w-full object-contain" :src="api.ResolveAsset(state.image.url)" />
                </div>
                <div class="flex flex-col items-center justify-center bg-background-2 text-lg">{{ state.image.name }}</div>
            </div>
        </Transition>
    </UApp>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all 300ms;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
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
