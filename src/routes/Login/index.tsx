import { Button, Checkbox, Input } from "@/components/Styled";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { BuildClass, toast } from "@/libs/Function";
import { useLayoutEffect, useState } from "react";
import { login } from "@/libs/api/auth";
import { useUserAuth, useUserAuthAction } from "@/libs/store/useAuthStore";
import { AxiosError } from "axios";
import { getToken } from "@/libs/api";

const Login = () => {
  const accessToken = getToken();
  const { isAutoLogin } = useUserAuth();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAccessToken, setRefreshToken, setIsAutoLogin } = useUserAuthAction();

  const handleLogin = async () => {
    try {
      const { status, data } = await login({ phoneNumber, password });
      if (status === 200) {
        const { tokens } = data;
        setAccessToken(tokens.access);
        setRefreshToken(tokens.refresh);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorMessage = !!err?.response ? err?.response?.data?.message : err.message || "";
        toast(errorMessage);
      }
      console.error("e", err);
    }
  };

  useLayoutEffect(() => {
    if (!!accessToken && isAutoLogin) window.location.replace("/dashboard");
  }, []);

  return <div className={style.LoginContainer}>
    <img className={style.logo} src="./logo.svg" />
    <Input
      label="전화번호"
      type="number"
      className={style.LoginInput}
      defaultValue={phoneNumber}
      onInput={setPhoneNumber}
    />
    <Input
      label="비밀번호"
      type="password"
      className={style.LoginInput}
      defaultValue={password}
      onInput={setPassword}
      onEnter={handleLogin}
    />
    <Checkbox
      className={style.AutoLoginContainer}
      value={isAutoLogin}
      onChange={setIsAutoLogin}
      name="isAutoLogin"
    >
      자동로그인
    </Checkbox>
    <Button
      className={style.LoginButton}
      width="100%"
      onClick={handleLogin}>
      로그인
    </Button>
    <span className={style.FindAuthLink}>
      <Link to={"/password"} >비밀번호 찾기</Link>
      <Link to={"/join"} >회원가입</Link>
    </span>
  </div>;
};

export default Login;
