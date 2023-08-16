import { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/routes/Dashboard";
import Request from "@/routes/Request";
import Order from "@/routes/Order";
import Setting from "@/routes/Setting";
import Navigator from "./Navigator";

/**
 * 로그인 후 기본 베이스 레이어
 */
const Baselayout: FunctionComponent = () => {
  return <Routes>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/order" Component={Order} />
        <Route path="/request" Component={Request} />
        <Route path="/setting" Component={Setting} />
  </Routes>;
};

export default Baselayout;