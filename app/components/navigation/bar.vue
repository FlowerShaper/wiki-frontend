<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const icons: NavigationMenuItem[] = [
    {
        label: 'GitHub',
        icon: 'ph:github-logo-bold',
        to: 'https://github.com/FlowerShaper',
    },
    {
        label: 'Discord',
        icon: 'ph:discord-logo-bold',
        to: 'https://discord.gg/camellia',
    },
    {
        label: 'Search',
        icon: 'ph:magnifying-glass-bold',
        onSelect: () => (state.overlays.search = !state.overlays.search),
    },
];
</script>

<template>
    <nav class="fixed left-0 top-0 z-20 h-16 w-full border-b-2 border-background-3 bg-background-1">
        <div class="mx-auto flex h-full w-full flex-row items-center justify-between px-5 2xl:w-page">
            <NuxtLink class="h-full py-2" to="/">
                <LogoLong class="h-full" />
            </NuxtLink>
            <div class="flex flex-row items-center gap-2">
                <UButton variant="ghost" color="neutral" :icon="i.icon" v-for="i in icons" :to="i.to" target="_blank" @click="i.onSelect" />
                <div class="md:mx-4 h-6 w-1 rounded md:bg-background-3"></div>
                <NavigationProfile />
            </div>
        </div>
    </nav>
</template>
