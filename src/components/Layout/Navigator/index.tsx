import { Link, useLocation } from "react-router-dom";

import style from "./style.module.scss";
import { Hamburger, Home, Search, Setting } from "@/components/Icons";

const Navigator = () => {
    const { pathname } = useLocation();

    const checkingPathname = (url: string) => {
        if (pathname === url) return true;
    };
    return <nav className={style.Navigator}>
        <Link to={"/dashboard"} className={checkingPathname("/dashboard") ? style.selected : ""}>
            <Home />
            <span>홈</span>
        </Link>
        <Link to={"/order"} className={checkingPathname("/order") ? style.selected : ""}>
            <Search />
            <span>주문</span>
        </Link>
        <Link to={"/request"} className={checkingPathname("/request") ? style.selected : ""}>
            <Hamburger />
            <span>요청</span>
        </Link>
        <Link to={"/setting"} className={checkingPathname("/setting") ? style.selected : ""}>
            <Setting />
            <span >설정</span>
        </Link>
    </nav>;
};
export default Navigator;