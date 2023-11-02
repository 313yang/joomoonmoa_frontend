import Header from "@/components/Layout/Header";
import { Button, Input } from "@/components/Styled";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { sendOTP, signup, verifyOTP } from "@/libs/api/auth";
import { BuildClass, ToastState, secondsToMs, toast } from "@/libs/Function";
import { AxiosError, AxiosResponse } from "axios";

const INIT_SECOND = 3 * 60;
let sendOTPCount = 0;
const Join = () => {
  const route = useNavigate();
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [phoneNumber, setPhoneNumberber] = useState<string>("");
  const [certNum, setCertNum] = useState<string>("");
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [showSendOTP, setShowSendOTP] = useState<boolean>(false); // 인증번호 전송 후 재전송 제한 disabled 여부
  const [isCertOk, setIsCertOk] = useState<boolean>(false);
  const [count, setCount] = useState<number>(INIT_SECOND);
  const [countTime, setCountTime] = useState(0);
  const regExp = /^[A-Za-z0-9]{2,12}$/;

  const submitDisabled = !account || !password || !regExp.test(account) || !passwordConfirm || password !== passwordConfirm || !isCertOk;

  const errorToast = (err: AxiosError | unknown) => toast(((err as AxiosError).response as AxiosResponse).data.message);
  const onSendOTP = async () => {
    sendOTPCount += 1;
    if (sendOTPCount >= 4) return toast("59초만 스트레칭 후 다시 눌러주세요️ 🐥");
    try {
      const { status } = await sendOTP(phoneNumber);
      if (status === 200) {
        toast("인증번호 발송했습니다. 📲");
        setShowOTP(true);
        setShowSendOTP(true);
        setCountTime(Date.now());
        setTimeout(() => setShowSendOTP(false), 3000);
        setTimeout(() => sendOTPCount = 0, 60000);
      }
    } catch (err) {
      toast("발송 실패 😓 다시 발송해주세요.");
    }
  };
  const onCertPhoneNumber = async () => {
    try {
      const { status } = await verifyOTP(phoneNumber, certNum);
      if (status === 200) {
        setIsCertOk(true);
        setCount(INIT_SECOND);
        setCountTime(0);
      }
    } catch (err) {
      toast("인증번호가 일치하지 않습니다 🚫");
    }
  };

  const onSubmit = async () => {
    if (password !== passwordConfirm) return toast("비밀번호가 일치하지 않습니다.");
    try {
      const { status } = await signup({ password, phoneNumber });
      if (status === 200) {
        toast("✅ 회원가입에 성공했습니다!");
        route("/");
      }

    } catch (err) {
      errorToast(err);
    }
  };

  useLayoutEffect(() => {
    if (!!showOTP && !isCertOk) {
      const countdown = window.setTimeout(() => {
        const time = INIT_SECOND - Math.floor((Date.now() - countTime) / 1000);
        if (time <= 0) {
          setShowOTP(false);
          setCount(INIT_SECOND);
          setCountTime(0);
          toast("시간 초과 ⏳ 새로 발송해주세요.");
        } else {
          setCount(time);
        }
      }, 1000);
      return () => window.clearTimeout(countdown);
    }
  }, [showOTP, count, countTime]);

  useLayoutEffect(() => {
    if (certNum.length === 4) onCertPhoneNumber();
  }, [certNum]);

  return <div>
    <Header prev={" "} title="회원가입" />
    <div className={style.JoinInputContainer}>
      {/* <Input
        autocomplete={true}
        label="전화번호"
        defaultValue={account}
        onInput={setAccount}
        validateCallback={() => {
          if (!account) return "전화번호를 입력해주세요.";
          if (!regExp.test(account)) return "아이디는 영어·숫자만 2~12자로 입력해주세요.";
        }}
        maxLength={11}
      /> */}
      <div className={style.JoinPhoneNumberInput}>
        <Input
          label="전화번호"
          placeholder="-없이 숫자만 입력"
          defaultValue={passwordConfirm}
          onInput={setPhoneNumberber}
          maxLength={11}
        />
        <Button disabled={phoneNumber.length !== 11 || showSendOTP || isCertOk} onClick={onSendOTP}>인증번호 전송</Button>
      </div>
      <div style={{ position: "relative" }}>
        <Input
          label="인증번호"
          defaultValue={certNum}
          disabled={!showOTP || isCertOk}
          maxLength={4}
          onInput={(val) => {
            setCertNum(val);
          }}
        />
        {showOTP &&
          <span className={BuildClass(`text-${isCertOk ? "green" : "danger"}`, style.Counter)}>
            {isCertOk ? "인증성공!" : secondsToMs(count)}
          </span>
        }
      </div>
      <Input
        autocomplete={true}
        type="password"
        label="비밀번호"
        defaultValue={password}
        onInput={setPassword}
        maxLength={20}
        validateCallback={() => {
          if (password.length < 4 || password.length > 20) return "비밀번호는 4~20자로 입력해주세요.";
        }}
        caption={<>4~20자 입력</>}
      />
      <Input
        autocomplete={true}
        type="password"
        label="비밀번호 확인"
        defaultValue={passwordConfirm}
        onInput={setPasswordConfirm}
        maxLength={20}
        validateCallback={() => {
          if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
        }}
        caption={<p>4~20자 입력</p>}
      />


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