<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

const page = ref(1);

const {
    data: tracks,
    error,
    pending,
} = await useAsyncData(
    () => `tracks-${page.value}`,
    async () => {
        const { data } = await useFetch(`/api/discography/tracks`, {
            query: { page: page.value },
        });
        return data.value;
    },
    { watch: [page] },
);

const columns: TableColumn<RawTrackFile>[] = [
    {
        id: 'cover',
        size: 32,
        meta: {
            class: {
                td: 'p-0!',
                th: 'w-13 min-w-13',
            },
        },
    },
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        id: 'actions',
    },
];
</script>

<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar title="Track Files" />
        </template>

        <template #body v-if="tracks">
            <UPagination
                class="mx-auto"
                :sibling-count="8"
                variant="ghost"
                v-model:page="page"
                :disabled="pending"
                :total="tracks.count"
                :items-per-page="12"
                first-icon="ph:caret-double-left-bold"
                prev-icon="ph:caret-left-bold"
                next-icon="ph:caret-right-bold"
                last-icon="ph:caret-double-right-bold"
            />
            <UTable :columns :data="tracks.items">
                <template #cover-cell="{ row }">
                    <img
                        class="rounded size-10"
                        :src="api.ResolveAsset(row.original.covers[0].url)"
                        alt=""
                        v-if="row.original.covers && row.original.covers[0]"
                    />
                </template>
                <template #actions-cell="{ row }">
                    <UButton icon="ph:pencil-bold" variant="soft" color="neutral" :to="`/editor/tracks/${row.original.id}`" />
                </template>
            </UTable>
        </template>
        <template #body v-else-if="error">
            <UError :error="{ statusText: error.message }" />
        </template>
    </UDashboardPanel>
</template>
