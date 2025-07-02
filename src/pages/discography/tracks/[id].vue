<script setup lang="ts">
import type { DiscographyTrack } from '~/models/discography/DiscographyTrack';
import Markdown from '~/utils/markdown';

const track: DiscographyTrack = {
    id: 'bassline-yatteru',
    title: 'ベースラインやってる？笑',
    title_romanized: 'Can I friend you on bassbook? lol',
    content: `**ベースラインやってる？笑** is a song by [かめりあ](/camellia) feat. [ななひら](/camellia/guest-appearances/nanahira) first released on 2017-12-29.`,
    covers: [
        {
            name: 'KCCD-006',
            url: 'https://cdn.camellia.wiki/images/camellia/albums/KCCD-006.png',
        },
        {
            name: 'KCCD-007',
            url: 'https://cdn.camellia.wiki/images/camellia/albums/KCCD-007.png',
        },
    ],
    length: '04:47',
    albums: [
        {
            id: 'force',
            title: '4orce!',
            title_romanized: '4orce!',
        },
    ],
    credits: [
        {
            role: 'Composition',
            name: 'かめりあ',
        },
        {
            role: 'Lyrics',
            name: 'かめりあ',
        },
        {
            role: 'Vocals',
            name: 'ななひら',
        },
    ],
    links: [
        {
            url: 'https://open.spotify.com/track/5wEy787VwmAnA7GGhEzjHR?si=c17cc826583549f5',
            label: 'Spotify',
        },
    ],
};

const has_romanized = track.title_romanized && track.title != track.title_romanized;
const current_cover = ref<{ name: string; url: string }>();
if (track.covers) current_cover.value = track.covers[0];
</script>

<template>
    <PageBase>
        <div class="flex max-w-full flex-col gap-4 text-lg">
            <div class="flex w-full max-w-[calc(min(100vw,calc(1536px))-64px)] flex-col gap-1 text-primary">
                <p class="truncate text-4xl font-bold">{{ track.title }}</p>
                <span class="truncate text-xl font-semibold opacity-80" v-if="has_romanized">{{ track.title_romanized }}</span>
            </div>
            <div>
                <div class="mb-3 w-full overflow-hidden rounded-lg bg-2 md:mx-auto md:w-72 lg:float-right lg:ml-4">
                    <p class="line-clamp-1 w-full truncate px-3 py-2 text-center font-semibold">
                        {{ track.title }}
                    </p>
                    <img class="aspect-square w-full rounded-lg object-cover" :src="current_cover.url" v-if="current_cover" />
                    <div class="grid grid-flow-col border-2 border-b-3" v-if="track.covers?.length">
                        <div
                            class="flex h-11 cursor-pointer flex-col items-center justify-center text-sm hover:underline"
                            :class="{ 'text-primary': current_cover?.url == cover.url }"
                            v-for="cover in track.covers"
                            @click="current_cover = cover"
                        >
                            {{ cover.name }}
                        </div>
                    </div>
                    <div class="flex flex-row justify-between px-3 py-2 text-sm">
                        <p class="opacity-80">Length</p>
                        <p>{{ track.length }}</p>
                    </div>
                </div>
                <MarkdownView :content="Markdown.Render(track.content)" v-if="track.content" />
                <div class="md-content mt-3">
                    <template v-if="track.albums?.length">
                        <MarkdownHeader text="Album Appearances" :level="2" />
                        <div>
                            <p>This track appears in:</p>
                            <ul class="list-inside list-disc">
                                <li v-for="album in track.albums">
                                    <NuxtLink class="text-primary hover:underline" :to="`/discography/albums/${album.id}`">{{ album.title }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="track.credits?.length">
                        <MarkdownHeader text="Credits" :level="2" />
                        <ul class="list-inside list-disc">
                            <li v-for="credit in track.credits">{{ credit.role }}: {{ credit.name }}</li>
                        </ul>
                    </template>
                    <template v-if="track.links?.length">
                        <MarkdownHeader text="Links" :level="2" />
                        <ul class="list-inside list-disc">
                            <li v-for="link in track.links">
                                <NuxtLink class="text-primary hover:underline" :to="link.url">{{ link.label }}</NuxtLink>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
    </PageBase>
</template>
