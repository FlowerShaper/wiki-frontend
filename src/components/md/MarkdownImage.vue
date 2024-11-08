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
    <div class="flex flex-col gap-2" :class="{
        'float-left mr-4': left,
        'float-right ml-4': right,
        'w-full h-auto': !left && !right
    }">
        <img class="rounded-xl" :src="path">
        <p class="opacity-75 text-center">{{ trimmed.trimStart().trimStart() }}</p>
    </div>
</template>