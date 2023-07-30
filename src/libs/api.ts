import axios from "axios";

const API_URL = import.meta.env.API_URL;
const baseURL = API_URL + "/api";
const dashboard = axios.create({ timeout: 8000, baseURL: `${baseURL}/dashboard` });

export const getDashboardOrder = dashboard.get("/placeOrderStatus");