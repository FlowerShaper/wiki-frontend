<script setup lang="ts">
const props = defineProps<{
    text: string,
    level: number
}>()

const id = props.text.toLowerCase().replace(/[^\w]+/g, '-')
</script>

<template>
    <div class="flex flex-col-reverse gap-1.5 mt-3 first:mt-0">
        <div class="h-0.5 rounded" :class="{
            'w-16 bg-dark-accent': level == 2,
            'w-12 bg-dark-4': level == 3,
        }"></div>
        <component :is="`h${level}`" class="scroll-m-8" v-html="text" :id="id" />
    </div>
</template>