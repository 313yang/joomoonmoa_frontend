import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "@/routes/Main";

/**
 * 로그인 후 기본 베이스 레이어
 */
const Baselayout: FunctionComponent = () => {
    return <div>
        <Routes>
            <Route path="/main" Component={Main} />
        </Routes>
    </div>;
};

export default Baselayout;