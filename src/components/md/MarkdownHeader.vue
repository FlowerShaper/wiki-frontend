<script setup lang="ts">
const props = defineProps<{
    text: string,
    level: number
}>()

const id = props.text.toLowerCase().replace(/[^\w]+/g, '-')
</script>

<template>
    <div class="flex flex-col-reverse gap-1.5 mt-3 first:mt-0 scroll-m-20" :id="id">
        <div class="h-0.5 rounded" :class="{
            'w-16 bg-accent': level == 2,
            'w-12 bg-4': level == 3,
        }"></div>
        <component :is="`h${level}`" v-html="text" />
    </div>
</template>