import { dashboard } from ".";
import { PlaceOrderStatuesMarket, PlaceOrderStatuses, PlaceOrderStatusesInit } from "../Defines";

export const getDashboardOrder = async () => {
    try {
        const { data: { placeOrderStatuses }, status } = await dashboard.get<{ placeOrderStatuses: PlaceOrderStatuses; }>("/order-item-statistics");
        if (status === 200) {
            return placeOrderStatuses;
        }
        return PlaceOrderStatusesInit;
    } catch (err) {
        console.error(err);
        return PlaceOrderStatusesInit;
    }
};

export const getDashboardOrderMarket = async () => {
    try {
        const { data, status } = await dashboard.get<PlaceOrderStatuesMarket[]>("/order-item-status-group-by-market");
        if (status === 200) {
            return data;
        }
        return [];
    } catch (err) {
        console.error(err);
        return [];
    }
};