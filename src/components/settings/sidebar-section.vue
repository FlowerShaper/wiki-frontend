<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="flex w-full flex-col gap-1">
        <p class="text-xs font-semibold text-primary">{{ title }}</p>
        <slot></slot>
    </div>
</template>
