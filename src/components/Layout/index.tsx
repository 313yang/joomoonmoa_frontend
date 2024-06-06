import { FunctionComponent, useEffect, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "@/routes/Dashboard";
import Request from "@/routes/Request";
import Order from "@/routes/Order";
import Setting from "@/routes/Setting";
import Login from "@/routes/Login";
import Join from "@/routes/Join";
import Password from "@/routes/Join/password";
import { notLoginPath } from "@/libs/Defines";
import { getToken, setToken } from "@/libs/api";
import { getIsAutoLogin } from "@/libs/Function";


const BaseLayout = () => {
  const accessToken = getToken();
  const { pathname } = useLocation();
  const isAutoLogin = getIsAutoLogin();

  // useLayoutEffect(() => {
  //   if ((!accessToken && pathname !== "/" && pathname !== "/join") || !!accessToken && !isAutoLogin && (pathname === "/" || pathname === "/join")) {
  //     setToken("");
  //     window.location.href = "/";
  //   }
  //   else if (!!accessToken && notLoginPath.some(x => pathname === x)) window.location.href = "/dashboard";
  // }, []);

  return <Routes>
    <Route path="/" Component={Login} />
    {!!accessToken ?
      /** 로그인 후 기본 베이스 레이어 */
      <>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/order/*" Component={Order} />
        <Route path="/request" Component={Request} />
        <Route path="/setting/*" Component={Setting} />
      </> :
      /**  회원가입 / 아이디 비번찾기 페이지 레이아웃 */
      <>
        <Route path="/join" Component={Join} />
        <Route path="/password" Component={Password} />
      </>
    }
  </Routes>;
};

export default BaseLayout;