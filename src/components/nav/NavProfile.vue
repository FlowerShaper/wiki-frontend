<script setup lang="ts">
import { state } from '@/utils/State';

import Placeholder from '@/assets/images/placeholder.png'

function ToggleOverlay() {
    state.overlays.profile = !state.overlays.profile
}
</script>

<template>
    <img @click="ToggleOverlay" role="button" tabindex="0" aria-label="open profile overlay" class="size-10 rounded-lg cursor-pointer" :src="state.user?.avatar || Placeholder" alt="">
</template>