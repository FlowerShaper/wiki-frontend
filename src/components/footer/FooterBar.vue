<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <nav class="z-20 bottom-0 left-0 w-full h-16 border-t-2 border-3 bg-1">
        <div class="w-full mx-auto 2xl:w-page h-full px-5 flex flex-row justify-between items-center">
            <p class="text-sm">Maintained by FLOWER // SHAPER and <a class="hover:underline" href="https://github.com/FlowerShaper/wiki-frontend/graphs/contributors">contributors</a>.</p>
            <div class="flex flex-row gap-4 items-center text-sm">
                <RouterLink class="hover:underline" to="/legal/terms">terms of service</RouterLink>
				<RouterLink class="hover:underline" to="/legal/privacy">privacy policy</RouterLink>
            </div>
        </div>
    </nav>
</template>