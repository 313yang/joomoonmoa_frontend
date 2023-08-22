import Header from "@/components/Layout/Header";
import { Button, Input } from "@/components/Styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { sendOTP, signup } from "@/libs/api/auth";

const Join = () => {
  const route = useNavigate();
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [phoneNumber, setPhoneNumberber] = useState<string>("");
  const [certNum, setCertNum] = useState<string>("");
  const [showSendOTP, setShowSendOTP] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [isCertOk, setIsCertOk] = useState<boolean>(false);

  const regExp = /^[A-Za-z0-9]{2,12}$/;

  const submitDisabled = !account || !password || !regExp.test(account) || !passwordConfirm || password !== passwordConfirm || !isCertOk;

  const onSendOTP = async () => {
    try {
      const { status } = await sendOTP(phoneNumber);
      if (status === 200)
        setShowOTP(true);
      setShowSendOTP(true);
      setTimeout(() => setShowSendOTP(false), 3000);
    } catch (err) {
      alert("인증번호 전송에 실패했습니다.");
      console.error(err);
    }
  };
  const onCertPhoneNumber = async () => {
    console.log("onCert");
    try {
      // TODO::phoneNumber 인증 api 연동
      setIsCertOk(true);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async () => {

    if (password !== passwordConfirm) return alert("비밀번호가 일치하지 않습니다.");
    try {
      // TODO:: 회원가입 api 연동
      const {status} = await signup({ account, password, phoneNumber });
      if(status===200) {
        alert("회원가입에 성공했습니다!")
        route("/")
      }
      
    } catch (err) {
      alert((err as any).response.data.message)
      console.error(err);
    }
  };

  return <div>
    <Header prev={" "} title="회원가입" />
    <div className={style.JoinInputContainer}>
      <Input
        label="아이디"
        placeholder="영어·숫자만 2~12자 입력"
        defaultValue={account}
        onInput={setAccount}
        validateCallback={() => {
          if (!account) return "아이디를 입력해주세요.";
          if (!regExp.test(account)) return "아이디는 영어·숫자만 2~12자로 입력해주세요.";
        }}
        maxLength={12} />
      <Input
        type="password"
        label="비밀번호"
        placeholder="4~20자 입력"
        defaultValue={password}
        onInput={setPassword}
        maxLength={20}
        validateCallback={() => {
          if (password.length < 4 || password.length > 20) return "비밀번호는 4~20자로 입력해주세요.";
        }} />
      <Input
        type="password"
        label="비밀번호 확인"
        placeholder="4~20자 입력"
        defaultValue={passwordConfirm}
        onInput={setPasswordConfirm}
        maxLength={20}
        validateCallback={() => {
          if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
        }} />
      <div className={style.JoinPhoneNumberInput}>
        <Input
          label="전화번호"
          placeholder="-없이 숫자만 입력"
          defaultValue={passwordConfirm}
          onInput={setPhoneNumberber}
          maxLength={11} />
        <Button disabled={phoneNumber.length !== 11 || showSendOTP} onClick={onSendOTP}>인증번호 전송</Button>
      </div>
      {showOTP &&
        <Input
          label="인증번호"
          defaultValue={certNum}
          onInput={(val) => {
            setCertNum(val);
            if (val.length === 4) onCertPhoneNumber();
          }}
        />
      }
      <Button
        className={style.JoinButton}
        onClick={onSubmit}
        disabled={submitDisabled}>
        가입하기
      </Button>
      {/* <h5>또는</h5>
      <Button
        borderless
        style={{ backgroundColor: "#03C759" }}
        className={style.JoinButton}
        onClick={() => route("/dashbord")}>
        네이버로 간편가입
      </Button> */}
    </div>
  </div>;
};

export default Join;