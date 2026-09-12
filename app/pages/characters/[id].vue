<script setup lang="ts">
const { data: char, error } = await api.PerformGet<Character>(`/characters/${useRoute().params.id}`);

if (char) SetMetadata(char.name, '', api.ResolveAsset(`cdn://images/characters/${char.id}/icon.png`));

const bg = h('img', {
    src: api.ResolveAsset(`cdn://images/characters/${char?.id}/background.png`),
});
</script>

<template>
    <PageBase>
        <BackgroundManager :component="bg" class="hidden aspect-square lg:block absolute h-full right-0 translate-x-1/4 char-bg-mask object-cover" />
        <div class="flex max-w-full flex-col gap-4 text-lg lg:pr-[30%]" v-if="char">
            <p class="truncate text-4xl font-bold text-primary">{{ char.name }}</p>
            <MarkdownView :content="char.content" />
            <MarkdownHeader text="Official Artwork" :level="2" />
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MarkdownImage :src="api.ResolveAsset(img.src)" :alt="img.alt" v-for="img in char.images" />
            </div>
        </div>
        <InfoNotFound :text="error?.message" v-else-if="error" />
    </PageBase>
</template>

<style>
.char-bg-mask {
    mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.1) 20%, white 100%);
}
</style>
