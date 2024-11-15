<script setup lang="ts">
import PageBase from '@/components/page/PageBase.vue';

import { settings, UpdateSetting } from '@/utils/State';
</script>

<template>
    <PageBase>
        <p @click="UpdateSetting(s => s.simpleFont = !s.simpleFont)">Simple Font: {{ settings.simpleFont }}</p>
    </PageBase>
</template>