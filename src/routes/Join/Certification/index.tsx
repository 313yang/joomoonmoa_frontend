import { Input, Button, Popup } from "@/components/Styled";
import { BuildClass, secondsToMs } from "@/libs/Function";
import { useState } from "react";
import style from "./style.module.scss";
import { useCertification } from "../hooks";
import { CertType } from "../defines";
import Privacy from "@/routes/Privacy";


const CertificationContainer = ({ type }: { type: CertType; }) => {
    const [step, setStep] = useState<number>(1);
    const {
        passwordConfirm,
        setPhoneNumberber,
        phoneNumber,
        showSendOTP,
        isCertOk,
        onSendOTP,
        showOTP,
        certNum,
        isError,
        setCertNum,
        count,
        password,
        setPassword,
        setPasswordConfirm,
        onSubmit,
        submitDisabled
    } = useCertification(type, () => setStep(2));
    const [display, setDisplay] = useState<boolean>(false);

    return <div className={style.JoinInputContainer}>
        {display &&
            <Popup onClose={() => setDisplay(false)}>
                <Privacy />
            </Popup>
        }
        {step === 1 ? <>
            <div className={style.JoinPhoneNumberInput}>
                <Input
                    type="number"
                    label="전화번호"
                    defaultValue={phoneNumber}
                    onInput={setPhoneNumberber}
                    maxLength={11}
                />
                <Button disabled={phoneNumber.length !== 11 || showSendOTP || isCertOk} onClick={onSendOTP}>인증번호 전송</Button>
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
        </> :
            <>
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
                />
                {CertType.Join &&
                    <span>가입 시 <strong onClick={() => setDisplay(true)}>이용 약관</strong> 및 <strong onClick={() => setDisplay(true)}>개인정보 취급 방침</strong>에 동의한 것으로 간주됩니다.</span>
                }
                <Button
                    className={style.JoinButton}
                    onClick={onSubmit}
                    disabled={submitDisabled}>
                    {CertType.Join ? "회원가입하기" : "비밀번호 변경하기"}
                </Button>
            </>
        }
    </div>;
};

export default CertificationContainer;