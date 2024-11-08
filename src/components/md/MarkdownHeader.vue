<script setup lang="ts">
const props = defineProps<{
    text: string
}>()

const id = props.text.toLowerCase().replace(/[^\w]+/g, '-')
</script>

<template>
    <div class="flex flex-col-reverse gap-1.5 mt-3 first:mt-0">
        <div class="w-16 h-0.5 bg-dark-accent rounded"></div>
        <h2 class="scroll-m-8" :id="id">{{ text }}</h2>
    </div>
</template>