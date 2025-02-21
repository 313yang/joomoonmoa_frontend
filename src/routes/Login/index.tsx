import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { getIsAutoLogin, setIsAutoLogin, toast } from "@/libs/Function";
import { DeviceOs, login } from "@/libs/api/auth";
import { checkIsNaverSolutionApi, getToken, setToken } from "@/libs/api";
import { RedirectFromType } from "@/libs/Defines";
import { Button, Checkbox, Input } from "@/components/Styled";
import style from "./style.module.scss";

let triger = false;
const Login = () => {
  const [searchParams] = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isAutoLogin, setAutoLogin] = useState<boolean>(getIsAutoLogin());

  // 네이버 솔루션 사용유저의 회원가입여부 판단 후 회원가입 안내문구 출력여부
  const [isNaverSoutionWarn, setIsNaverSoutionWarn] = useState<boolean>(false);


  /** 자동로그인을 설정합니다. */
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

  /** 네이버 솔루션을 사용하는 유저인지 체크합니다. */
  const checkIsNaverSolution = async (from: string, token: string) => {
    if (triger) return;
    triger = true;
    if (!!from && !!token) {
      try {
        const { status, data } = await checkIsNaverSolutionApi(from as RedirectFromType, token);
        if (status === 200) {
          const { tokens } = data;
          // setToken(tokens.access);
          // window.location.href = "/dashboard";
        }
      } catch (err) {
        setIsNaverSoutionWarn(true);
      }
    }
    triger = false;
  };

  useLayoutEffect(() => {
    // 자동로그인 시킨 회원일 경우 대쉬보드로 이동
    if (getIsAutoLogin() && getToken()) window.location.href = "/dashboard";
  }, []);

  useLayoutEffect(() => {
    const from = searchParams.get("from");
    const token = searchParams.get("token");

    if (from === RedirectFromType.NAVER && !!token) checkIsNaverSolution(from, token);
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
    {isNaverSoutionWarn &&
      <small> * 커머스 솔루션 마켓을 통해 주문모아를 구독해주셔서 감사합니다.<br />
        회원가입 시 자동으로 스마트스토어와 연결됩니다.</small>
    }
  </div >;
};

export default Login;
