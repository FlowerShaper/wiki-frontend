<script setup lang="ts">
import type { WikiComment } from '~/models/comments/WikiComment';
import Formatting from '~/utils/formatting';

defineProps<{
    comment: WikiComment;
}>();
</script>

<template>
    <div class="flex flex-row gap-3">
        <div class="size-12">
            <NuxtImg class="size-full object-cover rounded-md" :src="comment.author.avatar" />
        </div>
        <div class="flex-1 pt-1">
            <p class="text-sm opacity-80">
                <span>{{ comment.author.nick || comment.author.name }}</span>
                <span> • </span>
                <span>{{ Formatting.FormatAgo(comment.time) }}</span>
            </p>
            <p class="text-base leading-tight">{{ comment.content }}</p>
        </div>
    </div>
</template>
