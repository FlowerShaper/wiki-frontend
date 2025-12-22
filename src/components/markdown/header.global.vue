<script setup lang="ts">
const props = defineProps<{
    text: string;
    level: number;
}>();

const id = props.text.toLowerCase().replace(/[^\w]+/g, '-');
</script>

<template>
    <div class="mt-3 flex scroll-m-20 flex-col-reverse gap-1.5 first:mt-0" :id="id">
        <div
            class="h-0.5 rounded"
            :class="{
                'w-16 bg-primary': level == 2,
                'w-12 bg-4': level == 3,
            }"
        ></div>
        <component
            :class="{
                'text-3xl font-bold': level == 2,
                'text-2xl font-medium': level == 3,
            }"
            :is="`h${level}`"
            >{{ text }}</component
        >
    </div>
</template>
