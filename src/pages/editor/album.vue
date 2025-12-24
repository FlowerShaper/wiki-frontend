<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import TextBox from '~/components/editor/text-box.vue';
import type { DiscographyAlbum } from '~/models/discography/DiscographyAlbum';
import type { RawAlbumFile } from '~/models/editor/RawAlbumFile';

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
            covers: raw_data.value.covers,
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
    DownloadObjectJSON(raw_data.value, "album.json");
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
        <div class="flex flex-col gap-5">
            <div class="flex flex-row gap-5 *:flex-1">
                <EditorButton @click="Reset">{{ '\uf0e2 Reset' }}</EditorButton>
                <EditorButton @click="SaveToFile">{{ '\uf0c7 Save to file' }}</EditorButton>
                <EditorButton @click="openLoadFile">{{ '\uf574 Load from file' }}</EditorButton>
                <EditorButton @click="wip">{{ '\uf0ee Load existing' }}</EditorButton>
            </div>
            <TextBox v-model="raw_data.title" label="Title" placeholder="..." />
            <TextBox v-model="raw_data.title_romanized" label="Title (Romanized)" placeholder="..." />
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
        </div>
        <div class="flex max-w-full flex-col gap-4 text-lg">
            <DiscographyHeader :item="result" />
            <div>
                <DiscographyInfoBox :item="result" />
            </div>
        </div>
    </div>
</template>
