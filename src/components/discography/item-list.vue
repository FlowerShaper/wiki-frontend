<script setup lang="ts">
const { depth = 2 } = defineProps<{
    title: string;
    numbered?: boolean;
    depth?: number;
}>();
</script>

<template>
    <MarkdownHeader :text="title" :level="depth" />
    <ul :class="`list-inside ${numbered ? '!list-decimal' : 'list-disc'}`">
        <slot></slot>
    </ul>
</template>
