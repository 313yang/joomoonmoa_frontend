import { OrderProductNewItemType } from "@/routes/Order/defines";
import { orders } from ".";

export const getOrder = async (status: string) => await orders.get<OrderProductNewItemType[]>("/", { params: { status } });
