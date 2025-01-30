<script setup lang="ts">
import { reactive } from 'vue';

import PageBase from '@/components/page/PageBase.vue';
import LoadingContainer from '@/components/status/LoadingContainer.vue';

const result = reactive<{
	reason?: string,
	state?: number,
	content?: string
}>({
	state: 0
});
// if (!hash) router.push("/"); // Redirect to home page.

window.addEventListener("message", (event) => {
	if (!event.source) {
		console.log('no source');

		result.state = -1;
		window.location.href = "/";
		return;
	}

	console.log('source: ', event.origin);
	console.log('current: ', window.location.origin);

	// make sure the sender is the same url
	if (event.origin !== window.location.origin) {
		console.log('origin doesn\'t match, aborting for security reasons');
		event.source.postMessage({ 'error': "Origins don't match." })

		result.state = -1;
		return;
	}

	result.state = 1;
	event.source.postMessage(GetQueryParams());
});

function GetQueryParams() {
	const url = new URL(window.location.href)
	const params = new URLSearchParams(url.search || url.hash.replace('#', ''));
	return Object.fromEntries(params.entries());
}
</script>

<template>
	<PageBase>
		<LoadingContainer v-if="result.state == 0" />
		<ErrorContainer :text="result.reason" v-else-if="result.state == -1" />
		<div class="w-full pt-12 flex flex-col items-center" v-else>
			<div class="mb-4">
				<p class="text-xl font-semibold">oauth complete</p>
				<p class="opacity-80">this should close automatically...</p>
			</div>
		</div>
	</PageBase>
</template>