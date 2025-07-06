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

    SetMetadata(article.meta.title, article.meta.description, article.meta.image);
}
</script>

<template>
    <PageBase>
        <div class="flex flex-col gap-9" v-if="parsed && article && content">
            <div class="flex w-full flex-row">
                <div class="sticky top-24 hidden max-h-[36vh] w-48 flex-col gap-2 md:flex">
                    <h3 class="text-primary">Contents</h3>
                    <ol class="list-inside list-decimal">
                        <li class="text-lg" v-for="sec in parsed.sections">
                            <a class="hover:font-semibold" :href="`#${sec.id}`">{{ sec.title }}</a>
                            <ul class="list-inside list-disc pl-4 text-base" v-if="sec.subs">
                                <li v-for="sub in sec.subs">
                                    <a class="hover:font-semibold" :href="`#${sub.id}`">{{ sub.title }}</a>
                                </li>
                            </ul>
                        </li>
                    </ol>
                </div>
                <div class="mx-6 hidden w-1 rounded bg-2 md:block"></div>
                <div class="flex min-w-0 max-w-full flex-1 flex-col gap-4">
                    <div>
                        <h1 class="text-4xl font-bold text-primary">{{ article.meta.title }}</h1>
                        <div class="mt-1 h-1 w-24 rounded bg-primary"></div>
                    </div>
                    <MarkdownView :content="content" />
                </div>
            </div>
            <ArticleComments :path="path" />
        </div>
        <InfoNotFound :text="error?.message" v-else-if="error" />
    </PageBase>
</template>
