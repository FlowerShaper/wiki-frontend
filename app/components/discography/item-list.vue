<script setup lang="ts">
const { depth = 2 } = defineProps<{
    title: string;
    numbered?: boolean;
    depth?: number;
}>();
</script>

<template>
    <MarkdownH2 v-if="depth == 2">{{ title }}</MarkdownH2>
    <MarkdownH3 v-if="depth == 3">{{ title }}</MarkdownH3>
    <ul :class="`list-inside ${numbered ? 'list-decimal!' : 'list-disc'}`">
        <slot></slot>
    </ul>
</template>
