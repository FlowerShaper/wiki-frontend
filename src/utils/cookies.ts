export default class Cookies {
    static Domain = 'localhost';

    static Set(name: string, value: any) {
        const cookie = useCookie(name, {
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60
        });

        cookie.value = value;
    }

    static Get(cname: string): any {
        const cookie = useCookie(cname);
        return cookie.value;
    }

    static Remove(name: string) {
        const cookie = useCookie(name);
        cookie.value = undefined;
    }
}
