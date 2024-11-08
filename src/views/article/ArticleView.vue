<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

import type { WikiArticle } from '@/api/models/articles/WikiArticle';
import type ParsedMarkdown from '@/models/markdown/ParsedMarkdown';

import MarkdownView from '@/components/md/MarkdownView.vue';

import API from '@/utils/API';
import Markdown from '@/utils/Markdown';
import type ParsedSection from '@/models/markdown/ParsedSection';

const route = useRoute();
const split = route.path.split('/')
const path = split.slice(1).join('/')

const react = reactive<{
    article?: WikiArticle
    parsed?: ParsedMarkdown
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
    <div class="flex flex-row w-full p-16">
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