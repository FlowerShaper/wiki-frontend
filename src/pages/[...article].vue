<script setup lang="ts">
import type { WikiArticle } from '~/models/articles/WikiArticle';
import type ParsedMarkdown from '~/models/markdown/ParsedMarkdown';
import API from '~/utils/api';
import Markdown from '~/utils/markdown';

const route = useRoute();
const path = `/${(<string[]>route.params.article).join('/')}`;

const { data: article, error } = await API.PerformGet<WikiArticle>(`/articles?path=${path}&lang=${settings.language}`);
let parsed: ParsedMarkdown, content: string;

if (article) {
    parsed = Markdown.Parse(article.content);
    content = Markdown.Render(article.content);
}
</script>

<template>
    <PageBase>
        <div class="flex flex-col gap-9" v-if="parsed && article && content">
            <div class="flex flex-row w-full">
                <div class="w-48 flex flex-col gap-2 sticky top-24 max-h-[36vh]">
                    <h3 class="text-primary">Contents</h3>
                    <ol class="list-decimal list-inside">
                        <li class="text-lg" v-for="sec in parsed.sections">
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
                        <h1 class="text-4xl text-primary font-bold">{{ article.meta.title }}</h1>
                        <p class="opacity-75">written by {{ article.meta.author }}</p>
                    </div>
                    <MarkdownView :content="content" />
                </div>
            </div>
            <ArticleComments :path="path" />
        </div>
        <InfoNotFound :text="error?.message" v-else-if="error" />
    </PageBase>
</template>
