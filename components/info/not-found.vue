<script setup lang="ts">
defineProps<{
    text?: string;
}>();

const icons = [
    'https://cdn.discordapp.com/emojis/1229060193665421362.gif',
    'https://cdn.discordapp.com/emojis/589498581241823232.webp',
    'https://cdn.discordapp.com/emojis/1372554531748974613.webp',
    'https://cdn.discordapp.com/emojis/1036025166955814922.gif',
    'https://cdn.discordapp.com/emojis/1078212427612688424.gif',
    'https://cdn.discordapp.com/emojis/1241166587579469844.gif',
    'https://cdn.discordapp.com/emojis/1255719956167786558.png',
];

const selected = icons[Math.floor(icons.length * Math.random())];
</script>

<template>
    <div class="flex flex-col items-center mx-auto">
        <img class="size-32 object-cover pb-2 rounded" :src="selected" alt="icon" />
        <p class="text-lg font-medium">Something went wrong...</p>
        <p class="opacity-80">{{ text }}</p>
    </div>
</template>
