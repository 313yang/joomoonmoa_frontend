import { Button, Input } from "@/components/Styled";
import { StoreList, UserInfoType } from "../defines";
import Dropdown from "@/components/Styled/Dropdown";
import { useSettingStore } from "../hooks";
import { BuildClass, formatPhoneNumber, secondsToMs, toast } from "@/libs/Function";
import { useEffect, useState } from "react";
import { sendOTP, verifyOTP } from "@/libs/api/auth";
import { changePhoneNumberApi } from "@/libs/api";
import style from "../../Join/Certification/style.module.scss";

const SettingChangePhoneNumber = ({ phoneNumber }: { phoneNumber: string; }) => {
    const { loading } = useSettingStore();
    const INIT_SECOND = 3 * 60;
    let sendOTPCount = 0;
    const [changePhoneNumber, setChangePhoneNumber] = useState<string>("");
    const [certNum, setCertNum] = useState<string>("");
    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [showSendOTP, setShowSendOTP] = useState<boolean>(false); // 인증번호 전송 후 재전송 제한 disabled 여부
    const [isCertOk, setIsCertOk] = useState<boolean>(false);
    const [count, setCount] = useState<number>(INIT_SECOND);
    const [countTime, setCountTime] = useState(0);
    const [isError, setIsError] = useState<boolean>(false);
    // 인증번호 전송
    const onSendOTP = async () => {
        sendOTPCount += 1;
        if (sendOTPCount >= 4) return toast("스트레칭 후 다시 눌러주세요️ 🐥");
        try {
            const { status } = await sendOTP(changePhoneNumber, false);
            if (status === 200) {
                toast("인증번호 발송했습니다. 📲");
                setShowOTP(true);
                setShowSendOTP(true);
                setCountTime(Date.now());
                setTimeout(() => setShowSendOTP(false), 3000);
                setTimeout(() => sendOTPCount = 0, 60000);
            }
        } catch (err) {
            // errorToast(err);
        }
    };

    // 인증하기
    const onCertPhoneNumber = async () => {
        try {
            const { status } = await verifyOTP(changePhoneNumber, certNum);
            if (status === 200) {
                setIsCertOk(true);
                setCount(INIT_SECOND);
                setCountTime(0);
                setTimeout(() => {
                    toast("인증 성공 🎉");
                }, 1000);
            }
        } catch (err) {
            setIsError(true);
        }
    };

    const onSubmitChangePhoneNumber = async () => {
        try {
            const { status } = await changePhoneNumberApi({ phoneNumber: changePhoneNumber });
            if (status === 200) toast("전화번호가 변경되었습니다!");
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
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

    useEffect(() => {
        if (certNum.length === 4) onCertPhoneNumber();
        else setIsError(false);
    }, [certNum]);

    return <>
        <div className={style.CurrentPhoneNumber}><p>현재 전화번호</p> <strong>{formatPhoneNumber(phoneNumber)}</strong></div>
        <div className={style.JoinPhoneNumberInput}>
            <Input
                type="number"
                label="전화번호"
                defaultValue={changePhoneNumber}
                onInput={setChangePhoneNumber}
                maxLength={11}
            />
            <Button disabled={changePhoneNumber.length !== 11 || showSendOTP || isCertOk} onClick={onSendOTP}>인증번호 전송</Button>
        </div>
        {showOTP &&
            <div style={{ position: "relative" }}>
                <Input
                    type="number"
                    label="인증번호"
                    defaultValue={certNum}
                    disabled={!showOTP || isCertOk}
                    maxLength={4}
                    validateCallback={(val) => {

                        if (val?.length === 4 && isError) return "인증번호가 달라요. 다시 한 번 확인해보실래요?";
                    }}
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
        }
        <Button width="100%" size="lg" disabled={loading} onClick={onSubmitChangePhoneNumber}>전화번호 변경</Button>
    </>;
};
export default SettingChangePhoneNumber;