<script setup lang="ts">
import type { WikiComment } from '~/models/comments/WikiComment';
import API from '~/utils/api';

const props = defineProps<{
    path: string;
}>();

const res = await API.PerformGet<WikiComment[]>(`/posts/${API.PathToSlug(props.path)}/comments`);

let comments: WikiComment[], error: string;

if (res.IsSuccess() && res.data) {
    comments = res.data;
} else {
    error = res.message;
}
</script>

<template>
    <div class="flex flex-col">
        <!-- <ArticleCommentInput /> -->
        <p class="text-center text-bq-danger" v-if="error">{{ error }}</p>
        <Comment :comment="c" v-for="c in comments" />
    </div>
</template>
