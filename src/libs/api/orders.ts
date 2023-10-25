import { OrderProductNewItemType } from "@/routes/Order/defines";
import { orders } from ".";

export const getOrderNews = async () => await orders.get<OrderProductNewItemType[]>("/news");
