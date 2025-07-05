<script setup lang="ts">
import type { WikiArticle } from '~/models/articles/WikiArticle';
import API from '~/utils/api';

const { data: sections } = await API.PerformGet<WikiArticle[][]>('/home');
if (import.meta.client) {
    setTimeout(() => {
        state.played_home_animation = true;
    }, 800);
}

SetMetadata('Camellia Wiki', 'home page');
</script>

<template>
    <PageBase>
        <div
            class="flex h-72 flex-col items-center justify-center gap-6 text-center transition-all duration-500 ease-out"
            :class="{ '!h-[calc(100vh-4rem)] pb-16 md:scale-125': !state.played_home_animation }"
        >
            <LogoNormal class="h-28 md:h-40" />
            <h3 class="text-lg md:text-xl">Where most of Camellia's work and the fandom is documented.</h3>
        </div>
        <Transition name="fade">
            <div class="grid h-fit w-full gap-4 md:grid-cols-3" v-if="sections">
                <div v-for="section in sections" class="flex flex-col gap-4">
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
