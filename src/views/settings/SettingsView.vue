<script setup lang="ts">
import { settings, UpdateSetting } from '@/utils/State';
</script>

<template>
    <p @click="UpdateSetting(s => s.simpleFont = !s.simpleFont)">Simple Font: {{ settings.simpleFont }}</p>
</template>