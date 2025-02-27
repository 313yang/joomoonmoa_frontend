import { dashboard } from ".";
import { PlaceOrderStatuesMarket, DashboardItems, DispatchItemListType, } from "../Defines";

/** 대시보드 - 발주 상태 통계 */
export const getDashboardOrder = async () => await dashboard.get<DashboardItems>("/dashboard/order-item-statistics");

/** 대시보드 - 발주 상태 통계, 스토어별 분류 */
export const getDashboardOrderMarket = async () => await dashboard.get<PlaceOrderStatuesMarket[]>("/dashboard/order-item-status-group-by-market");

/** 체크된 신규 상품들 발주 확인 */
export const confirmItems = async (items: number[]) => dashboard.post("/confirm", { purchasedItemIdList: items });

/** 해당 상품 발송 처리 */
export const confirmDeliveryItems = async (delevery: { dispatchItemList: DispatchItemListType[]; }) =>
    dashboard.post(`/dispatch`, delevery);

export const approveCancel = async (purchasedItemId: number) => dashboard.post(`/approve-cancel/${purchasedItemId}`);