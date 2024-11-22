<script setup lang="ts">
import { reactive } from 'vue';

import type { WikiArticle } from '@/api/models/articles/WikiArticle';

import PageBase from '@/components/page/PageBase.vue';
import NormalLogo from '@/components/logo/NormalLogo.vue';

import HomeCard from './cards/HomeCard.vue';

import API from '@/utils/API';

const react = reactive<{
	loading: boolean,
	sections?: WikiArticle[][]
}>({
	loading: true
})

const start = Date.now();

API.PerformGet<WikiArticle[][]>('/home').then(res => {
	if (!res.IsSuccess() || !res.data)
		throw new Error(res.message)

	react.sections = res.data
}).catch(ex => console.log(ex))
	.finally(() => {
		const min = 800
		const elapsed = Date.now() - start
		setTimeout(() => react.loading = false, Math.max(min - elapsed, 0))
	})
</script>

<template>
	<PageBase>
		<div class="text-center flex flex-col h-72 gap-6 items-center justify-center transition-all ease-out duration-500"
			:class="{ '!h-full scale-125': react.loading }">
			<NormalLogo class="h-40" />
			<h3 class="text-xl">Where most of Camellia's work and the fandom is documented.</h3>
		</div>
		<Transition name="fade">
			<div class="grid grid-cols-3 gap-4 w-full h-fit" v-if="!react.loading && react.sections">
				<div v-for="section in react.sections" class="flex flex-col gap-4">
					<HomeCard v-for="art in section" :article="art" />
				</div>
			</div>
		</Transition>
	</PageBase>
</template>

<style>
.fade-enter-active {
	transition: opacity 150ms;
}

.fade-enter-to {
	opacity: 1;
}

.fade-enter-from {
	opacity: 0;
}
</style>