<script setup lang="ts">
import type { WikiArticle } from '~/models/articles/WikiArticle';
import API from '~/utils/api';

const loading = ref<boolean>(false);
const results = ref<WikiArticle[]>();
const input = ref<HTMLInputElement>();

let query: string | undefined = '';
let schedule: number | undefined = undefined;

watch(
    () => state.overlays.search,
    () => {
        if (state.overlays.search) {
            nextTick(() => input.value?.focus());
        }
    },
);

function InputUpdated() {
    query = input.value?.value;

    loading.value = true;
    results.value = [];

    if (schedule) clearTimeout(schedule);

    schedule = setTimeout(() => Refresh(), 200);
}

async function Refresh() {
    if (!query) {
        loading.value = false;
        return;
    }

    const { data } = await API.PerformGet<WikiArticle[]>(`/search?query=${encodeURIComponent(query)}&lang=${settings.language}`);
    if (!data) return;

    results.value?.push(...data);
    loading.value = false;
}

function SelectFirst() {
    if (results.value?.length) {
        const first = results.value[0];
        navigateTo(first.url);
        state.overlays.search = false;
    }
}
</script>

<template>
    <Transition name="search">
        <div
            class="pointer-events-auto fixed size-full max-h-screen overflow-y-scroll bg-1/75"
            v-if="state.overlays.search"
            @click="state.overlays.search = false"
        >
            <div class="mx-auto flex w-full flex-col gap-3 px-4 pt-24 lg:w-search" @click="$event!.stopPropagation()">
                <input
                    ref="input"
                    @input="InputUpdated"
                    class="h-12 rounded-lg border-2 border-3 bg-2 px-3 placeholder:text-text/50 focus:border-primary focus:outline-none"
                    type="text"
                    :value="query"
                    placeholder="Search away..."
                    @keypress.enter="SelectFirst"
                />
                <p class="mt-6 text-center" v-if="loading">Loading...</p>
                <NuxtLink
                    :to="article.url"
                    class="overlap-grid h-16 w-full overflow-hidden rounded-lg bg-2"
                    v-for="article in results"
                    @click="state.overlays.search = false"
                >
                    <img class="!w-1/3 object-cover" :src="API.ResolveAsset(article.meta.image)" v-if="article.meta.image" />
                    <div class="bg-gradient-to-r from-2/80 to-2 to-20% hover:opacity-80"></div>
                    <div class="flex size-full flex-col justify-center px-4">
                        <p class="line-clamp-1 font-semibold">{{ article.meta.title }}</p>
                        <p class="line-clamp-1 text-sm opacity-80">{{ article.meta.description }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.search-enter-active,
.search-leave-active {
    transition: opacity 150ms;
}

.search-enter-to,
.search-leave-from {
    opacity: 1;
}

.search-enter-from,
.search-leave-to {
    opacity: 0;
    pointer-events: none;
}
</style>
