import { AddMarketsType, PlaceOrderStatuesMarket } from "@/libs/Defines";
import { RequestGet, toast } from "@/libs/Function";
import { addsMarkets, deleteMarket, marketsSyncTest } from "@/libs/api/market";
import { useEffect, useState } from "react";
import { StoreList } from "./defines";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useUserAuthAction } from "@/libs/store/useAuthStore";
import { changePassword } from "@/libs/api/auth";
import { useNavigate } from "react-router-dom";
import { getConfig } from "@/libs/api/config";
import { getDashboardOrderMarket } from "@/libs/api/dashboard";

const storeInfoInit = {
    clientId: "",
    clientSecret: "",
    marketAlias: "",
    platform: ""
};
// let phoneNumber = "";
export const useSettingStore = () => {
    const route = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [storeInfo, setStoreInfo] = useState<AddMarketsType>(storeInfoInit);
    const [loading, setLoading] = useState<boolean>(false);
    const { clientId, clientSecret } = storeInfo;
    const { setAccessToken, setRefreshToken } = useUserAuthAction();
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [changePhoneNumber, setChangePhoneNumber] = useState<string>("");
    const [market, setMarket] = useState<PlaceOrderStatuesMarket[]>([]);

    const errorToast = (err: AxiosError | unknown) => toast(((err as AxiosError).response as AxiosResponse).data.message);

    const getConfigApi = async () => {
        const resp = await RequestGet(getConfig) || { phoneNumber: "" };
        setPhoneNumber(resp.phoneNumber);
    };
    const getMarket = async () => {
        const marketRes = await RequestGet(getDashboardOrderMarket) || [];
        setMarket(marketRes);
    };

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
    const submitChangePassword = async () => {
        if (loading) return;
        setLoading(true);
        if (password !== passwordConfirm) return toast("비밀번호가 일치하지 않습니다.");
        try {
            console.log(phoneNumber);
            const { status } = await changePassword({ password, phoneNumber });
            if (status === 200) {
                toast("✅성공적으로 비밀번호가 변경되었어요!");
                setTimeout(() => route("/setting"), 1000);
            }

        } catch (err) {
            errorToast(err);
        }
        setLoading(false);
    };

    /** 로그인 테스트 함수 */
    const submitMarketSyncTest = async () => {
        if (!checkingClientInfo()) return;
        try {
            if (loading) return;
            setLoading(true);
            const { data, status } = await marketsSyncTest({ clientId, clientSecret });
        } catch (err) {
            errorToast(err);
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
            errorToast(err);
        }
        setLoading(false);
    };

    /** 스토어 삭제 */
    const deleteMarketHandler = async (id: number) => {
        try {
            const { status } = await deleteMarket(id);
            if (status === 200) {
                toast("채널 삭제가 완료됐습니다!");

            }

        } catch (err) {
            console.log(err);
            errorToast(err);
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
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        handleSetStoreInfo,
        submitMarketSyncTest,
        submitAddMarket,
        deleteMarketHandler,
        submitChangePassword,
        getConfigApi,
        getMarket,
        market,
        handleLogout,
        phoneNumber,
        changePhoneNumber,
        setChangePhoneNumber
    };
};