import { reactive } from 'vue';

import Cookies from './cookies';

const defaultSettings: Settings = {
    simpleFont: false,
    language: 'en',
    theme: 'dark',
};

export const state = reactive<{
    overlays: {
        profile?: boolean;
    };
}>({
    overlays: {},
});

export const settings = reactive<Settings>({ ...defaultSettings });

export function LoadSettings() {
    Object.assign(settings, Cookies.Get('settings'))
}

export function UpdateSetting(func: (setting: Settings) => void) {
    func(settings);

    const json = JSON.stringify(settings);
    Cookies.Set('settings', json);
}

type Settings = {
    simpleFont: boolean;
    language: string;
    theme: string;
};
