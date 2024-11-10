<script setup lang="ts">
import { RouterLink } from 'vue-router';

import NavProfile from './NavProfile.vue';
</script>

<template>
    <nav class="z-20 fixed top-0 left-0 w-full h-16 border-b-2 border-dark-3 bg-dark-1">
        <div class="w-full mx-auto 2xl:w-page h-full px-5 flex flex-row justify-between items-center">
            <RouterLink class="text-xl" to="/">Camellia Wiki</RouterLink>
            <div class="flex flex-row gap-4 items-center">
                <a class="hover:underline" href="https://github.com/FlowerShaper">github</a>
                <a class="hover:underline" href="#">discord</a>

                <div class="w-1 h-6 bg-dark-3 rounded mx-2"></div>
                
                <NavProfile />
            </div>
        </div>
    </nav>
</template>