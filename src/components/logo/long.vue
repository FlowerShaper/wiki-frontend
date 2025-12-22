<script setup lang="ts">
import { settings } from '~/utils/state';

import Dark from '@/assets/images/logo/dark-long.png';
import Light from '@/assets/images/logo/light-long.png';

function FromTheme(theme: string) {
    switch (theme) {
        case 'light':
            return Light

        default:
            return Dark
    }
}
</script>

<template>
    <img :src="FromTheme(settings.theme)" alt="wiki logo">
</template>