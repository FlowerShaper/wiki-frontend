<script setup lang="ts">
import API from '~/utils/api';
import type { DiscographyBase } from '~/models/discography/DiscographyBase';

const props = defineProps<{
    item: DiscographyBase
}>()

const current_cover = ref<{ name: string; url: string }>();

if (props.item.covers) {
    current_cover.value = props.item.covers[0];
}
</script>

<template>
    <div class="mb-3 w-full overflow-hidden rounded-lg bg-2 md:mx-auto md:w-72 lg:float-right lg:ml-4">
        <p class="line-clamp-1 w-full truncate px-3 py-2 text-center font-semibold">
            {{ item.title }}
        </p>
        <img
            class="aspect-square w-full rounded-lg object-cover"
            :src="API.ResolveAsset(current_cover.url)"
            v-if="current_cover"
            @click="ShowImage(current_cover.url, current_cover.name)"
        />
        <div class="grid grid-flow-col border-2 border-b-3" v-if="item.covers?.length">
            <div
                class="flex h-11 cursor-pointer flex-col items-center justify-center text-sm hover:underline"
                :class="{ 'text-primary': current_cover?.url == cover.url }"
                v-for="cover in item.covers"
                @click="current_cover = cover"
            >
                {{ cover.name }}
            </div>
        </div>
        <DiscographySideEntry
            title="Release"
            :value="`${formatting.Order(item.release.day)} ${formatting.GetMonth(item.release.month)} ${item.release.year}`"
            v-if="item.release"
        />
        <slot></slot>
    </div>
</template>
