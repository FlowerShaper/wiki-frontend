<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
    link: string;
    icon: string;
    name: string;
}>();
</script>

<template>
    <RouterLink
        :to="`/settings${link}`"
        class="flex w-full flex-row items-center gap-1 rounded p-1 transition-colors duration-200 hover:duration-75 hover:bg-text hover:bg-opacity-20"
    >
        <div class="flex size-5 items-center justify-center">
            <p class="font-fa text-xs">{{ icon }}</p>
        </div>
        <p class="text-sm">{{ name }}</p>
    </RouterLink>
</template>
