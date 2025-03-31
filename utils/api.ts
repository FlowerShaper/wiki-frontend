import { APIResponse } from '~/models/APIResponse';
import type WikiUser from '~/models/users/WikiUser';
import type { CookieRef } from '#app';

export default class API {
    static APIUrl = 'http://localhost:1984';
    static TokenCookie: CookieRef<string | undefined>;
    static CurrentUser: CookieRef<WikiUser | undefined>;

    static Setup() {
        this.TokenCookie = useCookie('token', {
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60,
        });

        this.CurrentUser = useCookie<WikiUser>('user', {
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60,
        });
    }

    static async PerformGet<T>(endpoint: string): Promise<APIResponse<T>> {
        return perform<T>(endpoint, 'GET');
    }

    static async PerformPost<T>(endpoint: string, body: any): Promise<APIResponse<T>> {
        return perform<T>(endpoint, 'POST', body);
    }

    static async PerformPatch<T>(endpoint: string, body: any): Promise<APIResponse<T>> {
        return perform<T>(endpoint, 'PATCH', body);
    }

    static async PerformPut<T>(endpoint: string, body: any): Promise<APIResponse<T>> {
        return perform<T>(endpoint, 'PUT', body);
    }

    static async PerformDelete<T>(endpoint: string, body: any = {}): Promise<APIResponse<T>> {
        return perform<T>(endpoint, 'DELETE', body);
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
        const res = await API.PerformGet<WikiUser>('/users/@me');

        if (!res.IsSuccess() || !res.data) {
            this.Logout();
            return;
        }

        this.CurrentUser.value = res.data;
    }
}

async function perform<T>(endpoint: string, method: string, body: any = {}): Promise<APIResponse<T>> {
    var opt = {
        baseURL: API.APIUrl,
        headers: createHeaders(),
        body: undefined,
    };

    if (method != 'GET' && body) opt.body = body;

    const { data, error } = await useFetch<T>(endpoint, opt);

    if (error.value?.statusCode == 204) {
        const rsp = new APIResponse<T>();
        rsp.status = 204;
        return rsp;
    }

    let rsp = new APIResponse<T>();
    Object.assign(rsp, data.value);
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
