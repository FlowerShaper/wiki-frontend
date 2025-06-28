<script setup lang="ts">
import type { WikiComment } from '~/models/comments/WikiComment';
import API from '~/utils/api';

const props = defineProps<{
    path: string;
}>();

const { data: comments, error } = await API.PerformGet<WikiComment[]>(`/posts/${API.PathToSlug(props.path)}/comments`);
</script>

<template>
    <div class="flex flex-col">
        <!-- <ArticleCommentInput /> -->
        <InfoNotFound :text="error.message" v-if="error" />
        <Comment :comment="c" v-for="c in comments" />
    </div>
</template>
