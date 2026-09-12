<script setup lang="ts">
import type { DiscographyTrack } from '~/models/discography/DiscographyTrack';

const props = defineProps<{
    id: string;
}>();

const { data } = await api.PerformGet<DiscographyTrack>(`/discography/tracks/${props.id}`);
</script>

<template><NuxtLink :to="`/discography/tracks/${id}`" :class="{ '!text-bq-caution': !data }">{{ data?.title ?? id }}</NuxtLink></template>