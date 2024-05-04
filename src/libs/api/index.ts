import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const baseURL = API_URL + "/api/v1";

const apply = (resp: any) => { return resp; };
const reject = async (error: AxiosError) => {
    const { config, response } = error;
    if (response?.status === 401) {
        document.cookie = `access=`;
        document.cookie = `refresh=`;
        return window.location.href = "/";
    }
    return Promise.reject(error);
};
/** accessToken을 불러옵니다 */
export const getToken = () => {
    return localStorage.getItem("accessToken") || "";
    // if (document.cookie) {
    //     const cookies = document.cookie.split(`${decodeURIComponent("access")}=`);
    //     if (cookies.length >= 2) {
    //         const values = cookies[1].split(";");
    //         return values[0];
    //     }
    // }
    // return ""
};

/** accessToken을 설정합니다. */
export const setToken = (token: string) => {
    localStorage.setItem("accessToken", token);
    // const options = [
    //     `secure`, // HTTPS를 통해서만 쿠키를 전송
    //     `path=/`, // 쿠키가 모든 경로에 적용
    // ].join('; ');
    // document.cookie = `access=${token}; ${options}`;
};

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: "bearer " + getToken()
};
const auth = axios.create({ timeout: 8000, baseURL: `${baseURL}/auth` });
const authHeader = axios.create({ timeout: 8000, baseURL: `${baseURL}/auth`, headers });
const dashboard = axios.create({ timeout: 8000, baseURL: `${baseURL}/items`, headers });
const orders = axios.create({ timeout: 8000, baseURL: `${baseURL}/orders`, headers });
const common = axios.create({ timeout: 8000, baseURL: `${baseURL}/common`, headers });
const markets = axios.create({ timeout: 8000, baseURL: `${baseURL}/markets`, headers });
const config = axios.create({ timeout: 8000, baseURL: `${baseURL}/config`, headers });
const subscriptions = axios.create({ timeout: 8000, baseURL: `${baseURL}/subscriptions`, headers });

interface LoginType {
    phoneNumber: string;
}

export const changePhoneNumberApi = async (data: LoginType) => await authHeader.patch(`phone-number`, data,);
axios.defaults.withCredentials = true;
auth.interceptors.response.use(apply, (err) => {
    return Promise.reject(err);
});
dashboard.interceptors.response.use(apply, reject);
orders.interceptors.response.use(apply, reject);
common.interceptors.response.use(apply, reject);
markets.interceptors.response.use(apply, reject);
config.interceptors.response.use(apply, reject);

export {
    auth,
    dashboard,
    orders,
    common,
    markets,
    config,
    subscriptions
};
