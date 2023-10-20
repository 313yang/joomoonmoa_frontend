import Header from "@/components/Layout/Header";
import style from "./style.module.scss";
import { Chevron } from "@/components/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import SettingMain from "./Home";
import SettingAddStore from "./AddStore";


const testUser = {
    userName: "강윤구"
};
/** 설정 페이지 메인컴포넌트 */
const Setting = () => {
    const { pathname } = useLocation();
    const route = useNavigate();
    const path = pathname.replace("/setting", "");
    const RenderComponent = () => {
        switch (path) {
            case "/addStore":
                return {
                    header: "스토어추가", component: <SettingAddStore user={testUser} />
                };
            default:
                return {
                    header: "설정", component: <SettingMain user={testUser} />
                };
        }
    };

    return <div className={style.SettingComponent}>
        <Header
            prev={!!path && <button className="text-primary" onClick={()=>route(-1)}>설정</button>}
            title={
                <div className={style.flexCenter}>
                    <h3>{RenderComponent().header}</h3>
                </div>
            } />
        {RenderComponent().component}
    </div>;
};
export default Setting;