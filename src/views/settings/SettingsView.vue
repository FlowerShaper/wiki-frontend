<script setup lang="ts">
import { RouterView } from 'vue-router';

import PageBase from '@/components/page/PageBase.vue';

import SidebarEntry from './sidebar/SidebarEntry.vue';
import SidebarSection from './sidebar/SidebarSection.vue';
</script>

<template>
    <PageBase class="flex flex-row !p-0 !pb-0 xl:w-settings mx-auto">
        <div class="relative w-fit">
            <div class="absolute right-0 top-0 -z-10 h-[calc(100vh-64px)] w-screen bg-2"></div>
            <div class="z-0 w-48 flex flex-col gap-3 py-8 px-3">
                <SidebarSection title="you">
                    <SidebarEntry link="/account" :icon="`\uf007`" name="my account" />
                </SidebarSection>
                <SidebarSection title="wiki">
                    <SidebarEntry link="/appearance" :icon="`\ue206`" name="appearance" />
                </SidebarSection>
            </div>
        </div>
        <div class="flex flex-1 flex-col gap-4 p-8">
            <RouterView />
        </div>
    </PageBase>
</template>