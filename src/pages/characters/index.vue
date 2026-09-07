<script setup lang="ts">
import type { Character } from '~/models/characters/Character';

const { data, error } = await api.PerformGet<Character[]>(`/characters`);
</script>

<template>
    <PageBase>
        <div class="flex max-w-full flex-col gap-4 text-lg" v-if="data">
            <div>
                <h1 class="text-4xl font-bold text-primary">Characters</h1>
                <div class="mt-1 h-1 w-24 rounded bg-primary"></div>
            </div>
            <p>These are all original characters that have been featured in albums or tracks.</p>
            <div class="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                <NuxtLink :to="`/characters/${char.id}`" class="w-full rounded-lg bg-2 flex flex-col transition-colors duration-300 hover:bg-3 hover:duration-75" v-for="char in data">
                    <img class="aspect-square rounded-lg" :src="api.ResolveAsset(`cdn://images/characters/${char.id}/icon.png`)" alt="">
                    <p class="px-3 py-2 text-center line-clamp-1 text-base font-semibold">{{ char.name }}</p>
                </NuxtLink>
            </div>
        </div>
        <InfoNotFound :text="error?.message" v-else-if="error" />
    </PageBase>
</template>