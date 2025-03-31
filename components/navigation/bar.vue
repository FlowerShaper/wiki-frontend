<template>
    <nav class="z-20 fixed top-0 left-0 w-full h-16 border-b-2 border-3 bg-1">
        <div class="w-full mx-auto 2xl:w-page h-full px-5 flex flex-row justify-between items-center">
            <NuxtLink class="h-full py-2" to="/">
                <LogoLong class="h-full" />
            </NuxtLink>
            <div class="flex flex-row gap-4 items-center">
                <a class="hover:underline" href="https://github.com/FlowerShaper">github</a>
                <a class="hover:underline" href="https://discord.gg/camellia">discord</a>

                <div class="w-1 h-6 bg-3 rounded mx-2"></div>

                <NavigationProfile />
            </div>
        </div>
    </nav>
</template>
