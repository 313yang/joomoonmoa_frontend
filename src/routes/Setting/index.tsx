import { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { BuildClass, RequestGet } from "@/libs/Function";
import { PlaceOrderStatuesMarket } from "@/libs/Defines";
import { getConfig } from "@/libs/api/config";
import SettingMain from "./Home";
import SettingAddStore from "./AddStore";
import { useSettingStore } from "./hooks";
import SettingChangeNickname from "./Nickname";
import SettingChangePassword from "./Password";
import SettingChangePhoneNumber from "./PhoneNumber";
import SettingPayment from "./Payment";
import style from "./style.module.scss";

let fetch = false;
/** 설정 페이지 메인컴포넌트 */
const Setting = () => {
    const { pathname } = useLocation();
    const route = useNavigate();
    const path = pathname.replace("/setting", "");
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
                return <SettingAddStore selectedMarket={selectedMarket} />;
            case "/changeNickname":
                return <SettingChangeNickname />;
            case "/changePassword":
                return <SettingChangePassword />;
            case "/changePhoneNumber":
                return <SettingChangePhoneNumber phoneNumber={phoneNumber} />;
            case "/payment":
                return <SettingPayment />;
            default:
                return <SettingMain phoneNumber={phoneNumber} setSelectedMarket={setSelectedMarket} />;

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
        {!!path && <Header
            prev={<p className="text-primary">설정</p>}
            goBackBtn={goback}
            title={<div></div>}
        />}

        {RenderComponent()}
    </div>;
};
export default Setting;