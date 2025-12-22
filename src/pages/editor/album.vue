<script setup lang="ts">
import TextBox from '~/components/editor/text-box.vue';
import type { DiscographyAlbum } from '~/models/discography/DiscographyAlbum';
import type { DiscographyBase } from '~/models/discography/DiscographyBase';

const raw_data = ref({
    title: 'Album Name',
    title_romanized: '',
    year: 0,
    month: 0,
    day: 0,
    covers: [
        {
            name: 'name',
            url: 'cdn://...',
        },
    ],
});

if (import.meta.client) {
    const stored = localStorage.getItem('editor_album');
    if (stored) raw_data.value = JSON.parse(stored);
}

const result = ref<DiscographyAlbum>({} as DiscographyAlbum);

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

        if (raw_data.value.year + raw_data.value.month + raw_data.value.day != 0) {
            album.release = {
                year: raw_data.value.year,
                month: raw_data.value.month,
                day: raw_data.value.day,
            };
        }

        console.log('refreshed', album);
        result.value = album;
    },
    { deep: true, immediate: true },
);

function Reset() {
    localStorage.removeItem("editor_album")
    window.location.reload()
}
</script>

<template>
    <div class="grid h-screen max-h-screen w-screen grid-cols-2 gap-4 overflow-hidden p-4">
        <div class="flex flex-col gap-5">
            <div class="flex flex-row gap-5">
                <p @click="Reset">clear everything</p>
            </div>
            <TextBox v-model="raw_data.title" label="Title" placeholder="..." />
            <TextBox v-model="raw_data.title_romanized" label="Title (Romanized)" placeholder="..." />
            <div class="flex flex-row gap-5">
                <TextBox v-model.number="raw_data.year" label="Year" />
                <TextBox v-model.number="raw_data.month" label="Month" />
                <TextBox v-model.number="raw_data.day" label="Day" />
            </div>
            <div class="flex flex-row justify-between">
                <p class="text-xs">Covers</p>
                <p class="text-xs hover:underline" @click="raw_data.covers.push({ url: '', name: '' })">add new</p>
            </div>
            <div class="w-full flex flex-row" v-for="cover in raw_data.covers">
                <TextBox class="flex-1" v-model.number="cover.name" label="Name" />
                <TextBox class="flex-1" v-model.number="cover.url" label="URL" />
                <p @click="raw_data.covers.splice(raw_data.covers.indexOf(cover), 1)">X</p>
            </div>
        </div>
        <div class="flex max-w-full flex-col gap-4 text-lg">
            <DiscographyHeader :item="result" />
            <div>
                <DiscographyInfoBox :item="result" />
            </div>
        </div>
    </div>
</template>
