<script setup lang="ts">
import { reactive } from "vue";
import { RouterLink } from "vue-router";

import API from '@/utils/API';
import { state, UpdateSetting } from '@/utils/State';

import Placeholder from '@/assets/images/placeholder.png'

import ProfileOverlayButton from './ProfileOverlayButton.vue';

const react = reactive<{
    theme?: boolean
}>({})

function Close() {
    react.theme = false
    state.overlays.profile = false
}

function ChangeTheme(theme: string) {
    UpdateSetting(s => s.theme = theme)
}
</script>

<template>
    <Transition name="profile">
        <div v-if="state.overlays.profile" @click="Close"
            class="fixed size-full top-0 left-0 pointer-events-auto bg-black bg-opacity-25">
            <div class="w-full 2xl:w-page mx-auto">
                <div @click="$event.stopPropagation()" class="flex flex-col ml-auto mt-20 mr-6 w-64 bg-2 p-2 rounded-xl gap-2 origin-top-right">
                    <template v-if="!react.theme">
                        <div class="flex flex-col">
                            <div class="overlap-grid w-full h-20 rounded overflow-hidden">
                                <img class="size-full object-cover" :src="state.user?.banner || Placeholder" alt="">
                                <div class="bg-1 opacity-50"></div>
                            </div>
                            <div class="z-10 flex flex-col items-center -mt-12">
                                <img class="size-16 rounded-lg mb-1" :src="state.user?.avatar || Placeholder" alt="">
                                <p class="text-base">{{ state.user?.name || 'not logged in' }}</p>
                                <p class="text-xs opacity-80">{{ state.user?.staff ? 'staff' : 'visitor' }}</p>
                            </div>
                        </div>
                        <div class="w-full h-1 px-2">
                            <div class="size-full bg-3"></div>
                        </div>
                        <div class="flex flex-col">
                            <RouterLink :to="`/user/${state.user.id}`" @click="Close" v-if="state.user" ><ProfileOverlayButton :icon="'\uf007'" text="my profile"/></RouterLink>
                            <ProfileOverlayButton @click="API.OpenLogin" :icon="'\uf2f6'" text="log in" v-else />
                            <ProfileOverlayButton @click="react.theme = true" :icon="'\ue206'" text="theme" />
                            <RouterLink to="/settings" @click="Close"><ProfileOverlayButton :icon="'\uf013'" text="settings" /></RouterLink>
                            <ProfileOverlayButton @click="API.Logout" :icon="'\uf2f5'" text="sign out" v-if="state.user" />
                        </div>
                    </template>
                    <div v-else>
                        <ProfileOverlayButton @click="react.theme = false" :icon="'\uf060'" text="back" />
                        <ProfileOverlayButton @click="ChangeTheme('dark')" :icon="'\uf186'" text="dark" />
                        <ProfileOverlayButton @click="ChangeTheme('light')" :icon="'\ue28f'" text="light" />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss">
.profile-enter-active,
.profile-leave-active {
    transition: opacity 150ms, transform 300ms;

    >div>div {
        transition: all 300ms cubic-bezier(0.23, 1, 0.320, 1);
    }
}

.profile-enter-to,
.profile-leave-from {
    opacity: 1;
}

.profile-enter-from,
.profile-leave-to {
    opacity: 0;
    pointer-events: none;

    >div>div {
        transform: scale(.95);
    }
}
</style>