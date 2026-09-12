<script setup lang="ts">
const { data: album, error } = await api.PerformGet<DiscographyAlbum>(`/discography/albums/${useRoute().params.id}`);

const has_romanized = album && album.title_romanized && album.title != album.title_romanized;
const current_cover = ref<{ name: string; url: string }>();

if (album) {
    if (album.covers) {
        album.covers.forEach((c) => {
            c.url = api.ResolveAsset(c.url);
        });

        current_cover.value = album.covers[0];
    }

    let description = '';

    if (album.discs) {
        let count = 0;
        album.discs.forEach((x) => (count += x.tracks.length));

        if (album.discs.length > 1) description = `${album.discs.length} discs, ${count} tracks`;
        else description = `${count} tracks`;
    }

    SetMetadata(`${album.title}${has_romanized ? ` (${album.title_romanized})` : ''}`, description, album.covers?.at(0)?.url);
}
</script>

<template>
    <PageBase>
        <div class="flex max-w-full flex-col gap-4 text-lg" v-if="album">
            <div class="flex w-full max-w-[calc(min(100vw,calc(1536px))-64px)] flex-col gap-1 text-primary">
                <p class="truncate text-4xl font-bold">{{ album.title }}</p>
                <span class="truncate text-xl font-semibold opacity-80" v-if="has_romanized">{{ album.title_romanized }}</span>
            </div>
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
        <InfoNotFound :text="error?.message" v-else />
    </PageBase>
</template>
