import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const baseURL = API_URL + "/api/v1";


const getToken = () => {
    if (document.cookie) {
        const cookies = document.cookie.split(`${decodeURIComponent("access")}=`);
        if (cookies.length >= 2) {
            const values = cookies[1].split(";");
            return decodeURIComponent(values[0]);
        }
    }
};
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: "bearer " + getToken()
};
const auth = axios.create({ timeout: 8000, baseURL: `${baseURL}/auth` });
const dashboard = axios.create({ timeout: 8000, baseURL: `${baseURL}/items/dashboard` });
const orders = axios.create({ timeout: 8000, baseURL: `${baseURL}/orders`, headers });

axios.defaults.withCredentials = true;

export {
    auth,
    dashboard,
    orders
};
