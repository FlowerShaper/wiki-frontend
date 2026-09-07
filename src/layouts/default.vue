<script setup lang="ts">
const background = useState<{ component: any; props: any } | undefined>('global-background', () => undefined);
const bgComponent = shallowRef<{ component: any; props: any } | undefined>(undefined);
watch(background, (v) => (bgComponent.value = v), { immediate: true });
</script>

<template>
    <Transition name="fade" mode="out-in">
        <div v-if="bgComponent?.component"
            class="pointer-events-none fixed top-0 left-0 -z-10 h-screen w-screen">
            <component :is="bgComponent.component" v-bind="bgComponent.props" />
        </div>
    </Transition>

    <div class="overlap-grid mx-auto min-h-[calc(100vh-4rem)] w-full pt-16 2xl:w-page">
        <slot></slot>
    </div>

    <div class="pointer-events-none fixed left-0 top-0 z-20 h-screen w-screen">
        <ProfileOverlay />
        <SearchOverlay />
    </div>

    <NavigationBar />
    <FooterBar />
</template>
