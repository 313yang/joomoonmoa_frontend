import { markets } from ".";
import { AddMarketsType, ClientType } from "../Defines";

/** 신규 스토어 등록 */
export const addsMarkets = async (data: AddMarketsType) => await markets.post("", data);
export const getMarkets = async () => await markets.get("/my");

/**  스토어 수정 */
export const changeMarkets = async (marketId: number, data: AddMarketsType) => await markets.put(`/${marketId}`, {
    marketAlias: data.marketAlias,
    platform: data.platform,
    clientId: data.clientId,
    clientSecret: data.clientSecret
});


/** 스마트스토어 계정 연동 테스트 */
export const marketsSyncTest = async (data: ClientType) => await markets.post("/sync-test", data);

/** 스토어 삭제 */
export const deleteMarket = async (marketId: number) => await markets.delete("", { params: marketId });

export const marketRefresh = async () => await markets.get("/refresh"); 