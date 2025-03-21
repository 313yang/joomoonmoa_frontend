import { sendOTP, verifyOTP, changePassword, signup } from "@/libs/api/auth";
import { AxiosError, AxiosResponse } from "axios";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CertType } from "./defines";
import { toast } from "@/libs/Function";
import { useNaverSoultionToken } from "@/libs/store/useNaverSoultionToken";



const INIT_SECOND = 3 * 60;
let sendOTPCount = 0;

export const useCertification = (type: CertType, certOkCallback: () => void) => {
    const route = useNavigate();

    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [phoneNumber, setPhoneNumberber] = useState<string>("");
    const [certNum, setCertNum] = useState<string>("");
    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [showSendOTP, setShowSendOTP] = useState<boolean>(false); // 인증번호 전송 후 재전송 제한 disabled 여부
    const [isCertOk, setIsCertOk] = useState<boolean>(false);
    const [count, setCount] = useState<number>(INIT_SECOND);
    const [countTime, setCountTime] = useState(0);
    const [isError, setIsError] = useState<boolean>(false);
    const isJoin = type === CertType.Join;
    const submitDisabled = !password || !passwordConfirm || password !== passwordConfirm || !isCertOk;
    const naverSoutionToken = useNaverSoultionToken();

    const checkFrom = () => {
        let from = "";
        if (!!naverSoutionToken) from = "naver-soultion";
        return from;
    };
    const errorToast = (err: AxiosError | unknown) => toast(((err as AxiosError).response as AxiosResponse).data.message);

    // 인증번호 전송
    const onSendOTP = async () => {
        sendOTPCount += 1;
        if (sendOTPCount >= 4) return toast("스트레칭 후 다시 눌러주세요️ 🐥");
        try {
            const { status } = await sendOTP(phoneNumber, !isJoin);
            if (status === 200) {
                toast("인증번호 발송했습니다. 📲");
                setShowOTP(true);
                setShowSendOTP(true);
                setCountTime(Date.now());
                setTimeout(() => setShowSendOTP(false), 3000);
                setTimeout(() => sendOTPCount = 0, 60000);
            }
        } catch (err) {
            errorToast(err);
        }
    };

    // 인증하기
    const onCertPhoneNumber = async () => {
        try {
            const { status } = await verifyOTP(phoneNumber, certNum);
            if (status === 200) {
                setIsCertOk(true);
                setCount(INIT_SECOND);
                setCountTime(0);
                setTimeout(() => {
                    certOkCallback();
                    toast("인증 성공 🎉");
                }, 1000);
            }
        } catch (err) {
            setIsError(true);
        }
    };

    // 회원가입 / 비밀번호 변경하기
    const onSubmit = async () => {
        if (password !== passwordConfirm) return toast("비밀번호가 일치하지 않습니다.");
        try {
            const { status } = await (isJoin ? signup : changePassword)({ password, phoneNumber, from: checkFrom(), token: naverSoutionToken });
            if (status === 200) {
                toast(`✅성공적으로 ${isJoin ? "회원가입이 완료되었습니다!" : "비밀번호가 변경되었어요!"}`);
                setTimeout(() => route("/"), 1000);
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
        else setIsError(false);
    }, [certNum]);

    return {
        password,
        passwordConfirm,
        phoneNumber,
        certNum,
        showOTP,
        isCertOk,
        count,
        showSendOTP,
        isError,
        submitDisabled,
        setPassword,
        setPasswordConfirm,
        setPhoneNumberber,
        setCertNum,
        onSendOTP,
        onCertPhoneNumber,
        onSubmit,
    };
};
