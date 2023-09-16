import { Button, Input } from "@/components/Styled";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { BuildClass, toast } from "@/libs/Function";
import { useEffect, useState } from "react";
import { login } from "@/libs/api/auth";
import { useUserAuthAction } from "@/libs/store/useAuthStore";

const Login = () => {
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAccessToken, setRefreshToken } = useUserAuthAction();

  const handleLogin = async () => {
    try {
      const { status, data } = await login({ account, password });
      if (status === 200) {
        const { tokens } = data;
        document.cookie = `access=${tokens.access}`;
        document.cookie = `refresh=${tokens.refresh}`;
        setAccessToken(tokens.access);
        setRefreshToken(tokens.refresh);
        window.location.href = "/dashboard";
      }

    } catch (err) {
      toast((err as any).response.data);
      console.error(err);
    }
  };

  useEffect(() => {
    setAccessToken("");
    setRefreshToken("");
  }, []);

  return <div className={style.LoginContainer}>
    <img className={style.logo} src="./logo.svg" />
    <Input
      className={style.LoginInput}
      defaultValue={account}
      onInput={setAccount}
      placeholder="아이디"
    />
    <Input
      type="password"
      className={style.LoginInput}
      defaultValue={password}
      onInput={setPassword}
      placeholder="비밀번호"
    />
    <Button
      className={style.LoginButton}
      width="100%"
      onClick={handleLogin}>
      로그인
    </Button>
    <span className={style.FindAuthLink}>
      <Link to={"/"} >아이디 찾기</Link>
      <Link to={"/"} >비밀번호 찾기</Link>
      <Link to={"/join"} >회원가입</Link>
    </span>
  </div>;
};

export default Login;