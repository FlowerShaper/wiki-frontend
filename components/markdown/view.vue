<script setup lang="ts">
defineProps<{
    content: string;
}>();
</script>

<template>
    <MDC :value="content" class="md-content prose"></MDC>
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
}
</style>
