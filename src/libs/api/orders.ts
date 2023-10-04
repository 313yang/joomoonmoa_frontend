import { OrderProductNewItemType } from "@/routes/Order/defines";
import { orders } from ".";

export const getOrderNews = async () => {
    const { data, status } = await orders.get<OrderProductNewItemType[]>("/news");
    if (status === 200) return data;
    return [];
};
