<script setup lang="ts">
defineProps<{
    icon: string
    text: string
}>()
</script>

<template>
    <div class="flex flex-row px-2 py-1.5 rounded w-full text-xs items-center gap-1 hover:bg-dark-text hover:bg-opacity-20">
        <div class="size-5 flex items-center justify-center">
            <p class="font-fa font-bold">{{ icon }}</p>
        </div>
        <p>{{ text }}</p>
    </div>
</template>