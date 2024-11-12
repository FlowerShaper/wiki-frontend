<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
	title?: string,
	description?: string,
	link: string
}>();

</script>

<template>
	<div class="grid p-6 bg-2 rounded-xl gap-2">
		<div class="flex flex-col-reverse gap-1.5 mt-3 first:mt-0 scroll-m-20 w-full">
			<div class="h-0.5 rounded w-16 from-secondary to-primary bg-gradient-to-r"></div>
			<h3 class="text-xl">{{ title }}</h3>
		</div>
		<p class="w-full">{{ description }}</p>
		<div class="flex justify-end y-w-full">
			<RouterLink :to="link"
				class="w-fit text-right text-primary cursor-pointer hover:text-secondary hover:underline">
				read more
			</RouterLink>
		</div>
	</div>
</template>