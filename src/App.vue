<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavBar from './components/nav/NavBar.vue';
</script>

<template>
    <div class="w-full 2xl:w-page mx-auto pt-24 pb-16">
        <RouterView />
    </div>

    <NavBar />
</template>