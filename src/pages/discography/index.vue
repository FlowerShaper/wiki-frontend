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
            <table>
                <thead>
                    <tr class="*:h-8 *:text-left *:text-base">
                        <th class="min-w-16 max-w-16"></th>
                        <th class="w-full">Name</th>
                        <th class="min-w-20 max-w-20">Tracks</th>
                        <th class="min-w-44 max-w-44">Release</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="first:rounded-t-lg last:rounded-b-lg odd:bg-2 even:bg-3" v-for="album in data.albums">
                        <td><NuxtImg class="m-1 size-12 rounded" v-if="album.covers" :src="API.ResolveAsset(album.covers[0].url)" /></td>
                        <td class="pr-2">
                            <p class="line-clamp-1 w-full font-semibold">
                                {{ album.title
                                }}<span v-if="album.title_romanized && album.title != album.title_romanized" class="text-base font-normal opacity-80">
                                    {{ album.title_romanized }}
                                </span>
                            </p>
                        </td>
                        <td class="text-base">{{ GetTrackCount(album) }}</td>
                        <td>
                            <template v-if="album.release">
                                <p class="mb-1 text-base font-semibold leading-none">{{ album.release.year }}</p>
                                <p class="text-sm leading-none opacity-80">
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
                    <tr class="*:h-8 *:text-left *:text-base">
                        <th class="min-w-16 max-w-16"></th>
                        <th class="w-full">Name</th>
                        <th class="min-w-44 max-w-44">Release</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="first:rounded-t-lg last:rounded-b-lg odd:bg-2 even:bg-3" v-for="track in data.tracks">
                        <td><NuxtImg class="m-1 size-12 rounded" v-if="track.covers" :src="API.ResolveAsset(track.covers[0].url)" /></td>
                        <td class="pr-2">
                            <p class="line-clamp-1 w-full font-semibold">
                                {{ track.title
                                }}<span v-if="track.title_romanized && track.title != track.title_romanized" class="text-base font-normal opacity-80">
                                    {{ track.title_romanized }}
                                </span>
                            </p>
                        </td>
                        <td>
                            <template v-if="track.release">
                                <p class="mb-1 text-base font-semibold leading-none">{{ track.release.year }}</p>
                                <p class="text-sm leading-none opacity-80">
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
