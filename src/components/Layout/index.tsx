import { FunctionComponent, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "@/routes/Dashboard";
import Request from "@/routes/Request";
import Order from "@/routes/Order";
import Setting from "@/routes/Setting";
import Login from "@/routes/Login";
import Join from "@/routes/Join";
import { useUserAuth, useUserAuthAction } from "@/libs/store/useAuthStore";
import Navigator from "./Navigator";

/**
 * 로그인 후 기본 베이스 레이어
 */
const WithLoginLayout: FunctionComponent = () =>
  <Routes>
    <Route path="/dashboard" Component={Dashboard} />
    <Route path="/order" Component={Order} />
    <Route path="/request" Component={Request} />
    <Route path="/setting" Component={Setting} />
  </Routes>;


/** 로그인 / 회원가입 / 아이디 비번찾기 페이지 레이아웃 */
const WithoutLoginLayout = () =>
  <Routes>
    <Route path="/" Component={Login} />
    <Route path="/join" Component={Join} />
  </Routes>;


const BaseLayout = () => {
  const { pathname } = useLocation();
  const { accessToken } = useUserAuth();
  const { setAccessToken, setRefreshToken } = useUserAuthAction();

  useLayoutEffect(() => {
    if (!accessToken && pathname !== "/" && pathname !== "/join") {
      window.location.href = "/";
      setAccessToken("");
      setRefreshToken("");
    }
    else if (accessToken && pathname === "/") window.location.href = "/dashboard";
  }, []);

  return <>
    {!!accessToken && <WithLoginLayout />}
    <WithoutLoginLayout />

  </>;

};

export default BaseLayout;