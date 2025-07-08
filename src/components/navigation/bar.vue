<template>
	<nav class="fixed left-0 top-0 z-20 h-16 w-full border-b-2 border-3 bg-1">
		<div class="mx-auto flex h-full w-full flex-row items-center justify-between px-5 2xl:w-page">
			<NuxtLink class="h-full py-2" to="/">
				<LogoLong class="h-full" />
			</NuxtLink>
			<div class="flex flex-row items-center gap-4">
				<a class="hidden hover:underline md:block" href="https://github.com/FlowerShaper">github</a>
				<a class="hidden hover:underline md:block" href="https://discord.gg/camellia">discord</a>
				<p class="hidden hover:underline md:block cursor-pointer"
					@click="state.overlays.search = !state.overlays.search">search</p>

				<div class="mx-2 hidden h-6 w-1 rounded bg-3 md:block"></div>

				<NavigationProfile />
			</div>
		</div>
	</nav>
</template>
