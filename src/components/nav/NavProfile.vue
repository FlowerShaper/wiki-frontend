<script setup lang="ts">
import { state } from '@/utils/State';

import Placeholder from '@/assets/images/placeholder.png'

function ToggleOverlay() {
    state.overlays.profile = !state.overlays.profile
}
</script>

<template>
    <img @click="ToggleOverlay" class="size-10 rounded-lg" :src="state.user?.avatar || Placeholder" alt="">
</template>