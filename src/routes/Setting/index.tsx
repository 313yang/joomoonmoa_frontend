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
import { useEffect } from "react";


/** 설정 페이지 메인컴포넌트 */
const Setting = () => {
    const { pathname } = useLocation();
    const route = useNavigate();
    const path = pathname.replace("/setting", "");
    const { handleLogout, getConfigApi } = useSettingStore();
    useEffect(() => {
        getConfigApi();

    }, []);
    const RenderComponent = () => {
        switch (path) {
            case "/addStore":
                return {
                    header: "스토어추가", component: <SettingAddStore />
                };
            case "/changeNickname":
                return {
                    header: "스토어추가", component: <SettingChangeNickname />
                };
            case "/changePassword":
                return {
                    header: "스토어추가", component: <SettingChangePassword />
                };
            case "/changePhoneNumber":
                return {
                    header: "스토어추가", component: <SettingChangePhoneNumber />
                };
            default:
                return {
                    header: "", component: <SettingMain />
                };
        }
    };

    return <div className={style.SettingComponent}>
        <Header
            prev={!!path && <button className="text-primary" onClick={() => route(-1)}>설정</button>}
            title={<div></div>}
        />
        {RenderComponent().component}
        <button onClick={handleLogout} className={BuildClass(style.Logout, "text-primary")}>로그아웃</button>
    </div>;
};
export default Setting;