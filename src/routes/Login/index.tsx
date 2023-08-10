import { Button, Input } from "@/components/Styled";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { BuildClass } from "@/libs/Function";
import { useState } from "react";

const Login = () => {
  const route = useNavigate();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return <div className={style.LoginContainer}>
    <h2 className={BuildClass(style.logo, "text-primary")}>주문모아</h2>
    <Input
      className={style.LoginInput}
      defaultValue={id}
      onInput={setId}
      placeholder="아이디"
    />
    <Input
      className={style.LoginInput}
      defaultValue={password}
      onInput={setPassword}
      placeholder="비밀번호"
    />
    <Button
      className={style.LoginButton}
      width="100%"
      onClick={() => route("/dashbord")}>
      로그인
    </Button>
    <span className={style.JoinLink}>계정이 없으신가요? <Link to={"/join"} className="text-primary">회원가입</Link></span>
  </div>;
};

export default Login;