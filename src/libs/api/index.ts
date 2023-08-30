import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const baseURL = API_URL + "/api/v1";


const auth = axios.create({ timeout: 8000, baseURL: `${baseURL}/auth` });
const dashboard = axios.create({ timeout: 8000, baseURL: `${baseURL}/items/dashboard` });

axios.defaults.withCredentials = true;
export {
    auth,
    dashboard,
};
