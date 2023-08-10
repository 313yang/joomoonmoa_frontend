import axios from "axios";

const API_URL = import.meta.env.API_URL;
const baseURL = API_URL + "/api";
const auth = axios.create({ timeout: 8000, baseURL: `${baseURL}/dashboard` });
const dashboard = axios.create({ timeout: 8000, baseURL: `${baseURL}/dashboard` });

export {
    auth,
    dashboard,
};
