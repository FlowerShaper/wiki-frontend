import { APIResponse } from '~/models/APIResponse';
import type WikiUser from '~/models/users/WikiUser';
import type { CookieRef } from '#app';
import type { Exception } from 'sass-embedded';
import type { Result } from '~/models/ResultStates';
import { APIError } from '~/models/APIError';

export default class API {
    static APIUrl = 'http://localhost:1984';
    static TokenCookie: CookieRef<string | undefined>;
    static CurrentUser: CookieRef<WikiUser | undefined>;

    static Setup(dev: boolean) {
        this.APIUrl = dev ? 'http://localhost:1984' : 'https://backend.camellia.wiki';

        this.TokenCookie = useCookie('token', {
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60,
        });

        this.CurrentUser = useCookie<WikiUser>('user', {
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60,
        });
    }

    static async PerformGet<T, E = Exception>(endpoint: string): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'GET');
    }

    static async PerformPost<T, E = Exception>(endpoint: string, body: any): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'POST', body);
    }

    static async PerformPatch<T, E = Exception>(endpoint: string, body: any): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'PATCH', body);
    }

    static async PerformPut<T, E = Exception>(endpoint: string, body: any = {}): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'PUT', body);
    }

    static async PerformDelete<T, E = Exception>(endpoint: string, body: any = {}): Promise<Result<T, E>> {
        return tryPerform<T, E>(endpoint, 'DELETE', body);
    }

    static OpenLogin() {
        const url = `https://discord.com/oauth2/authorize?response_type=token&client_id=1290974200126771263&scope=identify&redirect_uri=${window.location.protocol}//${window.location.host}/oauth/complete`;
        const params = 'width=500,height=600,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no';

        const popup = window.open(url, 'popup', params);

        if (!popup) throw new Error('Failed to open the pop-up.');

        window.addEventListener('message', listener);

        const heartbeat = setInterval(() => {
            if (!popup || popup.closed) {
                clear();
                throw new Error('Pop-up closed without finishing.');
            }

            popup.postMessage('bwomp', `${window.location.protocol}//${window.location.host}/`);
        }, 200);

        window.addEventListener('beforeunload', (_) => {
            if (popup && !popup.closed) popup.close();
            clear();
        });

        function listener(ev: MessageEvent<any>) {
            clear();
            popup?.close();
            console.log(ev);

            if (ev.data.error) throw new Error(ev.data.error);

            const token = ev.data.access_token;
            API.TokenCookie.value = token;
            API.RefreshInfo();
        }

        function clear() {
            clearInterval(heartbeat);
            window.removeEventListener('message', listener);
        }
    }

    static PathToSlug(path: string): string {
        if (path.startsWith('/')) path = path.substring(1);

        return path.replace(/\//gi, '-').toLowerCase();
    }

    static Logout() {
        API.CurrentUser.value = undefined;
        API.TokenCookie.value = undefined;
    }

    static async RefreshInfo() {
        const { data: user, error } = await API.PerformGet<WikiUser>('/users/@me');

        if (error) {
            this.Logout();
            return;
        }

        this.CurrentUser.value = user;
    }
}

async function tryPerform<T, E = Exception>(endpoint: string, method: string, body: any = {}): Promise<Result<T, E>> {
    try {
        const res = await perform<T>(endpoint, method, body);

        if (!res.IsSuccess() || !res.data) throw new APIError(res);

        return { data: res.data, error: null };
    } catch (ex: any) {
        return { data: null, error: ex as E };
    }
}
async function perform<T>(endpoint: string, method: string, body: any = {}): Promise<APIResponse<T>> {
    const rsp = new APIResponse<T>();

    try {
        var opt = {
            baseURL: API.APIUrl,
            headers: createHeaders(),
            body: undefined,
            method: method as any, // ts can be really stupid sometimes
        };

        if (method != 'GET' && body) opt.body = body;

        let { data, error } = await useFetch<T>(endpoint, opt);

        if (error.value) {
            if (error.value?.data) data.value = error.value.data;
            else throw error.value;
        }

        if (error.value?.statusCode == 204) rsp.status = 204;
        else Object.assign(rsp, data.value);
    } catch (ex: any) {
        console.error(ex);

        rsp.status = 500;
        rsp.message = ex?.message || 'Unknown error';
    }

    return rsp;
}

function createHeaders(): any {
    const headers: any = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    if (API.TokenCookie.value) {
        headers.Authorization = API.TokenCookie.value;
    }

    return headers;
}
