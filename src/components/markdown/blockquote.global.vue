<script setup lang="ts">
defineProps<{
    as?: string;
}>();
</script>

<template>
    <div class="p-4 rounded-lg flex flex-row gap-3 overflow-x-auto text-sm bg-2 border" :class="`border-bq-${as}`">
        <div class="*:text-base">
            <i class="fa fa-warning text-bq-warning" v-if="as === 'warning'"></i>
            <i class="fa fa-circle-info text-bq-tip" v-else-if="as === 'tip'"></i>
            <i class="fa fa-bolt text-bq-caution" v-else-if="as === 'caution'"></i>
            <i class="fa fa-question" v-else></i>
        </div>
        <div>
            <p class="text-base font-semibold mb-1">{{ as?.toUpperCase() }}</p>
            <p><slot></slot></p>
        </div>
    </div>
</template>
