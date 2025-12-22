<script setup lang="ts">
import type { WikiComment } from '~/models/comments/WikiComment';
import API from '~/utils/api';

const props = defineProps<{
    path: string;
}>();

const { data: comments, error } = await API.PerformGet<WikiComment[]>(`/posts/${API.PathToSlug(props.path)}/comments`);
</script>

<template>
    <div class="hidden flex-col gap-3 md:flex">
        <!-- <ArticleCommentInput /> -->
        <InfoNotFound :text="error.message" v-if="error" />
        <Comment :comment="c" v-for="c in comments" />
    </div>
</template>
