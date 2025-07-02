<script setup lang="ts">
const props = defineProps<{
    path: string;
    alt: string;
}>();

let trimmed = props.alt.replace('<', '').replace('>', '').trimStart().trimEnd();

const left = props.alt.endsWith('<');
const right = props.alt.endsWith('>');
</script>

<template>
    <div
        class="flex flex-col gap-2"
        :class="{
            'float-left mr-4': left,
            'float-right ml-4': right,
            'h-auto w-full': !left && !right,
        }"
    >
        <NuxtImg class="rounded-xl" :src="path" @click="ShowImage(path, trimmed)" />
        <p class="text-center opacity-75">{{ trimmed }}</p>
    </div>
</template>
