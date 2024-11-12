import { reactive } from 'vue';

import Cookies from '@/utils/Cookies';
import WikiUser from '@/api/models/users/WikiUser';

const defaultSettings: Settings = {
    simpleFont: false,
    language: 'en',
    theme: "dark"
};

export const state = reactive<{
    user?: WikiUser,
    overlays: {
        profile?: boolean
    }
}>({
    user: Cookies.Get('user'),
    overlays: {}
});

export const settings = reactive<Settings>({ ...defaultSettings, ...Cookies.Get('settings') })

export function UpdateSetting(func: (setting: Settings) => void) {
    func(settings)

    const json = JSON.stringify(settings)
    Cookies.Set('settings', json)
}

type Settings = {
    simpleFont: boolean,
    language: string,
    theme: string,
}