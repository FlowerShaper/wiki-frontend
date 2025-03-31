<script setup lang="ts">
defineProps<{
    icon?: string;
    text: string;
}>();
</script>

<template>
    <div class="flex flex-row px-2 py-1.5 rounded w-full text-xs items-center justify-between hover:bg-text hover:bg-opacity-20 cursor-pointer">
        <div class="flex flex-row gap-1 items-center">
            <div class="size-5 flex items-center justify-center">
                <slot name="icon">
                    <p class="font-fa font-bold">{{ icon }}</p>
                </slot>
            </div>
            <p>{{ text }}</p>
        </div>
        <slot name="right"></slot>
    </div>
</template>
