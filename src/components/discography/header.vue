<script setup lang="ts">
import type { DiscographyBase } from '~/models/discography/DiscographyBase';

const props = defineProps<{
    item: DiscographyBase
}>()

const has_romanized = computed(() => props.item && props.item.title_romanized && props.item.title != props.item.title_romanized);
</script>

<template>
    <div class="flex w-full max-w-[calc(min(100vw,calc(1536px))-64px)] flex-col gap-1 text-primary">
        <p class="truncate text-4xl font-bold">{{ item.title }}</p>
        <span class="truncate text-xl font-semibold opacity-80" v-if="has_romanized">{{ item.title_romanized }}</span>
    </div>
</template>
