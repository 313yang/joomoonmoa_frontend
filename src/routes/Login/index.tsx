import { Button, Input } from "@/components/Styled";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { BuildClass } from "@/libs/Function";
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
      if (status === 200){
        setAccessToken("1111");
        setRefreshToken("222");
        window.location.href = "/dashboard";
      }

    } catch (err) {
      alert((err as any).response.data)
      console.error(err);
    }
  

  };

  useEffect(() => {
    setAccessToken("");
    setRefreshToken("");
  }, []);

  return <div className={style.LoginContainer}>
    <h2 className={BuildClass(style.logo, "text-primary")}>주문모아</h2>
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
    <span className={style.JoinLink}>계정이 없으신가요? <Link to={"/join"} className="text-primary">회원가입</Link></span>
  </div>;
};

export default Login;