<script setup lang="ts">
const icons = [
    'https://cdn.discordapp.com/emojis/1229060193665421362.gif',
    'https://cdn.discordapp.com/emojis/1255719956167786558.webp',
    'https://cdn.discordapp.com/emojis/1272569262069776394.gif',
    'https://cdn.discordapp.com/emojis/1295387980932055100.webp',
    'https://cdn.discordapp.com/emojis/508395116034129930.webp',
];

const selected = icons[Math.floor(icons.length * Math.random())];
</script>

<template>
    <div class="flex flex-col items-center mx-auto">
        <img class="size-32 object-cover pb-2 rounded" :src="selected" alt="icon" />
        <p class="text-lg font-medium">We're still working on this.</p>
        <p class="opacity-80">Check back later!</p>
    </div>
</template>
