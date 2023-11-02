import { Chevron } from "@/components/Icons";
import { Box, Switch, Button } from "@/components/Styled";
import { UserInfoType } from "../defines";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const SettingMain = () => {
    const route = useNavigate();

    return <>
        <Box color="white" className={style.UserContainer}>
            <button>
                <h5><strong className="text-primary">{"user5"}</strong> 님</h5>
                <Chevron direction="right" />
            </button>
        </Box>
        <Box color="white" className={style.StoreContainer}>
            <div>
                <p>주문수집알림</p>
                <Switch />
            </div>
            <div>
                <p>자동로그인</p>
                <Switch />
            </div>
            <div>
                <p>스토어관리</p>
                <Button onClick={() => route("/setting/addStore")}>+ 스토어추가</Button>
            </div>

        </Box>
    </>;
};
export default SettingMain;