<script setup lang="ts">
import { MarkdownBlockquote, MarkdownCodeBlock, MarkdownH2, MarkdownH3, MarkdownImage, NuxtLink } from '#components';
import alert from '@comark/vue/plugins/alert';
import footnotes from '@comark/vue/plugins/footnotes';
import security from '@comark/vue/plugins/security';
import githubDark from '@shikijs/themes/github-dark';
import highlight from 'comark/plugins/highlight';
import wikiFootnotes from '~/plugins/md-footnotes';

const props = defineProps<{
    content: string;
}>();

const components: Record<string, any> = {
    a: NuxtLink,
    h2: MarkdownH2,
    h3: MarkdownH3,
    img: MarkdownImage,
    pre: MarkdownCodeBlock,
    blockquote: MarkdownBlockquote
};

const plugins: any = [
    footnotes({ hr: false, label: '' }),
    wikiFootnotes(),
    alert(),
    highlight({ themes: { dark: githubDark } }),
    security({
        blockedTags: ["script", "style", "iframe"]
    })
];
</script>

<template>
    <comark class="md-content" :components="components" :plugins="plugins">{{ content }}</comark>
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
        @apply text-primary hover:underline;
    }

    > p {
        @apply text-lg;
    }

    ul,
    ol {
        @apply list-inside list-disc;

        li {
            @apply text-lg;
        }
    }

    ol {
        @apply list-decimal
    }

    mark {
        @apply bg-primary px-1.5 py-0.5 rounded;
    }
}
</style>
