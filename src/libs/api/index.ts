import axios, { AxiosError } from "axios";
import { useUserAuth, useUserAuthAction } from "../store/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL;
const baseURL = API_URL + "/api/v1";

export const getToken = () => {
    if (document.cookie) {
        const cookies = document.cookie.split(`${decodeURIComponent("access")}=`);
        if (cookies.length >= 2) {
            const values = cookies[1].split(";");
            return values[0];
        }
    }
};

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
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: "bearer " + getToken()
};
const auth = axios.create({ timeout: 8000, baseURL: `${baseURL}/auth` });
const dashboard = axios.create({ timeout: 8000, baseURL: `${baseURL}/items`, headers });
const orders = axios.create({ timeout: 8000, baseURL: `${baseURL}/orders`, headers });
const common = axios.create({ timeout: 8000, baseURL: `${baseURL}/common`, headers });
const markets = axios.create({ timeout: 8000, baseURL: `${baseURL}/markets`, headers });
const config = axios.create({ timeout: 8000, baseURL: `${baseURL}/config`, headers });


axios.defaults.withCredentials = true;
auth.interceptors.response.use(apply, (err)=>{
    return Promise.reject(err)
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
    config
};
