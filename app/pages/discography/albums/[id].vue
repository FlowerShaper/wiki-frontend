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
        <DiscographyContentAlbum :album v-if="album" />
        <InfoNotFound :text="error?.message" v-else />
    </PageBase>
</template>
