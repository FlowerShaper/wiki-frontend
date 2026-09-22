<script setup lang="ts">
const route = useRoute();

const { data } = await useFetch(`/api/discography/tracks/${route.params.id}`);

const raw = ref<RawTrackFile | undefined>(data.value);
const active = ref<'edit' | 'preview'>('edit');

const compiled = computed(() => {
    if (!raw.value) return undefined;

    const track: DiscographyTrack = {
        id: raw.value.id ?? (route.params.id as string),
        title: raw.value.title,
        title_romanized: raw.value.title_romanized,
        content: raw.value.content,
        covers: raw.value.covers,
        credits: raw.value.credits,
        links: raw.value.links,
        length: raw.value.length || '',
        bpm: raw.value.bpm,
        albums: raw.value.albums?.map((a) => {
            return {
                id: a,
                title: a,
            };
        }),
    };

    if (raw.value.release && raw.value.release.year > 0) {
        track.release = {
            year: raw.value.release.year,
            month: raw.value.release.month,
            day: raw.value.release.day,
        };
    }

    return track;
});
</script>

<template>
    <UDashboardPanel v-if="raw">
        <template #header>
            <UDashboardNavbar title="Track Editor">
                <template #trailing>
                    <p class="text-text-2 ml-2">{{ raw.id }}</p>
                </template>
                <template #right>
                    <UTabs
                        v-model="active"
                        :content="false"
                        :items="[
                            { label: 'Editing', value: 'edit' },
                            { label: 'Preview', value: 'preview' },
                        ]"
                    />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="flex flex-col gap-5" v-if="active == 'edit'">
                <EditorTextBox v-model="raw.title" label="Title" placeholder="..." />
                <EditorTextBox v-model="raw.title_romanized" label="Title (Romanized)" placeholder="..." />
                <EditorTextArea v-model="raw.content" label="Content" rows="10" />
                <div class="flex flex-row gap-5 *:flex-1" v-if="raw.release">
                    <EditorTextBox v-model.number="raw.release.year" label="Year" />
                    <EditorTextBox v-model.number="raw.release.month" label="Month" />
                    <EditorTextBox v-model.number="raw.release.day" label="Day" />
                </div>
                <div class="flex flex-row gap-5 *:flex-1 items-center">
                    <EditorTextBox v-model="raw.bpm" label="BPM" />
                    <EditorTextBox v-model="raw.length" label="Month" />
                    <div>
                        <UCheckbox class="ml-4" v-model="raw.single" label="Single" />
                    </div>
                </div>
                <template v-if="raw.covers">
                    <div class="flex flex-row justify-between">
                        <p class="text-xs">Covers</p>
                        <p class="text-xs hover:underline" @click="raw.covers.push({ url: '', name: '' })">add new</p>
                    </div>
                    <div class="flex w-full flex-row items-center gap-5" v-for="cover in raw.covers">
                        <EditorTextBox class="flex-1" v-model.number="cover.name" label="Name" />
                        <EditorTextBox class="flex-1" v-model.number="cover.url" label="URL" />
                        <p @click="raw.covers.splice(raw.covers.indexOf(cover), 1)">X</p>
                    </div>
                </template>
                <template v-if="raw.albums">
                    <div class="flex flex-row justify-between">
                        <p class="text-xs">Albums</p>
                        <p class="text-xs hover:underline" @click="raw.albums.push('')">add new</p>
                    </div>
                    <div class="flex w-full flex-row items-center gap-5" v-for="(album, idx) in raw.albums">
                        <EditorTextBox class="flex-1" label="Name" :value="album" @update:model-value="(v: string) => (raw!.albums![idx] = v)" />
                        <p @click="raw.albums.splice(idx, 1)">X</p>
                    </div>
                </template>
                <template v-if="raw.credits">
                    <div class="flex flex-row justify-between">
                        <p class="text-xs">Credits</p>
                        <p class="text-xs hover:underline" @click="raw.credits.push({ role: '', name: '' })">add new</p>
                    </div>
                    <div class="flex w-full flex-row items-center gap-5" v-for="credit in raw.credits">
                        <EditorTextBox class="flex-1" v-model.number="credit.role" label="Role" />
                        <EditorTextBox class="flex-1" v-model.number="credit.name" label="Name" />
                        <p @click="raw.credits.splice(raw.credits.indexOf(credit), 1)">X</p>
                    </div>
                </template>
                <template v-if="raw.links">
                    <div class="flex flex-row justify-between">
                        <p class="text-xs">Links</p>
                        <p class="text-xs hover:underline" @click="raw.links.push({ url: '', label: '' })">add new</p>
                    </div>
                    <div class="flex w-full flex-row items-center gap-5" v-for="link in raw.links">
                        <EditorTextBox class="flex-1" v-model.number="link.label" label="Label" />
                        <EditorTextBox class="flex-1" v-model.number="link.url" label="URL" />
                        <p @click="raw.links.splice(raw.links.indexOf(link), 1)">X</p>
                    </div>
                </template>
            </div>
            <DiscographyContentTrack :track="compiled" v-if="compiled && active == 'preview'" />
        </template>
    </UDashboardPanel>
</template>
