<script setup lang="ts">
const { data: track, error } = await api.PerformGet<DiscographyTrack>(`/discography/tracks/${useRoute().params.id}`);

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
        <DiscographyContentTrack class="max-w-full" :track v-if="track" />
        <InfoNotFound :text="error?.message" v-else />
    </PageBase>
</template>
