<script setup lang="ts">
import { ref } from 'vue';

const input = ref<HTMLInputElement>();
const model = defineModel();

defineProps<{
    label?: string;
}>()

defineExpose({ input })
</script>

<template>
    <div class="relative">
        <div class="absolute left-4 w-fit top-0 h-0 flex size-6 items-center justify-center">
            <p class="text-xs bg-1 px-2 break-keep" v-if="label">{{ label }}</p>
        </div>
        <input v-model="model" type="text" ref="input" v-bind="$attrs" class="w-full rounded-xl bg-1 border-2 !border-3 px-5 py-4 focus:outline-none">
    </div>
</template>