<script setup lang="ts">
import { type WikiArticle } from '~/models/articles/WikiArticle';

defineProps<{
	article: WikiArticle
}>();
</script>

<template>
	<div class="flex flex-col p-6 bg-2 rounded-xl gap-2">
		<div class="flex flex-col-reverse gap-1.5 mt-3 first:mt-0 scroll-m-20 w-full">
			<div class="h-0.5 rounded w-16 from-secondary to-primary bg-gradient-to-r"></div>
			<h3 class="text-xl font-semibold">{{ article.meta.title }}</h3>
		</div>
		<p class="w-full">{{ article.meta.description }}</p>
		<div class="flex justify-end y-w-full">
			<NuxtLink :to="article.url"
				class="w-fit text-right text-primary cursor-pointer hover:text-secondary hover:underline">
				read more
			</NuxtLink>
		</div>
	</div>
</template>