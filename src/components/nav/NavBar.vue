<script setup lang="ts">
import { RouterLink } from 'vue-router';

import API from '@/utils/API';
import { state } from '@/utils/State';
</script>

<template>
    <nav class="fixed top-0 left-0 w-full h-16 border-b-2 border-dark-3 bg-dark-1">
        <div class="w-full mx-auto 2xl:w-page h-full px-5 flex flex-row justify-between items-center">
            <RouterLink class="text-xl" to="/">Camellia Wiki</RouterLink>
            <div class="flex flex-row gap-4 items-center">
                <RouterLink to="/wiki/contributing">contributing</RouterLink>
                <RouterLink to="/wiki/about">about</RouterLink>
                <div class="w-1 h-6 bg-dark-3 rounded mx-2"></div>
                <RouterLink :to="`/user/${state.user.id}`" class="hover:underline" v-if="state.user">{{ state.user.name }}</RouterLink>
                <p class="hover:underline" @click="API.OpenLogin" v-else>Log In</p>
            </div>
        </div>
    </nav>
</template>