<script setup lang="ts">
defineProps<{
    album: DiscographyAlbum;
}>();
</script>

<template>
    <div class="flex max-w-full flex-col gap-4 text-lg" v-if="album">
        <DiscographyHeader :item="album" />
        <div>
            <DiscographyInfoBox :item="album" />
            <MarkdownView :content="album.content" v-if="album.content" />
            <div class="md-content mt-3">
                <template v-if="album.discs?.length">
                    <MarkdownH2>Track List</MarkdownH2>
                    <DiscographyItemList :title="disc.name" :numbered="true" :depth="3" v-for="(disc, index) in album.discs">
                        <li v-for="track in disc.tracks" :key="track.id">
                            <NuxtLink class="text-primary hover:underline" :to="`/discography/tracks/${track.id}`" v-if="track.title">
                                {{ track.title }}
                                <span class="text-base opacity-80">({{ track.length }})</span>
                            </NuxtLink>
                            <span class="text-bq-caution" v-else>{{ track.id }} (MISSING DATA)</span>
                        </li>
                    </DiscographyItemList>
                </template>
                <DiscographyItemList title="Credits" v-if="album.credits?.length">
                    <li v-for="credit in album.credits">{{ credit.role }}: {{ credit.name }}</li>
                </DiscographyItemList>
                <DiscographyItemList title="Links" v-if="album.links?.length">
                    <li v-for="link in album.links">
                        <NuxtLink class="text-primary hover:underline" :to="link.url">{{ link.label }}</NuxtLink>
                    </li>
                </DiscographyItemList>
            </div>
        </div>
    </div>
</template>
