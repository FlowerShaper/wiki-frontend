<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import TextArea from '~/components/editor/text-area.vue';
import TextBox from '~/components/editor/text-box.vue';
import type { DiscographyAlbum } from '~/models/discography/DiscographyAlbum';
import type { DiscographyTrack } from '~/models/discography/DiscographyTrack';
import type { RawAlbumFile } from '~/models/editor/RawAlbumFile';
import Markdown from '~/utils/markdown';

const raw_data = ref<RawAlbumFile>({} as RawAlbumFile);
const result = ref<DiscographyAlbum>({} as DiscographyAlbum);

const { open: openLoadFile, onChange: onLoadFile } = useFileDialog({
    accept: 'application/json',
});

onLoadFile(async (f) => {
    if (!f?.length) return;

    var text = await f[0].text();
    LoadFromText(text);
});

LoadFromText('{}');

if (import.meta.client) {
    const stored = localStorage.getItem('editor_album');
    if (stored) LoadFromText(stored);
}

definePageMeta({
    layout: 'empty',
});

watch(
    raw_data,
    () => {
        if (import.meta.client) {
            const json = JSON.stringify(raw_data.value);
            localStorage.setItem('editor_album', json);
        }

        const album: DiscographyAlbum = {
            id: '',
            title: raw_data.value.title,
            title_romanized: raw_data.value.title_romanized,
            content: raw_data.value.content,
            covers: raw_data.value.covers,
            credits: raw_data.value.credits,
            links: raw_data.value.links,
            discs: raw_data.value.discs?.map((d) => {
                return {
                    name: d.name,
                    tracks: d.tracks.map((t) => {
                        var track: DiscographyTrack = {
                            id: t,
                            title: t,
                            length: '',
                        };

                        return track;
                    }),
                };
            }),
        };

        if (raw_data.value.release && raw_data.value.release.year > 0) {
            album.release = {
                year: raw_data.value.release.year,
                month: raw_data.value.release.month,
                day: raw_data.value.release.day,
            };
        }

        console.log('refreshed', album);
        result.value = album;
    },
    { deep: true, immediate: true },
);

function LoadFromText(text: string) {
    var parsed = JSON.parse(text) as RawAlbumFile;
    if (!parsed.title) parsed.title = 'Album Name';
    if (!parsed.title_romanized) parsed.title_romanized = '';
    if (!parsed.content) parsed.content = '';
    if (!parsed.covers) parsed.covers = [];
    if (!parsed.credits) parsed.credits = [];
    if (!parsed.links) parsed.links = [];
    if (!parsed.release) parsed.release = { year: 0, month: 0, day: 0 };
    if (!parsed.discs) parsed.discs = [];
    raw_data.value = parsed;
}

function SaveToFile() {
    DownloadObjectJSON(raw_data.value, 'album.json');
}

function Reset() {
    localStorage.removeItem('editor_album');
    LoadFromText('{}');
}

function wip() {
    alert('still work in progress');
}
</script>

