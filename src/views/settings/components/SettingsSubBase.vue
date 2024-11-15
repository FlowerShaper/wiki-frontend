<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-xl font-bold">{{ title }}</h1>
        <slot></slot>
    </div>
</template>