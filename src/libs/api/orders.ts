import { orders } from ".";

export const getOrderNews = async () => await orders.get("/news");
