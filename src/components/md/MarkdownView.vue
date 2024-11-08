<script setup lang="ts">
import { createApp, onMounted, ref, watch } from 'vue';

const props = defineProps<{
    content: string
}>()

const target = ref<HTMLDivElement>();

const render = (html: string) => {
    const ren = createApp({
        template: html
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
        @apply text-4xl font-bold;
    }

    h3 {
        @apply text-3xl font-medium;
    }

    h4 {
        @apply text-2xl;
    }

    h5 {
        @apply text-xl;
    }

    p {
        @apply text-lg;
    }

    ul, ol {
        @apply pl-5;

        li {
            @apply text-lg list-disc;
        }
    }
}
</style>