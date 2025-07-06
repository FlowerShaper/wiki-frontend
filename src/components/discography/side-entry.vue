<script setup lang="ts">
defineProps<{
    title: string;
    value: string;
}>();
</script>

<template>
    <div class="flex flex-row justify-between px-3 py-2 text-sm">
        <p class="opacity-80">{{ title }}</p>
        <p>{{ value }}</p>
    </div>
</template>
