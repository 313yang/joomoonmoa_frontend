import { Button, Checkbox, Input } from "@/components/Styled";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { BuildClass, getIsAutoLogin, setIsAutoLogin, toast } from "@/libs/Function";
import { useLayoutEffect, useState } from "react";
import { DeviceOs, login } from "@/libs/api/auth";
import { AxiosError } from "axios";
import { fcmtest, getToken, setToken } from "@/libs/api";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isAutoLogin, setAutoLogin] = useState<boolean>(getIsAutoLogin());


  const onClickSetAutoLogin = (val: boolean) => {
    setIsAutoLogin(val);
    setAutoLogin(val);
  };

  const handleLogin = async () => {
    setIsDisabled(true);
    try {
      const { status, data } = await login({ phoneNumber, password, deviceToken: localStorage.getItem("deviceToken"), deviceOs: localStorage.getItem("deviceOs") as DeviceOs });
      if (status === 200) {
        const { tokens } = data;
        setToken(tokens.access);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) toast("전화번호 또는 비밀번호가 일치하지 않습니다.");
        else {
          const errorMessage = !!err?.response ? err?.response?.data?.message : err.message || "";
          toast(errorMessage);
        }
      }
    }
    setIsDisabled(false);
  };
  useLayoutEffect(() => {
    if (getIsAutoLogin() && getToken()) window.location.href = "/dashboard";
  }, []);
  const fcmtestFn = async () => {
    try {
      await fcmtest();
    } catch (Err) {
      console.log(Err);
    }
  };

  return <div className={style.LoginContainer}>
    {/* <button onClick={fcmtestFn}>test</button> */}
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
      checked={!!isAutoLogin}
      className={style.AutoLoginContainer}
      value={!!isAutoLogin}
      onChange={onClickSetAutoLogin}
      name="isAutoLogin"
    >
      자동로그인
    </Checkbox>
    <Button
      disabled={isDisabled}
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
