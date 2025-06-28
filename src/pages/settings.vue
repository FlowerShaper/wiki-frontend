<script setup lang="ts">
</script>

<template>
    <PageBase class="flex flex-row !p-0 !pb-0 xl:w-settings mx-auto">
        <div class="relative w-fit">
            <div class="absolute right-0 top-0 -z-10 h-[calc(100vh-64px)] w-screen bg-2"></div>
            <div class="z-0 w-48 flex flex-col gap-3 py-8 px-3">
                <SettingsSidebarSection title="you">
                    <SettingsSidebarEntry link="/account" :icon="`\uf007`" name="my account" />
                </SettingsSidebarSection>
                <SettingsSidebarSection title="wiki">
                    <SettingsSidebarEntry link="/appearance" :icon="`\ue206`" name="appearance" />
                </SettingsSidebarSection>
            </div>
        </div>
        <div class="flex flex-1 flex-col gap-4 p-8">
            <NuxtPage :transition="false" />
        </div>
    </PageBase>
</template>
