<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import type { TextareaHTMLAttributes } from 'vue';
import TextArea from '~/components/editor/text-area.vue';
import type { WikiArticleMetadata } from '~/models/articles/WikiArticle';

definePageMeta({
    layout: 'empty',
});

const meta = ref<WikiArticleMetadata>({
    title: '',
    description: '',
    author: '',
    image: '',
    layout: '',
    type: 0,
    date: 0,
});

const md = ref<string>('');

const { open: openLoadFile, onChange: onLoadFile } = useFileDialog({
    accept: 'application/json',
});

onLoadFile(async (f) => {
    if (!f?.length) return;

    var text = await f[0].text();
    LoadFromText(text);
});

if (import.meta.client) {
    const stored = localStorage.getItem('editor_article');
    if (stored) LoadFromText(stored);
}

function SaveToFile() {
    DownloadTextFile(md.value, 'page.md', 'text/markdown');
}

function LoadFromText(str: string) {
    md.value = str;
}

function Reset() {
    localStorage.removeItem('editor_article');
    LoadFromText('');
}

function wip() {
    alert('still work in progress');
}
</script>

<template>
    <div class="grid h-screen max-h-screen w-screen grid-cols-2 gap-4 overflow-hidden p-4">
        <div class="hide-scroll flex h-full flex-col gap-5 overflow-y-scroll">
            <div class="flex flex-row gap-5 *:flex-1">
                <EditorButton @click="Reset">{{ '\uf0e2 Reset' }}</EditorButton>
                <EditorButton @click="SaveToFile">{{ '\uf0c7 Save to file' }}</EditorButton>
                <EditorButton @click="openLoadFile">{{ '\uf574 Load from file' }}</EditorButton>
                <EditorButton @click="wip">{{ '\uf0ee Load existing' }}</EditorButton>
            </div>
            <TextArea label="Content" rows="24" @input="md = <string>(<TextareaHTMLAttributes>$event.target).value"></TextArea>
        </div>
        <MarkdownView class="h-full max-h-full overflow-y-scroll" :content="md" />
    </div>
</template>
