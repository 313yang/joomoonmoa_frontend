import Header from "@/components/Layout/Header";
import style from "./style.module.scss";
import { Chevron } from "@/components/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import SettingMain from "./Home";
import SettingAddStore from "./AddStore";
import { BuildClass, RequestGet } from "@/libs/Function";
import { useSettingStore } from "./hooks";
import SettingChangeNickname from "./Nickname";
import SettingChangePassword from "./Password";
import SettingChangePhoneNumber from "./PhoneNumber";
import { useEffect, useState } from "react";
import { getConfig } from "@/libs/api/config";
import { PlaceOrderStatuesMarket } from "@/libs/Defines";

let fetch = false;
/** 설정 페이지 메인컴포넌트 */
const Setting = () => {
    const { pathname } = useLocation();
    const route = useNavigate();
    const path = pathname.replace("/setting", "");
    const { handleLogout } = useSettingStore();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [selectedMarket, setSelectedMarket] = useState<PlaceOrderStatuesMarket | null>(null);

    const getConfigApi = async () => {
        if (fetch) return;
        fetch = true;
        try {
            const { data, status } = await getConfig();
            if (status === 200) {
                setPhoneNumber(data.phoneNumber);
            }
        } catch (err) {
            // errorToast(err);
        }
        fetch = false;
    };

    const RenderComponent = () => {
        switch (path) {
            case "/addStore":
                return {
                    header: "", component: <SettingAddStore selectedMarket={selectedMarket} />
                };
            case "/changeNickname":
                return {
                    header: "", component: <SettingChangeNickname />
                };
            case "/changePassword":
                return {
                    header: "", component: <SettingChangePassword />
                };
            case "/changePhoneNumber":
                return {
                    header: "", component: <SettingChangePhoneNumber phoneNumber={phoneNumber} />
                };
            default:
                return {
                    header: "", component: <SettingMain phoneNumber={phoneNumber} setSelectedMarket={setSelectedMarket} />
                };
        }
    };
    useEffect(() => {
        getConfigApi();
    }, []);
    const goback = () => {
        route("/setting");
        setSelectedMarket(null);
    };
    return <div className={style.SettingComponent}>
        <Header
            prev={!!path && <button className="text-primary" onClick={goback}>설정</button>}
            title={<div></div>}
        />
        {RenderComponent().component}
        <button onClick={handleLogout} className={BuildClass(style.Logout, "text-primary")}>로그아웃</button>
    </div>;
};
export default Setting;