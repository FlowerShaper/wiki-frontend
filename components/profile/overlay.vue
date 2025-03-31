<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { state, UpdateSetting } from '~/utils/state';
import Placeholder from '@/assets/images/placeholder.png';
import API from '~/utils/api';

const themes = [
    {
        id: 'dark',
        icon: '\uf186',
    },
    {
        id: 'light',
        icon: '\ue28f',
    },
    {
        id: 'alpha',
        icon: '\uf186',
    },
    {
        id: 'catppuccin',
        icon: '\uf6be',
    },
];

const languages = [
    {
        id: 'en',
        name: 'english',
    },
    {
        id: 'jp',
        name: 'japanese',
    },
];

const react = reactive<{
    menu?: SubMenu;
}>({});

function CloseSubMenu() {
    react.menu = SubMenu.Nothing;
}

function Close() {
    CloseSubMenu();
    state.overlays.profile = false;
}

function ChangeTheme(theme: string) {
    UpdateSetting((s) => (s.theme = theme));
}

function ChangeLanguage(lang: string) {
    UpdateSetting((s) => (s.language = lang));
}

enum SubMenu {
    Nothing,
    Language,
    Theme,
}
</script>

<template>
    <Transition name="profile">
        <div v-if="state.overlays.profile" @click="Close" class="fixed size-full top-0 left-0 pointer-events-auto bg-black bg-opacity-25">
            <div class="w-full 2xl:w-page mx-auto">
                <div @click="$event.stopPropagation()" class="flex flex-col ml-auto mt-20 mr-6 w-64 bg-2 p-2 rounded-xl gap-2 origin-top-right">
                    <template v-if="!react.menu">
                        <div class="flex flex-col">
                            <div class="overlap-grid w-full h-20 rounded overflow-hidden">
                                <img class="size-full object-cover" :src="API.CurrentUser.value?.banner || Placeholder" alt="" />
                                <div class="bg-1 opacity-50"></div>
                            </div>
                            <div class="z-10 flex flex-col items-center -mt-12">
                                <img class="size-16 rounded-lg mb-1" :src="API.CurrentUser.value?.avatar || Placeholder" alt="" />
                                <p class="text-base">{{ API.CurrentUser.value?.name || 'not logged in' }}</p>
                                <p class="text-xs opacity-80">{{ API.CurrentUser.value?.staff ? 'staff' : 'visitor' }}</p>
                            </div>
                        </div>
                        <div class="w-full h-1 px-2">
                            <div class="size-full bg-3"></div>
                        </div>
                        <div class="flex flex-col">
                            <RouterLink :to="`/user/${API.CurrentUser.value.id}`" @click="Close" v-if="API.CurrentUser.value">
                                <ProfileOverlayButton :icon="'\uf007'" text="my profile" />
                            </RouterLink>
                            <ProfileOverlayButton @click="API.OpenLogin" :icon="'\uf2f6'" text="log in" v-else />
                            <ProfileOverlayButton @click="react.menu = SubMenu.Language" :icon="'\uf57d'" text="language" />
                            <ProfileOverlayButton @click="react.menu = SubMenu.Theme" :icon="'\ue206'" text="theme" />
                            <RouterLink to="/settings" @click="Close">
                                <ProfileOverlayButton :icon="'\uf013'" text="settings" />
                            </RouterLink>
                            <ProfileOverlayButton @click="API.Logout" :icon="'\uf2f5'" text="sign out" v-if="API.CurrentUser.value" />
                        </div>
                    </template>
                    <div v-else-if="react.menu == SubMenu.Language">
                        <ProfileOverlayButton @click="CloseSubMenu" :icon="'\uf060'" text="back" />
                        <ProfileOverlayButton @click="ChangeLanguage(l.id)" :icon="'\uf57d'" :text="l.id" v-for="l in languages" />
                    </div>
                    <div v-else-if="react.menu == SubMenu.Theme">
                        <ProfileOverlayButton @click="CloseSubMenu" :icon="'\uf060'" text="back" />
                        <ProfileOverlayButton @click="ChangeTheme(t.id)" :icon="t.icon" :text="t.id" v-for="t in themes" />
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

    > div > div {
        transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
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

    > div > div {
        transform: scale(0.95);
    }
}
</style>
