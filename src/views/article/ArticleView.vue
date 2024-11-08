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
    loading: boolean,
    error?: string,
    article?: WikiArticle
    parsed?: ParsedMarkdown
    content?: string
}>({
    loading: true
});

API.PerformGet<WikiArticle>(`/articles?path=/${path}`).then(res => {
    if (!res.IsSuccess() || !res.data)
        throw new Error(res.message)

    react.article = res.data;
    react.parsed = Markdown.Parse(res.data.content)
    react.content = Markdown.Render(res.data.content)
}).catch(ex => {
    react.error = ex.message
}).finally(() => react.loading = false)
</script>

<template>
    <div class="text-center" v-if="react.loading">Loading...</div>
    <div class="text-center flex flex-col gap-2" v-else-if="react.error">
        <p>{{ react.error }}</p>
        <RouterLink class="text-dark-accent hover:underline" to="/">Back Home</RouterLink>
    </div>
    <div class="flex flex-row w-full" v-else>
        <div class="w-48 flex flex-col gap-2">
            <h3 class="text-dark-accent">Contents</h3>
            <ol class="list-decimal list-inside">
                <li class="text-lg" v-for="sec in react.parsed?.sections">
                    <a class="hover:font-semibold" :href="`#${sec.id}`">{{ sec.title }}</a>
                    <ul class="list-disc list-inside pl-4 text-base" v-if="sec.subs">
                        <li v-for="sub in sec.subs">
                            <a class="hover:font-semibold" :href="`#${sub.id}`">{{ sub.title }}</a>
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
        <div class="w-1 bg-dark-2 rounded mx-6"></div>
        <div class="flex flex-col flex-1 gap-4">
            <div>
                <h1 class="text-4xl text-dark-accent">{{ react.article?.meta.title }}</h1>
                <p class="opacity-75">written by {{ react.article?.meta.author }}</p>
            </div>
            <MarkdownView v-if="react.content" :content="react.content" />
        </div>
    </div>
</template>