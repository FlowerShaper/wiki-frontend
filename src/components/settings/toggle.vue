<script setup lang="ts">
defineProps<{
    title: string;
    description?: string;
    toggle: () => void;
    active: boolean;
}>();
</script>

<template>
    <div class="w-full flex flex-row" role="button" tabindex="0" @click="toggle" @keydown.enter="toggle">
        <div class="flex-1 flex flex-col">
            <p class="text-base text-primary">{{ title }}</p>
            <p class="text-sm">{{ description }}</p>
        </div>
        <div class="size-11 flex flex-col items-center justify-center cursor-pointer">
            <p class="text-2xl font-fa" v-if="active">{{ '\uf14a' }}</p>
            <p class="text-2xl font-fa-reg" v-else>{{ '\uf0c8' }}</p>
        </div>
    </div>
</template>
