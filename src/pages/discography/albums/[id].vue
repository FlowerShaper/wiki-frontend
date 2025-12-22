<script setup lang="ts">
import type { DiscographyAlbum } from '~/models/discography/DiscographyAlbum';
import API from '~/utils/api';
import Markdown from '~/utils/markdown';

const { data: album, error } = await API.PerformGet<DiscographyAlbum>(`/discography/albums/${useRoute().params.id}`);

const has_romanized = album && album.title_romanized && album.title != album.title_romanized;
const current_cover = ref<{ name: string; url: string }>();

if (album) {
    if (album.covers) {
        album.covers.forEach((c) => {
            c.url = API.ResolveAsset(c.url);
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
                <div class="mb-3 w-full overflow-hidden rounded-lg bg-2 md:mx-auto md:w-72 lg:float-right lg:ml-4">
                    <p class="line-clamp-1 w-full truncate px-3 py-2 text-center font-semibold">
                        {{ album.title }}
                    </p>
                    <img
                        class="aspect-square w-full rounded-lg object-cover"
                        :src="current_cover.url"
                        v-if="current_cover"
                        @click="ShowImage(current_cover.url, current_cover.name)"
                    />
                    <div class="grid grid-flow-col border-2 border-b-3" v-if="album.covers?.length">
                        <div
                            class="flex h-11 cursor-pointer flex-col items-center justify-center text-sm hover:underline"
                            :class="{ 'text-primary': current_cover?.url == cover.url }"
                            v-for="cover in album.covers"
                            @click="current_cover = cover"
                        >
                            {{ cover.name }}
                        </div>
                    </div>
                    <DiscographySideEntry
                        title="Release"
                        :value="`${formatting.Order(album.release.day)} ${formatting.GetMonth(album.release.month)} ${album.release.year}`"
                        v-if="album.release"
                    />
                </div>
                <MarkdownView :content="Markdown.Render(album.content)" v-if="album.content" />
                <div class="md-content mt-3">
                    <template v-if="album.discs?.length">
                        <MarkdownHeader text="Track List" :level="2" />
                        <div v-for="(disc, index) in album.discs" :key="index">
                            <MarkdownHeader :text="disc.name" :level="3" />
                            <ul class="mt-3 list-inside list-disc">
                                <li v-for="track in disc.tracks" :key="track.id">
                                    <NuxtLink class="text-primary hover:underline" :to="`/discography/tracks/${track.id}`" v-if="track.title">
                                        {{ track.title }}
                                        <span class="text-base opacity-80">({{ track.length }})</span>
                                    </NuxtLink>
                                    <span class="text-bq-danger" v-else>{{ track.id }} (MISSING DATA)</span>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="album.credits?.length">
                        <MarkdownHeader text="Credits" :level="2" />
                        <ul class="list-inside list-disc">
                            <li v-for="credit in album.credits">{{ credit.role }}: {{ credit.name }}</li>
                        </ul>
                    </template>
                    <template v-if="album.links?.length">
                        <MarkdownHeader text="Links" :level="2" />
                        <ul class="list-inside list-disc">
                            <li v-for="link in album.links">
                                <NuxtLink class="text-primary hover:underline" :to="link.url">{{ link.label }}</NuxtLink>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
        <InfoNotFound :text="error?.message" v-else />
    </PageBase>
</template>
