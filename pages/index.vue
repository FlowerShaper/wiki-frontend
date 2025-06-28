<script setup lang="ts">
import type { WikiArticle } from '~/models/articles/WikiArticle';
import API from '~/utils/api';

const sections = (await API.PerformGet<WikiArticle[][]>('/home')).data;
if (import.meta.client) {
    setTimeout(() => {
        state.played_home_animation = true;
    }, 800);
}
</script>

<template>
    <PageBase>
        <div
            class="text-center flex flex-col h-72 gap-6 items-center justify-center transition-all ease-out duration-500"
            :class="{ '!h-[calc(100vh-4rem)] pb-16 scale-125': !state.played_home_animation }"
        >
            <LogoNormal class="h-40" />
            <h3 class="text-xl">Where most of Camellia's work and the fandom is documented.</h3>
        </div>
        <Transition name="fade">
            <div class="grid grid-cols-3 gap-4 w-full h-fit" v-if="sections">
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
