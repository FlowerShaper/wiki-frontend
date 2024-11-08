<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

import type { WikiArticle } from '@/api/models/articles/WikiArticle';
import type ParsedMarkdown from '@/models/markdown/ParsedMarkdown';

import MarkdownView from '@/components/md/MarkdownView.vue';

import API from '@/utils/API';
import Markdown from '@/utils/Markdown';

const route = useRoute();
const split = route.path.split('/')
const path = split.slice(1).join('/')

const react = reactive<{
    article?: WikiArticle,
    parsed?: ParsedMarkdown,
    content?: string
}>({});

API.PerformGet<WikiArticle>(`/articles?path=/${path}`).then(res => {
    if (!res.IsSuccess() || !res.data) {
        console.log(res.message)
        return
    }

    react.article = res.data;
    react.parsed = Markdown.Parse(res.data.content)
    react.content = Markdown.Render(res.data.content)
})
</script>

<template>
    <div class="p-12">
        <MarkdownView v-if="react.content" :content="react.content" />
    </div>
</template>