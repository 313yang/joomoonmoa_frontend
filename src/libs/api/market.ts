import { markets } from ".";
import { AddMarketsType, ClientType } from "../Defines";

/** 신규 스토어 등록 */
export const addsMarkets = async (data: AddMarketsType) => await markets.post("/", data);

/** 스마트스토어 계정 연동 테스트 */
export const marketsSyncTest = async (data: ClientType) => await markets.post("/sync-test", data); 