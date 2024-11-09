<script setup lang="ts">
import { reactive } from 'vue';

import { type WikiComment } from '@/api/models/comments/WikiComment';

import Comment from '@/components/comments/Comment.vue';
import ArticleCommentInput from './ArticleCommentInput.vue';

import API from '@/utils/API';

const props = defineProps<{
    path: string
}>()

const react = reactive<{
    error?: string
    comments?: WikiComment[]
}>({})

API.PerformGet<WikiComment[]>(`/posts/${API.PathToSlug(props.path)}/comments`).then(res => {
    if (!res.IsSuccess() || !res.data)
        throw new Error(res.message)

    react.comments = res.data
}).catch(ex => react.error = ex.message)
</script>

<template>
    <div class="flex flex-col">
        <ArticleCommentInput />
        <p class="text-center text-bq-danger" v-if="react.error">{{ react.error }}</p>
        <Comment :comment="c" v-for="c in react.comments" />
    </div>
</template>