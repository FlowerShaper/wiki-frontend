<script setup lang="ts">
const props = defineProps<{
    path: string;
}>();

const { data: comments, error } = await api.PerformGet<WikiComment[]>(`/posts/${api.PathToSlug(props.path)}/comments`);
</script>

<template>
    <div class="hidden flex-col gap-3 md:flex">
        <!-- <ArticleCommentInput /> -->
        <InfoNotFound :text="error.message" v-if="error" />
        <Comment :comment="c" v-for="c in comments" />
    </div>
</template>
