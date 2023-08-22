/** 대시보드 > 주문 */
export interface PlaceOrderStatuses {
    ok: number,
    notYet: number,
    canceled: number;
}
export const PlaceOrderStatusesInit = {
    ok: 0,
    notYet: 0,
    canceled: 0
};

/**  대시보드 > 스토어 현황 */
export interface PlaceOrderStatuesMarket extends PlaceOrderStatuses {
    marketId: number,
    title: string,
}
