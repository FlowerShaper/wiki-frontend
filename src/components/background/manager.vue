<script setup lang="ts">
const { component } = defineProps<{
    component: any;
}>();

const bg = useState<{ component: any; props: any } | undefined>('global-background');

onMounted(() => {
    bg.value = { component, props: useAttrs() };
});

onBeforeUnmount(() => {
    bg.value = undefined;
});
</script>

<template></template>
