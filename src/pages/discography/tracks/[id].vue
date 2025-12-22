<script setup lang="ts">
import type { DiscographyTrack } from '~/models/discography/DiscographyTrack';
import API from '~/utils/api';
import Markdown from '~/utils/markdown';

const { data: track, error } = await API.PerformGet<DiscographyTrack>(`/discography/tracks/${useRoute().params.id}`);

const has_romanized = track && track.title_romanized && track.title != track.title_romanized;

if (track) {
    SetMetadata(
        `${track.title}${has_romanized ? ` (${track.title_romanized})` : ''}`,
        track.albums?.length ? `from ${track.albums[0].title}` : '',
        track.covers?.at(0)?.url,
    );
}
</script>

<template>
    <PageBase>
        <div class="flex max-w-full flex-col gap-4 text-lg" v-if="track">
            <DiscographyHeader :item="track" />
            <div>
                <DiscographyInfoBox :item="track">
                    <DiscographySideEntry title="Length" :value="track.length" />
                    <DiscographySideEntry title="BPM" :value="track.bpm" v-if="track.bpm" />
                </DiscographyInfoBox>
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
        <InfoNotFound :text="error?.message" v-else />
    </PageBase>
</template>
