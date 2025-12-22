<script setup lang="ts">
defineProps<{
    num: number;
}>();
</script>

<template>
    <a :href="`#note-${num}`" class="align-super text-sm leading-none">{{ num }}</a>
</template>
