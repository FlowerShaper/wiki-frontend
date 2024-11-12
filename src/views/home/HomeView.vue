<script setup lang="ts">

import HomeCard from './cards/HomeCard.vue';

const bentos = [
	{
		section: "Wiki",
		cards: [
			{ title: "About", description: "All about the Camellia Wiki!", link: "/wiki/about" },
			{ title: "Card title", description: "a very cool and long description that wraps across multiple lines", link: "/" },
			{ title: "Card title", description: "a very cool and long description that wraps across multiple lines", link: "/" }
		]
	},
	{
		section: "Camellia",
		cards: [
			{ title: "Camellia", description: "The one and only Camellia! Here, you can find information about Camellia's background and accomplishments.", link: "/camellia" },
			{ title: "Song Use", description: "Camellia's Music Usage Guidelines. Where you can find information about how and when to use his music!", link: "/camellia/song-use" },
			{ title: "Card title", description: "a very cool and long description that wraps across multiple lines", link: "/" }
		]
	},
	{
		section: "Community",
		cards: [
			{ title: "Camellia Discord Server", description: "Information about the ever changing Camellia Discord Server.", link: "/community/server" },
			{ title: "Card title", description: "a very cool and long description that wraps across multiple lines", link: "/" },
			{ title: "Card title", description: "a very cool and long description that wraps across multiple lines", link: "/" }
		]
	}
];

</script>

<template>
	<div class="text-center flex flex-col py-24 gap-2">
		<h1 class="text-4xl">Camellia Wiki</h1>
		<h3 class="text-xl">Where most of Camellia's work and the fandom is documented.</h3>
	</div>
	<div class="grid grid-cols-3 gap-4 w-full h-fit">
		<div v-for="bento in bentos" :key="bento.section" class="grid gap-4">
			<HomeCard v-for="card in bento.cards" :title="card.title" :description="card.description"
				:link="card.link" />
		</div>
	</div>
</template>
