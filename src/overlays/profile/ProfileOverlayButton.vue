<script setup lang="ts">
defineProps<{
	icon: string
	text: string
}>()
</script>

<template>
	<div
		class="flex flex-row px-2 py-1.5 rounded w-full text-xs items-center gap-1 hover:bg-text hover:bg-opacity-20 cursor-pointer">
		<div class="size-5 flex items-center justify-center">
			<img :src="`https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/${icon.replace('flag_', '')}.svg`"
				v-if="icon.startsWith('flag_')" />
			<p class="font-fa font-bold" v-else>{{ icon }}</p>
		</div>
		<p>{{ text }}</p>
	</div>
</template>