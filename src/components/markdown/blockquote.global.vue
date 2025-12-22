<script setup lang="ts">
defineProps<{
    title?: string;
    type?: string;
}>();
</script>

<template>
    <div class="p-4 rounded-lg flex flex-row gap-3 overflow-x-auto text-sm bg-2 border" :class="`border-bq-${type}`">
        <div class="*:text-base">
            <i class="fa fa-warning text-bq-warning" v-if="type == 'warning' || type == 'caution'"></i>
            <i class="fa fa-circle-info text-bq-tip" v-else-if="type == 'tip'"></i>
            <i class="fa fa-bolt text-bq-danger" v-else-if="type == 'danger'"></i>
            <i class="fa fa-question" v-else></i>
        </div>
        <div>
            <p class="text-base font-semibold mb-1">{{ title || type?.toUpperCase() }}</p>
            <p><slot></slot></p>
        </div>
    </div>
</template>
