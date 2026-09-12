<script setup lang="ts">
import type { DiscographyAlbum } from '~/models/discography/DiscographyAlbum';

const props = defineProps<{
    id: string;
}>();

const { data } = await api.PerformGet<DiscographyAlbum>(`/discography/albums/${props.id}`);
</script>

<template><NuxtLink :to="`/discography/albums/${id}`" :class="{ '!text-bq-caution': !data }">{{ data?.title ?? id }}</NuxtLink></template>