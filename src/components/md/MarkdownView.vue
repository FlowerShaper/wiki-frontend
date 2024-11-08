<script setup lang="ts">
import { createApp, onMounted, ref, watch } from 'vue';

import MarkdownFootnote from './MarkdownFootnote.vue';
import MarkdownHeader from './MarkdownHeader.vue';
import MarkdownImage from './MarkdownImage.vue';

const props = defineProps<{
    content: string
}>()

const target = ref<HTMLDivElement>();

const render = (html: string) => {
    const ren = createApp({
        template: html,
        components: {
            MarkdownFootnote,
            MarkdownHeader,
            MarkdownImage
        }
    })

    if (target.value) ren.mount(target.value)
};

watch(() => props.content, (content) => render(content), { immediate: true })
onMounted(() => render(props.content))
</script>

<template>
    <div ref="target" class="md-content"></div>
</template>

<style lang="scss">
.md-content {
    @apply flex flex-col gap-3 max-w-full;

    h2 {
        @apply text-3xl font-bold;
    }

    h3 {
        @apply text-2xl font-medium;
    }

    h4 {
        @apply text-xl;
    }

    a {
        @apply text-dark-accent hover:underline
    }

    p {
        @apply text-lg;
    }

    ul, ol {
        @apply list-inside list-disc;

        li {
            @apply text-lg;
        }
    }
}
</style>