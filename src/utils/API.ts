import { APIResponse } from "@/api/models/APIResponse";
import Cookies from "./Cookies";
import { state } from "./State";
import type WikiUser from "@/api/models/users/WikiUser";

export default class API {
    static APIUrl = "http://localhost:1984";

    static async PerformGet<T>(endpoint: string): Promise<APIResponse<T>> {
        return perform<T>(endpoint, "GET");
    }

    static async PerformPost<T>(endpoint: string, body: any): Promise<APIResponse<T>> {
        return perform<T>(endpoint, "POST", body);
    }

    static async PerformPatch<T>(endpoint: string, body: any): Promise<APIResponse<T>> {
        return perform<T>(endpoint, "PATCH", body);
    }

    static async PerformPut<T>(endpoint: string, body: any): Promise<APIResponse<T>> {
        return perform<T>(endpoint, "PUT", body);
    }

    static async PerformDelete<T>(endpoint: string, body: any = {}): Promise<APIResponse<T>> {
        return perform<T>(endpoint, "DELETE", body);
    }

    static OpenLogin() {
        const url = `https://discord.com/oauth2/authorize?response_type=token&client_id=1169155506988929024&scope=identify&redirect_uri=${window.location.protocol}//${window.location.host}/oauth/completion`;
        const params =
            "width=500,height=600,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no";

        const popup = window.open(url, "popup", params);

        if (!popup)
            throw new Error("Failed to open the pop-up.");

        window.addEventListener("message", listener);

        const heartbeat = setInterval(() => {
            if (!popup || popup.closed) {
                clear();
                throw new Error("Pop-up closed without finishing.");
            }

            popup.postMessage(
                "bwomp",
                `${window.location.protocol}//${window.location.host}/`
            );
        }, 200);

        window.addEventListener("beforeunload", (_) => {
            if (popup && !popup.closed) popup.close();
            clear();
        });

        function listener(ev: MessageEvent<any>) {
            clear();
            popup?.close();

            if (ev.data.error) throw new Error(ev.data.error);

            const token = ev.data.token;
            Cookies.Set("token", token);
            API.RefreshInfo();
        }

        function clear() {
            clearInterval(heartbeat);
            window.removeEventListener("message", listener);
        }
    }

    static Logout() {
        Cookies.Remove("user");
        Cookies.Remove("token");
        state.user = undefined;
    }

    static async RefreshInfo() {
        await API.PerformGet<WikiUser>("/user/@me")
            .then((res) => {
                Cookies.Set("user", res.data);
                state.user = res.data;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

async function perform<T>(
    endpoint: string,
    method: string,
    body: any = {}
): Promise<APIResponse<T>> {
    let data = {
        method: method,
        headers: createHeaders(),
    };

    if (method != "GET")
        data = Object.assign(data, { body: JSON.stringify(body) });

    const response = await fetch(API.APIUrl + endpoint, data);

    if (response.status == 204) {
        const rsp = new APIResponse<T>();
        rsp.status = 204;
        return rsp;
    }

    let json = await response.json();
    let rsp = new APIResponse<T>();
    Object.assign(rsp, json);
    return rsp;
}

function createHeaders(): any {
    const headers: any = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    const auth = Cookies.Get("token");

    if (auth) {
        headers.Authorization = auth;
    }

    return headers;
}
