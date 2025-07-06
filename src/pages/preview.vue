<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue';

definePageMeta({
    layout: 'empty',
});

const md = ref<string>('');
</script>

<template>
    <div class="grid h-screen max-h-screen w-screen grid-cols-2 gap-4 overflow-hidden p-4">
        <textarea class="resize-none rounded-lg bg-2 font-mono p-2" @input="md = <string>(<TextareaHTMLAttributes>$event.target).value"></textarea>
        <MarkdownView class="h-full max-h-full overflow-y-scroll" :content="markdown.Render(md)" />
    </div>
</template>
