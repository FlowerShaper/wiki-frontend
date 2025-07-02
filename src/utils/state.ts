import { reactive } from 'vue';

import Cookies from './cookies';

const defaultSettings: Settings = {
    simpleFont: false,
    language: 'en',
    theme: 'dark',
};

export const state = reactive<{
    played_home_animation: boolean;
    overlays: {
        profile?: boolean;
    };
    image_showing: boolean;
    image?: {
        url: string;
        name: string;
    };
}>({
    played_home_animation: false,
    image_showing: false,
    overlays: {},
});

export const settings = reactive<Settings>({ ...defaultSettings });

export function LoadSettings() {
    Object.assign(settings, Cookies.Get('settings'));
}

export function UpdateSetting(func: (setting: Settings) => void) {
    func(settings);

    const json = JSON.stringify(settings);
    Cookies.Set('settings', json);
}

export function ShowImage(url: string, name: string) {
    state.image_showing = true;
    state.image = {
        url: url,
        name: name,
    };
}

type Settings = {
    simpleFont: boolean;
    language: string;
    theme: string;
};
