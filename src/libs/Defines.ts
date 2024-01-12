/** 대시보드 > 주문 */
export interface DashboardItems {
    placeOrderStatuses: PlaceOrderStatuses;
    notYetIdList: number[];
}
export interface PlaceOrderStatuses {
    ok: number,
    notYet: number,
    canceled: number;
}

export const PlaceOrderStatusesInit = {
    notYetIdList: [],
    placeOrderStatuses: {
        ok: 0,
        notYet: 0,
        canceled: 0,
    }
};

/**  대시보드 > 스토어 현황 */
export interface PlaceOrderStatuesMarket extends PlaceOrderStatuses {
    marketId: number,
    marketAlias: string,
    inquiry: number,
    exchange: number,
    retrieve: number,
    platform: Platform
}


type Platform = keyof typeof StoreListType;
/** 로그인 토큰 */
export interface LoginPayload {
    token: {
        access: string;
        refresh: string;
    };
}

/** 스토어 리스트 */
export enum StoreListType {
    "NAVER" = "스마트스토어",
    "COUPANG" = "쿠팡"
}

/** 스토어 타입 */
export interface ClientType {
    clientId: string,
    clientSecret: string,
}

/** 스토어 등록 타입 */
export interface AddMarketsType extends ClientType {
    marketAlias: string,
    platform: string;
}
export const notLoginPath = ["/", "/password", "/join"];