<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import BookIcon from '~/assets/images/logo/dark-book.png';

const dev = import.meta.dev;

definePageMeta({
    layout: 'empty',
});

const sidebar: NavigationMenuItem[][] = [
    [
        {
            label: 'Home',
            icon: 'ph:house-bold',
            to: '/editor',
            exact: true,
        },
    ],
    [
        { label: 'Discography', type: 'label' },
        {
            label: 'Tracks',
            icon: 'ph:music-note-bold',
            to: '/editor/tracks',
        },
        {
            label: 'Albums',
            icon: 'ph:music-notes-bold',
            to: '/editor/albums',
        },
    ],
];
</script>

<template>
    <UDashboardGroup class="flex flex-1 font-simple" v-if="dev">
        <UDashboardSidebar>
            <template #header>
                <div class="size-full py-1">
                    <LogoLong class="size-full object-contain" />
                </div>
            </template>
            <template #default>
                <UNavigationMenu :items="sidebar" orientation="vertical" />
            </template>
        </UDashboardSidebar>
        <div class="overlap-grid w-full">
            <NuxtPage :transition="false" />
        </div>
    </UDashboardGroup>
    <UError
        :error="{
            statusText: 'Non-dev environment detected.',
            message: 'The EditorUI can only be used in local dev environments.',
        }"
        v-else
    />
</template>
