<script setup lang="ts">
import { settings } from '~/utils/state';
import API from './utils/api';

LoadSettings();
API.Setup();

if (API.TokenCookie.value)
    await API.RefreshInfo();
else // clean up regardless
    API.Logout();
</script>

<template>
    <NuxtLoadingIndicator />
    <ClientOnly>
        <SettingsHandler />
    </ClientOnly>

    <div :class="{ 'font-system': settings.simpleFont }">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style>
html {
    @apply scroll-smooth scroll-m-16;
}

body {
    @apply bg-1 text-text font-mono overflow-x-hidden;
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
</style>
