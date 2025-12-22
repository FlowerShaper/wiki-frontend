<script setup lang="ts">
import type { DiscographyAlbum } from '~/models/discography/DiscographyAlbum';
import type { DiscographyTrack } from '~/models/discography/DiscographyTrack';
import API from '~/utils/api';

const { data, error } = await API.PerformGet<{
    albums: DiscographyAlbum[];
    tracks: DiscographyTrack[];
}>(`/discography`);

function GetTrackCount(album: DiscographyAlbum) {
    let count = 0;

    if (album.discs) {
        album.discs.forEach((x) => (count += x.tracks.length));
    }

    return count;
}
</script>

<template>
    <PageBase>
        <div class="flex max-w-full flex-col gap-4 text-lg" v-if="data">
            <div>
                <h1 class="text-4xl font-bold text-primary">Discography</h1>
                <div class="mt-1 h-1 w-24 rounded bg-primary"></div>
            </div>
            <MarkdownHeader :level="2" text="Albums" />
            <table class="">
                <thead>
                    <tr class="*:h-6 *:text-left *:text-xs md:*:h-8 md:*:text-base">
                        <th class="min-w-12 max-w-12 md:min-w-16 md:max-w-16"></th>
                        <th class="w-full">Name</th>
                        <th class="min-w-16 max-w-16 md:min-w-20 md:max-w-20">Tracks</th>
                        <th class="min-w-16 max-w-16 md:min-w-44 md:max-w-44">Release</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="first:rounded-t-lg last:rounded-b-lg odd:bg-2 even:bg-3" v-for="album in data.albums">
                        <td><NuxtImg class="size-10 rounded md:m-1 md:size-12" v-if="album.covers" :src="API.ResolveAsset(album.covers[0].url)" /></td>
                        <td class="pr-2">
                            <NuxtLink :to="`/discography/albums/${album.id}`" class="line-clamp-1 w-full text-sm font-semibold md:text-lg">
                                {{ album.title }}
                                <span v-if="album.title_romanized && album.title != album.title_romanized" class="text-xs font-normal opacity-80 md:text-base">
                                    {{ album.title_romanized }}
                                </span>
                            </NuxtLink>
                        </td>
                        <td class="text-sm md:text-base">{{ GetTrackCount(album) }}</td>
                        <td>
                            <template v-if="album.release">
                                <p class="text-sm !leading-none md:mb-1 md:text-base md:font-semibold">{{ album.release.year }}</p>
                                <p class="hidden text-sm leading-none opacity-80 md:block">
                                    {{ formatting.Order(album.release.day) }} {{ formatting.GetMonth(album.release.month) }}
                                </p>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
            <MarkdownHeader :level="2" text="Singles" />
            <table>
                <thead>
                    <tr class="*:h-6 *:text-left *:text-xs md:*:h-8 md:*:text-base">
                        <th class="min-w-12 max-w-12 md:min-w-16 md:max-w-16"></th>
                        <th class="w-full">Name</th>
                        <th class="min-w-16 max-w-16 md:min-w-44 md:max-w-44">Release</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="first:rounded-t-lg last:rounded-b-lg odd:bg-2 even:bg-3" v-for="track in data.tracks">
                        <td><NuxtImg class="size-10 rounded md:m-1 md:size-12" v-if="track.covers" :src="API.ResolveAsset(track.covers[0].url)" /></td>
                        <td class="pr-2">
                            <NuxtLink :to="`/discography/tracks/${track.id}`" class="line-clamp-1 w-full text-sm font-semibold md:text-lg">
                                {{ track.title }}
                                <span v-if="track.title_romanized && track.title != track.title_romanized" class="text-xs font-normal opacity-80 md:text-base">
                                    {{ track.title_romanized }}
                                </span>
                            </NuxtLink>
                        </td>
                        <td>
                            <template v-if="track.release">
                                <p class="text-sm !leading-none md:mb-1 md:text-base md:font-semibold">{{ track.release.year }}</p>
                                <p class="hidden text-sm leading-none opacity-80 md:block">
                                    {{ formatting.Order(track.release.day) }} {{ formatting.GetMonth(track.release.month) }}
                                </p>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </PageBase>
</template>
