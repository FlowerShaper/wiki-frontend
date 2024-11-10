<script setup lang="ts">
defineProps<{
    lang: string
    text: string
}>();
</script>

<template>
    <div class="relative overflow-x-auto">
        <p class="absolute top-0 right-0">{{ lang }}</p>
        <pre class="md-cb relative overflow-x-scroll bg-2 rounded-xl p-3"><code class="md-cb w-fit min-w-full flex flex-col">
            <slot></slot>
        </code></pre>
    </div>
</template>

<style lang="scss">
// scrolling still doesnt work at all...
// it only works properly when the View
// has a fixed max size
.md-cb, .md-cb > span {
    white-space: pre;
    word-spacing: normal;
    word-break: break-all;
    word-wrap: break-word;
    text-wrap: wrap;
    tab-size: 4;
    hyphens: none;
}
</style>