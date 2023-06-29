import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/routes/Dashboard";

/**
 * 로그인 후 기본 베이스 레이어
 */
const Baselayout: FunctionComponent = () => {
    return <Routes>
        <Route path="/dashboard" Component={Dashboard} />
    </Routes>;
};

export default Baselayout;