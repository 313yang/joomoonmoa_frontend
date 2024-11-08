import { Link, useLocation } from "react-router-dom";

import style from "./style.module.scss";
import { Chat, Delivery, Home, List, Setting } from "@/components/Icons";
import { getToken } from "@/libs/api";

const Navigator = () => {
    const { pathname } = useLocation();
    const checkingPathname = (url: string) => {
        if (pathname.includes(url)) return true;
    };
    if (!getToken()) return <></>;
    
    return <nav className={style.Navigator}>
        <Link to="/dashboard" className={checkingPathname("/dashboard") ? style.selected : ""}>
            <Home />
            <span>홈</span>
        </Link>
        <Link to="/order/news" className={checkingPathname("/order/news") ? style.selected : ""}>
            <List />
            <span>신규주문</span>
        </Link>
        <Link to={"/order/wait"} className={checkingPathname("/order/wait") ? style.selected : ""}>
            <Delivery />
            <span>발송준비</span>
        </Link>
        <Link to={"/request"} className={checkingPathname("/request") ? style.selected : ""}>
            <Chat />
            <span>고객문의</span>
        </Link>
        <Link to={"/setting"} className={checkingPathname("/setting") ? style.selected : ""}>
            <Setting />
            <span >설정</span>
        </Link>
    </nav>;
};
export default Navigator;