import { Link, useLocation } from "react-router-dom";

import style from "./style.module.scss";
import { Chat, Hamburger, Home, List, Search, Setting } from "@/components/Icons";
import { useUserAuth } from "@/libs/store/useAuthStore";

const Navigator = () => {
    const { pathname } = useLocation();
    const { accessToken } = useUserAuth();
    const checkingPathname = (url: string) => {
        if (pathname === url) return true;
    };
    if (!accessToken) return <></>;
    
    return <nav className={style.Navigator}>
        <Link to="/dashboard" className={checkingPathname("/dashboard") ? style.selected : ""}>
            <Home />
            <span>홈</span>
        </Link>
        <Link to="/order" className={checkingPathname("/order") ? style.selected : ""}>
            <List />
            <span>주문</span>
        </Link>
        <Link to={"/request"} className={checkingPathname("/request") ? style.selected : ""}>
            <Chat />
            <span>요청</span>
        </Link>
        <Link to={"/setting"} className={checkingPathname("/setting") ? style.selected : ""}>
            <Setting />
            <span >설정</span>
        </Link>
    </nav>;
};
export default Navigator;