<script setup lang="ts">
const props = defineProps<{
    src: string;
    alt: string;
}>();

let trimmed = props.alt.replace('<', '').replace('>', '').trimStart().trimEnd();

const left = props.alt.endsWith('<');
const right = props.alt.endsWith('>');
</script>

<template>
    <ClientOnly>
        <div
            class="flex w-full flex-col gap-2 md:h-auto md:w-auto"
            :class="{
                'md:max-w-1/2 md:float-left md:mr-4': left,
                'md:max-w-1/2 md:float-right md:ml-4': right,
                'md:h-auto md:w-full': !left && !right,
            }"
        >
            <img class="rounded-xl" :src="api.ResolveAsset(src)" @click="ShowImage(src, trimmed)" />
            <p class="text-center opacity-75">{{ trimmed }}</p>
        </div>
    </ClientOnly>
</template>
