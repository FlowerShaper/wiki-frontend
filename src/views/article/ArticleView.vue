<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

import type { WikiArticle } from '@/api/models/articles/WikiArticle';
import type ParsedMarkdown from '@/models/markdown/ParsedMarkdown';

import PageBase from '@/components/page/PageBase.vue';
import LoadingContainer from '@/components/status/LoadingContainer.vue';
import ErrorContainer from '@/components/status/ErrorContainer.vue';
import MarkdownView from '@/components/md/MarkdownView.vue';

import ArticleComments from './comments/ArticleComments.vue';

import API from '@/utils/API';
import Markdown from '@/utils/Markdown';
import { settings } from '@/utils/State';

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

watch(() => settings.language, FetchArticle)
FetchArticle()

function FetchArticle() {
    react.loading = true

    API.PerformGet<WikiArticle>(`/articles?path=/${path}&lang=${settings.language}`).then(async res => {
        if (!res.IsSuccess() || !res.data)
            throw new Error(res.message)

        react.article = res.data;
        react.parsed = Markdown.Parse(res.data.content)
        react.content = Markdown.Render(res.data.content)
    }).catch(ex => {
        react.error = ex.message
    }).finally(() => react.loading = false)
}
</script>

<template>
    <PageBase>
        <LoadingContainer v-if="react.loading" />
        <ErrorContainer :text="react.error" v-else-if="react.error" />
        <div class="flex flex-col gap-9" v-else>
            <div class="flex flex-row w-full">
                <div class="w-48 flex flex-col gap-2 sticky top-24 max-h-[36vh] overflow-y-auto">
                    <h3 class="text-primary">Contents</h3>
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
                <div class="w-1 bg-2 rounded mx-6"></div>
                <div class="flex flex-col flex-1 gap-4 max-w-full min-w-0">
                    <div>
                        <h1 class="text-4xl text-primary">{{ react.article?.meta.title }}</h1>
                        <p class="opacity-75">written by {{ react.article?.meta.author }}</p>
                    </div>
                    <MarkdownView v-if="react.content" :content="react.content" />
                </div>
            </div>
            <ArticleComments :path="path" />
        </div>
    </PageBase>
</template>