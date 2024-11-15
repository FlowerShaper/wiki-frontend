<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

import WikiUser from '@/api/models/users/WikiUser';

import PageBase from '@/components/page/PageBase.vue';
import LoadingContainer from '@/components/status/LoadingContainer.vue';
import ErrorContainer from '@/components/status/ErrorContainer.vue';

import API from '@/utils/API';

const route = useRoute()
const id = route.params.id

const react = reactive<{
    loading: boolean,
    error?: string,
    user?: WikiUser
}>({
    loading: true
})

API.PerformGet<WikiUser>(`/users/${id}`).then(res => {
    if (!res.IsSuccess() || !res.data)
        throw new Error(res.message)

    react.user = res.data
}).catch(ex => react.error = ex.message)
    .finally(() => react.loading = false)
</script>

<template>
    <PageBase>
        <LoadingContainer v-if="react.loading" />
        <ErrorContainer :text="react.error" v-else-if="react.error" />
        <div v-else-if="react.user">
            <p>{{ react.user.name }}</p>
        </div>
    </PageBase>
</template>