<template>
    <div class="grid h-screen max-h-screen w-screen grid-cols-2 gap-4 overflow-hidden p-4">
        <div class="hide-scroll flex h-full flex-col gap-5 overflow-y-scroll">
            <div class="flex flex-row gap-5 *:flex-1">
                <EditorButton @click="Reset">{{ '\uf0e2 Reset' }}</EditorButton>
                <EditorButton @click="SaveToFile">{{ '\uf0c7 Save to file' }}</EditorButton>
                <EditorButton @click="openLoadFile">{{ '\uf574 Load from file' }}</EditorButton>
                <EditorButton @click="wip">{{ '\uf0ee Load existing' }}</EditorButton>
            </div>
            <TextBox v-model="raw_data.title" label="Title" placeholder="..." />
            <TextBox v-model="raw_data.title_romanized" label="Title (Romanized)" placeholder="..." />
            <TextArea v-model="raw_data.content" label="Content" rows="10" />
            <div class="flex flex-row gap-5 *:flex-1" v-if="raw_data.release">
                <TextBox v-model.number="raw_data.release.year" label="Year" />
                <TextBox v-model.number="raw_data.release.month" label="Month" />
                <TextBox v-model.number="raw_data.release.day" label="Day" />
            </div>
            <template v-if="raw_data.covers">
                <div class="flex flex-row justify-between">
                    <p class="text-xs">Covers</p>
                    <p class="text-xs hover:underline" @click="raw_data.covers.push({ url: '', name: '' })">add new</p>
                </div>
                <div class="flex w-full flex-row items-center gap-5" v-for="cover in raw_data.covers">
                    <TextBox class="flex-1" v-model.number="cover.name" label="Name" />
                    <TextBox class="flex-1" v-model.number="cover.url" label="URL" />
                    <p @click="raw_data.covers.splice(raw_data.covers.indexOf(cover), 1)">X</p>
                </div>
            </template>
            <template v-if="raw_data.discs">
                <div class="flex flex-row justify-between">
                    <p class="text-xs">Discs</p>
                    <p class="text-xs hover:underline" @click="raw_data.discs.push({ name: '', tracks: [] })">add new</p>
                </div>
                <div class="flex w-full flex-col items-center gap-5 rounded-xl border-2 !border-3 p-4" v-for="disc in raw_data.discs">
                    <div class="flex w-full flex-row items-center gap-5">
                        <TextBox class="flex-1" v-model.number="disc.name" label="Name" />
                        <p @click="raw_data.discs.splice(raw_data.discs.indexOf(disc), 1)">X</p>
                    </div>
                    <div class="flex w-full flex-row justify-between">
                        <p class="text-xs">Tracks</p>
                        <p class="text-xs hover:underline" @click="disc.tracks.push('')">add new</p>
                    </div>
                    <div class="flex w-full flex-row items-center gap-5" v-for="(track, idx) in disc.tracks">
                        <TextBox class="flex-1" v-model.number="disc.tracks[idx]" label="ID" />
                        <p @click="disc.tracks.splice(idx, 1)">X</p>
                    </div>
                </div>
            </template>
            <template v-if="raw_data.credits">
                <div class="flex flex-row justify-between">
                    <p class="text-xs">Credits</p>
                    <p class="text-xs hover:underline" @click="raw_data.credits.push({ role: '', name: '' })">add new</p>
                </div>
                <div class="flex w-full flex-row items-center gap-5" v-for="credit in raw_data.credits">
                    <TextBox class="flex-1" v-model.number="credit.role" label="Role" />
                    <TextBox class="flex-1" v-model.number="credit.name" label="Name" />
                    <p @click="raw_data.credits.splice(raw_data.credits.indexOf(credit), 1)">X</p>
                </div>
            </template>
            <template v-if="raw_data.links">
                <div class="flex flex-row justify-between">
                    <p class="text-xs">Links</p>
                    <p class="text-xs hover:underline" @click="raw_data.links.push({ url: '', label: '' })">add new</p>
                </div>
                <div class="flex w-full flex-row items-center gap-5" v-for="link in raw_data.links">
                    <TextBox class="flex-1" v-model.number="link.label" label="Label" />
                    <TextBox class="flex-1" v-model.number="link.url" label="URL" />
                    <p @click="raw_data.links.splice(raw_data.links.indexOf(link), 1)">X</p>
                </div>
            </template>
        </div>
        <div class="flex h-full max-w-full flex-col gap-4 overflow-y-scroll text-lg">
            <DiscographyHeader :item="result" />
            <div>
                <DiscographyInfoBox :item="result" />
                <MarkdownView :content="Markdown.Render(result.content)" v-if="result.content" />
                <div class="md-content mt-3">
                    <template v-if="result.discs?.length">
                        <MarkdownHeader text="Track List" :level="2" />
                        <DiscographyItemList :title="disc.name" :numbered="true" :depth="3" v-for="disc in result.discs">
                            <li v-for="track in disc.tracks" :key="track.id">
                                <!--  <NuxtLink class="text-primary hover:underline" :to="`/discography/tracks/${track.id}`" v-if="track.title">
                                    {{ track.title }}
                                    <span class="text-base opacity-80">({{ track.length }})</span>
                                </NuxtLink>
                                <span class="text-bq-danger" v-else>{{ track.id }} (MISSING DATA)</span> -->

                                <NuxtLink class="text-primary hover:underline" :to="`/discography/tracks/${track.id}`">{{ track.id }}</NuxtLink>
                            </li>
                        </DiscographyItemList>
                    </template>
                    <DiscographyItemList title="Credits" v-if="result.credits?.length">
                        <li v-for="credit in result.credits">{{ credit.role }}: {{ credit.name }}</li>
                    </DiscographyItemList>
                    <DiscographyItemList title="Links" v-if="result.links?.length">
                        <li v-for="link in result.links">
                            <NuxtLink class="text-primary hover:underline" :to="link.url">{{ link.label }}</NuxtLink>
                        </li>
                    </DiscographyItemList>
                </div>
            </div>
        </div>
    </div>
</template>
