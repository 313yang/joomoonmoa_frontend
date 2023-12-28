import { AddMarketsType } from "@/libs/Defines";
import { toast } from "@/libs/Function";
import { addsMarkets, deleteMarket, marketsSyncTest } from "@/libs/api/market";
import { useState } from "react";
import { StoreList } from "./defines";
import { AxiosError } from "axios";
import { useUserAuthAction } from "@/libs/store/useAuthStore";

const storeInfoInit = {
    clientId: "",
    clientSecret: "",
    marketAlias: "",
    platform: ""
};

export const useSettingStore = () => {
    const [storeInfo, setStoreInfo] = useState<AddMarketsType>(storeInfoInit);
    const [loading, setLoading] = useState<boolean>(false);
    const { clientId, clientSecret } = storeInfo;
    const { setAccessToken, setRefreshToken } = useUserAuthAction();

    const handleSetStoreInfo = (conf: Partial<AddMarketsType>) => {
        setStoreInfo({ ...storeInfo, ...conf });
    };

    const checkingClientInfo = () => {
        if (!clientId) {
            toast("스토어 API를 입력해주세요.");
            return false;
        };
        if (!clientSecret) {
            toast("API KEY를 입력해주세요.");
            return false;
        };
        return true;
    };

    /** 로그인 테스트 함수 */
    const submitMarketSyncTest = async () => {
        if (!checkingClientInfo()) return;
        try {
            if (loading) return;
            setLoading(true);
            const { data, status } = await marketsSyncTest({ clientId, clientSecret });
        } catch (err) {
            console.error(err);
            if (err instanceof AxiosError) {
                const errorMessage = !!err?.response ? err?.response?.data?.message : err.message || "";
                toast(errorMessage);
            }
        }
        setLoading(false);
    };

    /** 스토어 등록 함수 */
    const submitAddMarket = async () => {
        if (!checkingClientInfo()) return;
        try {
            if (loading) return;
            setLoading(true);
            const { data, status } = await addsMarkets(storeInfo);
        } catch (err) {
            console.error(err);
            if (err instanceof AxiosError) {
                const errorMessage = !!err?.response ? err?.response?.data?.message : err.message || "";
                toast(errorMessage);
            }
        }
        setLoading(false);
    };
    /** 스토어 삭제 */
    const deleteMarketHandler = async (id: number) => {
        try {
            const resp = deleteMarket(id);

        } catch (err) {
            console.log(err);
        }
    };

    /** 로그아웃 */
    const handleLogout = () => {
        setAccessToken("");
        setRefreshToken("");
        window.location.href = "/";
    };
    return {
        loading,
        storeInfo,
        handleSetStoreInfo,
        submitMarketSyncTest,
        submitAddMarket,
        deleteMarketHandler,
        handleLogout
    };
};