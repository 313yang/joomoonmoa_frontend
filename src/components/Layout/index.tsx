import { FunctionComponent, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "@/routes/Dashboard";
import Request from "@/routes/Request";
import Order from "@/routes/Order";
import Setting from "@/routes/Setting";
import Login from "@/routes/Login";
import Join from "@/routes/Join";
import { useUserAuth, useUserAuthAction } from "@/libs/store/useAuthStore";
import Password from "@/routes/Join/password";
import { notLoginPath } from "@/libs/Defines";


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
    else if (accessToken && notLoginPath.some(x => pathname === x)) window.location.href = "/dashboard";
  }, []);

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