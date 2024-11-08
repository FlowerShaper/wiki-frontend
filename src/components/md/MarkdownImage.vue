<script setup lang="ts">
const props = defineProps<{
    path: string
    alt: string
}>()

let trimmed = props.alt.replace('<', '').replace('>', '');

const left = props.alt.endsWith("<");
const right = props.alt.endsWith(">");
</script>

<template>
    <div class="flex flex-col gap-2 max-w-64" :class="{ 'float-left mr-4': left, 'float-right ml-4': right }">
        <img class="rounded-xl" :src="path">
        <p class="opacity-75 text-center">{{ trimmed.trimStart().trimStart() }}</p>
    </div>
</template>