<script setup lang="ts">
import { reactive } from 'vue';

import type { WikiArticle } from '@/api/models/articles/WikiArticle';

import HomeCard from './cards/HomeCard.vue';

import API from '@/utils/API';

const react = reactive<{
	sections?: WikiArticle[][]
}>({})

API.PerformGet<WikiArticle[][]>('/home').then(res => {
	if (!res.IsSuccess() || !res.data)
		throw new Error(res.message)

	react.sections = res.data
}).catch(ex => console.log(ex))
</script>

<template>
	<div class="text-center flex flex-col py-24 gap-2">
		<h1 class="text-4xl">Camellia Wiki</h1>
		<h3 class="text-xl">Where most of Camellia's work and the fandom is documented.</h3>
	</div>
	<div class="grid grid-cols-3 gap-4 w-full h-fit" v-if="react.sections">
		<div v-for="section in react.sections" class="flex flex-col gap-4">
			<HomeCard v-for="art in section" :article="art" />
		</div>
	</div>
</template>
