<script setup lang="ts">
import LoadingImage from '../LoadingImage.vue';

defineProps<{
    text?: string
}>();
</script>

<template>
    <div class="w-full pt-12 flex flex-col items-center">
        <div class="size-24 mb-4">
            <LoadingImage class="size-full rounded-lg" src="https://cdn.discordapp.com/emojis/1214056479871471656.png?size=2048" />
        </div>
        <p class="font-semibold">something went wrong...</p>
        <p class="opacity-80 text-xs">{{ text }}</p>
    </div>
</template>