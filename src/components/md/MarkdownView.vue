<script setup lang="ts">
import { createApp, onMounted, ref, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import MarkdownBlockquote from './MarkdownBlockquote.vue';
import MarkdownCodeBlock from './MarkdownCodeBlock.vue';
import MarkdownFootnote from './MarkdownFootnote.vue';
import MarkdownHeader from './MarkdownHeader.vue';
import MarkdownImage from './MarkdownImage.vue';

const route = useRoute()
const router = useRouter();

const props = defineProps<{
    content: string,
    scroll?: boolean
}>()

const target = ref<HTMLDivElement>();

const render = (html: string) => {
    const ren = createApp({
        template: html,
        components: {
            MarkdownBlockquote,
            MarkdownCodeBlock,
            MarkdownFootnote,
            MarkdownHeader,
            MarkdownImage
        }
    })

    ren.use(router)

    if (target.value) {
        ren.mount(target.value)
        nextTick(MoveToHash)
    }
};

watch(() => props.content, (content) => render(content), { immediate: true })
onMounted(() => render(props.content))

function MoveToHash() {
    if (route.hash) {
        const el = document.getElementById(route.hash.substring(1))
        if (el) el.scrollIntoView({ block: 'start' })
    }
}
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
        @apply text-primary hover:underline
    }

    >p {
        @apply text-lg;
    }

    ul,
    ol {
        @apply list-inside list-disc;

        li {
            @apply text-lg;
        }
    }
}
</style>