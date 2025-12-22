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
        icon: 'flag:gb-1x1',
    },
    {
        id: 'jp',
        name: '日本語',
        icon: 'flag:jp-1x1',
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
        <div v-if="state.overlays.profile" @click="Close" class="pointer-events-auto fixed left-0 top-0 size-full bg-black bg-opacity-25">
            <div class="mx-auto w-full 2xl:w-page">
                <div
                    @click="$event.stopPropagation()"
                    class="ml-auto mt-16 flex w-full origin-top-right flex-col gap-2 rounded-b-xl bg-2 p-2 md:mr-6 md:mt-20 md:w-64 md:rounded-xl"
                >
                    <template v-if="!react.menu">
                        <div class="flex flex-col">
                            <div class="overlap-grid h-20 w-full overflow-hidden rounded">
                                <img class="size-full object-cover" :src="API.CurrentUser.value?.banner || Placeholder" alt="" />
                                <div class="bg-1 opacity-50"></div>
                            </div>
                            <div class="z-10 -mt-12 flex flex-col items-center">
                                <img class="mb-1 size-16 rounded-lg" :src="API.CurrentUser.value?.avatar || Placeholder" alt="" />
                                <p class="text-base">{{ API.CurrentUser.value?.name || 'not logged in' }}</p>
                                <p class="text-xs opacity-80">{{ API.CurrentUser.value?.staff ? 'staff' : 'visitor' }}</p>
                            </div>
                        </div>
                        <div class="h-1 w-full px-2">
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
                        <ProfileOverlayButton @click="ChangeLanguage(l.id)" :text="l.name" v-for="l in languages">
                            <template v-slot:icon>
                                <Icon :name="l.icon" class="size-4 rounded-sm" />
                            </template>
                            <template v-slot:right>
                                <p class="font-fa" v-if="settings.language == l.id">{{ '\uf00c' }}</p>
                            </template>
                        </ProfileOverlayButton>
                    </div>
                    <div v-else-if="react.menu == SubMenu.Theme">
                        <ProfileOverlayButton @click="CloseSubMenu" :icon="'\uf060'" text="back" />
                        <ProfileOverlayButton @click="ChangeTheme(t.id)" :icon="t.icon" :text="t.id" v-for="t in themes">
                            <template v-slot:right>
                                <p class="font-fa" v-if="settings.theme == t.id">{{ '\uf00c' }}</p>
                            </template>
                        </ProfileOverlayButton>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.profile-enter-active,
.profile-leave-active {
    transition:
        opacity 150ms,
        transform 300ms;

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
        @apply -translate-y-4 md:translate-y-0 md:scale-95;
    }
}
</style>
